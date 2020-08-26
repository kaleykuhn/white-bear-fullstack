import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: "",
      };
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
   }
   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0
      ) {
         return true;
      } else return false;
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="mb-3 text-center text-muted">Add an answer</h4>
            <div className="mb-2">
               <div className="card bg-primary">
                  <div className="card-body">
                     <textarea
                        autoFocus={true}
                        rows="11"
                        id="answerArea"
                        onChange={(e) => this.setAnswerText(e)}
                     ></textarea>
                  </div>
               </div>
            </div>

            <p
               className="float-right mb-5 mt-2 text-muted"
               id="characterCounter"
            >
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.answerText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.answerText.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            <div className="clearfix"></div>
            <Link
               to="/create-imagery"
               type="button"
               className={classnames(
                  "btn btn-outline-primary btn-lg float-right mb-3",
                  {
                     disabled: this.checkHasInvalidCharCount(),
                  }
               )}
               id="nextButton"
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}
