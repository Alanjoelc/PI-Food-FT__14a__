const {Router} = require ('express');
const axios= require ('axios').default;
const router= Router();
const {creationElementDiet} = require ('../db')
// router.post('/1', (req, res) => {
//     axios.get('https://api.spoonacular.com/recipes/complexSearch?number=1&addRecipeInformation=true&apiKey=6bce47b5328242bfbc43def366bfee3c')
//     .then(a => a.json())
//     .then(a => res.send(a))
// })
var arr = [];

router.get('/2', (_req, res) => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=c87f6b21942c4487aa770f26dd2d6901')
    .then(a => {a.data.results.map(x => x.diets.map(e => arr.push(e)))
        return arr
    })
    .then(a => a.filter(function(item, index, array) {
        return array.indexOf(item) === index;
    }))
    .then(a => a.forEach(x => {
        creationElementDiet(x)
    }))
    .then(a => res.send('Added to Diet Table'))
})



module.exports=router;