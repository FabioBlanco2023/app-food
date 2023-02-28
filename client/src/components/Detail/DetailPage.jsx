import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect } from "react";

export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const myRecipe = useSelector ((state)=>state.detail) //para ir al reducer

    return (
        <div>
            { 

                myRecipe ?
                <div>
                    <h1>{myRecipe.name}</h1>
                    <p>Summary: {myRecipe.resumenPlato}</p>
                    <h2>Health Score: {myRecipe.healthScore}</h2>
                    <h3>Diets: {myRecipe.diets}</h3>
                    <h5>Steps: {myRecipe.pasos}</h5>
                    <img src= {myRecipe.image} alt='Photo'/>
                </div>
                :
                <h3>No se encontró la receta</h3>
            }
            <Link to="/home">
                <button type="button">Go back</button>
            </Link>
        </div>
    )

}
