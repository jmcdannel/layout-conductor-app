import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import CallSplit from '@mui/icons-material/CallSplit';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Autocomplete from '@mui/material/Autocomplete';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import MapIcon from '@mui/icons-material/Map';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { getAppConfig, jmriHosts, apiHosts, layoutIds, updateConfig } from '../config/config';

export const StatusMonitor = ({ jmriReady,  apiReady }) => {

  const appConfig = getAppConfig();

  const [jmriConfigOpen, setJMRIConfigOpen] = useState(false);
  const [apiConfigOpen, setAPIConfigOpen] = useState(false);
  const [layoutConfigOpen, setLayoutConfigOpen] = useState(false);

  const [jmriHost, setJMRIHost] = useState(appConfig.jmri);
  const [apiHost, setAPIHost] = useState(appConfig.api);
  const [layoutId, setLayoutId] = useState(appConfig.layoutId);

  const handleJMRIUpdate = () => {
    appConfig.jmri = jmriHost;
    updateConfig(appConfig);
    window.location.reload(false);
  }

  const handleAPIUpdate = () => {
    appConfig.api = apiHost;
    updateConfig(appConfig);
    window.location.reload(false);
  }

  const handleLayoutUpdate = () => {
    appConfig.layoutId = layoutId;
    updateConfig(appConfig);
    window.location.reload(false);
  }

  const hasJmri = !!appConfig.jmri;
  const hasApi = !!appConfig.api;

  const jmriClassName = `status-monitor--${
    hasJmri && jmriReady
      ? 'connected'
      : 'unknown'
    }`;

  const apiClassName = `status-monitor--${
    hasApi && apiReady
      ? 'connected'
      : 'unknown'
    }`;

  // TODO: handle jmlri disconnected
  // TODO: handle api error

  return (
    <div className="status-monitor">
      <Tooltip title="Layout ID">
        <Chip
          variant="outlined"
          size="small"
          icon={<MapIcon className={apiClassName} />}
          label={`Layout ID: ${appConfig.layoutId}`}
          color="default"
          onClick={() => setLayoutConfigOpen(true)}
        />
      </Tooltip>
      <Tooltip title="JMRI Connection Status">
        <Chip
          variant="outlined"
          size="small"
          icon={<UnfoldMoreIcon className={jmriClassName} />}
          label="JMRI"
          color="default"
          onClick={() => setJMRIConfigOpen(true)}
        />
      </Tooltip>
      <Tooltip title="REST API Status">
        <Chip
          variant="outlined"
          size="small"
          icon={<CallSplit className={apiClassName} />}
          label="API"
          color="default"
          onClick={() => setAPIConfigOpen(true)}
        />
      </Tooltip>

      <Dialog onClose={() => setLayoutConfigOpen(false)} open={layoutConfigOpen}>
        <DialogTitle>Layout ID</DialogTitle>
        <Autocomplete
            sx={{ padding: '1rem', width: '360px' }}
            id="layout-id"
            freeSolo
            onChange={(event, newValue) => {
              setLayoutId(newValue);
            }}
            options={layoutIds}
            value={layoutId}
            renderInput={(params) => <TextField {...params} label="Layout ID" />}
          />
          <IconButton 
            size="large" 
            onClick={handleLayoutUpdate}>
              <SaveIcon />
          </IconButton>
      </Dialog>

      <Dialog onClose={() => setAPIConfigOpen(false)} open={apiConfigOpen}>
        <DialogTitle>API Host</DialogTitle>
        <Autocomplete
            sx={{ padding: '1rem', width: '360px' }}
            id="api-host"
            freeSolo
            onInputChange={(event, newValue) => {
              setAPIHost(newValue);
            }}
            onChange={(event, newValue) => {
              setAPIHost(newValue);
            }}
            options={apiHosts}
            value={apiHost}
            renderInput={(params) => <TextField {...params} label="API Host" />}
          />
          <IconButton 
            size="large" 
            onClick={handleAPIUpdate}>
              <SaveIcon />
          </IconButton>
      </Dialog>

      <Dialog onClose={() => setJMRIConfigOpen(false)} open={jmriConfigOpen}>
        <DialogTitle>JMRI Host</DialogTitle>
        <Autocomplete
            sx={{ padding: '1rem', width: '360px' }}
            id="jmri-host"
            freeSolo
            onChange={(event, newValue) => {
              setJMRIHost(newValue);
            }}
            options={jmriHosts}
            value={jmriHost}
            renderInput={(params) => <TextField {...params} label="JMRI Host" />}
          />
          <IconButton 
            size="large" 
            onClick={handleJMRIUpdate}>
              <SaveIcon />
          </IconButton>
      </Dialog>
    </div>
  );
}

export default StatusMonitor;