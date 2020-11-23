import a from './actions';
import s from './saga';
import r, { State as S } from './reducer';

export const actions = a;
export const saga = s;
export const reducer = r;
export type State = S;
