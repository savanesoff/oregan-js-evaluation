import { Input } from "@components";
import reactLogo from "./assets/react.svg";
import { useEffect, useRef } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <>
      <h2>Oregan React JS Evaluation</h2>
      <p>Input Component by Samvel Avanesov</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          width: "100%",
          height: "100%",
        }}
      >
        <InputExamples />
        <LoginExample />
      </div>
    </>
  );
}

export default App;

const LoginExample = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    console.log("email", email);
    console.log("password", password);
    if (email.length && password.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "flex-start",
        gap: 30,
        width: "100%",
        height: "100%",
        padding: 20,
        fontSize: "1rem",
        backgroundColor: "#272727",
        border: "1px solid #484848",
        borderRadius: "6px",
      }}
    >
      <p>Use Login</p>
      <Input
        onChange={setEmail}
        placeholder="Enter your Email"
        label="Email"
        style={{
          borderRadius: "6px",
          color: "white",
        }}
      />
      <Input
        onChange={setPassword}
        password={true}
        showPassword={showPassword}
        placeholder="Enter your Password"
        label="Password"
        style={{
          borderRadius: "6px",
          color: "white",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          fontSize: "1rem",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <button
          tabIndex={0}
          onClick={togglePassword}
          style={{
            padding: "3px 10px",
            borderRadius: "6px",
            border: "1px solid #909090",
            color: "white",
            backgroundColor: "#3e3e3e",
            cursor: "pointer",
            opacity: 0.8,
          }}
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>

        <button
          disabled={disabled}
          tabIndex={0}
          style={{
            padding: "3px 10px",
            borderRadius: "6px",
            border: "1px solid #909090",
            color: "white",
            backgroundColor: "#3e3e3e",
            cursor: "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

const InputExamples = () => (
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
      backgroundColor: "#272727",
      border: "1px solid #484848",
      borderRadius: "6px",
    }}
  >
    <p>Input Examples</p>
    <InputBasicRef
      style={{
        borderRadius: "6px",
        color: "white",
      }}
    />
    <InputPassword
      style={{
        borderRadius: "6px",
        color: "#b5ff8a",
      }}
    />

    <InputEndAdornment
      style={{
        borderRadius: "6px",
        color: "#ffaaea",
      }}
    />
    <InputStartAdornment
      style={{
        borderRadius: "6px",
        color: "#6bc9ff",
      }}
    />
    <InputReadonly
      style={{
        borderRadius: "6px",
        color: "#ffd769",
      }}
    />
  </div>
);

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
            fontSize: 15,
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
