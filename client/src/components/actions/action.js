export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const PASTE = 'PASTE'


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