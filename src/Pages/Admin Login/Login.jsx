import React,{useState} from "react";
import "./Login.css"
import Validation from "./Validation";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.email]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(Validation(values));
  }
  return (
    <>
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "13px" }}>{errors.email}</p>
            )}
            <input
              type="password"
              placeholder="password"
              value={values.password}
              name="password"
              onChange={handleChange}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "13px" }}>
                {errors.password}
              </p>
            )}
            <button>login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
