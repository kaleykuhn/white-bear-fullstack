import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import { MAX_CARD_CHARS, checkIsOver } from "../../utils/helpers";
import classnames from "classnames";
import memoryCards from "../../mock-data/memory-cards";
const memoryCard = memoryCards[5];

export default class CreateImagery extends React.Component {
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
                  {memoryCard.imagery}
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

            <Link
               to="/create-answer"
               className={classnames("btn btn-primary float-right btn-lg", {
                  disabled: this.checkImageryHasInvalidCharCount(),
               })}
               id="save-imageryButton"
            >
               <img
                  src={saveIcon}
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "4px" }}
                  alt=""
               />
               Save
            </Link>
         </AppTemplate>
      );
   }
}
