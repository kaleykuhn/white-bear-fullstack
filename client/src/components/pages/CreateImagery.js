import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { MAX_CARD_CHARS, checkIsOver } from "../../utils/helpers";
import classnames from "classnames";
////import memoryCards from "../../mock-data/memory-cards";
//const memoryCard = memoryCards[5];

class CreateImagery extends React.Component {
   constructor(props) {
      super(props); //
      this.state = {
         imageryText: "",
      };
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }
   checkImageryHasInvalidCharCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   updateCreatableCard() {
      console.log("UPDATING CREATABLE CARD");
      const {
         id,
         answer,
         userId,
         createdAt,
         nextAttemptAt,
         lastAttemptAt,
         totalSuccessfulAttempts,
         level,
      } = this.props.creatableCard;
      this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: {
            // the card itself
            id,
            answer,
            imagery: this.state.imageryText,
            userId,
            createdAt,
            nextAttemptAt, //
            lastAttemptAt,
            totalSuccessfulAttempts,
            level,
         },
      });
      // save to the database (make an API call)
      // go to create-answer
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">
               Add memorable imagery
            </h4>

            <div className="card" id="cardInput">
               <div className="card-body bg-primary">
                  <textarea
                     rows="4"
                     cols="30"
                     autoFocus={true}
                     onChange={(e) => this.setImageryText(e)}
                  ></textarea>
               </div>
            </div>

            <div className="card " id="cardText">
               <div className="card-body bg-secondary">
                  {this.props.creatableCard.answer}
                  {/* {memoryCard.imagery} */}
               </div>
            </div>

            <p className="float-right mb-5 mt-2 text-muted">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.imageryText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.imageryText.length}/{MAX_CARD_CHARS}
               </span>
            </p>

            <div className="clearfix "></div>

            <Link
               to="/create-answer"
               className="btn btn-link"
               id="create-error"
            >
               Back to answer
            </Link>

            <button
               className={classnames("btn btn-primary float-right btn-lg", {
                  disabled: this.checkImageryHasInvalidCharCount(),
               })}
               onClick={() => {
                  this.updateCreatableCard();
               }}
            >
               <img
                  src={saveIcon}
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "4px" }}
                  alt=""
               />
               Save
            </button>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return { creatableCard: state.creatableCard };
}
export default connect(mapStateToProps)(CreateImagery);
