import { combineReducers } from 'redux';
import { CloseModal, OpenModal, CustomizeChart } from '../actions/const';
import { ModalSettingsInitialState } from './const';

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

function ModalSettingsReducer(state = ModalSettingsInitialState, action) {
  switch (action.type) {
    case CustomizeChart:
      return { ...ModalSettingsInitialState, ...action.obj };
    default:
      return state;
  }
}

const reducers = {
  ModalState: ModalReducer,
  ModalSettingsState: ModalSettingsReducer,
};

export default combineReducers(reducers);
