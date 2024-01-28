import { Input } from "@components";
import reactLogo from "./assets/react.svg";
import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  return (
    <>
      <h2>Oregan React - JS Evaluation</h2>
      <p>Input Component by Samvel Avanesov</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 20,
          gap: 30,

          fontSize: "1rem",
        }}
      >
        <InputBasicRef
          style={{
            padding: 5,
            borderRadius: "6px",
            color: "white",
          }}
        />
        <InputPassword
          style={{
            padding: 5,

            borderRadius: "6px",
            color: "#b5ff8a",
          }}
        />

        <InputEndAdornment
          style={{
            padding: 5,

            borderRadius: "6px",
            color: "#ffaaea",
          }}
        />
        <InputStartAdornment
          style={{
            padding: 5,
            borderRadius: "6px",
            color: "#6bc9ff",
          }}
        />
        <InputReadonly
          style={{
            padding: 5,
            borderRadius: "6px",
            color: "#ffd769",
          }}
        />
      </div>
    </>
  );
}

export default App;

const InputBasicRef = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref && ref.current) {
      console.log("Got forward ref", ref.current);
    }
  }, [ref]);
  return (
    <Input
      // forward ref example
      ref={ref}
      onChange={(value) => {
        console.info("InputBasicRef", value);
      }}
      placeholder="Enter your First Name"
      label="First Name"
      {...props}
    />
  );
};

const InputPassword = (props) => {
  return (
    <Input
      onChange={(value) => {
        console.info("InputPassword", value);
      }}
      password={true}
      placeholder="Enter your Password"
      label="Password"
      {...props}
    />
  );
};

const InputReadonly = (props) => {
  return <Input readonly={true} value="Read Only" label="Saved" {...props} />;
};

const InputEndAdornment = (props) => {
  return (
    <Input
      onChange={(value) => {
        console.info("InputEndAdornment", value);
      }}
      label="End Adornment Example"
      placeholder="Enter your Speed"
      endAdornment={
        <span
          style={{
            color: "#c0c0c0",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          MPH
        </span>
      }
      {...props}
    />
  );
};

const InputStartAdornment = (props) => {
  return (
    <Input
      onChange={(value) => {
        console.info("InputStartAdornment", value);
      }}
      label="Start Adornment Example"
      placeholder="Do you like React?"
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
      {...props}
    />
  );
};
