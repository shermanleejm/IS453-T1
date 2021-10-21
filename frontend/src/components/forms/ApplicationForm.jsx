import { Button, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import { MobileDatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { NumberFormatCustom, NumberFormatCustomDollar } from './NumberFormatCustom';

const ApplicantDetails = () => {
  const [payload, setPayload] = React.useState({
    name: '',
    username: '',
    password: '',
    dob: '',
    FLAG_OWN_CAR: 0,
    NAME_EDUCATION_TYPE: 0,
    DAYS_EMPLOYED: undefined,
    REG_CITY_NOT_LIVE_CITY: 0,
    AMT_GOODS_PRICE: undefined,
    REG_CITY_NOT_WORK_CITY: 1,
    DAYS_BIRTH: 0,
    AMT_CREDIT: undefined,
    NAME_INCOME_TYPE: 0,
    NAME_FAMILY_STATUS: 0,
    OCCUPATION_TYPE: 0,
    AMT_INCOME_TOTAL: undefined,
    NAME_HOUSING_TYPE: 0,
    FLAG_OWN_REALTY: 0,
    CNT_CHILDREN: undefined,
  });

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

  const fields = [
    { col: 'name', title: 'Full Name', colSize: 12, type: 'text' },
    { col: 'username', title: 'Username', colSize: 6, type: 'text' },
    { col: 'password', title: 'Password', colSize: 6, type: 'text' },
    { col: 'dob', title: 'Date of Birth', colSize: 6, type: 'date' },
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
      title: 'What kind of home ownership is it?',
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
    {
      col: 'NAME_EDUCATION_TYPE',
      title: 'Education Level',
      colSize: 6,
      type: 'select',
      options: {
        'Secondary / secondary special': 0,
        'Higher education': 1,
        'Incomplete higher': 2,
        'Lower secondary': 3,
        'Academic degree': 4,
      },
    },
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
      colSize: 6,
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

    { col: 'AMT_CREDIT', title: 'Amount of loan', colSize: 6, type: 'number:dollar' },
    {
      col: 'AMT_GOODS_PRICE',
      title: 'Amount of goods to be purchased with loan',
      colSize: 6,
      type: 'number:dollar',
    },
  ];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item xs={12}>
        <Typography variant="h4">My Particulars</Typography>
      </Grid>
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
            break;
          default:
            break;
        }
      })}
    </Grid>
  );
};

const SwitchRender = (index) => {
  switch (index) {
    case 0:
      return <ApplicantDetails />;

    case 1:
      return <div>credit report</div>;

    case 2:
      return <div>documents</div>;

    default:
      break;
  }
};

const ApplicationForm = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const history = useHistory();

  const SideNav = () => {
    return (
      <div
        style={{
          height: '100vh',
          overflowX: 'hidden',
          backgroundColor: '#f0f0f0',
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
          <Tab label="Documents"></Tab>
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
