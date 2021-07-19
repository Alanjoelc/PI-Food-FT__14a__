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
    if(count.searchState.length){
        if(count.searchState.length > 9){
            let arr = []
            let max = count.count * 9;
            let min = (count.count - 1) * 9;
            for(let v = min; v < max;v++){
                if(count.searchState[v]){
                arr.push(count.searchState[v])
                }
            }
            if(arr.length){
            return (
                <div>
                    <Cards recipes={arr}/>
                </div>
                )
            }else{
                return (
                    <div>
                        no hay nada
                    </div>
                )
            }
        } else {
            if(count.searchState.length){
            return (
                <div>
                    <Cards recipes={count.searchState}/>
                </div>
                )
            } else {
                return (
                    <div>
                        no hay nada
                    </div>
                )
            }
        }
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