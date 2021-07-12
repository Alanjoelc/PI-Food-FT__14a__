import React from 'react';
import Card from './Card.jsx';
import { connect } from 'react-redux';
import { nextPage, previousPage } from './actions/action.js';


function Cards(recipes) {
    console.log(recipes)


    if(recipes && recipes.recipes.length === 1){
        return (
            <div>
                {recipes.recipes.map(c => (<Card 
                    title={c.title}
                    summary={c.summary}
                    image={c.image}
                    diets={c.Diets}
                    key={c.id}
                    id={c.id}
            />))}
                <button onClick={() => recipes.previousPage()}>Anterior</button>
            </div>
        );
    }
    if(recipes && recipes.recipes.length !== 0){
        if(recipes.count === 1){
            return (
                <div>
                    {recipes.recipes.map(c => (<Card 
                        title={c.title}
                        summary={c.summary}
                        image={c.image}
                        diets={c.Diets}
                        key={c.id}
                        id={c.id}
                />))}
                    
                    <button onClick={() => recipes.nextPage()}>Siguiente</button>
                </div>
            )
        } else {
        return (
        <div>
            {recipes.recipes.map(c => (<Card 
                title={c.title}
                summary={c.summary}
                image={c.image}
                diets={c.Diets}
                key={c.id}
                id={c.id}
        />))}
            <button onClick={() => recipes.previousPage()}>Anterior</button>
            <button onClick={() => recipes.nextPage()}>Siguiente</button>
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