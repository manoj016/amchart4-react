import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class PercentChart extends Component {

  componentDidMount() {
    let chart = am4core.create("percentChart", am4charts.XYChart);

    console.log(chart)

    this.createChart(chart);

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createChart = (chart) => {
    chart.data = [
      {
        x: 1,
        y1: 66,
        y2: 34
      }
    ];

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "x";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.hide();
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.cursorTooltipEnabled = false;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.hide();
    valueAxis.renderer.grid.template.disabled = true;

    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.categoryY = "x";
    series1.dataFields.valueX = "y1";
    series1.stacked = true;

    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.categoryY = "x";
    series2.dataFields.valueX = "y2";
    series2.stacked = true;

  }

  render() {
    return (
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <div>Percent Chart</div>
        <div id="percentChart" style={{ width: "250px", height: "90px", margin: "10px auto" }} />
      </div>
    );
  }
}

export default PercentChart;
