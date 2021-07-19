import { INCREMENT, DECREMENT, PASTE, RECIPE_SEARCH } from "../actions/action";
const initialState = {
    count: 1,
    ninerecipe: [],
    check: false,
    searchState: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1,
                check: false
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
                check: false
        }
        case PASTE:
            return{
                ...state,
                ninerecipe: action.payload,
                check: true
            }
        case RECIPE_SEARCH:
            return{
                ...state,
                searchState: action.payload,
                count: 1,
            }
        default:
            return state;
    }
};