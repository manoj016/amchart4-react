import React from 'react';

import LineChart from './components/LineChart';
import SparkLineChart from './components/SparkLineChart';
import AreaLineChart from './components/AreaLineChart';
import PieChart from './components/PieChart';
import PercentChart from './components/PercentChart';


const createData = () => {
  const data = [];
  let price1 = 1000;
  let price2 = 1200;
  for (let i = 0; i < 10; i++) {
    price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date1: new Date(2015, 0, i), price1 });
  }
  for (let i = 0; i < 10; i++) {
    price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date2: new Date(2017, 0, i), price2 });
  }

  return data;
}

const data = () => {
  const data = [];
  let price1 = 1000;
  for (let i = 0; i < 10; i++) {
    price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date1: new Date(2015, 0, i), price1 });
  }

  return data;
}

const App = (props) => {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <LineChart data={createData()} />
    </div>
  )
}

export default App;
