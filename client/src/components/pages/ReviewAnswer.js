import React from "react";
import thumbsUpIcon from "../../icons/thumbs-up.svg";
import { connect } from "react-redux";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import actions from "../../store/actions";

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      if (this.props.queue.cards.length === 0) {
         // if length of array is 0
         this.props.history.push("/review-empty");
      }
   }

   goToNextCard() {
      // if index of current card = length of the array of all cards if we go to end of array
      //Then show out of cards component
      // If the index of queue is equal to cards length out of cards
      // Then reset the queue with dispatch
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         console.log("we are out of cards.");

         this.props.history.push("/review-empty");
      } else {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-imagery");
      }
   }

   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/review-answer",
         },
      });
   }
   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      console.log({ memoryCard });

      return (
         <AppTemplate>
            <div className="mb-5"></div>
            <div className="mb-5">
               <div className="card bg-primary">
                  <div className="card-body">
                     {memoryCard && memoryCard.imagery}
                  </div>
               </div>

               <div className="card bg-secondary">
                  <div className="card-body">
                     {memoryCard && memoryCard.answer}
                  </div>
               </div>
            </div>
            <Link
               to="/edit"
               type="button"
               className="btn btn-link"
               onClick={() => {
                  this.storeEditableCard();
               }}
            >
               Edit
            </Link>
            <div className="float-right">
               <button
                  type="button"
                  className="btn btn-outline-primary mr-4"
                  onClick={() => {
                     this.goToNextCard();
                  }}
               >
                  Needs Work
               </button>

               <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                     this.goToNextCard();
                  }}
               >
                  <img
                     src={thumbsUpIcon}
                     width="20px"
                     style={{ marginBottom: "5px", marginRight: "4px" }}
                     alt=""
                  />
                  Got it
               </button>
            </div>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(ReviewAnswer);
