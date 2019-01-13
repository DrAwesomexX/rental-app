import React from 'react';
import { Link } from 'react-router-dom';
import { toUpperCase, rentalType } from './../../../helper';

const RentalCards = props => {
  const rental = props.rental;
  return (
    <div className="col-md-3 col-xs-6">
      <Link className="rental-card-link" to={`/rentals/${rental._id}`}>
        <div className="card bwm-card">
          <img class="card-img-top" src={rental.image} alt={rental.title} />
          <div className="card-block">
            <h6 className={`card-subtitle ${rental.category}`}>
              {rentalType(rental.shared)} {rental.category} &#183; {rental.city}
            </h6>
            <h4 className="card-title">{rental.title}</h4>
            <p className="card-text">
              {rental.dailyRate} &#183; Free Cancelation
            </p>

            <a href="" class="card-link">
              More Info
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default RentalCards;
