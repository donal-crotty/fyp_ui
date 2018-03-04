import { combineReducers } from 'redux';
import { CloseModal, OpenModal, CustomizeChart } from '../actions/const';
import { LocationInitialState } from './const';

const ModalInitialState = {
  showModal: false,
};

function ModalReducer(state = ModalInitialState, action) {
  switch (action.type) {
    case OpenModal:
      return { ...state, showModal: true };
    case CloseModal:
      return ModalInitialState;
    default:
      return state;
  }
}

function LocationStateReducer(state = LocationInitialState, action) {
  switch (action.type) {
    case Location:
      return { ...LocationInitialState, ...action.obj };
    default:
      return state;
  }
}

const reducers = {
  ModalState: ModalReducer,
  LocationState: LocationStateReducer,
};

export default combineReducers(reducers);
