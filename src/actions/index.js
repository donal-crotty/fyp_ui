import { CloseModal, OpenModal, SetState, CustomizeChart, Location } from './const';

export const CloseModalAction = () => ({ type: CloseModal });
export const OpenModalAction = () => ({ type: OpenModal });
export const SetStateAction = state => ({ type: SetState, state });
export const CustomizeChartAction = obj => ({ type: CustomizeChart, obj });
export const LocationAction = obj => ({ type: Location, obj });
