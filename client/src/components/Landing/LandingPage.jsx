import React from 'react';
import {Link} from 'react-router-dom';
import '../Landing/LandingPageStyle.css'

export default function LandingPage(){
    return(
        <div className='landing-div'>
            <h2 className='LandingH2'>Explore your favorite  </h2>
            <h2 className='LandingH3'>recipes with a simple click</h2>
            <Link to = '/home'>
                <button className='botonLanding'>Home</button>
            </Link>
        </div>
    )
}

