import React from 'react';
import './styles/card.css'
import {Link} from 'react-router-dom'
export default function Card ({title, summary, image, diets}) {
    return (
    <Link to='/card'>
        <div className='card'>
            <div>
                <img src={image} className='cardimgs'/>
                </div>
                <div>
                    <h3 className="cardtitle">{title}</h3>
                </div>
                <div>
                    <p className="carddiets">{diets.length > 1 ? diets.map(x => x + '/') : diets}</p>
                </div>
        </div>
    </Link>
    );
};