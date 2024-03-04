import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setUsername(e.currentTarget.value);
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: username,
          password: password,
        },
      }),
    };
    fetch(`${import.meta.env.VITE_URL}/auth/login`, data)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem("jwt", res.jwt);
        } else {
          throw res;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="edit-translation-container">
        <form id="login-form" onSubmit={(e) => handleOnSubmit(e)}>
          <h3>Admin Login</h3>
          <div className="full-col">
            <label className="same-line" htmlFor="username">
              Username:{" "}
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => handleOnChangeUsername(e)}
            />
          </div>
          <div className="full-col">
            <label className="same-line" htmlFor="password">
              Password:{" "}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => handleOnChangePassword(e)}
              className=""
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className={username && password ? "submit-btn" : "disabled-btn"}
            disabled={!(username && password)}
          />
        </form>
      </div>
    </>
  );
}

// import React, { Component } from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { loginUser } from "../actions/userActions.js";

// class Login extends Component {
//   state = {
//     username: "thelinguist",
//     password: "alphabet",
//   };

//   handleOnChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleOnSubmit = (e) => {
//     e.preventDefault();
//     this.props.loginUser(this.state.username, this.state.password);
//     this.props.history.push("/");
//     this.setState({
//       username: "",
//       password: "",
//     });
//   };

//   render() {
//     return (
//       <div>
//         <form
//           id="login-form"
//           onSubmit={(e) =>
//             this.handleOnSubmit(e, this.state.username, this.state.password)
//           }
//         >
//           <h3>Admin Login</h3>
//           <div className="full-col">
//             <label className="same-line" htmlFor="username">
//               Username:{" "}
//             </label>
//             <input
//               id="username"
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={this.state.username}
//               onChange={this.handleOnChange}
//             />
//           </div>
//           <div className="full-col">
//             <label className="same-line" htmlFor="password">
//               Password:{" "}
//             </label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               placeholder="password"
//               value={this.state.password}
//               onChange={this.handleOnChange}
//               className=""
//             />
//           </div>
//           <input
//             type="submit"
//             value="Submit"
//             className={
//               this.state.username && this.state.password
//                 ? "submit-btn"
//                 : "disabled-btn"
//             }
//             disabled={!(this.state.username && this.state.password)}
//           />
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   loggedIn: state.users.loggedIn,
// });

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       loginUser,
//     },
//     dispatch
//   );
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
