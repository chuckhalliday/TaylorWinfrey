import { CART_ADD_ITEM, CART_REMOVE_ITEM, CLEAR_SESSION } from "../Constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existingItem = state.cartItems.find(x => x.id === item.id)
            if(existingItem){
                return {
                  ...state,
                  cartItems: state.cartItems.map(x =>
                    x.id === existingItem.id ? item : x),
                }
            } else {
                return {...state, cartItems : [...state.cartItems, item]}
            }
        case CART_REMOVE_ITEM:
            return {...state, cartItems : state.cartItems.filter((x) => x.id !== action.payload)}
        case CLEAR_SESSION:
            return {...state, cartItems : []}
    default:
        return state;
    }
}

