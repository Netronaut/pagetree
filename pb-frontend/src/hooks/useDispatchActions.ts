import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PayloadActionCreator, EmptyActionCreator } from 'typesafe-actions';

export const useDispatchActions = <
  T extends
    | PayloadActionCreator<string, Parameters<T>[0]>
    | EmptyActionCreator<string>
>(
  actionRequest: T,
): ((
  ...payload: T extends EmptyActionCreator<string>
    ? [undefined?]
    : [Parameters<T>[0]]
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (payload?) => {
      dispatch(actionRequest(payload));
    },
    [dispatch, actionRequest],
  );
};
