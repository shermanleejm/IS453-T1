import React from 'react';
import { Tab, Tabs, Button, Grid, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import bankpic from '../../images/bank.jpg';
import LoginForm from '../forms/LoginForm';

const SorryPanel = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        padding: '0 10% 0 10%',
        textAlign: 'center',
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h2">Sorry, this feature is not available yet.</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            Please enter your email below to be notified when it is ready
          </Typography>
          <TextField variant="standard" fullWidth label="Email"></TextField>
        </Grid>
      </Grid>
    </div>
  );
};

const AboutPanel = () => {
  return (
    <div style={{ padding: '10%', height: '100%', textAlign: 'center' }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <Grid item>
          <Typography variant="h2">Welcome to Randy Bank</Typography>
        </Grid>
        <Grid item>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <img
              src={bankpic}
              style={{ width: '80%' }}
              alt="https://www.freepik.com/vectors/background Background vector created by pikisuperstar - www.freepik.com"
            />
          </div>
        </Grid>
        <Grid item>
          <Typography variant="h5">
            We are committed to ensuring a quality banking and loaning experience for all
            customers regardless of their background.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const HomePage = () => {
  const [selectedTab, setSelectedTab] = React.useState(3);

  function renderSwitch() {
    switch (selectedTab) {
      case 0:
        return <AboutPanel />;
      case 1:
        return <SorryPanel />;
      case 2:
        return <SorryPanel />;
      case 3:
        return <LoginForm />;
      case 4:
        return <SorryPanel />;
      default:
        return <div></div>;
    }
  }

  return (
    <div>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item style={{ width: '80%' }}>
          <Tabs
            value={selectedTab}
            onChange={(_, value) => setSelectedTab(value)}
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="About" />
            <Tab label="Cards" />
            <Tab label="Insure" />
            <Tab label="Borrow" />
            <Tab label="Invest" />
          </Tabs>
        </Grid>

        <Button style={{ width: '20%' }} component={Link} to="/admin">
          login
        </Button>
      </Grid>

      {renderSwitch()}
    </div>
  );
};

export default HomePage;
