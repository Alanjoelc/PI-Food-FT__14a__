import React, {useState} from 'react';
import axios from 'axios';

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
        console.log(response);
        document.getElementById('titleR').value = ''
        document.getElementById('imageR').value = ''
        document.getElementById('spooR').value = ''
        document.getElementById('healthR').value = ''
        document.getElementById('summaryR').value = ''
        document.getElementById('stepsR').value = ''
    }


    return(
        <div>
            <h1>New Recipe</h1>
            <form>
                <div>
                    <label htmlFor='title'>Name</label>
                    <input type='text' id='titleR' name='title' placeholder='...' onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>  
                    <label htmlFor='image'>ImageUrl</label>
                    <input type='text' id='imageR' name='image' placeholder='...' onChange={(e) => setImage(e.target.value)}/>
                </div>
                <div>  
                    <label htmlFor='spoonacularScore'>Score</label>
                    <input type='text' id='spooR' name='spoonacularScore' placeholder='...' onChange={(e) => SetSponacularScore(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='healthScore'>Health Score</label>
                    <input type='text' id='healthR' name='healthScore' placeholder='...' onChange={(e) => setHealthScore(e.target.value)}/>
                </div>
                <div>
                    <div>
                    <label htmlFor='summary'>Summary</label>
                    </div>
                    <div>
                    <textarea type='text' id='summaryR' name='summary' placeholder='...' onChange={(e) => setSummary(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='steps'>Steps</label>
                    </div>
                    <div>
                        <textarea type='text' id='stepsR' name='steps' placeholder='...' onChange={(e) => setSteps(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <h4>Diets</h4>
                    <div>
                        <label htmlFor='gluten free'>Gluten free</label>
                        <input type='checkBox' name='gluten free' onChange={() => {glutenfree.checker === false ? setGlutenfree({checker: true, value: 'gluten free'}) : setGlutenfree({checker: false, value: ''})}} />
                    </div>
                    <div>
                        <label htmlFor='Dairy free'>Dairy free</label>
                        <input type='checkBox' name='Dairy free' onChange={() => {dairyfree.checker === false ? setDairyfree({checker: true, value: 'dairy free'}) : setDairyfree({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label htmlFor='lacto ovo vegetarian'>Lacto ovo vegetarian</label>
                        <input type='checkBox' name='lacto ovo vegetarian' onChange={() => {lacto.checker === false ? setLacto({checker: true, value: 'lacto ovo vegetarian'}) : setLacto({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label htmlFor='vegan'>Vegan</label>
                        <input type='checkBox' name='vegan' onChange={() => {vegan.checker === false ? setVegan({checker: true, value: 'vegan'}) : setVegan({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label htmlFor='paleolithic'>Paleolithic</label>
                        <input type='checkBox' name='paleolithic' onChange={() => {paleolithic.checker === false ? setPaleolithic({checker: true, value: 'paleolithic'}) : setPaleolithic({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label htmlFor='pescatarian'>Pescatarian</label>
                        <input type='checkBox' name='pescatarian' onChange={() => {pescatarian.checker === false ? setPescatarian({checker: true, value: 'pescatarian'}) : setPescatarian({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label htmlFor='primal'>Primal</label>
                        <input type='checkBox' name='primal' onChange={() => {primal.checker === false ? setPrimal({checker: true, value: 'primal'}) : setPrimal({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label htmlFor='whole 30'>Whole 30</label>
                        <input type='checkBox' name='whole 30' onChange={() => {whole30.checker === false ? setWhole30({checker: true, value: 'whole 30'}) : setWhole30({checker: false, value: ''})}}/>
                    </div>
                    <div>
                        <label htmlFor='fodmap friendly'>Fodmap friendly</label>
                        <input type='checkBox' name='fodmap friendly' onChange={() => {fodmap.checker === false ? setFodmap({checker: true, value: 'fodmap friendly'}) : setFodmap({checker: false, value: ''})}}/>
                    </div>
                </div>
                <button onClick={postRecipe}>Add recipe</button>
            </form>
        </div>
    )
}
