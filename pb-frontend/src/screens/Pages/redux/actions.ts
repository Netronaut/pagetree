import getAsyncTypes from 'src/redux/getAsyncTypes';
import { createAsyncAction } from 'typesafe-actions';
import { TBasePage, TPage, TPages } from 'src/types';

export default {
  getPages: createAsyncAction(...getAsyncTypes('GET_PAGES'))<
    [undefined, undefined],
    TPages,
    null
  >(),

  createPage: createAsyncAction(...getAsyncTypes('CREATE_PAGE'))<
    TBasePage,
    TPage,
    null
  >(),

  deletePage: createAsyncAction(...getAsyncTypes('DELETE_PAGE'))<
    string,
    string,
    null
  >(),
};
