import * as React from 'react'

import styles from './AmchartsReact.css'

export type Props = { chart: any, xAxis: any, color: any };

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

/**
 * @class AmchartsReact
 *
 */
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

  /**
   * After component will be mounted this method will be invoked
   *
   */
  componentDidMount() {
    this.cursorBehaviorChangeHandler(this.props.chart)
  }

  /**
   * Create a axis range according to the range in the given axis
   *
   * @param axis - x axis to know the position
   * @param {Range} range - range of the axis range
   * @param xAxis - On this axis the axis range will be created
   */
  createAxisRange = (axis: any, range: Range, xAxis: any): void => {
    const axisRange = xAxis.axisRanges.create();
    axisRange.date = axis.positionToDate(range.start)
    axisRange.endDate = axis.positionToDate(range.end)
    axisRange.axisFill.fill = this.props.color
    axisRange.axisFill.fillOpacity = 0.4
    axisRange.label.disabled = true
    xAxis.validateData()
  };

  /**
   * Change the default cursor behavior to "selectX" from "zoomX"
   * And create a axis range on the range after "selectended"
   *
   * @param chart
   */
  cursorBehaviorChangeHandler = (chart: any): void => {

    const { xAxis } = this.props;

    chart.cursor.behavior = "selectX";

    chart.cursor.events.on("selectended", (ev: any) => {
      const range: any = ev.target.xRange
      const {xAxes} = ev.target.chart

      const axises: any = []
      xAxes.values.map((value: any) => {
        axises.push(value)
      })

      this.setState(() => ({axises, range}))

      this.createAxisRange(axises[0], range, xAxis)

      const {x, y} = ev.target.point

      this.setState(() => ({show: true, top: y + 102, left: x + 270}))
    })

    chart.events.on("hit", () => {
      const { length } = xAxis.axisRanges
      this.setState(() => ({show: false}))
      if (length > 1) {
        xAxis.axisRanges.removeIndex(length - 1)
      }
    })

  }

  /**
   * handles the zoom after the zoom context menu is clicked by user
   *
   */
  handleZoom = (): void => {
    const {axises, range} = this.state
    const {xAxis} = this.props
    const {length} = xAxis.axisRanges

    if (length > 1) {
      xAxis.axisRanges.removeIndex(length - 1)
    }

    axises.map((axis: any) => {
      axis.zoomToDates(axis.positionToDate(range.start), axis.positionToDate(range.end))
    })
    this.setState(() => ({show: false}))
  }

  /**
   * Renders this React component
   *
   * @returns {any}
   */
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
