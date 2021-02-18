import { createSelectorHook } from 'react-redux';
import { RootState } from '../redux/store';

export const useTypedSelector = createSelectorHook<RootState>();
