import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { lsKey } from './ApplicantDetails';

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [textError, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  return (
    <div style={{ padding: '2%' }}>
      <Typography variant="h2">Randy Bank</Typography>
      <Typography variant="h4">Driving Finanical Inclusion.</Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '5%',
        }}
      >
        <Paper
          elevation={3}
          style={{ width: '60%', padding: '40px', backgroundColor: '#f0f0f0' }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h4">RANDY BANK</Typography>
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <TextField
                label="Username"
                variant="standard"
                fullWidth
                error={textError}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError(false);
                }}
              />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <TextField
                value={password}
                error={textError}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(false);
                }}
                label="Password"
                variant="standard"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item style={{ width: '100%' }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setIsLoading(true);
                    axios
                      .get(process.env.REACT_APP_API + `login?username=${username}`)
                      .then((res) => {
                        if (res.status !== 200) {
                          setError(true);
                        } else {
                          localStorage.setItem(lsKey, username);
                          history.push('/credit_score');
                        }
                      })
                      .catch((err) => alert(`Backend is down sorry about this! ${err}`))
                      .finally(() => setIsLoading(false));
                  }}
                >
                  Login
                </Button>
              )}
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => history.push('/application')}
              >
                New here? Get Started
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default LoginForm;
