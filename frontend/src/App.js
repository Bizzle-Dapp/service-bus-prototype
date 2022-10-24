import React from "react";
import RecieveComponent from "./components/RecieveComponent";
import SendComponent from "./components/SendComponent";

function App() {

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      justifyContent: "space-around",
      alignContent: "space-between",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <SendComponent />
      <RecieveComponent />
    </div>
  );
}

export default App;
