import './checkout.styles.scss';
import { useContext, } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-items/cart-item.component';





const Checkout = () => {
    const {cartItems, addItemToCart}= useContext(CartContext);
    

    return( 
    <div>
        <h1>This is the Checkout Page</h1>
        <div>
        {cartItems.map((cartItem) => {
            const {id, name, quantity} = cartItem;
            return (
            <div key= {id}> 
            <h2>{name}</h2>
            <span>{quantity}</span>
            <br/>
            <span onClick={() => addItemToCart(cartItem)}>+</span>
            <br/>
            <span>-</span>
            </div>
            );
        })}
        </div>
    </div>
    );
    
};

export default Checkout;