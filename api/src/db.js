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
const { Recipe, Diet } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Diet.belongsToMany(Recipe, {through: 'connection_table'});
Recipe.belongsToMany(Diet, {through: 'connection_table'});

//Funcion
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


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  creationElementDiet,
  creationElementRecipe,
  orderSteps,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
