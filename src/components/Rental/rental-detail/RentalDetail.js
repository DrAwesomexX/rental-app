import React from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import RentalAssets from './RentalAssets';
import RentalDetailInfo from './ReactDetailInfo';

import RentalMap from './RentalMap';

class RentalDetail extends React.Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalDetails(rentalId));
  }
  render() {
    const rental = this.props.rental;

    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <RentalMap location={`${rental.city},${rental.street}`} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <RentalDetailInfo rental={rental} />
              </div>
              <div className="col-md-4"> BOOKING</div>
            </div>
          </div>
        </section>
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
