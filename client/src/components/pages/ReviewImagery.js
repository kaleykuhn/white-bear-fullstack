import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";

import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewImagery extends React.Component {
   constructor(props) {
      super(props);
      console.log("Empty Array of queue cards!");
      if (props.queue.cards.length === 0) {
         axios
            .get(`/api/v1/queue?order=memory_cards.created_at%20DESC`)
            .then((res) => {
               // handle success
               const cards = res.data;
               console.log(res);
               props.dispatch({
                  type: actions.UPDATE_QUEUED_CARDS,
                  payload: cards,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
      }
      if (props.queue.index > this.props.queue.cards.length) {
         this.props.history.push("/review-empty");
      }
   }

   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      console.log({ memoryCard });
      return (
         <AppTemplate>
            <div className="mt-5"></div>
            <div className="mb-5">
               <div className="card bg-primary">
                  <div className="card-body">
                     {memoryCard && memoryCard.imagery}
                  </div>
               </div>
            </div>

            {this.props.queue.index > 0 && (
               <button
                  className="btn btn-link"
                  onClick={() => {
                     this.goToPrevCard();
                  }}
               >
                  Previous card
               </button>
            )}

            <div className="float-right">
               <Link
                  to="/review-answer"
                  type="button"
                  className="btn btn-outline-primary mr-0"
               >
                  Show Answer
               </Link>
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
export default connect(mapStateToProps)(ReviewImagery);
