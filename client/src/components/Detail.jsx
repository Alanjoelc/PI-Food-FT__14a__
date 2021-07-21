import React from 'react';
import { connect } from 'react-redux';
import './styles/Detail.css'

function perfectString  (str) {
    let arr = [];
    let checker = true;
    for(let i = 0; i < str.length; i++){
        if(str[i] == '<'){
            checker = false;
        }
        if(str[i] == '>'){
            checker = true;
        }
        if(checker && str[i] != '>'){
            arr.push(str[i])
        }
    }
    return arr.join('')
}


function perfectDiets (arr){
    if(arr.length == 1){
        return arr.join('')
    }
    return arr.join(' / ')
}


function Details (props){
    let {title, image, summary, steps, spoonacularScore, healthScore, diets} = props.state.detail
    let a = ''
    let b = ''
    if(summary){
    a = perfectString(summary)
        }
    if(diets){
        b = perfectDiets(diets)
    }
    return(
        <div className='color'>
            <div>
                <p className='titleDeta'>{title}</p>
            </div>
            <div className='borderimg'>
                <img src={image} className='imageDeta'/>
            </div>
            <div className='container'>
                <div className='spoo'>
                    <h3 className='titlespo'>Score</h3>
                    <h4 className='numberspo'>{spoonacularScore}</h4>
                </div>
                <div className='health'>
                    <h3 className='titlehealth'>Health Score</h3>
                    <h4 className='numberheal'>{healthScore}</h4>
                </div>
                <div className='dietss'>
                    <h3 className='titlediets'>Diets</h3>
                    <h4 className='arrdiets'>{b}</h4>
                </div>
            </div>
            <div className='summary'>
                <h3 className='titlesumm'>Summary</h3>
                <textarea readonly="readonly" className='textsumm'>{a}</textarea>
            </div>
            <div className='steps'>
            <h3 className='titlestep'>Steps</h3>
                <textarea readonly="readonly" className='textstep'>{steps}</textarea>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect (mapStateToProps, null)(Details)