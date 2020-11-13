import React from "react";
import AppTemplate from "../ui/AppTemplate";
import Save from "../../icons/save.svg";
import { Link } from "react-router-dom";
import memoryCards from "../../mock-data/memory-cards";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers"; //
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import actions from "../../store/actions";

const memoryCard = memoryCards[2];

class Edit extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         answerText: memoryCard.answer,
         imageryText: memoryCard.imagery,
         isShowDeleteChecked: false,
         isDeleteButtonDisplayed: false,
      };
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
      console.log(e.target, e.target.value);
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
      console.log(e.target, e.target.value);
   }

   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0 ||
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }
   toggleAndShowDeleteButton(e) {
      this.setState({
         isShowDeleteChecked: e.target.checked,
         isDeleteButtonDisplayed: !this.state.isDeleteButtonDisplayed,
      });
   }

   deleteCard() {
      //TODO: delete from database
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }
   deleteCardFromStore() {
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);
      this.props.dispatch({
         type: actions.UPDATE_QUEUED_CARDS,
         payload: filteredCards,
      });
      if (filteredCards[this.props.queue.index] === undefined) {
         this.props.history.push("/review-empty");
      } else {
         this.props.history.push("/review-imagery");
      }
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">Edit Cards</h4>

            {/* if stuff on card in there then display it otherwise don't dispay card*/}
            {isEmpty(this.props.editableCard) === false && (
               <>
                  <div className="mb-2">
                     <div className="card bg-primary">
                        <div className="card-body">
                           <textarea
                              rows="4"
                              defaultValue={
                                 this.props.editableCard.card.imagery
                              }
                              onChange={(e) => this.setImageryText(e)}
                           ></textarea>
                        </div>
                     </div>

                     <div className="card bg-secondary">
                        <div className="card-body">
                           <textarea
                              rows="4"
                              defaultValue={this.props.editableCard.card.answer}
                              onChange={(e) => this.setAnswerText(e)}
                           ></textarea>
                        </div>
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
                        Top: {this.state.imageryText.length}/{MAX_CARD_CHARS}
                     </span>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.answerText,
                              MAX_CARD_CHARS
                           ),
                        })}
                     >
                        Bottom: {this.state.answerText.length}/{MAX_CARD_CHARS}
                     </span>
                  </p>
                  <div className="clearfix"></div>
                  <Link
                     to={this.props.editableCard.prevRoute}
                     type="button"
                     className="btn btn-link"
                     id="create-error"
                  >
                     Discard changes
                  </Link>
                  <Link
                     to={this.props.editableCard.prevRoute}
                     className={classnames(
                        "btn btn-primary float-right btn-lg  ",
                        {
                           disabled: this.checkHasInvalidCharCount(),
                        }
                     )}
                     id="save-imagery"
                  >
                     <img
                        src={Save}
                        width="20px"
                        style={{ marginBottom: "3px" }}
                        className="mr-2"
                        alt=""
                     />
                     Save
                  </Link>
                  <h4 className="my-8 text-center text-muted">
                     Card Properties
                  </h4>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Created on:</h6>
                     </div>
                     <div className="col-4 ml-6 d-flex">
                        <h6>
                           {toDisplayDate(
                              this.props.editableCard.card.createdAt,
                              "MMM.d,y"
                           )}
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Last attempt:</h6>
                     </div>
                     <div className="col-4 d-flex ml-6">
                        <h6 className="">
                           {toDisplayDate(
                              this.props.editableCard.card.lastAttemptAt,
                              "MMM.d,y"
                           )}
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Next attempt:</h6>
                     </div>
                     <div className="col-4 ml-6 d-flex">
                        <h6 className="">
                           {toDisplayDate(
                              this.props.editableCard.card.createdAt,
                              "MMM.d,y"
                           )}
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-4 d-flex">
                        <h6 className="text-muted">Consecutives:</h6>
                     </div>
                     <div className="col-4 ml-6 d-flex">
                        <h6 className="">
                           {
                              this.props.editableCard.card
                                 .totalSuccessfulAttempts
                           }
                        </h6>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-6 mt-2">
                        <div className="custom-control custom-checkbox">
                           <input
                              type="checkbox"
                              className="custom-control-input"
                              id="show-delete"
                              checked={this.state.isShowDeleteChecked}
                              onChange={(e) => {
                                 this.toggleAndShowDeleteButton(e);
                              }}
                           />
                           <label
                              className="custom-control-label"
                              htmlFor="show-delete"
                           >
                              Show delete button
                           </label>
                        </div>
                     </div>
                  </div>
                  {this.state.isDeleteButtonDisplayed && (
                     <button
                        type="button"
                        className=" btn btn-lg btn-outline-danger my-4"
                        id="delete-button"
                        onClick={() => {
                           this.deleteCard();
                        }}
                     >
                        Delete this card
                     </button>
                  )}
               </>
            )}

            <div className="mb-8"></div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   // redux store is state global
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(Edit);
