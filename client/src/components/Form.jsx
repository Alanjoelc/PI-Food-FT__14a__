import React, {useState} from 'react';
import axios from 'axios';
import './styles/Form.css';


export default function Formulary () {
    const [title, setTitle] = useState ('');
    const [healthScore, setHealthScore] = useState ('');
    const [summary, setSummary] = useState ('');
    const [steps, setSteps] = useState ('');
    const [spoonacularScore, SetSponacularScore] = useState ('');
    const [image, setImage] = useState ('');

    const [glutenfree, setGlutenfree] = useState({checker: false, value: ''});
    const [dairyfree, setDairyfree] = useState({checker: false, value: ''});
    const [lacto, setLacto] = useState({checker: false, value: ''});
    const [vegan, setVegan] = useState({checker: false, value: ''});
    const [paleolithic, setPaleolithic] = useState({checker: false, value: ''});
    const [pescatarian, setPescatarian] = useState({checker: false, value: ''})
    const [primal, setPrimal] = useState({checker: false, value: ''});
    const [whole30, setWhole30] = useState({checker: false, value: ''});
    const[fodmap, setFodmap] = useState({checker: false, value: ''});

    let objPost = {
        title: title,
        summary: summary,
        image: image,
        steps: steps,
        healthScore: healthScore,
        spoonacularScore: spoonacularScore,
        diets:[],
    }

    let Partialdiets = [glutenfree.value, dairyfree.value, lacto.value, vegan.value, paleolithic.value, pescatarian.value, primal.value, whole30.value, fodmap.value]

    const postRecipe = async (e) => {
        e.preventDefault()
        if(!title || !healthScore || !summary || !steps || !spoonacularScore || !image){
            alert('You need to fill in all the fields');
            return;
        }
        let ahealth = parseFloat(healthScore)
        let bspoon = parseFloat(spoonacularScore)
        if(isNaN(ahealth) || isNaN(bspoon)){
            alert('Use valid data!');
            return;
        }
        let arr = Partialdiets.filter(x => x.length !== 0)
        objPost.diets = arr
        if(objPost.diets.length === 0){
            alert('Choose a diet');
            return
        }
        const response = await axios({
            url: 'http://localhost:3001/pruebaRecipe/post',
            method: 'POST',
            data: objPost
        })
        alert('Recipe incorporated')
        document.getElementById('titleR').value = ''
        document.getElementById('imageR').value = ''
        document.getElementById('spooR').value = ''
        document.getElementById('healthR').value = ''
        document.getElementById('summaryR').value = ''
        document.getElementById('stepsR').value = ''
    }


    return(
        <div className='allbody'>
            <h1 className='titleRecipe'>New Recipe</h1>
            <form className='divFm'>
                <div>
                    <label className='titleFm' htmlFor='title'>Name</label>
                    <input type='text' className='inputFm' id='titleR' name='title' placeholder='...' onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>  
                    <label className='titleFm' htmlFor='image'>Image Url</label>
                    <input type='text' className='imageFm' id='imageR' name='image' placeholder='...' onChange={(e) => setImage(e.target.value)}/>
                </div>
                <div>  
                    <label className='titleFm' htmlFor='spoonacularScore'>Score</label>
                    <input type='text'className='scoreFm'  id='spooR' name='spoonacularScore' placeholder='...' onChange={(e) => SetSponacularScore(e.target.value)}/>
                </div>
                <div>
                    <label  className='titleFm' htmlFor='healthScore'>Health Score</label>
                    <input type='text' className='healthFm' id='healthR' name='healthScore' placeholder='...' onChange={(e) => setHealthScore(e.target.value)}/>
                </div>
                <div>
                        <label htmlFor='summary'className='summarylabelFm'>Summary</label>
                        <textarea className='summaryFm' type='text' id='summaryR' name='summary' placeholder='...' onChange={(e) => setSummary(e.target.value)}/>
                </div>
                <div>
                        <label className='stepslabelFm' htmlFor='steps'>Steps</label>
                        <textarea type='text' className='stepsFm' id='stepsR' name='steps' placeholder='...' onChange={(e) => setSteps(e.target.value)}/>
                </div>
                <div>
                    <h4 className='diets'>Diets</h4>
                    <div>
                        <label className='gydDiet' htmlFor='gluten free'>Gluten free</label>
                        <input className='inputGluten' type='checkBox' name='gluten free' onChange={() => {glutenfree.checker === false ? setGlutenfree({checker: true, value: 'gluten free'}) : setGlutenfree({checker: false, value: ''})}} />
                    </div>
                    <div>
                        <label className='gydDiet' htmlFor='Dairy free'>Dairy free</label>
                        <input className='inputDairy' type='checkBox' name='Dairy free' onChange={() => {dairyfree.checker === false ? setDairyfree({checker: true, value: 'dairy free'}) : setDairyfree({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label className='gydDiet' htmlFor='lacto ovo vegetarian'>Lacto ovo vegetarian</label>
                        <input className='inputLacto' type='checkBox' name='lacto ovo vegetarian' onChange={() => {lacto.checker === false ? setLacto({checker: true, value: 'lacto ovo vegetarian'}) : setLacto({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label  className='vypDiet' htmlFor='vegan'>Vegan</label>
                        <input className='inputVegan' type='checkBox' name='vegan' onChange={() => {vegan.checker === false ? setVegan({checker: true, value: 'vegan'}) : setVegan({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label  className='vypDiet'  htmlFor='paleolithic'>Paleolithic</label>
                        <input  className='inputPaleo' type='checkBox' name='paleolithic' onChange={() => {paleolithic.checker === false ? setPaleolithic({checker: true, value: 'paleolithic'}) : setPaleolithic({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label  className='vypDiet'  htmlFor='pescatarian'>Pescatarian</label>
                        <input className='inputPesca' type='checkBox' name='pescatarian' onChange={() => {pescatarian.checker === false ? setPescatarian({checker: true, value: 'pescatarian'}) : setPescatarian({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label  className='pywDiet' htmlFor='primal'>Primal</label>
                        <input  className='inputPrimal' type='checkBox' name='primal' onChange={() => {primal.checker === false ? setPrimal({checker: true, value: 'primal'}) : setPrimal({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label  className='pywDiet' htmlFor='whole 30'>Whole 30</label>
                        <input className='inputWhole' type='checkBox' name='whole 30' onChange={() => {whole30.checker === false ? setWhole30({checker: true, value: 'whole 30'}) : setWhole30({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label  className='pywDiet' htmlFor='fodmap friendly'>Fodmap friendly</label>
                        <input  className='inputFod' type='checkBox' name='fodmap friendly' onChange={() => {fodmap.checker === false ? setFodmap({checker: true, value: 'fodmap friendly'}) : setFodmap({checker: false, value: ''})}}/>
                    </div>
                </div>
                <button className='button' onClick={postRecipe}>Add recipe</button>
            </form>
        </div>
    )
}
