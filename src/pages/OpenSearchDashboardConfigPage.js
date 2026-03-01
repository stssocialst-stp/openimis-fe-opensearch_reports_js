import React from 'react';
import { Helmet, withModulesManager, formatMessage } from '@stssocialst-stp/fe-core';
import { injectIntl } from 'react-intl';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OpenSearchDashboardTable from '../components/tables/OpenSearchDashboardTable';

const styles = (theme) => ({
  page: theme.page,
  fab: theme.fab,
});

function OpenSearchDashboardConfigPage(props) {
  const { intl, classes } = props;
  return (
    <div className={classes.page}>
      <Helmet title={formatMessage(intl, 'openSearch', 'openSearchConfig')} />
      <OpenSearchDashboardTable />
    </div>
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(
  withModulesManager(withTheme(withStyles(styles)(connect(mapStateToProps)(OpenSearchDashboardConfigPage)))),
);
