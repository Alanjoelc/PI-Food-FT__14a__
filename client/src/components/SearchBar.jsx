import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import {getRecipesSearch} from './actions/action'
import './styles/SearchBar.css'


async function recipesSearch(a) {

    const allRecipes= await axios.default.get(`http://localhost:3001/recipes?name=${a}`)
    .then(x=>x.data)
    return allRecipes
}


function SearchBar ({searchState, getRecipesSearch}) {
    const [search, setSearch] = useState('');

    const handleSubmit = function (e) {
        e.preventDefault();
        searchState.count = 1;
        recipesSearch(search)
        .then(x => getRecipesSearch(x))
        setSearch('')
        document.getElementById('title').value = '';
    }
    
    return(
        <div>
            <div>
                <label htmlFor='title'/>
                <input type='text'className='inputSB' name='title' id='title' placeholder='Search' onChange={(arg) => setSearch(arg.target.value)} value={search} onSubmit={handleSubmit}/>
                <button type='submit'className='buttonSB' onClick={handleSubmit} >🔍</button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)