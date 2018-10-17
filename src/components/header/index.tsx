import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import {connect} from 'react-redux';
import {InlineData} from 'vega-lite/build/src/data';
import {State, VoyagerConfig} from '../../models/index';
import {selectConfig} from '../../selectors';
import {selectData} from '../../selectors/dataset';
import {Controls} from './controls';
import * as styles from './header.scss';

export interface HeaderProps {
  data: InlineData;
  config: VoyagerConfig;
}

export class HeaderBase extends React.PureComponent<HeaderProps, {}> {
  public render() {
    const {data} = this.props;
    const {headerTitle} = this.props.config;

    return <div styleName="header">
        {/* <img styleName="voyager-logo" src={logo} /> */}
        <span styleName="voyager-desc">{headerTitle ? headerTitle : 'Recommendation Charts'}</span>
        {data && <Controls />}
        {/* <a styleName='idl-logo' onClick={this.openLink}>
          <img src={idlLogo}/>
        </a> */}
      </div>;
  }

  private openLink() {
    window.open('https://idl.cs.washington.edu/');
  }
}

export const Header = connect(
  (state: State) => {
    return {
      data: selectData(state),
      config: selectConfig(state)
    };
  }
)(CSSModules(HeaderBase, styles));
