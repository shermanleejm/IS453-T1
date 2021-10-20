import React from 'react';
import axios from 'axios';

const SideBar = () => {
  const [percentage, setPercentage] = React.useState();

  React.useEffect(() => {
    const payload = {
      FLAG_OWN_CAR: 0,
      NAME_EDUCATION_TYPE: 0,
      DAYS_EMPLOYED: -223.0,
      REG_CITY_NOT_LIVE_CITY: 1,
      AMT_GOODS_PRICE: 450000.0,
      REG_CITY_NOT_WORK_CITY: 1,
      DAYS_BIRTH: 36.02465753424657,
      AMT_CREDIT: 687600.0,
      NAME_INCOME_TYPE: 0,
      NAME_FAMILY_STATUS: 2,
      OCCUPATION_TYPE: 4,
      AMT_INCOME_TOTAL: 180000.0,
      NAME_HOUSING_TYPE: 0,
      FLAG_OWN_REALTY: 0,
      CNT_CHILDREN: 2,
    };
    axios
      .post(process.env.REACT_APP_API_ROUTE + '/new_application', payload)
      .then((res) => setPercentage(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <div>sidebar{percentage}</div>;
};

export default SideBar;
