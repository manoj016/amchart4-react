/**
 * @class AmchartsReact
 */

import * as React from 'react'

import styles from './AmchartsReact.css'

export type Props = { chart: any, dateAxis: any, color: any };

type Range = {
  start: number,
  end: number
}

export type State = {
  show: boolean,
  top: number,
  left: number,
  chart: any,
  axises: any,
  range: Range
}

export default class AmchartsReact extends React.Component<Props, State> {

  state = {
    show: false,
    top: 0,
    left: 0,
    chart: {},
    axises: [],
    range: {
      start: 0,
      end: 0
    }
  }

  componentDidMount() {
    this.cursorBehaviorChangeHandler(this.props.chart)
  }

  createAxisRange = (axis: any, range: Range, dateAxis: any) => {
    const axisRange = dateAxis.axisRanges.create();
    axisRange.date = axis.positionToDate(range.start)
    axisRange.endDate = axis.positionToDate(range.end)
    axisRange.axisFill.fill = this.props.color
    axisRange.axisFill.fillOpacity = 0.2

    console.log(axisRange)
  };

  cursorBehaviorChangeHandler = (chart: any) => {

    chart.cursor.behavior = "selectX";

    chart.cursor.events.on("selectended", (ev: any) => {
      const range: any = ev.target.xRange
      const {xAxes} = ev.target.chart

      const axises: any = []
      xAxes.values.map((value: any) => {
        axises.push(value)
      })

      console.log(chart.cursor, ev)

      this.setState(() => ({axises, range}))

      this.createAxisRange(axises[0], range, this.props.dateAxis)

      const {x, y} = ev.target.point

      this.setState(() => ({show: true, top: y + 102, left: x + 270}))
    })

    chart.events.on("hit", () => {
      this.setState(() => ({show: false}))
    })
  }

  handleZoom = () => {
    const {axises, range} = this.state
    // this.props.dateAxis.axisRanges.removeIndex(this.props.dateAxis.axisRanges.length - 1)
    axises.map((axis: any) => {
      axis.zoomToDates(axis.positionToDate(range.start), axis.positionToDate(range.end))
    })
    this.setState(() => ({show: false}))
  }

  render() {
    const {show, top, left} = this.state;
    const style = show ? {
      display: 'block',
      top,
      left
    } : {
      display: 'none'
    }

    return (
      <ul className={styles.customMenu} style={style}>
        <li onClick={this.handleZoom}>Zoom</li>
        <li> Pattern search</li>
      </ul>
    )
  }
}
