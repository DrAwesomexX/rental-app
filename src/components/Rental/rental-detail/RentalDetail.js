import React from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';

class RentalDetail extends React.Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalDetails(rentalId));
  }
  render() {
    const rental = this.props.rental;

    if (rental.id) {
      return (
        <div>
          <h1>{rental.title}</h1>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

function mapDetails(state) {
  return {
    rental: state.rental.data
  };
}
export default connect(mapDetails)(RentalDetail);
