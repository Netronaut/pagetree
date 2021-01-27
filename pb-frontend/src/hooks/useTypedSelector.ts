import { createSelectorHook } from 'react-redux';
import { RootState } from 'src/redux/store';

export const useTypedSelector = createSelectorHook<RootState>();
