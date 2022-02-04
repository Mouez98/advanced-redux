import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/cart';

import classes from './CartButton.module.css';

const CartButton = () => {
  const totalQuantitiy = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch();

  const showCartHandler = () => dispatch(uiActions.showCart())
  
  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantitiy}</span>
    </button>
  );
};

export default CartButton;
