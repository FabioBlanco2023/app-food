const {Router} = require('express');
const {getAllRecipes} = require('../controllers/controllers.js')
const {Recipe, Diets} = require('../db')
const router = Router();

router.get('/', async (req, res) =>{
    try {
    const{ name } = req.query; //el query se pasa por URL
    const recipesTotal = await getAllRecipes();
    if(name){
        let recipesName = await recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); //siempre comparan las dos formas en minuscula, lo que esta en la api y lo que se pasa por query
        recipesName.length ? res.status(200).send(recipesName) 
        : res.status(404).send('No tenemos disponible la receta')
    }
    else{
        res.status(200).send(recipesTotal)
        }
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const recipesTotal = await getAllRecipes()
        if(isNaN(id)){
            let recipeNaN = recipesTotal.find(el => el.id == id)
            recipeNaN
            ? res.status(200).json(recipeNaN)
            : res.status(404).send('No se encontro esta receta')
        } else{
            let recipeId = recipesTotal.find(el => el.id === Number(id))
            recipeId
            ?res.status(200).json(recipeId)
            :res.status(404).send('No se encontró esta receta')
        }
       
    } catch (error){
        res.status(400).json({error: error.message})    
    }
})
    
router.post('/', async (req, res) =>{
    try {
        let { 
            name,
            image,
            resumenPlato,
            healthScore,
            pasos,
            createInDb,
            diets
         } = req.body;

        let recipeCreated = await Recipe.create ({
            name,
            image,
            resumenPlato,
            healthScore,
            pasos,
            createInDb,
        })  
        let dietsDb = await Diets.findAll({
            where: { name: diets }
        }) 
        recipeCreated.addDiets(dietsDb)
        res.send('Receta creada con exito')     

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
});

module.exports = router;