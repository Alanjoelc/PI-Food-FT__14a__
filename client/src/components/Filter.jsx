import React, {useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {getRecipesSearch} from './actions/action'
import './styles/Filter.css'


async function callb(a) {
    console.log(a)
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
                <select onChange={(e) => setDiets(e.target.value)} className='selectFilter'>
                    <option value='Select diet' className='selectFilter'> Select diet </option>
                    <option value='Dairy free' className='selectFilter'> Dairy free </option>
                    <option value='Fodmap friendly' className='selectFilter'> Fodmap friendly </option>
                    <option value='Gluten free' className='selectFilter'> Gluten free </option>
                    <option value='Lacto ovo vegetarian' className='selectFilter'> Lacto ovo vegetarian </option>
                    <option value='Paleolithic' className='selectFilter'> Paleolithic </option>
                    <option value='Pescatarian' className='selectFilter'> Pescatarian </option>
                    <option value='Primal' className='selectFilter'> Primal </option>
                    <option value='Whole 30' className='selectFilter'> Whole 30 </option>
                    <option value='Vegan' className='selectFilter'> Vegan </option>
                </select>
                <button type='submit' onClick={handleOnClick} className='ButtonFilter'> Filter </button>
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