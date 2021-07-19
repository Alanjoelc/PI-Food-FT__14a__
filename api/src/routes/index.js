const { Router } = require('express');
const { firstNine, recipeForId, allDiets, recipesForPage, recipeWithDiet, orderAzandScore} = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// 😁
router.get('/recipes', (req, res) => {
    let {name} = req.query;
    firstNine(name)
    .then(x => {
        if(x.length === 0) {
            res.status(404).send('Recipe is not defined')
        } else {
            res.json(x)
        }
    })
})

router.get('/recipes/:id', (req, res) => {
    let {id} = req.params;
    recipeForId(id)
    .then(x => {
        if(x === 'XD') {
            res.status(404).send('There is no recipe with this id.')
        } else {
            res.json(x)
        }
    })
    
})

router.get('/pagenine', (req, res) =>{
    let {num} = req.query;
    recipesForPage(num)
    .then(x => {
        let a = Promise.all(x)
        return a
    })
    .then(x => res.send(x))
})



router.get('/types', (_req, res) => {
    allDiets()
    .then(x => {
        res.json(x)
    })
})


router.get('/filter', (req, res) => {
    let {diet} = req.query
    recipeWithDiet(diet)
    .then(x => res.json(x))
})

router.get('/accommodate', (req,res) => {
    let {type} = req.query
    console.log(type)
    orderAzandScore(type)
    .then(x => res.json(x))
})


module.exports = router;
