import { uiActions, cartActions } from "./cart";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://food-order-2a829-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Something weny wrong!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          title: "success",
          status: "success",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: "Error",
          status: "error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("https://food-order-2a829-default-rtdb.europe-west1.firebasedatabase.app/cart.json" );   
     
      if (!response.ok) {
        throw new Error("Failed to fetch cart data!");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const cartData = await sendRequest();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          title: "Error",
          status: "error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
