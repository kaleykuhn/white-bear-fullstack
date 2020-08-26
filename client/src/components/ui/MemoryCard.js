import React from "react";
import { Link } from "react-router-dom";
import Edit from "../../icons/edit.svg";
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: this.props.card,
            prevRoute: "/all-cards",
         },
      });
   }

   render() {
      return (
         <div className="row">
            <div className="col-9 mb-5">
               <div className="card bg-primary">
                  <div className="card-body">{this.props.card.imagery}</div>
               </div>

               <div className="card bg-secondary">
                  <div className="card-body">{this.props.card.answer}</div>
               </div>
            </div>
            <div className="col-3">
               <Link
                  to="/edit"
                  className="btn btn-link d-inline"
                  onClick={() => {
                     this.storeEditableCard();
                  }}
               >
                  <img
                     src={Edit}
                     width="20px;"
                     alt="edit"
                     style={{ marginBottom: "3px" }}
                     className="mr-2"
                  />{" "}
                  Edit
               </Link>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default connect(mapStateToProps)(MemoryCard);
