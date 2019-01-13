import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RentalList from './RentalList';

class RentalListing extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList rentals={this.props.rentals} />
      </section>
    );
  }
}

function any(state) {
  return {
    rentals: state.rentals.data
  };
}
export default connect(any)(RentalListing); //conect returns a function

/////////////////////for future reference///////////////////////////////////

// import React from 'react';
// import RentalCards from './Rentalcards';
// import { connect } from 'react-redux';
// import * as actions from '../../../actions';

////--------composition-----------

// class AlertListing extends React.Component {
//   alertUser() {
//     alert('HI!!!!');
//   }
//   render() {
//     return <RentalListing {...this.props} alertUser={this.alertUser} />;
//   }
// }

//------------Higher Order Component-------------
// function withAlert(WrappedComponent) {
//   return class extends React.Component {
//     alertUser() {
//       alert('HI');
//     }
//     render() {
//       return <WrappedComponent {...this.props} alertUser={this.alertUser} />;
//     }
//   };
// }
// function withDanger(WrappedComponent) {
//   return class extends React.Component {
//     danger() {
//       alert('You are awesome');
//     }
//     render() {
//       return <WrappedComponent {...this.props} danger={this.danger} />;
//     }
//   };
// }

// class RentalListing extends React.Component {
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
// export default connect(any)(RentalListing); //conect returns a function
