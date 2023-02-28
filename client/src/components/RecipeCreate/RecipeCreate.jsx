import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDiets, postRecipes} from '../../redux/actions/index'

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'A name is required';
    } else if(!input.resumenPlato){
        errors.resumenPlato = 'Summary is required'
    } else if(input.healthScore<0 || input.healthScore>100){
        errors.healthScore = 'Health Score is required, must be a number between 0-100'
    } else if(!input.pasos){
        errors.pasos = 'Steps is required'
    } else if(!input.image){
        errors.image = 'Image is required'
    }
    return errors;
}      
        
export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory() //cosito del route que me lleva a donde yo le diga
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        resumenPlato: "",
        healthScore: 0,
        pasos: "",
        diets: [],
        image: "",
    })

    function handleChange(e){
        setInput ({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipes(input))
        alert('Ready! You created your recipe')
        setInput({
        name: "",
        resumenPlato: "",
        healthScore: 0,
        pasos: "",
        diets: [],
        image: "",
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== el)
        })
    }

useEffect(() =>{
    dispatch(getDiets())
}, [dispatch])

return(
    <div>
        <Link to='/home'><button>Return</button></Link>
        <h1>Create your Recipe</h1>
        <form>

            <div className="formName">
                <label>Name: </label>
                <input type='text' value={input.name} name='name' onChange={e=>handleChange(e)} />
                {errors.name && (<p className="error">{errors.name}</p>)}
            </div>
            <div className="formImage">
                <label>Image link: </label>
                <input type='text' value={input.image} name='image' onChange={e=>handleChange(e)} />
                {errors.image && (<p className="error">{errors.image}</p>)}
            </div>
            <div className="formSummary">
                <label>Summary of the dish: </label>
                <input type='text' value={input.resumenPlato} name='resumenPlato' onChange={e=>handleChange(e)}/>
                {errors.resumenPlato && (<p className="error">{errors.resumenPlato}</p>)}
            </div>
            <div className="formHealth">
                <label>Health Score: </label>
                <input type='number' value={input.healthScore} name='healthScore' onChange={e=>handleChange(e)} />
                {errors.healthScore && (<p className="error">{errors.healthScore}</p>)}
            </div>
            <div>
                <label className="formSteps">Steps: </label>
                <input type='text' value={input.pasos} name='pasos' onChange={e=>handleChange(e)}/>
                {errors.pasos && (<p className="error">{errors.pasos}</p>)}
            </div>
            <select onChange={(e)=>handleSelect(e)}>
                {diets.map((diet)=>(
                    <option value={diet.name}>{diet.name}</option>
                ))}
            </select>
            {input.diets.map(el=> 
                        <div className="divDiet">
                            <p>{el}</p>
                            <button className="botonX" onClick={()=> handleDelete(el)}>x</button>
                        </div>

                        )}
            

            <button type='submit' onClick={(e)=>handleSubmit(e)} disabled={input.name&&input.healthScore&&input.image&&input.pasos&&input.resumenPlato ? false : true}  >Create Recipe</button>

        </form>
    </div>
)

}