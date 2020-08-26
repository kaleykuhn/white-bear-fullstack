import React from "react";
import AppTemplate from "../ui/AppTemplate";

import { connect } from "react-redux";
import actions from "../../store/actions";
class ReviewEmpty extends React.Component {
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      console.log(this.props.dispatch({ type: actions.RESET_QUEUE }));
      this.props.history.push("/review-imagery");
      console.log("clicked");
   }

   render() {
      return (
         <AppTemplate>
            <div className="mb-5"></div>
            <h4 className="my-4 text-center text-muted">Out of Cards</h4>
            {this.props.queue.index > 0 && (
               <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => {
                     this.goToPrevCard();
                  }}
               >
                  Previous card
               </button>
            )}
            <div className="float-right">
               <button
                  className="btn btn-outline-primary mr-0"
                  onClick={() => {
                     this.getMoreCards();
                  }}
               >
                  Get More Cards
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
export default connect(mapStateToProps)(ReviewEmpty);
