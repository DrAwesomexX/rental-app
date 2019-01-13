import axios from 'axios';
import {
  FETCH_RENTALS_DETAILS_SUCCESS,
  FETCH_RENTALS_DETAILS_INIT,
  FETCH_RENTALS_SUCCESS
} from './types';

const fetchRentelByIdInit = () => {
  return {
    type: FETCH_RENTALS_DETAILS_INIT
  };
};

const fetchRentelByIdSuccess = rental => {
  debugger;
  return {
    type: FETCH_RENTALS_DETAILS_SUCCESS,
    rental
  };
};

const fetchRentalSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  };
};

export const fetchRentals = () => {
  return dispatch => {
    // axios.get('http://localhost:3000/api/v1/rentals').then(rentals => {
    //   dispatch(fetchRentalSuccess(rentals.data));
    // });

    /////////-------------another way--------------
    axios
      .get('http://localhost:3000/api/v1/rentals')
      .then(res => {
        return res.data;
      })
      .then(rentals => {
        return dispatch(fetchRentalSuccess(rentals));
      });
  };
};

export const fetchRentalDetails = rentalId => {
  return function(dispatch) {
    dispatch(fetchRentelByIdInit());
    //simulate server call

    // axios
    //   .get(`http://localhost:3000/api/v1/rentals/${rentalId}`)
    //   .then(rental => {
    //     debugger;
    //     dispatch(fetchRentelByIdSuccess(rental.data));
    //   });

    //----------another way----------
    axios
      .get(`http://localhost:3000/api/v1/rentals/${rentalId}`)
      .then(res => {
        return res.data;
      })
      .then(rental => {
        return dispatch(fetchRentelByIdSuccess(rental));
      });
  };
};

///////////////////////////for future reference//////////////////////////////

// import {
//   FETCH_RENTALS,
//   FETCH_RENTALS_DETAILS_SUCCESS,
//   FETCH_RENTALS_DETAILS_INIT
// } from './types';

// const rentals = [
//   {
//     id: '1',
//     title: 'Central Apartment',
//     city: 'New York',
//     street: 'Times Sqaure',
//     category: 'apartment',
//     image: 'http://via.placeholder.com/350x250',
//     bedrooms: 3,
//     description: 'Very nice apartment',
//     dailyRate: 34,
//     shared: false,
//     createdAt: '24/12/2017'
//   },
//   {
//     id: '2',
//     title: 'Central Apartment 2',
//     city: 'San Francisco',
//     street: 'Main street',
//     category: 'condo',
//     image: 'http://via.placeholder.com/350x250',
//     bedrooms: 2,
//     description: 'Very nice apartment',
//     dailyRate: 12,
//     shared: true,
//     createdAt: '24/12/2017'
//   },
//   {
//     id: '3',
//     title: 'Central Apartment 3',
//     city: 'Bratislava',
//     street: 'Hlavna',
//     category: 'condo',
//     image: 'http://via.placeholder.com/350x250',
//     bedrooms: 2,
//     description: 'Very nice apartment',
//     dailyRate: 334,
//     shared: true,
//     createdAt: '24/12/2017'
//   },
//   {
//     id: '4',
//     title: 'Central Apartment 4',
//     city: 'Berlin',
//     street: 'Haupt strasse',
//     category: 'house',
//     image: 'http://via.placeholder.com/350x250',
//     bedrooms: 9,
//     description: 'Very nice apartment',
//     dailyRate: 33,
//     shared: true,
//     createdAt: '24/12/2017'
//   }
// ];

// const fetchRentelByIdInit = () => {
//   return {
//     type: FETCH_RENTALS_DETAILS_INIT
//   };
// };

// const fetchRentelByIdSuccess = rental => {
//   return {
//     type: FETCH_RENTALS_DETAILS_SUCCESS,
//     rental
//   };
// };

// export const fetchRentals = () => {
//   return {
//     type: FETCH_RENTALS,
//     rentals
//   };
// };

// export const fetchRentalDetails = rentalId => {
//   return function(dispatch) {
//     dispatch(fetchRentelByIdInit());
//     setTimeout(() => {
//       const rental = rentals.find(rental => rental.id === rentalId);
//       dispatch(fetchRentelByIdSuccess(rental));
//     }, 1000);
//   };
// };
