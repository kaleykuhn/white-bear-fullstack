import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         emailError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   // validateAndLogUser() {
   //    this.setState({
   //       isDisplayingInputs: true,
   //    });
   // }

   // //set email state
   // async setEmailState(emailInput) {
   //    const lowerCasedEmailInput = emailInput.toLowerCase();
   //    console.log(lowerCasedEmailInput);

   //    if (emailInput === "")
   //       this.setState({
   //          emailError: "Please enter your email address.",
   //          hasEmailError: true,
   //       });
   //    else if (!EMAIL_REGEX.test(lowerCasedEmailInput)) {
   //       console.log("NOT a VALID EMAIl");
   //       this.setState({
   //          emailError: "Please enter a valid email address.",
   //          hasEmailError: true,
   //       });
   //    } else {
   //       this.setState({ emailError: "", hasEmailError: false });
   //    }
   // }

   // // set state of password
   // async setPasswordState(passwordInput) {
   //    console.log(passwordInput);
   //    //can't be blank
   //    // must be at least 9 characters
   //    //cannot contain the local-part of the email
   //    //must have at least 3 unique characters
   //    const uniqChars = [...new Set(passwordInput)];
   //    console.log(uniqChars);
   //    if (passwordInput === "") {
   //       this.setState({
   //          passwordError: "Please enter your password.",
   //          hasPasswordError: true,
   //       });
   //    } else {
   //       this.setState({ passwordError: "", hasPasswordError: false });
   //    }
   // }
   //setting the state of App
   async validateAndLogInUser() {
      //Email cannot be blank
      //must have valid email regex
      const emailInput = document.getElementById("login-email-input").value;
      const passwordInput = document.getElementById("login-password-input")
         .value;

      // await this.setEmailState(emailInput);
      // await this.setPasswordState(passwordInput);
      // if (
      //    this.state.hasEmailError === false &&
      //    this.state.hasPasswordError === false
      // ) {
      //create user object
      const user = {
         email: emailInput,
         password: passwordInput,
      };

      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // handle success
            //console.log(res.data);
            // Update currentUser in global state with API response
            // set token in local storage
            const authToken = res.data;
            localStorage.setItem("authToken", authToken);
            const user = jwtDecode(authToken);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: user,
            });
            axios.defaults.headers.common["x-auth-token"] = authToken;
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            //const data = err.response.data
            const { data } = err.response;
            //console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });

      //   }
   }

   render() {
      return (
         <div className="col-xl-5 col-sm-6 col-12 mb-6">
            <div className="card">
               <div className="card-body text-dark bg-white rounded">
                  <h2 className="card-title">Welcome back</h2>
                  <p className=" mb-1 card-title">
                     Log in with your email address and password.
                  </p>

                  <p className="text-success mt-4"></p>
                  <label htmlFor="login-email-input">Email address</label>
                  <input
                     type="email"
                     className={classnames({
                        "mb-2": true,
                        "form-control": true,
                        "is-invalid": this.state.hasEmailError,
                     })}
                     id="login-email-input"
                     placeholder=""
                  />
                  {this.state.hasPasswordError && (
                     <small className="text-danger">
                        {this.state.emailError}
                     </small>
                  )}

                  <label htmlFor="login-password-input">Password</label>
                  <input
                     type="password"
                     className={classnames({
                        "mb-2": true,
                        "form-control": true,
                        "is-invalid": this.state.hasPasswordError,
                     })}
                     id="login-password-input"
                     placeholder=""
                  />
                  {this.state.hasPasswordError && (
                     <small className="text-danger">
                        {this.state.passwordError}
                     </small>
                  )}

                  <button
                     className="btn btn-success float-right mt-6"
                     onClick={() => {
                        this.validateAndLogInUser();
                     }}
                  >
                     Log in
                  </button>
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(Login));
