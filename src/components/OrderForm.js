import { useState } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../firebase";

function OrderForm() {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [arr, setArr] = useState([{ value: "", quantity: "" }]); //Item Name

  // Below Three functions are to handle multiple submissions
  function addElement() {
    const newArray = [...arr];
    newArray.push({
      value: "",
      quantity: ""
    });
    setArr(newArray);
  }

  const handleChange = (e, i) => {
    const newArray = [...arr];
    newArray[i].value = e.target.value;
    setArr(newArray);
  };

  const handleProdChange = (e, i) => {
    const prodArray = [...arr];
    prodArray[i].quantity = e.target.value;
    setArr(prodArray);
  };

  // This function is to show toast msg

  const showInfo = () => {
    toast("Order has been confirmed & placed!", {
      draggable: true,
      draggablePercent: 100
    });
  };

  // This function is to submit data on firebase

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .firestore()
      .collection("orders")
      .add({
        name,
        arr,
        deadline,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setName("");
        setArr([{ value: "", quantity: "" }]);
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

        {arr.map((item, key) => {
          return (
            <>
              <label for="name">Product name</label>
              <input
                type="text"
                name="prod_name"
                placeholder="Enter the product name"
                id={key}
                onChange={(e) => handleChange(e, key)}
                autocomplete="off"
                required
              />

              <label for="name">Order quantity</label>

              <input
                type="text"
                name="quantity"
                placeholder="Enter the quantity of product ordered"
                id={key}
                onChange={(e) => handleProdChange(e, key)}
                autocomplete="off"
                required
              />
            </>
          );
        })}

        <button className="btn" style={{ width: "7rem" }} onClick={addElement}>
          Add item{" "}
        </button>

        <label for="name">Dispatch deadline</label>
        <input
          type="date"
          name="deadline"
          placeholder="Enter the deadline date"
          value={deadline}
          onChange={(e) => setDeadline(e.currentTarget.value)}
          autoComplete="off"
          required
        />
        <button className="btn" style={{ display: "block" }} type="submit">
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
