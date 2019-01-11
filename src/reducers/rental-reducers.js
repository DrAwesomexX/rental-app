import {
  FETCH_RENTALS,
  FETCH_RENTALS_DETAILS_SUCCESS,
  FETCH_RENTALS_DETAILS_INIT
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
    case FETCH_RENTALS:
      return { ...state, data: action.rentals };

    default:
      return state;
  }
};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTALS_DETAILS_INIT:
      return { ...state, date: {} };
    case FETCH_RENTALS_DETAILS_SUCCESS:
      // return Object.assign({},state,{data:action.rental})
      return { ...state, data: action.rental };

    default:
      return state;
  }
};
