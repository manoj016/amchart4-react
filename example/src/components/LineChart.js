import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import {AmchartsReact} from 'amchart4-react'

am4core.useTheme(am4themes_animated);

class LineChart extends Component {

  constructor(props) {
    super(props)

    this.ref = React.createRef();
  }

  state = {
    chart: null,
    dateAxis: null
  }

  componentDidMount() {
    const chart = am4core.create("lineChart", am4charts.XYChart);

    this.createChart(chart);

    this.setState(() => ({chart}))
  }

  createLine = (chart) => {
    const middleLine = chart.plotContainer.createChild(am4charts.AxisLine);
    middleLine.strokeOpacity = 1;
    middleLine.stroke = am4core.color("#000000");
    middleLine.strokeDasharray = "";
    // middleLine.align = "center";
    middleLine.zIndex = 1;

    return middleLine;
  }

  // handleClick = (e) => {
  //   if (!ReactDOM.findDOMNode(this).contains(e.target)) {
  //     this.setState(() => ({show: false}))
  //   }
  // }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    // document.removeEventListener('click', this.handleClick, false);
  }

  createChart = (chart) => {

    chart.data = this.props.data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

    this.setState(() => ({dateAxis}))

    const dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#e59165");
    valueAxis.renderer.minWidth = 60;

    const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.grid.template.strokeDasharray = "2,3";
    valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
    valueAxis2.renderer.minWidth = 60;

    const axisRange = dateAxis.axisRanges.create();
    axisRange.date = new Date(2015, 0, 5);
    // axisRange.value = 1200;
    axisRange.grid.stroke = am4core.color("#A96478");
    axisRange.grid.strokeWidth = 2;
    axisRange.grid.strokeOpacity = 1;
    // axisRange.label.text = "middle";
    axisRange.label.fill = axisRange.grid.stroke;
    axisRange.label.verticalCenter = "bottom";
    console.log('axis', axisRange);

    const series = chart.series.push(new am4charts.LineSeries());
    series.name = "2016";
    series.dataFields.dateX = "date1";
    series.dataFields.valueY = "price1";
    series.tooltipText = "[bold]{valueY}[/]";
    series.fill = am4core.color("#e59165");
    series.stroke = am4core.color("#e59165");

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

    const series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "2017";
    series2.dataFields.dateX = "date2";
    series2.dataFields.valueY = "price2";
    series2.yAxis = valueAxis2;
    series2.xAxis = dateAxis2;
    series2.tooltipText = "[bold]{valueY}[/]";
    series2.fill = am4core.color("#dfcc64");
    series2.stroke = am4core.color("#dfcc64");

    let axisTooltip2 = dateAxis2.tooltip;
    axisTooltip2.background.fill = am4core.color("#dfcc64");
    axisTooltip2.background.strokeWidth = 0;
    axisTooltip2.background.cornerRadius = 3;
    axisTooltip2.background.pointerLength = 0;
    axisTooltip2.dy = 5;

    // const line = this.createLine(chart);
    // console.log(line);

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.stroke = am4core.color("#000000");
    chart.cursor.lineX.strokeWidth = 2;
    chart.cursor.lineX.strokeDasharray = "";
    chart.cursor.lineY.strokeOpacity = 0;

    // chart.cursor.behavior = "selectX";

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.series.push(series2);
    // scrollbarX.children.push(axisRange)
    console.log(scrollbarX)
    chart.scrollbarX = scrollbarX;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    chart.exporting.menu = new am4core.ExportMenu();

    valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  }

  render() {
    return (
      <div>
        <div id="lineChart" style={{width: "100%", height: "500px"}}/>
        {this.state.chart ?
          <AmchartsReact
            chart={this.state.chart}
            dateAxis={this.state.dateAxis}
            color={am4core.color("#396478")}
          />
          : null}
      </div>
    );
  }
}

export default LineChart;
