import {
  graphql,
  formatPageQuery,
  formatPageQueryWithCount,
  formatMutation,
} from '@stssocialst-stp/fe-core';
import { ACTION_TYPE } from './reducer';
import {
  ERROR, REQUEST, SUCCESS,
} from './util/action-type';

const OPENSEARCH_DASHBOARDS_FULL_PROJECTION = () => [
  'id',
  'uuid',
  'name',
  'synchDisabled',
  'url',
  'isDeleted',
  'dateCreated',
  'dateUpdated',
  'version',
  'dateValidFrom',
  'dateValidTo',
  'jsonExt',
];

export function fetchOpenSearchDashboards(params) {
  const payload = formatPageQueryWithCount('opensearchDashboard', params, OPENSEARCH_DASHBOARDS_FULL_PROJECTION());
  return graphql(payload, ACTION_TYPE.SEARCH_OPENSEARCH_DASHBOARDS);
}

export function fetchOpenSearchDashboard(params) {
  const payload = formatPageQuery('opensearchDashboard', params, OPENSEARCH_DASHBOARDS_FULL_PROJECTION());
  return graphql(payload, ACTION_TYPE.GET_OPENSEARCH_DASHBOARD);
}

function formatOpenSearchDashboardGQL(openSearchDashboard) {
  return `
      ${openSearchDashboard.id ? `id: "${openSearchDashboard.id}"` : ''}
      ${`synchDisabled: ${openSearchDashboard.synchDisabled}`}
      ${openSearchDashboard?.name ? `name: "${openSearchDashboard.name}"` : ''}
      ${openSearchDashboard?.url ? `url: "${openSearchDashboard.url}"` : ''}`;
}

export function updateOpenSearchDashboard(dashboard, clientMutationLabel) {
  const mutation = formatMutation('updateDashboard', formatOpenSearchDashboardGQL(dashboard), clientMutationLabel);
  const requestedDateTime = new Date();
  return graphql(
    mutation.payload,
    [REQUEST(ACTION_TYPE.MUTATION), SUCCESS(ACTION_TYPE.UPDATE_OPENSEARCH_DASHBOARD), ERROR(ACTION_TYPE.MUTATION)],
    {
      actionType: ACTION_TYPE.UPDATE_OPENSEARCH_DASHBOARD,
      clientMutationId: mutation.clientMutationId,
      clientMutationLabel,
      requestedDateTime,
    },
  );
}
