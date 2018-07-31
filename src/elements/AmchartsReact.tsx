/**
 * @class AmchartsReact
 */

import * as React from 'react'

import styles from './AmchartsReact.css'

export type Props = { chart: any, dateAxis: any, color: any };

export type State = {
  show: boolean,
  top: number,
  left: number,
  chart: any,
  axises: any,
  range: {
    start: number,
    end: number
  }
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
    this.cursorBehaviorChangeHandler(this.props.chart);
  }

  cursorBehaviorChangeHandler = (chart: any) => {

    chart.cursor.behavior = "selectX";

    chart.cursor.events.on("selectended", (ev: any) => {
      const range: any = ev.target.xRange
      const { xAxes } = ev.target.chart

      const axises: any = []
      xAxes.values.map((value: any) => {
        axises.push(value)
      })

      console.log(chart.cursor, ev)

      this.setState(() => ({ axises, range }))

      const axis: { positionToDate: any } = axises[0];
      const axisRange = this.props.dateAxis.axisRanges.create();
      axisRange.date = axis.positionToDate(range.start)
      axisRange.endDate = axis.positionToDate(range.end)
      axisRange.axisFill.fill = this.props.color
      axisRange.axisFill.fillOpacity = 0.2

      console.log(axisRange)

      const { x, y } = ev.target.point

      this.setState(() => ({ show: true, top: y + 102, left: x + 270 }))
    })

    chart.events.on("hit", () => {
      this.setState(() => ({ show: false }))
    })
  }

  handleZoom = () => {
    const { axises, range } = this.state
    // this.props.dateAxis.axisRanges.removeIndex(this.props.dateAxis.axisRanges.length - 1)
    axises.map((axis: any) => {
      axis.zoomToDates(axis.positionToDate(range.start), axis.positionToDate(range.end))
    })
    this.setState(() => ({ show: false }))
  }

  render() {
    const { show, top, left } = this.state;
    const style = show ? {
      display: 'block',
      top,
      left
    } : {
        display: 'none'
      }

    return (
      <ul className={styles.customMenu} style={style} >
        <li onClick={this.handleZoom}>Zoom</li>
        <li> Pattern search </li>
      </ul>
    )
  }
}
