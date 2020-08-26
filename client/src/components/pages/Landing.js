import React from "react";
import logolanding from "../../img/logo-landing.png";
import Login from "../ui/LogIn";
import SignUp from "../ui/SignUp";
export default function Landing() {
   return (
      <div className="landing-background">
         <div className="container landing">
            <div className="row">
               <div className="col-12 mt-xl-7 mt-lg-5">
                  <img
                     className="float-left mr-6 mt-2 bear logo img-fluid"
                     src={logolanding}
                     alt="white bear outline constelation shape walking left"
                  />

                  <h1 className="mt-2 mt-sm-0 mt-lg-2 d-inline-flex bear-text">
                     White Bear
                  </h1>
               </div>
            </div>
            <div className="row mt-md-6 mt-xl-8 mt-4">
               <div className="col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-12">
                  <div className="row">
                     <SignUp />
                     <Login />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
