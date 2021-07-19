export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const PASTE = 'PASTE';
export const RECIPE_SEARCH = 'RECIPE_SEARCH';




export function getRecipesSearch (payload){
    return {
        type: 'RECIPE_SEARCH',
        payload
    }
}





export function nextPage(){
    return {
        type:'INCREMENT',
    }
}

export const  previousPage = () => {
    return{
        type: 'DECREMENT',
    }
}

export const pageRecipe = (payload) => {
    return{
        type: 'PASTE',
        payload
    }
}