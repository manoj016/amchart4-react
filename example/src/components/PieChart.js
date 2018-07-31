import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class PieChart extends Component {

  componentDidMount() {
    const chart = am4core.create("pieChart", am4charts.PieChart);

    this.createChart(chart);

    this.chart = chart;
  }

  handleZoom = (e) => {
    console.log(e)
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createChart = (chart) => {
    const data = [{
      "country": "Dummy",
      "disabled": true,
      "litres": 1000,
      "color": am4core.color("#dadada"),
      "opacity": 0.3,
      "strokeDasharray": "4,4"
    }, {
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Czech Republic",
      "litres": 301.9
    }, {
      "country": "Ireland",
      "litres": 201.1
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }];

    chart.data = data;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.zIndex = 1;

    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "litres";
    series.dataFields.category = "country";
    series.colors.step = 2;

    series.slices.template.cornerRadius = 5;

    console.log('series', series)
  }

  render() {
    return (
      <div id="pieChart" style={{ width: "100%", height: "500px" }} />
    );
  }
}

export default PieChart;
