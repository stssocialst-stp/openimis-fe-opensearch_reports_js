/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Tune,
  DoubleArrow,
  Person,
  People,
  Update,
} from '@material-ui/icons';
import PaymentIcon from '@material-ui/icons/Payment';
import ToolIcon from '@material-ui/icons/Build';
import {
  formatMessage,
  MainMenuContribution,
  withModulesManager,
} from '@stssocialst-stp/fe-core';
import { OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY } from '../constants';

function OpenSearchReportsMenu(props) {
  // TO-DO add rights
  const entries = [
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.individualReports'),
      icon: <Person />,
      route: '/individualReports',
      id: 'openSearch.individualReports',
    },
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.groupReports'),
      icon: <People />,
      route: '/groupReports',
      id: 'openSearch.groupReports',
    },
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.beneficiaryReports'),
      icon: <Person />,
      route: '/beneficiaryReports',
      id: 'openSearch.beneficiaryReports',
    },
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.invoiceReports'),
      icon: <DoubleArrow />,
      route: '/invoiceReports',
      id: 'openSearch.invoiceReports',
    },
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.paymentReports'),
      icon: <PaymentIcon />,
      route: '/paymentReports',
      id: 'openSearch.paymentReports',
    },
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.grievanceReports'),
      icon: <Tune />,
      route: '/grievanceReports',
      id: 'openSearch.grievanceReports',
    },
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.dataUpdatesReports'),
      icon: <Update />,
      route: '/dataUpdatesReports',
      id: 'openSearch.dataUpdatesReports',
    },
    {
      text: formatMessage(props.intl, 'openSearchReports', 'openSearch.openSearchConfig'),
      icon: <ToolIcon />,
      route: '/dashboardConfiguration',
      id: 'openSearch.openSearchConfig',
    },
  ];
  entries.push(
    ...props.modulesManager
      .getContribs(OPENSEARCH_REPORTS_MAIN_MENU_CONTRIBUTION_KEY),
  );

  return (
    <MainMenuContribution
      {...props}
      header={formatMessage(props.intl, 'openSearchReports', 'openSearch')}
      entries={entries}
      menuId="OpenSearchReportsMenu"
    />
  );
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(withModulesManager(connect(mapStateToProps)(OpenSearchReportsMenu)));
