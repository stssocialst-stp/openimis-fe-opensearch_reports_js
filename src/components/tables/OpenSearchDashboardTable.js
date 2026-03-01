import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  TableContainer, TableHead, TableBody, Table,
  TableCell, TableRow, Paper, Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useModulesManager, ProgressOrError, useTranslations } from '@stssocialst-stp/fe-core';
import { MODULE_NAME } from '../../constants';
import { fetchOpenSearchDashboards } from '../../actions';
import OpenSearchDashboardEditDialog from '../dialogs/OpenSearchDashboardEditDialog';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginInline: 16,
    marginBlock: 12,
  },
  headerTitle: theme.table.title,
  actionCell: {
    width: 60,
  },
  header: theme.table.header,
}));

const DEDUPLICATION_SUMMARY_HEADERS = [
  'dashboard.name',
  'dashboard.url',
  'dashboard.synchDisabled',
];

function OpenSearchDashboardTable() {
  const dispatch = useDispatch();
  const modulesManager = useModulesManager();
  const classes = useStyles();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);
  const {
    fetchingDashboards, dashboards, errorDashboards,
  } = useSelector((store) => store.openSearchReports);

  const currentHostname = window.location.hostname;
  const openSearchBaseRootPath = process.env.OPENSEARCH_PROXY_ROOT ?? 'opensearch';

  useEffect(() => {
    dispatch(fetchOpenSearchDashboards({}));
  }, []);

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    dispatch(fetchOpenSearchDashboards({}));
    setIsUpdated(false);
  }, [isUpdated]);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead className={classes.header}>
          <TableRow className={classes.headerTitle}>
            {DEDUPLICATION_SUMMARY_HEADERS.map((header) => (
              <TableCell key={header}>
                {' '}
                {formatMessage(header)}
                {' '}
              </TableCell>
            ))}
            <TableCell key="dashboard.edit">
              {' '}
              {formatMessage('dashboard.edit')}
              {' '}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <ProgressOrError progress={fetchingDashboards} error={errorDashboards} />
          {dashboards?.map((dashboard) => (
            <TableRow key={dashboard?.name}>
              <TableCell>
                {' '}
                {dashboard?.name}
                {' '}
              </TableCell>
              <TableCell>
                {' '}
                {`https://${currentHostname}/${openSearchBaseRootPath}/${dashboard?.url}`}
                {' '}
              </TableCell>
              <TableCell>
                {' '}
                {`${dashboard?.synchDisabled}`}
                {' '}
              </TableCell>
              <TableCell>
                {' '}
                <Tooltip title={formatMessage('editButtonTooltip')}>
                  <OpenSearchDashboardEditDialog
                    dashboard={dashboard}
                    setIsUpdated={setIsUpdated}
                  />
                </Tooltip>
                {' '}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OpenSearchDashboardTable;
