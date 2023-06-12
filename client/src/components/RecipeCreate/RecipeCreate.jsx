import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDiets, postRecipes} from '../../redux/actions/index'
import imageform from '../../imagenes/imagenform2.png'
import '../RecipeCreate/RecipeCreateCss.css'


function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'A name is required';}
    if(!input.image){
        errors.image = 'Image is required'}
    if(!input.resumenPlato){
        errors.resumenPlato = 'Summary is required'}
    if(input.healthScore<=0 || input.healthScore>100){
        errors.healthScore = 'Health Score is required, must be a number between 1-100'}
    if(!input.pasos){
        errors.pasos = 'Steps is required'} 
    if(input.diets.length===0){
        errors.diets = 'Diets is required'}
    return errors;
}      


export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory() 
    const diets = useSelector((state) => state.diets)
    
    const [input, setInput] = useState({
        name: "",
        resumenPlato: "",
        healthScore: 0,
        pasos: "",
        diets: [],
        image: "",
    })
    const errors = validate(input)
    
    function handleChange(e){
        setInput ({
            ...input,
            [e.target.name]: e.target.value
        })

    }

    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length===0){
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
        }else{
            alert('Complete all and check errors')
        }
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
    <div className="bodyCreate">
        <img className="imageForm" src={imageform} alt="imgForm" />
        <div  className="h1Form">Crea tu receta</div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="detail">
            <div className="formName">
                <label>Name: </label>
                <input type='text' value={input.name} name='name' placeholder="Name" onChange={e=>handleChange(e)} />
                {errors.name && (<p className="error">{errors.name}</p>)}
            </div>
            <div className="formImage">
                <label>Image Link: </label>
                <input type='text' value={input.image} name='image' onChange={e=>handleChange(e)} placeholder="URL" />
                {errors.image && (<p className="error">{errors.image}</p>)}
            </div>
            <div className="formSummary">
                <label>Summary of the dish: </label>
                <textarea value={input.resumenPlato} name='resumenPlato' onChange={e=>handleChange(e)} rows="2" cols="10"/>
                {errors.resumenPlato && (<p className="error">{errors.resumenPlato}</p>)}
            </div>
            <div className="formSummary">
                <label>Health score: </label>
                <input type='number' value={input.healthScore} name='healthScore' onChange={e=>handleChange(e)} />
                {errors.healthScore && (<p className="error">{errors.healthScore}</p>)}
            </div>
            <div className="formSteps">
                <label>Steps: </label>
                <textarea value={input.pasos} name='pasos'
                rows="2" cols="10" placeholder="To make this recipe it is necessary to follow the following steps:"
                onChange={e=>handleChange(e)}/>
                {errors.pasos && (<p className="error">{errors.pasos}</p>)}
            </div>
            <div className="formDiets">
                <label>Select one or more types of diet: </label>
            <select onChange={(e)=>handleSelect(e)}>
            <option disabled value="">(Select one)</option>
                {diets.map((diet)=>(
                    <option value={diet.name}>{diet.name[0].toUpperCase()+diet.name.substring(1)}</option>
                ))}
            </select>{errors.diets && (<p className="error">{errors.diets}</p>)}
            </div>
            {input.diets.map(el=> 
                        <div className="divDiet">
                            <p>{el[0].toUpperCase()+el.substring(1)}</p>
                            <button type="button" className="botonX" onClick={()=> handleDelete(el)}>x</button>
                        </div>
                        )}
            

            <button className="buttonForm">Create your recipe1</button>
            </div>
        </form>
        <div className="return">
        <Link to='/home'><button className="butonReturn">Go back</button></Link>
        </div>
    </div>
)

}