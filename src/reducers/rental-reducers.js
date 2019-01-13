import {
  FETCH_RENTALS_DETAILS_SUCCESS,
  FETCH_RENTALS_DETAILS_INIT,
  FETCH_RENTALS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  rentals: {
    data: []
  },
  rental: {
    data: {}
  }
};

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS_SUCCESS:
      return { ...state, data: action.rentals };

    default:
      return state;
  }
};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTALS_DETAILS_INIT:
      return { ...state, data: {} };
    case FETCH_RENTALS_DETAILS_SUCCESS:
      debugger;
      // return Object.assign({},state,{data:action.rental})
      return { ...state, data: action.rental };

    default:
      return state;
  }
};

// const proxy = require('http-proxy-middleware');
// module.exports = function(app) {
//   app.use(proxy('/api/v1/*', { target: 'http://localhost:3001/' }));
// };
