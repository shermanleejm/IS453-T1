import { Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ApplicantDetails from './ApplicantDetails';

const SwitchRender = (index) => {
  switch (index) {
    case 0:
      return <ApplicantDetails />;

    case 1:
      return <div>{localStorage.getItem('RandyBankUsername')}</div>;

    default:
      break;
  }
};

const ApplicationForm = (props) => {
  const [tabValue, setTabValue] = React.useState(props.tab);
  const history = useHistory();

  const SideNav = () => {
    return (
      <div
        style={{
          height: '100%',
          overflowX: 'hidden',
          backgroundColor: '#f0f0f0',
          // position: 'fixed',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        <Button fullWidth onClick={() => history.push('/')}>
          <Typography variant="h5">Randy Bank</Typography>
        </Button>
        <Tabs
          orientation="vertical"
          value={tabValue}
          onChange={(_, val) => setTabValue(val)}
          style={{ display: 'flex', justifyContent: 'stretch' }}
        >
          <Tab label="Applicant Details"></Tab>
          <Tab label="Credit Report"></Tab>
        </Tabs>
      </div>
    );
  };

  return (
    <Grid container direction="row">
      <Grid item sm={2}>
        <SideNav />
      </Grid>
      <Grid item sm={10} style={{ padding: '20px' }}>
        {SwitchRender(tabValue)}
      </Grid>
    </Grid>
  );
};

export default ApplicationForm;
