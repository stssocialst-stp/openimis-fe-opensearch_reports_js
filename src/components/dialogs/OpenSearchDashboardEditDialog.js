import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import {
  FormattedMessage,
  TextInput,
  formatMessageWithValues,
} from '@stssocialst-stp/fe-core';
import {
  Grid, IconButton, Switch, FormControlLabel,
} from '@material-ui/core';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { fetchOpenSearchDashboard, updateOpenSearchDashboard } from '../../actions';
import { defaultDialogStyles } from '../../util/styles';

function OpenSearchDashboardEditDialog({
  intl,
  classes,
  dashboard,
  setIsUpdated,
  updateOpenSearchDashboard,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardToEdit, setDashboardToEdit] = useState({
    id: dashboard.id,
    name: dashboard.name,
    url: dashboard.url,
    synchDisabled: dashboard.synchDisabled,
  });

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setDashboardToEdit({
      id: dashboard.id,
      name: dashboard.name,
      url: dashboard.url,
      synchDisabled: dashboard.synchDisabled,
    });
  };

  const handleSave = () => {
    updateOpenSearchDashboard(
      dashboardToEdit,
      formatMessageWithValues(intl, 'openSearchReports', '.create.mutationLabel', {
        name: dashboard?.name,
      }),
    ).then(() => {
      setIsUpdated(true);
    });
    handleClose();
  };

  const onAttributeChange = (attribute) => (value) => setDashboardToEdit({
    ...dashboardToEdit,
    [attribute]: value,
  });

  const canSave = !!dashboardToEdit?.url;

  return (
    <>
      <IconButton
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 900,
            maxWidth: 900,
          },
        }}
      >
        <DialogTitle>
          {formatMessageWithValues(intl, 'openSearchReports', 'dialog.title', { dashboardName: dashboard.name })}
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" className={classes.item}>
            <Grid item className={classes.item}>
              <TextInput
                module="openSearchReports"
                label="dashboard.name"
                value={dashboardToEdit?.name}
                readOnly
              />
            </Grid>
            <Grid item className={classes.item}>
              <TextInput
                module="openSearchReports"
                label="dashboard.url"
                value={dashboardToEdit?.url}
                onChange={onAttributeChange('url')}
                required
              />
            </Grid>
            <Grid item className={classes.item}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={dashboardToEdit.synchDisabled}
                    onChange={(e) => setDashboardToEdit({
                      ...dashboardToEdit,
                      synchDisabled: e.target.checked,
                    })}
                    color="primary"
                  />
                )}
                label={
                  formatMessageWithValues(intl, 'openSearchReports', 'dashboard.synchStatus', {
                    status: dashboardToEdit.synchDisabled ? 'Disabled' : 'Enabled',
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            <FormattedMessage module="openSearchReports" id="dialog.cancel" />
          </Button>
          <Button onClick={handleSave} disabled={!canSave} variant="contained" color="primary" autoFocus>
            <FormattedMessage module="openSearchReports" id="dialog.save" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateOpenSearchDashboard,
  fetchOpenSearchDashboard,
}, dispatch);

export default injectIntl(
  withTheme(withStyles(defaultDialogStyles)(connect(null, mapDispatchToProps)(OpenSearchDashboardEditDialog))),
);
