import React, { createContext, useState } from "react";
import all_product from '../assets/all_product'

export const ShopContext = createContext(null);
const getDefaultcart = () =>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) =>{
    const [cartItems,setCartitems] = useState(getDefaultcart());
   
   
    const addToCart = (itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
        
    }
    const removeFromCart = (itemId)=>{
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const getTotalAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0) {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
            totalAmount+= itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }   

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if (cartItems[item]>0) {
                totalItem+=cartItems[item]
            }
        }
        return totalItem;
    }

    const ContextValue = {getTotalCartItems,all_product , cartItems,addToCart,removeFromCart,getTotalAmount}
    return (
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}
export default ShopContextProvider;