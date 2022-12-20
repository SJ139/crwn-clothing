import {CartDropDownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-items/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router';


const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

const goToCheckoutHandler = () =>{
    navigate ('/checkout');
}    

return(
    <CartDropDownContainer>
        <CartItems>
        {
            cartItems.length ? (cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
            ))) : (
                <EmptyMessage>Your Cart is Empty</EmptyMessage> 
            )}
        
            </CartItems>
        <Button onClick = {goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropDownContainer>

)};

export default CartDropdown;