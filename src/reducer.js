import * as data from './resources/data/data.json';

// Creating reducer function and initalState object for global state management
export const initialState = {
    cartItemsNum: data.default.cart.items,
    article: data.default.article,
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
        return {
            ...state,
            cartItemsNum: state.cartItemsNum + action.itemsToAdd
        }
        default:
        return state;
    }
}