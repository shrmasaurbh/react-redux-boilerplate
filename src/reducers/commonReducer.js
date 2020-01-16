import * as types from "../actions/types";

const initialState = {
  loginResponse: {},
  clientSearchResponse: {},
  careGiversResponse: {},
  caregiverSearchResponse: {},
  careManagerSearchResponse: {},
  gaurdianSearchResponse: {},
  physicalTherapistSearchResponse: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        loginResponse: action.payload
      };

    case types.CLIENT_SEARCH_LIST:
      return {
        ...state,
        clientSearchResponse: action.payload
      };

    case types.CAREGIVER_SEARCH_LIST:
      return {
        ...state,
        caregiverSearchResponse: action.payload
      };

    case types.CARE_GIVER_LIST:
      return {
        ...state,
        careGiversResponse: action.payload
      };

    case types.CAREMANAGER_SEARCH_LIST:
      return {
        ...state,
        careManagerSearchResponse: action.payload
      };

    case types.GAURDIAN_SEARCH_LIST:
      return {
        ...state,
        gaurdianSearchResponse: action.payload
      };

    case types.PHYSICAL_THERAPIST_SEARCH_LIST:
      return {
        ...state,
        physicalTherapistSearchResponse: action.payload
      };

    case types.NURSE_SEARCH_LIST:
      return {
        ...state,
        nurseSearchResponse: action.payload
      };

    default:
      return state;
  }
}
