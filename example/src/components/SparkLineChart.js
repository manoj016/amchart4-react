import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class SparkLineChart extends Component {

  componentDidMount() {
    let chart = am4core.create("sparkChart", am4charts.XYChart);

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

    chart.data = this.props.data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.hide();
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.cursorTooltipEnabled = false;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.hide();
    valueAxis.renderer.grid.template.disabled = true;

    const series = chart.series.push(new am4charts.LineSeries());
    series.name = "2016";
    series.dataFields.dateX = "date1";
    series.dataFields.valueY = "price1";
    series.tooltipText = "[bold]{valueY}[/]";
    series.fill = am4core.color("#e59165");
    series.stroke = am4core.color("#e59165");

    // bullets all over
    // const bullet = series.bullets.push(new am4charts.Bullet());
    // const circle = bullet.createChild(am4core.Circle);
    // circle.radius = 5;
    // circle.fill = am4core.color("#e59165");
    // circle.isMeasured = false;


    // const axisTooltip = dateAxis.tooltip;
    // axisTooltip.background.fill = am4core.color("#e59165");
    // axisTooltip.background.strokeWidth = 0;
    // axisTooltip.background.cornerRadius = 3;
    // axisTooltip.background.pointerLength = 0;
    // axisTooltip.dy = 5;

    // Last bullet
    const bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = am4core.color("#e59165");
    bullet.isMeasured = false;

    series.events.on("validated", function () {
      bullet.moveTo(series.dataItems.last.point);
      bullet.validatePosition();
    });

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;

    chart.exporting.menu = new am4core.ExportMenu();
  }

  render() {
    return (
      <div id="sparkChart" style={{ width: "100%", height: "500px" }} />
    );
  }
}

export default SparkLineChart;
