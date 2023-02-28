import React from 'react';
import {Link} from 'react-router-dom';
import imagen from '../../imagenes/receta-landing.png'
import '../Landing/LandingPageStyle.css'

export default function LandingPage(){
    return(
        <div className='landing-div'>
            <img className='imagen-1' src={imagen} alt="Primera foto" />
            <h1>BIENVENIDOS</h1>
            <Link to = '/home'>
                <button className='botonLanding'>Ingresar</button>
            </Link>
        </div>
    )
}