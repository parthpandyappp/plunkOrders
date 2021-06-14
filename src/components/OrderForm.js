import { useState } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../firebase";

function OrderForm() {
  const [name, setName] = useState("");
  const [prod_name, setProdName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deadline, setDeadline] = useState("");

  const showInfo = () => {
    toast("Order has been confirmed & placed!", {
      draggable: true,
      draggablePercent: 100
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .firestore()
      .collection("orders")
      .add({
        name,
        prod_name,
        quantity,
        deadline,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setName("");
        setProdName("");
        setQuantity("");
        setDeadline("");
      });
    showInfo();
  }

  return (
    <div className="container container-center container-bg">
      <form onSubmit={handleSubmit}>
        <h3>Place an order</h3>
        <label for="name">Ordered by</label>
        <input
          type="text"
          name="name"
          placeholder="Enter the name of the person who ordered"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          autocomplete="off"
          required
        />
        <label for="name">Product name</label>
        <input
          type="text"
          name="prod_name"
          placeholder="Enter the product name"
          value={prod_name}
          onChange={(e) => setProdName(e.currentTarget.value)}
          autocomplete="off"
          required
        />
        <label for="name">Order quantity</label>
        <input
          type="text"
          name="quantity"
          placeholder="Enter the quantity of product ordered"
          value={quantity}
          onChange={(e) => setQuantity(e.currentTarget.value)}
          autocomplete="off"
          required
        />
        <label for="name">Dispatch deadline</label>
        <input
          type="date"
          name="deadline"
          placeholder="Enter the deadline date"
          value={deadline}
          onChange={(e) => setDeadline(e.currentTarget.value)}
          autocomplete="off"
          required
        />
        <button class="btn" type="submit">
          Submit
        </button>
      </form>
      <ToastContainer
        closeButton={false}
        position="top-center"
        style={{ textAlign: "center" }}
        draggable
      />
    </div>
  );
}

export default OrderForm;
