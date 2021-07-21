require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];
const { Op } = require("sequelize");//
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe, Diet, Intermediate } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Diet.belongsToMany(Recipe, {through: Intermediate});
Recipe.belongsToMany(Diet, {through: Intermediate});

//Funciones!!
const creationElementRecipe = async (obj) => {
  const {title, summary, image, healthScore, analyzedInstructions, spoonacularScore, diets} = await obj;
  const stepFinal = await orderSteps (analyzedInstructions);
  const infoRecipe = {
    title: title,
    summary: summary,
    image: image,
    healthScore: healthScore,
    steps: stepFinal,
    spoonacularScore: spoonacularScore,
    diets: diets,
  }
  await sequelize.sync();
  const newRecipe = await Recipe.create(infoRecipe); //Crea un elemento en la tabla recipe
  const searchDiet = await Diet.findAll({where: {name: obj.diets}}); //busca las dietas que sean iguales a las dietas que recibe como arg
  const idDiet = await searchDiet.map(i => i.dataValues.id); //Saca las id de las dietas que sean iguales
  await newRecipe.addDiet(idDiet); //Agrega en mi tabla intermedia las ID de las dietas
}

const PostElementRecipe = async (obj) => {
  const {title, summary, image, healthScore, steps, spoonacularScore, diets} = await obj;
  const infoRecipe = {
    title: title,
    summary: summary,
    image: image,
    healthScore: healthScore,
    steps: steps,
    spoonacularScore: spoonacularScore,
    diets: diets,
  }
  await sequelize.sync();
  const newRecipe = await Recipe.create(infoRecipe);
  const searchDiet = await Diet.findAll({where: {name: obj.diets}});
  const idDiet = await searchDiet.map(i => i.dataValues.id);
  await newRecipe.addDiet(idDiet); 
}

const orderSteps = (arr) => {
  if (arr.length === 0) {
    return 'No steps found for this recipe... :('
  }
  if (arr[0].steps === undefined ){
    return 'No steps found for this recipe... :('
  }else{
    let final = ''
    for(let i = 0; i < arr[0].steps.length; i++){
      final = final + ' ' + arr[0].steps[i].step
    }
    return final
  }
}

const creationElementDiet = async (name) => {
  await sequelize.sync();
  await Diet.create({
    name: name
  })
}

const firstNine = async (name) => {
  let names = name.toLowerCase()
  let arr = [];
  let arr1 = [];
  await sequelize.sync();
  let allRecipes = await Recipe.findAll()
  allRecipes.map(x => {
    return arr.push(x.dataValues)
  })
  for (let i = 0; i < arr.length; i++){
    let a = arr[i].title.toLowerCase();
    if(a.includes(names)){
      arr1.push(arr[i])
      if(arr1.length == 9){
        break;
      }
    }
  }
  let a = arr1.map(x => x.id)
  let arr2 = [];
  for (let z = 0; z < a.length; z++){
    arr2.push(recipeForId(a[z]))
  }
  let xd = await Promise.all(arr2)
  return xd
}

const recipeForId = async (id) => {
  await sequelize.sync();
  let newId = parseInt(id);
  let recipe = await Recipe.findOne({where:{id: newId}});
  if (!recipe) {
    return ('XD')
  }
  let finalRecipe = recipe.dataValues;
  let arrDietId = await Intermediate.findAll({where:{recipeId: newId}});
  let dietsId = arrDietId.map(x => x.dataValues.dietId);
  let diets = await dietsId.map(x => Diet.findOne({where:{id: x}}));
  let a = Promise.all(diets)
  .then(x => x.map(i => i.dataValues.name))
  .then(x => {
    Object.defineProperty(finalRecipe, 'Diets',{
      enumerable: true,
      configurable: true,
      writable: true,
      value: x
    })
    return finalRecipe
  })
  return a
}

const recipesForPage = async (number) => {
  await sequelize.sync();
  let min = 1;
  if(number == 1){
    min = 1
  } else {
    min = ((number-1) * 9) + 1;
  }
  let max = number * 9;
  let arr = [];
  for(let i = min; i < (max + 1); i++){
    let newId = parseInt(i);
    let recipe = await Recipe.findOne({where:{id: newId}});
    if(recipe) {
    let finalRecipe = recipe.dataValues;
    let arrDietId = await Intermediate.findAll({where:{recipeId: newId}});
    let dietsId = arrDietId.map(x => x.dataValues.dietId);
    let diets = await dietsId.map(x => Diet.findOne({where:{id: x}}));
    let a = Promise.all(diets)
    .then(x => x.map(i => i.dataValues.name))
    .then(x => {
      Object.defineProperty(finalRecipe, 'Diets',{
        enumerable: true,
        configurable: true,
        writable: true,
        value: x
      })
      return finalRecipe
    })
    arr.push(a); 
    }
  }
  return (arr)
}

const allDiets = async () => {
  let dietsArr = await Diet.findAll();
  let diets = dietsArr.map(x => x.dataValues.name)
  return diets;
}

const recipeWithDiet = async (diet) => {
  await sequelize.sync(); 
  let dieta = await Diet.findOne({where:{name: diet}})
  let idDiet = dieta.dataValues.id
  let equality = await Intermediate.findAll({where:{dietId: idDiet}})
  let ArrRecipeID = equality.map(x => x.dataValues.recipeId)
  let recipes = ArrRecipeID.map(x => recipeForId(x))
  let a = Promise.all(recipes)
  .then(x => {
    return (x)
  })
  return a;
}

const orderAzandScore = async (letter) => {
  await sequelize.sync();
  let partialRecipe = await Recipe.findAll()
  let idRecipes = partialRecipe.map(x => x.dataValues.id)
  let allRecipe = idRecipes.map(x => recipeForId(x))
  let x = await Promise.all(allRecipe)
  .then(a => a) 

  if(x){
    if(letter === 'a'){
      x.sort(function(a,b) { 
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        return 0;
      })
      return(x);
    }
    if(letter === 'z'){
      x.sort(function(a,b) { 
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      return(x);
    }
    if(letter == 1){  //de mayor a menor
      x.sort(function(a,b) { 
        if (a.spoonacularScore > b.spoonacularScore) {
          return -1;
        }
        if (a.spoonacularScore < b.spoonacularScore) {
          return 1;
        }
        return 0;
      })
      return(x);
    }
    if(letter == 2){ // de menor a mayor
      x.sort(function(a,b) { 
        if (a.spoonacularScore > b.spoonacularScore) {
          return 1;
        }
        if (a.spoonacularScore < b.spoonacularScore) {
          return -1;
        }
        return 0;
      })
      return(x);
    }
  }
}


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  creationElementDiet,
  creationElementRecipe,
  PostElementRecipe,
  orderSteps,
  firstNine,
  recipeForId,
  recipesForPage,
  allDiets,
  recipeWithDiet,
  orderAzandScore,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
