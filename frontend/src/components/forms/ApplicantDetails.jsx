import React from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import { MobileDatePicker, LocalizationProvider } from '@mui/lab';
import { NumberFormatCustom, NumberFormatCustomDollar } from './NumberFormatCustom';
import moment from 'moment';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { red } from '@mui/material/colors';

const lsKey = 'RandyBankUsername';

const ApplicantDetails = () => {
  const [payload, setPayload] = React.useState({
    name: "",
    username: "",
    password: undefined,
    dob: undefined,
    FLAG_OWN_CAR: 0,
    NAME_EDUCATION_TYPE: 0,
    DAYS_EMPLOYED: undefined,
    REG_CITY_NOT_LIVE_CITY: 0,
    AMT_GOODS_PRICE: undefined,
    REG_CITY_NOT_WORK_CITY: 0,
    DAYS_BIRTH: undefined,
    AMT_CREDIT: undefined,
    NAME_INCOME_TYPE: 0,
    NAME_FAMILY_STATUS: 0,
    OCCUPATION_TYPE: 0,
    AMT_INCOME_TOTAL: undefined,
    NAME_HOUSING_TYPE: 0,
    FLAG_OWN_REALTY: 0,
    CNT_CHILDREN: undefined,
  });
  const [isError, setIsError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(true);

  const fields = [
    { title: 'Particulars', type: 'header' },
    { col: 'name', title: 'Full Name', colSize: 12, type: 'text' },
    { col: 'username', title: 'Username', colSize: 6, type: 'text' },
    { col: 'password', title: 'Password', colSize: 6, type: 'text' },
    { col: 'dob', title: 'Date of Birth', colSize: 12, type: 'date' },
    {
      col: 'NAME_FAMILY_STATUS',
      title: 'Marital Status',
      colSize: 6,
      type: 'select',
      options: {
        'Single / not married': 0,
        Married: 1,
        'Civil marriage': 2,
        Widow: 3,
        Separated: 4,
        Unknown: 5,
      },
    },
    { col: 'CNT_CHILDREN', title: 'Number of Children', colSize: 6, type: 'number' },
    {
      col: 'FLAG_OWN_CAR',
      title: 'Do you own a car?',
      colSize: 6,
      type: 'select',
      options: { No: 0, Yes: 1 },
    },
    {
      col: 'FLAG_OWN_REALTY',
      title: 'Do you own a house?',
      colSize: 6,
      type: 'select',
      options: { Yes: 0, No: 1 },
    },
    {
      col: 'NAME_HOUSING_TYPE',
      title: 'Home ownership',
      colSize: 6,
      type: 'select',
      options: {
        'House / apartment': 0,
        'Rented apartment': 1,
        'With parents': 2,
        'Municipal apartment': 3,
        'Office apartment': 4,
        'Co-op apartment': 5,
      },
    },
    {
      col: 'REG_CITY_NOT_LIVE_CITY',
      title: 'Are you currently living here?',
      colSize: 6,
      type: 'select',
      options: { No: 0, Yes: 1 },
    },
    { title: 'Education', type: 'header' },
    {
      col: 'NAME_EDUCATION_TYPE',
      title: 'Education Level',
      colSize: 12,
      type: 'select',
      options: {
        'Secondary / secondary special': 0,
        'Higher education': 1,
        'Incomplete higher': 2,
        'Lower secondary': 3,
        'Academic degree': 4,
      },
    },
    { title: 'Employment', type: 'header' },
    { col: 'DAYS_EMPLOYED', title: 'Days of employment', colSize: 6, type: 'number' },
    {
      col: 'NAME_INCOME_TYPE',
      title: 'Income Type',
      colSize: 6,
      type: 'select',
      options: {
        Working: 0,
        'State servant': 1,
        'Commercial associate': 2,
        Pensioner: 3,
        Unemployed: 4,
        Student: 5,
        Businessman: 6,
        'Maternity leave': 7,
      },
    },
    {
      col: 'AMT_INCOME_TOTAL',
      title: 'Annual Income',
      colSize: 6,
      type: 'number:dollar',
    },
    {
      col: 'REG_CITY_NOT_WORK_CITY',
      title: 'Do you work in the same city as your home?',
      colSize: 6,
      type: 'select',
      options: { No: 0, Yes: 1 },
    },
    {
      col: 'OCCUPATION_TYPE',
      title: 'Occupation (pick the closest)',
      colSize: 12,
      type: 'select',
      options: {
        Laborers: 0,
        'Core staff': 1,
        Accountants: 2,
        Managers: 3,
        nan: 4,
        Drivers: 5,
        'Sales staff': 6,
        'Cleaning staff': 7,
        'Cooking staff': 8,
        'Private service staff': 9,
        'Medicine staff': 10,
        'Security staff': 11,
        'High skill tech staff': 12,
        'Waiters/barmen staff': 13,
        'Low-skill Laborers': 14,
        'Realty agents': 15,
        Secretaries: 16,
        'IT staff': 17,
        'HR staff': 18,
      },
    },
    { title: 'Loan Information', type: 'header' },
    { col: 'AMT_CREDIT', title: 'Amount of loan', colSize: 6, type: 'number:dollar' },
    {
      col: 'AMT_GOODS_PRICE',
      title: 'Amount of goods to be purchased with loan',
      colSize: 6,
      type: 'number:dollar',
    },
  ];

  React.useEffect(async () => {
    let username = localStorage.getItem(lsKey);

    function get_records(username) {
      axios
        .get(process.env.REACT_APP_API + 'get_records?username=' + username)
        .then((res) => {
          res.data.dob = moment(res.data.dob, 'DD-MM-yyyy');
          setPayload(res.data);
        });
    }

    if (username !== undefined) {
      await get_records(username);
    }

    setIsLoading(false);
  }, [isLoading]);

  function handleChange(event, colName) {
    if (event.target === undefined) {
      setPayload({ ...payload, [colName]: event });
    } else {
      setPayload({ ...payload, [colName]: event.target.value });
    }
  }

  const handleChangeNumber = (event) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsError(false);
  };

  const handleCloseSubmit = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSubmitted(false);
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {console.log(payload)}
      {fields.map((row) => {
        switch (row.type) {
          case 'text':
            return (
              <Grid item xs={row.colSize}>
                <TextField
                  label={row.title}
                  value={payload[row.col]}
                  fullWidth
                  onChange={(event) => handleChange(event, row.col)}
                />
              </Grid>
            );

          case 'number':
            return (
              <Grid item xs={row.colSize}>
                <TextField
                  fullWidth
                  label={row.title}
                  value={payload[row.col]}
                  onChange={handleChangeNumber}
                  name={row.col}
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
            );

          case 'number:dollar':
            return (
              <Grid item xs={row.colSize}>
                <TextField
                  fullWidth
                  label={row.title}
                  value={payload[row.col]}
                  onChange={handleChangeNumber}
                  name={row.col}
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustomDollar,
                  }}
                />
              </Grid>
            );

          case 'date':
            return (
              <Grid item xs={row.colSize}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <MobileDatePicker
                    label={row.title}
                    inputFormat="DD/MM/yyyy"
                    value={payload[row.col]}
                    onChange={(event) => handleChange(event, row.col)}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            );

          case 'select':
            return (
              <Grid item xs={row.colSize}>
                <FormControl fullWidth>
                  <InputLabel>{row.title}</InputLabel>
                  <Select
                    defaultValue={payload[row.col]}
                    value={payload[row.col]}
                    label={row.title}
                    onChange={(event) => handleChange(event, row.col)}
                  >
                    {Object.keys(row.options).map((opt) => {
                      return <MenuItem value={row.options[opt]}>{opt}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
            );

          case 'header':
            return (
              <Grid item xs={12}>
                <Typography variant="h4">{row.title}</Typography>
              </Grid>
            );
            break;

          default:
            break;
        }
      })}
      <Snackbar open={isError} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
          You have fields that are not filled yet!
        </Alert>
      </Snackbar>
      <Snackbar open={submitted} autoHideDuration={5000} onClose={handleCloseSubmit}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={handleCloseSubmit}>
          We have submitted your application!
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            console.log(payload);
            if (payload.dob === undefined || payload.AMT_INCOME_TOTAL === undefined) {
              setIsError(true);
              return;
            }

            payload.DAYS_BIRTH = moment(new Date()).diff(payload.dob, 'years');
            payload.dob = payload.dob.format('DD-MM-yyy');
            payload.AMT_INCOME_TOTAL = payload.AMT_INCOME_TOTAL * -1;

            let clean = true;
            for (let k in payload) {
              if (payload[k] === undefined) {
                clean = false;
                break;
              }
            }

            if (clean === true) {
              axios
                .post(process.env.REACT_APP_API + 'new_application', payload)
                .then((res) => alert(res.data));
              setIsError(false);
              setSubmitted(true);
              localStorage.setItem(lsKey, payload.username);
              history.push('/credit_report');
            } else {
              setIsError(true);
            }
          }}
        >
          submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ApplicantDetails;
