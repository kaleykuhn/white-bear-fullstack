import actions from "../actions";

export default function creatableCard(creatableCard = {}, action) {
   //type & payload///
   //action.payload, action.type

   switch (action.type) {
      case actions.UPDATE_CREATABLE_CARD:
         return action.payload; // put it in the redux store
      default:
         return creatableCard;
   }
}
