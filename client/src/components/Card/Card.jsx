import React from "react";
import '../Card/Card.css'

export default function Card({name, image, diets}){
    return (
    <div className="container">
     <div className="card">
            <img className="imagecard" src={image} alt='img not found'/>
            <h3 className="h3card">{name}</h3>
            <h5 className="h5card custom-h5">{diets?.join(", ")}</h5> {/* Agrega la clase custom-h5 */}
        </div>
    </div>
    );
}