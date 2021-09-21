import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import Nav from "./Nav";
import Footer from "./Footer";
import { RiDeleteBin7Line } from "react-icons/ri";
// import ImBin2 from "react-icons/im";

export default function Reveal() {
  const [itemArray, setItemArray] = useState([]);

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
  itemArray.map((item) => {
    item.arr.forEach((item) => console.log("idhar", item.value));
  });
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
                {/* <li>
                  <b style={{ float: "left" }}>Dispatch deadline :&ensp;</b>
                  {item.deadline}
                </li> */}

                <table>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                  </tr>
                  {item.arr.map((cam) => {
                    return (
                      <>
                        <tr>
                          <td style={{ letterSpacing: "2px", width: "12rem" }}>
                            {cam.value}
                          </td>
                          <td style={{ letterSpacing: "4px", width: "15rem" }}>
                            {cam.quantity}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </table>

                {/*  #ff8787   */}

                {/* <hr /> */}

                <button
                  class="btn"
                  style={{
                    backgroundColor: "#fff3bf",
                    marginTop: "0.5rem",
                    cursor: "default"
                  }}
                >
                  Dispatch deadline : {item.deadline}
                </button>
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
