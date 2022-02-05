import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/cart";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartVisibilty);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://food-order-2a829-default-rtdb.europe-west1.firebasedatabase.app/cart",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      dispatch(
        uiActions.showNotification({
          title: "success",
          status: "success",
          message: "Sent cart data successfully",
        })
      );
      if (!response.ok) {
       throw new Error('Something weny wrong!')
      }
    };

    if (cart.totalQuantity !== 0) {
      sendCartData().catch(error => {
        dispatch(
          uiActions.showNotification({
            title: "Error",
            status: "error",
            message: "Sending cart data failed!",
          })
        );
      });
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
