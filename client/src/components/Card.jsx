import React from 'react';
import './styles/card.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {setDetail} from './actions/action'

function Card (x) {
    let {title, image, diets, healthScore, spoonacularScore, steps, summary} = x
    let details = {
        title: title,
        image: image,
        diets: diets,
        healthScore: healthScore,
        spoonacularScore: spoonacularScore,
        steps: steps,
        summary: summary,
    }


    return (
    <Link to='/card' onClick={() => x.setDetail(details)}>
        <div className='card'>
            <div>
                <img src={image} className='cardimgs'/>
                </div>
                <div>
                    <h3 className="cardtitle">{title}</h3>
                </div>
                <div>
                    <p className="carddiets">{diets.length > 1 ? diets.map(x => x + ' / ') : diets}</p>
                </div>
        </div>
    </Link>
    );
};


const mapStateToProps = (state) => {
    return {
        searchState: state
    }
}
const mapDispatchToProps = {
    setDetail
}

export default connect (mapStateToProps, mapDispatchToProps)(Card)