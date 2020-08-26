import React from "react";
////
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";

import orderBy from "lodash/orderBy";
import axios from "axios";

export default class Allcards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: '[["createdAt"],["desc"]]',
         displayedMemoryCards: [],
         allMemoryCards: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/kaleykuhn/white---bearmpa/master/src/mock-data/memory-cards.json"
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               displayedMemoryCards: orderBy(
                  memoryCards,
                  ["createdAt"],
                  ["desc"]
               ),
               allMemoryCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   // set order of filter//
   filterByInput() {
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      console.log(lowerCasedInput);
      const copyOfAllMemoryCards = [...this.state.allMemoryCards];

      const filteredMemoryCards = copyOfAllMemoryCards.filter((memoryCard) => {
         const lowerCasedImagery = memoryCard.imagery.toLowerCase();
         const lowerCasedAnswer = memoryCard.answer.toLowerCase();
         if (
            lowerCasedImagery.includes(lowerCasedInput) ||
            lowerCasedAnswer.includes(lowerCasedInput)
         ) {
            return true;
         }
         return false;
      });
      this.setState({ displayedMemoryCards: filteredMemoryCards }, () => {
         this.setMemoryCards();
      });
   }
   //set the change order
   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder); //"['totalSuccesfuleAttempts','createdAt'], ['desc', 'desc']" //
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   //set state of memory cards
   setMemoryCards() {
      console.log("setting memory cards");
      const copyofDisplayedMemoryCards = [...this.state.displayedMemoryCards];
      const toJson = JSON.parse(this.state.order);
      console.log(...toJson);
      const orderedMemoryCards = orderBy(copyofDisplayedMemoryCards, ...toJson);
      console.log(orderedMemoryCards);
      this.setState({ displayedMemoryCards: orderedMemoryCards });
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
                     onClick={() => this.filterByInput()}
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
                     <option value='[["createdAt"], ["desc"]]'>
                        Most Recent
                     </option>
                     <option value='[["createdAt"], ["asc"]]'>Oldest</option>
                     <option value='[["totalSuccessfulAttempts","createdAt"],["asc", "asc"]]'>
                        Hardest
                     </option>
                     <option value='[["totalSuccesfuleAttempts","createdAt"], ["desc", "desc"]]'>
                        Easiest
                     </option>
                  </select>
               </div>
            </div>
            {this.state.displayedMemoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
