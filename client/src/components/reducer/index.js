import { INCREMENT, DECREMENT, PASTE } from "../actions/action";
const initialState = {
    count: 1,
    ninerecipe: [],
    check: false,
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
        default:
            return state;
    }
};