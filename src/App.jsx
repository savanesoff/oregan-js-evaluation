import { Input } from "./components/Input";
import reactLogo from "./assets/react.svg";
import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref && ref.current) {
      // console.log("Got forward ref", ref.current);
    }
  }, [ref]);
  return (
    <>
      <h1>User Login JS</h1>
      <p>Input Component Demo</p>
      <Input
        ref={ref}
        onChange={(value) => {
          console.log(value);
        }}
        value="Lorem"
        style={{
          padding: 5,
          width: 300,
          borderRadius: "6px",
          color: "yellow",
        }}
        // password={true}
        placeholder="Enter your Name"
        label="First Name"
        // readonly={true}
        startAdornment={
          <img
            src={reactLogo}
            alt="react logo"
            style={{
              width: 20,
              height: 20,
              margin: "auto 5px",
              display: "flex",
              alignItems: "center",
            }}
          />
        }
        endAdornment={
          <img
            src={reactLogo}
            alt="react logo"
            style={{
              width: 20,
              height: 20,
              margin: "auto 5px",
              display: "flex",
              alignItems: "center",
            }}
          />
        }
      />
    </>
  );
}

export default App;
