import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PayloadActionCreator, EmptyActionCreator } from 'typesafe-actions';

const useDispatchActions = <
  T extends PayloadActionCreator<string, any> | EmptyActionCreator<string>
>(
  actionRequest: T,
): ((payload?: Parameters<T>[0]) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (payload) => {
      dispatch(actionRequest(payload));
    },
    [dispatch],
  );
};

export default useDispatchActions;
