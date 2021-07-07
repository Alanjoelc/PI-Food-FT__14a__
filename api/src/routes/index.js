const { Router } = require('express');
const { firstNine, recipeForId, allDiets } = require('../db.js')
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

router.get('/types', (req, res) => {
    allDiets()
    .then(x => {
        res.json(x)
    })
})



module.exports = router;
