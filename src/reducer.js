// Disabled due to consistency with other modules
/* eslint-disable default-param-last */

import {
  decodeId,
  dispatchMutationErr,
  dispatchMutationReq,
  dispatchMutationResp,
  formatGraphQLError,
  pageInfo,
  parseData,
  formatServerError,
} from '@stssocialst-stp/fe-core';
import {
  ERROR, REQUEST, SUCCESS,
} from './util/action-type';

export const ACTION_TYPE = {
  MUTATION: 'OPENSEARCH_DASHBOARD_MUTATION',
  SEARCH_OPENSEARCH_DASHBOARDS: 'OPENSEARCH_DASHBOARD_OPENSEARCH_DASHBOARDS',
  GET_OPENSEARCH_DASHBOARD: 'OPENSEARCH_DASHBOARD_OPENSEARCH_DASHBOARD',
  UPDATE_OPENSEARCH_DASHBOARD: 'OPENSEARCH_DASHBOARD_UPDATE_OPENSEARCH_DASHBOARD',
};

function reducer(
  state = {
    submittingMutation: false,
    mutation: {},
    fetchingDashboards: false,
    errorDashboards: null,
    fetchedDashboards: false,
    dashboards: [],
    dashboardsPageInfo: {},
    dashboardsTotalCount: 0,
    fetchingDashboard: false,
    errorDashboard: null,
    fetchedDashboard: false,
    dashboard: null,
  },
  action,
) {
  switch (action.type) {
    case REQUEST(ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS):
      return {
        ...state,
        fetchingDashboards: true,
        fetchedDashboards: false,
        dashboards: [],
        dashboardsPageInfo: {},
        dashboardsTotalCount: 0,
        errorDashboards: null,
      };
    case REQUEST(ACTION_TYPE.GET_OPENSEARCH_DASHBOARD):
      return {
        ...state,
        fetchingDashboard: true,
        fetchedDashboard: false,
        dashboard: null,
      };
    case SUCCESS(ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS):
      return {
        ...state,
        fetchingDashboards: false,
        fetchedDashboards: true,
        dashboards: parseData(action.payload.data.opensearchDashboard)?.map((dashboard) => ({
          ...dashboard,
          id: decodeId(dashboard.id),
        })),
        dashboardsPageInfo: pageInfo(action.payload.data.opensearchDashboard),
        dashboardsTotalCount: action.payload.data.opensearchDashboard
          ? action.payload.data.opensearchDashboard.totalCount : null,
        errorDashboards: formatGraphQLError(action.payload),
      };
    case SUCCESS(ACTION_TYPE.GET_OPENSEARCH_DASHBOARD):
      return {
        ...state,
        fetchingDashboard: false,
        fetchedDashboard: true,
        dashboard: parseData(action.payload.data.opensearchDashboard)?.map((dashboard) => ({
          ...dashboard,
          id: decodeId(dashboard.id),
        }))?.[0],
        errorDashboard: null,
      };
    case ERROR(ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS):
      return {
        ...state,
        fetchingDashboards: false,
        errorDashboards: formatGraphQLError(action.payload),
      };
    case ERROR(ACTION_TYPE.GET_OPENSEARCH_DASHBOARD):
      return {
        ...state,
        fetchingDashboard: false,
        errorDashboard: formatServerError(action.payload),
      };
    case REQUEST(ACTION_TYPE.MUTATION):
      return dispatchMutationReq(state, action);
    case ERROR(ACTION_TYPE.MUTATION):
      return dispatchMutationErr(state, action);
    case SUCCESS(ACTION_TYPE.UPDATE_OPENSEARCH_DASHBOARD):
      return dispatchMutationResp(state, 'updateDashboard', action);
    default:
      return state;
  }
}

export default reducer;
