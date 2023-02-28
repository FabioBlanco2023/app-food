const {Recipe, Diets} = require('../db')
const axios = require('axios')
const {API_KEY} = process.env;

const getApiInfo = async() => {
   const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
   
   const apiInfo = await apiUrl.data.results.map(el =>{ //el .data es porque axios debe acceder a data que es lo que quiere, es si o si.
       return {
           id: el.id,
           name: el.title,
           image: el.image,
           resumenPlato: el.summary,
           healthScore: el.healthScore,
           diets: el.diets,
           steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps ? el.analyzedInstructions[0].steps.map(e => e.step).join("|") : 'No hay pasos')
       };

   });
   return apiInfo;
};

const getDBInfo = async() =>{
   return await Recipe.findAll({
       include: {
           model: Diets,
           attributes: ['name'],
           through: {
               attributes: [],
           }
       }
   })
}

const getAllRecipes = async () => {
   const apiInfo = await getApiInfo(); //la ejecuto () porque sino no me devuelve nada
   const dbInfo = await getDBInfo(); 
   const infoTotal = apiInfo.concat(dbInfo);
   return infoTotal;
}

const getAllDiets = async () => {
    try {
       //si estan en la db, no hago nada
        const allDiets = await Diets.findAll();
        if (allDiets.length) {//existen?
            return allDiets
        }

        const dietTypes = [
            "gluten free",
            "dairy free",
            "ketogenic",
            "lacto ovo vegetarian",
            "vegan",
            "pescatarian",
            "paleolithic",
            "primal",
            "fodmap friendly",
            "whole 30",
        ];

        dietTypes.forEach(diet => {
            Diets.findOrCreate({
                where: { name: diet }
            });
        });

        let diets = await Diets.findAll();
        return diets;

    } catch (error) {
        console.log('ERROR EN getAllDiets/controllers', error)
    }
}

module.exports = {getAllDiets, getAllRecipes, getApiInfo, getDBInfo}