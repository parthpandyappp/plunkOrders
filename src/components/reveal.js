import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import Nav from "./Nav";
import Footer from "./Footer";
import { RiDeleteBin7Line } from "react-icons/ri";
// import ImBin2 from "react-icons/im";

export default function Reveal() {
  const [itemArray, setItemArray] = useState([]);

  // useEffect(() => {
  //   var orders = firebase.firestore().collection("orders");

  //   orders.get().then((snapshot) => {
  //     const newTimes = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));

  //     setItemArray(newTimes);
  //   });
  //   console.log("Pandya");
  // }, [deleted]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("orders")
      .onSnapshot((snapshot) => {
        const newTimes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Pandya");
        setItemArray(newTimes);
      });
  }, []);

  function deleteOrder(id) {
    firebase.firestore().collection("orders").doc(id).delete();
  }

  return (
    <div>
      <Nav />
      <div className="container container-center display-card detail-header">
        <h2 style={{ textAlign: "center" }}>Order summary</h2>
      </div>
      {itemArray.length > 0 ? (
        itemArray.map((item) => {
          return (
            <div className="container container-center display-card">
              <ul id={item.id} className="list-non-bullets">
                <li>
                  <b style={{ float: "left" }}>Ordered by :&ensp;</b>
                  {item.name}
                  <RiDeleteBin7Line
                    className="delete-btn"
                    onClick={() => deleteOrder(item.id)}
                  />
                </li>
                <hr />
                <li>
                  <b>Order details</b>
                </li>
                <table>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Dispatch deadline</th>
                  </tr>
                  <tr>
                    <td>{item.prod_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.deadline}</td>
                  </tr>
                </table>
              </ul>
            </div>
          );
        })
      ) : (
        <div className="container container-center display-card">
          <p align="center">
            <img
              src="https://drive.google.com/uc?export=view&id=13onMP416PV5XzS5xqBOmpGA-SU-za4eD"
              title="Create a Class"
              height="300"
              width="300"
            />
          </p>
          <h3 style={{ textAlign: "center" }}>No orders found pending!</h3>
        </div>
      )}
      <Footer />
    </div>
  );
}
