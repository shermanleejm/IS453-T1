import React from 'react';
import { lsKey } from './ApplicantDetails';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  CircularProgress,
  Grid,
  Typography,
  Paper,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tab,
} from '@mui/material';
import ReactSpeedometer from 'react-d3-speedometer';

const CreditScore = () => {
  const [data, setData] = React.useState([]);
  const [rmse, setRMSE] = React.useState([]);
  const [amount, setAmount] = React.useState([]);
  const [creditScore, setCreditScore] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [recommendations, setRecommendations] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    let name = localStorage.getItem(lsKey);

    function getData() {
      let stuffToGet = {
        'get_records?username=': setData,
        'predict_amount?username=': setAmount,
        get_rmse: setRMSE,
        'credit_score?username=': setCreditScore,
        'recommendations?username=': setRecommendations,
      };
      for (let k in stuffToGet) {
        axios
          .get(process.env.REACT_APP_API + k + (k === 'get_rmse' ? '' : name))
          .then((res) => {
            let fn = stuffToGet[k];
            fn(res.data);
          });
      }
    }

    if (name === undefined) {
      history.push('/');
      return;
    } else {
      getData();
      setIsLoading(false);
    }
  }, []);

  const creditScoreLabel = () => {
    if (creditScore <= 0.25) {
      return 'Excellent';
    } else if (creditScore <= 0.5) {
      return 'Good';
    } else if (creditScore <= 0.75) {
      return 'Fair';
    } else {
      return 'Poor';
    }
  };

  const Speedo = () => {
    return (
      <ReactSpeedometer
        maxValue={100}
        value={100 - creditScore * 100}
        needleColor="blue"
        startColor="grey"
        segments={4}
        endColor="black"
        forceRender={true}
        needleHeightRatio={0.4}
        fluidWidth
        customSegmentLabels={[
          { text: 'Poor', fontSize: '1re', color: 'black', position: 'OUTSIDE' },
          { text: 'Fair', fontSize: '1re', color: 'black', position: 'OUTSIDE' },
          { text: 'Good', fontSize: '1re', color: 'black', position: 'OUTSIDE' },
          { text: 'Excellent', fontSize: '1re', color: 'black', position: 'OUTSIDE' },
        ]}
      />
    );
  };

  const Improvement = () => {
    return (
      <Paper style={{ padding: '20px' }}>
        <Typography>Areas for improvement</Typography>
        <Divider style={{ marginBottom: '20px' }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Recommendation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(recommendations).map((row) => {
              return (
                <TableRow>
                  <TableCell>{row}</TableCell>
                  <TableCell
                    style={{ color: recommendations[row][0] === 0 ? 'green' : 'red' }}
                  >
                    {recommendations[row][1]}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div style={{ height: '100vh' }}>
      <Grid
        container
        direction="row"
        alignItems="start"
        justifyContent="center"
        spacing={5}
      >
        <Grid item xs={12}>
          <Typography variant="h3">Hello, {data.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="h5">
              Your credit score is{' '}
              <span style={{ color: 'blue' }}>{creditScoreLabel()}</span>, your estimated
              loan limit is <span style={{ color: 'blue' }}>₱{amount}</span>.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={6}>
              <Speedo />
            </Grid>
            <Grid item xs={6}>
              <Improvement />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreditScore;
