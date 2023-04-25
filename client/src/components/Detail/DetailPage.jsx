import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useEffect, useState } from "react";
import "../Detail/DetailCss.css"

export default function Detail(props){
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false); // Agrega el estado para controlar si los datos se han cargado completamente

  useEffect(()=>{
      dispatch(getDetail(props.match.params.id))
      .then(() => setLoaded(true)); // Cambia el estado a verdadero una vez que los datos se hayan cargado completamente
  }, [dispatch]);

  const myRecipe = useSelector ((state)=>state.detail);

  return (
      <div>
        {loaded ? ( // Utiliza el estado para condicionar la renderización de la carta
          <div className="recipeDetail">
            <div className="imageContainer">
              <img id="image" src={myRecipe.image} alt="Photo" />
            </div>
            <div className="textContainer">
              <h1 id="h1">{myRecipe.name}</h1>
              <p>Summary: {myRecipe.resumenPlato?.replace(/<[^>]*>/g, "")}</p>
              <h2 id="h2">Health Score: {myRecipe.healthScore}</h2>
              <h3 id="h3">Diets: {myRecipe.diets?.join(", ")}</h3>
              <h5 id="h5">Steps: {myRecipe.pasos ? myRecipe.pasos : myRecipe.steps}</h5>
            </div>
          </div>
        ) : (
          <div className="loading">Loading...</div>
          )}
        <Link to="/home">
          <button className="buttonGoBack" type="button">
            Go back
          </button>
        </Link>
      </div>
    );
}