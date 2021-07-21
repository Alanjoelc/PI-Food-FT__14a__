import React from 'react';
import Card from './Card.jsx';
import { connect } from 'react-redux';
import { nextPage, previousPage } from './actions/action.js';
import './styles/cards.css'


function Cards(recipes) {
    if(recipes && recipes.recipes.length === 1){
        return (
            <div className='cards'>
                {recipes.recipes.map(c => (
                <Card 
                    
                    title={c.title}
                    summary={c.summary}
                    image={c.image}
                    diets={c.Diets}
                    steps={c.steps}
                    spoonacularScore={c.spoonacularScore}
                    healthScore={c.healthScore}
                    key={c.id}
                    id={c.id}
            />))}
                <button onClick={() => recipes.previousPage()} className='previousB'>Previous</button>
            </div>
        );
    }
    if(recipes && recipes.recipes.length !== 0){
        if(recipes.count === 1){
            return (
                <div className='cards'>
                    {recipes.recipes.map(c => (<Card 
                    title={c.title}
                    summary={c.summary}
                    image={c.image}
                    diets={c.Diets}
                    steps={c.steps}
                    spoonacularScore={c.spoonacularScore}
                    healthScore={c.healthScore}
                    key={c.id}
                    id={c.id}
                />))}
                    
                    <button className='btn-flotante' onClick={() => recipes.nextPage()}>Next</button>
                </div>
            )
        } else {
        return (
        <div>
            {recipes.recipes.map(c => (<Card className='cards' 
                    title={c.title}
                    summary={c.summary}
                    image={c.image}
                    diets={c.Diets}
                    steps={c.steps}
                    spoonacularScore={c.spoonacularScore}
                    healthScore={c.healthScore}
                    key={c.id}
                    id={c.id}
        />))}
            <button className='previousB' onClick={() => recipes.previousPage()}>Previous</button>
            <button className='btn-flotante' onClick={() => recipes.nextPage()}>Next</button>
        </div>
    );
            }
    } 
    else {
        return(
            <div>Cargando...</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}




export default connect(mapStateToProps, { nextPage, previousPage })(Cards);