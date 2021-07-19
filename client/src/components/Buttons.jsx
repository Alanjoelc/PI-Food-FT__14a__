import React, {useState} from 'react';
import axios from 'axios'
import {getRecipesSearch} from './actions/action'
import { connect } from 'react-redux'


async function callb(a) {
    const allRecipes= await axios.default.get(`http://localhost:3001/accommodate?type=${a}`)
    .then(x=> x.data)
    return allRecipes
}


function Buttons ({searchState, getRecipesSearch}){
    const [filter,setFilter] = useState('a');
    const [filtScore, setFiltScore] = useState('2')

    const handeOnClick = (e) => {
        e.preventDefault();
        searchState.count = 1;
        if(filter !== 'a'){
            setFilter('a')
        } else if(filter !== 'z'){
            setFilter('z')
        }
        callb(filter)
        .then(x => getRecipesSearch(x))
    }


    const handeOnClickScore = (e) => {
        e.preventDefault();
        searchState.count = 1;
        if(filtScore !== '1'){
            setFiltScore('1')
        } else if(filtScore !== '2'){
            setFiltScore('2')
        }
        callb(filtScore)
        .then(x => getRecipesSearch(x))
    }

    return(
        <div>
            <button type='submit' onClick={handeOnClick}>A-Z</button>
            <button type='submit'onClick={handeOnClickScore}>Score</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)