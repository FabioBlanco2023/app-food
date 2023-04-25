import React from 'react';
import {Link} from 'react-router-dom';
import imagen3 from '../../imagenes/image3.png'
import imagen6 from '../../imagenes/image6.png'
import imagen7 from '../../imagenes/image7.png'
import imagen8 from '../../imagenes/image8.png'
import imagen9 from '../../imagenes/image9.png'
import imagen10 from '../../imagenes/image10.png'
import '../Landing/LandingPageStyle.css'

export default function LandingPage(){
    return(
        <div className='landing-div'>
            <img className='imagen-3' src={imagen3} alt="Imagen3" />
            <img className='imagen-10' src={imagen10} alt="Imagen10" />
            <h2 className='LandingH2'>Your favorite recipes  </h2>
            <h2 className='LandingH3'>at the reach of a click</h2>
            <Link to = '/home'>
                <button className='botonLanding'>Home</button>
            </Link>
            <img className='imagen-6' src={imagen6} alt="Imagen6" />
            <img className='imagen-7' src={imagen7} alt="Imagen7" />
            <img className='imagen-8' src={imagen8} alt="Imagen8" />
            <img className='imagen-9' src={imagen9} alt="Imagen9" />
        </div>
    // <img className='imagen-1' src={imagen} alt="Primera foto" />
    )
}

