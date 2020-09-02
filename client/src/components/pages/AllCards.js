import React from "react";

import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";

import axios from "axios";
const userId = "d4c58c04-969e-47fc-a655-82c666564645";

export default class Allcards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: "memory_cards.created_at%20DESC",
         memoryCards: [],
         searchTerm: "",
      };
   }

   componentDidMount() {
      this.setMemoryCards();
   }

   //set the change order
   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder);
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }
   setSearchTerm() {
      const searchInput = document.getElementById("search-input");
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }
   //set state of memory cards
   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            console.log(res.data);
            this.setState({
               memoryCards: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   // setMemoryCardsOrder(e) {
   //    console.log("new change made");
   //    const newOrder = e.target.value;
   //    console.log(newOrder); //"['totalSuccesfuleAttempts','createdAt'], ['desc', 'desc']" //
   //    const copyofMemoryCards = [...this.state.memoryCards];
   //    const toJson = JSON.parse(newOrder);
   //    console.log(...toJson);
   //    const orderedMemoryCards = orderBy(copyofMemoryCards, ...toJson);

   //    this.setState({ order: newOrder, memoryCards: orderedMemoryCards });
   // }

   render() {
      return (
         <AppTemplate>
            <div className="mb-5"></div>
            <div className="row">
               <div className="col-8 col-sm-8 mb-4">
                  <input
                     type="search"
                     className="form-control border ml-4"
                     placeholder="Search for a word"
                     id="search-input"
                  />
               </div>
               <div className="col-4 col-sm-4 mt-1 ">
                  <button
                     className="btn btn-primary btn-block btn-sm "
                     onClick={() => this.setSearchTerm()}
                  >
                     search
                  </button>
               </div>
            </div>
            <div className="row">
               <div className="col-4 col-sm-4 mb-4">
                  <p className="text-brand text-muted ml-4">Sort by cards</p>
               </div>
               <div className="form-group col-8 col-sm-8 mb-6 mt-0 col-auto">
                  <select
                     value={this.state.order}
                     className="form-control form-control-sm border rounded-sm"
                     onChange={(e) => this.setOrder(e)}
                  >
                     <option value="memory_cards.created_at%20DESC">
                        Most Recent
                     </option>
                     <option value="memory_cards.created_at%20ASC">
                        Oldest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                        Hardest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
                        Easiest
                     </option>
                  </select>
               </div>
            </div>
            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
