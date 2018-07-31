import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { AmchartsReact } from 'amchart4-react'

am4core.useTheme(am4themes_animated);

class AreaLineChart extends Component {

  state = {
    chart: null
  }

  componentDidMount() {
    let chart = am4core.create("areaChart", am4charts.XYChart);

    this.createChart(chart);

    this.setState(() => ({ chart }))
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
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#e59165");

    valueAxis.renderer.minWidth = 60;

    const series = chart.series.push(new am4charts.LineSeries());
    series.name = "2016";
    series.dataFields.dateX = "date1";
    series.dataFields.valueY = "price1";
    series.tooltipText = "[bold]{valueY}[/]";
    series.fill = am4core.color("#e59165");
    series.stroke = am4core.color("#e59165");
    series.tensionX = 0.8;
    series.sequencedInterpolation = true;
    series.fillOpacity = 0.2;
    series.defaultState.transitionDuration = 1000;

    let axisTooltip = dateAxis.tooltip;
    axisTooltip.background.fill = am4core.color("#e59165");
    axisTooltip.background.strokeWidth = 0;
    axisTooltip.background.cornerRadius = 3;
    axisTooltip.background.pointerLength = 0;
    axisTooltip.dy = 5;
    //series.strokeWidth = 3;
    // series.columns.template.events.on("hit", function (ev) {
    //   console.log("clicked on ", ev.target);
    // }, this);

    chart.cursor = new am4charts.XYCursor();

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    console.log(chart.scrollbarX)
    chart.scrollbarX.align = 'bottom';

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    chart.exporting.menu = new am4core.ExportMenu();

    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  }

  render() {
    return (
      <div>
        <div id="areaChart" style={{ width: "100%", height: "500px" }} />
        {this.state.chart ? <AmchartsReact chart={this.state.chart} /> : null}
      </div>
    );
  }
}

export default AreaLineChart;
