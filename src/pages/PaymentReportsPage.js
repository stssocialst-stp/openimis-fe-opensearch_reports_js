import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { Helmet, withModulesManager, formatMessage } from '@stssocialst-stp/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import OpenSearchDashboard from '../components/OpenSearchDashboard';
import { PAYMENT_REPORTS } from '../constants';
import { fetchOpenSearchDashboard } from '../actions';

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function GrievanceReportsPages(props) {
  const { intl, classes } = props;
  const dispatch = useDispatch();
  const {
    dashboard,
  } = useSelector((store) => store.openSearchReports);

  useEffect(() => {
    const params = [`name_Iexact: "${PAYMENT_REPORTS}"`];
    dispatch(fetchOpenSearchDashboard(params));
  }, []);

  return (
    <div className={classes.page}>
      <Helmet title={formatMessage(intl, 'openSearchReports', 'openSearch')} />
      <OpenSearchDashboard
        dashboardUrl={dashboard?.url}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(
  withModulesManager(withTheme(withStyles(styles)(connect(mapStateToProps)(GrievanceReportsPages)))),
);
