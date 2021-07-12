import React, { useState} from "react";
import Cards from "./Cards.jsx";
import axios from "axios";
import { connect } from 'react-redux';
import { pageRecipe} from './actions/action'


async function recipess(a) {

    const allRecipes= await axios.default.get(`http://localhost:3001/pagenine?num=${a}`)
    .then(x=>x.data)
    return allRecipes
}

function Prueba({count, pageRecipe}) {
    if(!count.check){
    let a = recipess(count.count)
    .then(x => pageRecipe(x))
}
        return (
            <div>
                <Cards recipes={count.ninerecipe}/>
            </div>
            )
}





///
const mapStateToProps = (state) => {
    return {
        count: state
    }
}

const mapDispatchToProps = {
    pageRecipe
}

export default connect(mapStateToProps, mapDispatchToProps)(Prueba);