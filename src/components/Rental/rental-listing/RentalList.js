import React from 'react';
import RentalCards from './Rentalcards';

export default class RentalList extends React.Component {
  renderCards = cards => {
    return this.props.rentals.map((rental, index) => {
      console.log(rental);
      return (
        <RentalCards
          key={index}
          //   name={rental.title}
          //   city={rental.city}
          //   shared={rental.shared}
          //   image={rental.image}
          rental={rental}
        />
      );
    });
  };

  render() {
    return <div className="row">{this.renderCards()}</div>;
  }
}

/////////////////////////////for future reference//////////////////

// import React from 'react';
// import RentalCards from './Rentalcards';
// import { connect } from 'react-redux';
// import * as actions from '../../../actions';

// class RentalList extends React.Component {
//   //   constructor(props) {
//   //     super(); //this will initialize our component because we are extending from React.Component super is necessary when we want to access state or props inside of a constructor
//   //     this.state = {};
//   //   }

//   renderCards = cards => {
//     return this.props.rentals.map((rental, index) => {
//       console.log(rental);
//       return (
//         <RentalCards
//           key={index}
//           //   name={rental.title}
//           //   city={rental.city}
//           //   shared={rental.shared}
//           //   image={rental.image}
//           rental={rental}
//         />
//       );
//     });
//   };

//   //   renderCardsOnClicking = () => {
//   //     const rentals = this.state.rentals;
//   //     rentals.push(1);
//   //     this.setState({
//   //       rentals
//   //     });
//   //   };

//   componentWillMount() {
//     this.props.dispatch(actions.fetchRentals());
//   }

//   render() {
//     return (
//       <section id="rentalListing">
//         <h1 className="page-title">Your Home All Around the World</h1>
//         <div className="row">{this.renderCards()}</div>
//       </section>
//     );
//   }
// }

// function any(state) {
//   return {
//     rentals: state.rentals.data
//   };
// }
// export default connect(any)(RentalList); //conect returns a function
