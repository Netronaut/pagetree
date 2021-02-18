import { ActionType, createReducer } from 'typesafe-actions';
import actions from './actions';
import { TPages } from 'types';

export type State = TPages;

type Action = ActionType<typeof actions>;

const pages = createReducer<State, Action>([])
  .handleAction(actions.createPage.success, (state, { payload }) =>
    state.concat([payload]),
  )
  .handleAction(actions.getPages.success, (_, { payload }) => payload)
  .handleAction(actions.deletePage.success, (state, { payload }) =>
    state.filter(({ _id }) => _id !== payload),
  )
  .handleAction(actions.changePage.success, (state, { payload }) =>
    state.map((p) => {
      if (payload._id === p._id) {
        return payload;
      }
      return p;
    }),
  );

export default pages;
