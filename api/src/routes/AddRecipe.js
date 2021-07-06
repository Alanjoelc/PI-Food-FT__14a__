const {Router} = require ('express');
const axios= require ('axios').default;
const router= Router();
const { creationElementRecipe, orderSteps } = require ('../db')

router.get('/2', (_req, res) => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=c87f6b21942c4487aa770f26dd2d6901')
    .then(a => {
        a.data.results.map(x => creationElementRecipe(x))
    })
    .then(a => res.send('Added to Recipe Table'));
});


module.exports=router;