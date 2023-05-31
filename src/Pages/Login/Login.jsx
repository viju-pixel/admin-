import { useState } from "react";
import "./Login.css"

// const Login = () => {
//     const [username, setusername] = useState("");
//     const [password, setpassword] = useState("");
//     const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
//     const users = [{ username: "Admin", password: "Gujarat@821" }];
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const account = users.find((user) => user.username === username);
//         if (account && account.password === password) {
//             setauthenticated(true);
//             console.log(password);
//             localStorage.setItem("authenticated", true);
//             window.location.href = "/NewsAddingPage"; // replace with the URL of the new page
//         }
//     };

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/call/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        window.location.href = "/NewsAddingPage";
        // Store the token securely (e.g., in local storage or cookies)
        console.log('Login successful. Token:', token);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
    return (

        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-12 login-title">Admin Sign Up</div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">USERNAME</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="HDGD"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                            required
                                            id="HDGD"
                                        // pattern=".{6,}"
                                        />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"></div>
                                        <div className="col-lg-6 login-btm login-button">
                                            {/* <button type="submit" className="btn btn-outline-primary">
                                                LOGIN
                                            </button> */}
                                            <input className="btn btn-outline-primary" type="submit" value="Submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default Login;

