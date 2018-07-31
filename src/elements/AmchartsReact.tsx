/**
 * @class AmchartsReact
 */

import * as React from 'react'

import styles from './AmchartsReact.css'

export type Props = { chart: any };

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

    const { chart } = this.props

    chart.cursor.behavior = "selectX";

    chart.cursor.events.on("selectended", (ev: any) => {
      const range: any = ev.target.xRange
      const { xAxes } = ev.target.chart

      const axises: any = []
      xAxes.values.map((value: any) => {
        axises.push(value)
      })

      this.setState(() => ({ axises, range }))

      const { x, y } = ev.target.point

      this.setState(() => ({ show: true, top: y + 102, left: x + 270 }))
    })

    chart.events.on("hit", () => {
      this.setState(() => ({ show: false }))
    })
  }

  handleZoom = () => {
    const { axises, range } = this.state
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
