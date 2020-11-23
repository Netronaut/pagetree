import { all } from 'redux-saga/effects';
import actions from './actions';
import * as PagesAPI from '../api';
import makeApiCall from '../../../redux/makeApiCall';

export default function* () {
  yield all([
    makeApiCall(actions.createPage, PagesAPI.createPage),
    makeApiCall(actions.getPages, PagesAPI.getPages),
    makeApiCall(actions.deletePage, PagesAPI.deletePage),
  ]);
}
