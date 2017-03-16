import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import {ExtendedSpec} from 'vega-lite/build/src/spec';

import * as styles from './plot.scss';

import {PLOT_HOVER_MIN_DURATION} from '../../constants';
import {VegaLite} from '../vega-lite/index';

export interface PlotProps {
  fit?: boolean;
  scrollOnHover?: boolean;
  spec: ExtendedSpec;
}

export interface PlotState {
  hovered: boolean;
}

class PlotBase extends React.PureComponent<PlotProps, any> {

  private hoverIntervalId: number;

  constructor(props: PlotProps) {
    super(props);
    this.state = {hovered: false};

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  public render() {
    const {fit, scrollOnHover, spec} = this.props;

    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        styleName={scrollOnHover && this.state.hovered ? 'plot-scroll' : 'plot'}
        className={`persist-scroll ${fit ? 'fit' : ''}`}
      >
        <VegaLite spec={spec}/>
      </div>
    );
  }

  private onMouseEnter() {
    this.hoverIntervalId = setInterval(
      () => {
        // TODO log action
        this.setState({hovered: true});
      },
      PLOT_HOVER_MIN_DURATION
    );
  }

  private onMouseLeave() {
    clearInterval(this.hoverIntervalId);
    this.hoverIntervalId = undefined;
    if (this.state.hovered) {
      this.setState({hovered: false});
    }
  }
}

export const Plot = CSSModules(PlotBase, styles);
