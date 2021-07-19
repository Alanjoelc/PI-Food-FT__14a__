import React, {useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {getRecipesSearch} from './actions/action'

async function callb(a) {
    if(a !== 'Select diet' ) {
    let x = a.toLowerCase().replace(' ', '%20')
    const allRecipes= await axios.default.get(`http://localhost:3001/filter?diet=${x}`)
    .then(x=> x.data)
    return allRecipes
    }
}


function Filter ({searchState, getRecipesSearch}) {
    const [Diets, setDiets] = useState('')

    const handleOnClick = (e) => {
        e.preventDefault();
        searchState.count = 1;
        callb(Diets)
        .then(x => getRecipesSearch(x))
        setDiets('')
    }

    return(
        <div>
            <form>
                <select onChange={(e) => setDiets(e.target.value)}>
                    <option value='Select diet'> Select diet </option>
                    <option value='Dairy free'> Dairy free </option>
                    <option value='Fodmap friendly'> Fodmap friendly </option>
                    <option value='Gluten free'> Gluten free </option>
                    <option value='Lacto ovo vegetarian'> Lacto ovo vegetarian </option>
                    <option value='Paleolithic'> Paleolithic </option>
                    <option value='Pescatarian'> Pescatarian </option>
                    <option value='Primal'> Primal </option>
                    <option value='Whole 30'> Whole 30 </option>
                    <option value='Vegan'> Vegan </option>
                </select>
                <button type='submit' onClick={handleOnClick}> Filtrar </button>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        searchState: state
    }
}

const mapDispatchToProps = {
    getRecipesSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)