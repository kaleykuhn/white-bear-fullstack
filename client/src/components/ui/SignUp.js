import React from "react";
import classnames from "classnames";
import { v4 as getUUid } from "uuid";
import { withRouter } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }
   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   //set email state
   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();
      console.log(lowerCasedEmailInput);

      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (!EMAIL_REGEX.test(lowerCasedEmailInput)) {
         console.log("NOT a VALID EMAIl");
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   checkHasLocalPart(passwordInput, emailInput) {
      console.log(emailInput);
      //split returns an array and you need to get first thing in that array
      const localPart = emailInput.split("@")[0];
      console.log(localPart);
      //includes method returns true or false
      //return passwordInput.includes(localPart);
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return passwordInput.includes(localPart);
   }
   // set state of password
   async setPasswordState(passwordInput, emailInput) {
      console.log(passwordInput);
      //can't be blank
      // must be at least 9 characters
      //cannot contain the local-part of the email
      //must have at least 3 unique characters
      const uniqChars = [...new Set(passwordInput)];
      console.log(uniqChars);
      if (passwordInput === "") {
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      } else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Your password must be at least 9 characters",
            hasPasswordError: true,
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         // if it contains local part returns true
         // then set error state
         this.setState({
            passwordError:
               "For your safety password cannot contain your email address",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "For your safety, your password must contain at least 3 unique characters",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }
   //setting the state of App
   async validateAndCreateUser() {
      console.log("VALIDATE ME");
      //Email cannot be blank
      //must have valid email regex
      const emailInput = document.getElementById("signup-email-input").value;
      console.log(emailInput);
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         // Create user obj
         const user = {
            id: getUUid(),
            email: emailInput,
            password: passwordInput,
            createdAt: Date.now(),
         };
         console.log("Created user object for POST:", user);

         // Post to API
         axios
            .post("/api/v1/users", user)
            .then((res) => {
               console.log(res);
               // Update currentUser in global state with API response
               // Go to next page: this.props.history.push("/create-answer");
            })
            .catch((err) => {
               console.log(err.response.data);
            });
      }
   }

   render() {
      return (
         <div className="col-xl-5 col-sm-6 col-12 mb-6">
            <div className="card">
               <div className="card-body text-dark bg-white rounded">
                  <h2 className="card-title">Nice to Meet You</h2>
                  <p className=" mb-4 card-title">
                     Sign up for White Bear. Free forever.
                  </p>

                  <div className="" id="form1">
                     {this.state.isDisplayingInputs && (
                        <>
                           <p className="text-success mb-4">
                              Let's get you signed up!
                           </p>
                           <label htmlFor="signup-email-input">
                              Email address
                           </label>
                           {this.state.emailError !== ""}

                           <input
                              type="email"
                              className={classnames({
                                 "form-control": true,
                                 "mb-2": true,
                                 "is-invalid": this.state.hasEmailError,
                              })}
                              id="signup-email-input"
                              aria-describedby="emailHelp"
                              placeholder=""
                           />
                           {this.state.hasEmailError && (
                              <small className="text-danger mb-4">
                                 {this.state.emailError}
                              </small>
                           )}
                           <div className="mb-2"></div>
                           <label htmlFor="signup-password-input">
                              Create a Password
                              <br />
                              <span className="text-muted">
                                 Must be at least 9 characters
                              </span>
                           </label>
                           <input
                              type="password"
                              className={classnames({
                                 "mb-2": true,
                                 "form-control": true,
                                 "is-invalid": this.state.hasPasswordError,
                              })}
                              id="signup-password-input"
                              placeholder=""
                           />
                           {this.state.hasPasswordError && (
                              <small className="text-danger">
                                 {this.state.passwordError}
                              </small>
                           )}
                           <div className="mb-2"></div>

                           <button
                              className="btn btn-success btn-block mt-6"
                              id="letsgo-button-landing"
                              onClick={() => {
                                 this.validateAndCreateUser();
                              }}
                           >
                              Let's go
                           </button>
                        </>
                     )}
                     {!this.state.isDisplayingInputs && (
                        <button
                           className="btn btn-block btn-success"
                           onClick={() => {
                              this.showInputs();
                           }}
                        >
                           Sign Up
                        </button>
                     )}
                  </div>
               </div>
            </div>
            <div className="row">
               <div className=" col-12 landing-text mt-6">
                  <p>
                     {" "}
                     A flashcard app that uses the latest in scientific research
                     on memory.
                  </p>
               </div>

               <div className=" col-12 landing-text mt-4">
                  <p>
                     {" "}
                     White Bear uses a custom "spaced repetition" algorithm to
                     test you on cards before you forget them.
                  </p>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(SignUp));
