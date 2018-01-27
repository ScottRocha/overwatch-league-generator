import React from "react";
import PropTypes from "prop-types";

import ReactSVG from "react-svg";


class TeamValueRendererPage extends React.Component {

  constructor(props) {

    super(props);

  }

  handleMouseDown(event) {

    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);

  }

  handleMouseEnter(event) {

    this.props.onFocus(this.props.option, event);

  }

  handleMouseMove(event) {

    if (this.props.isFocused) {

      return;

    }

    this.props.onFocus(this.props.option, event);

  }

  render() {

    return (
      <div
        className={this.props.className}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
      >
        <div style={{ "display": "inline-block" }}>
          <div style={{
            "display": "inline-block",
            "marginRight": 10,
            "verticalAlign": "middle",
          }}>
            <ReactSVG path={"/images/" + this.props.option.value.file + ".svg"} style={{ "width": "15", "height": "15" }} />
          </div>
          <span>{this.props.option.value.name}</span>
        </div>
        {this.props.children}
      </div>
    );

  }

}

TeamValueRendererPage.propTypes = {
  "children": PropTypes.node,
  "className": PropTypes.string,
  "isDisabled": PropTypes.bool,
  "isFocused": PropTypes.bool,
  "isSelected": PropTypes.bool,
  "onFocus": PropTypes.func,
  "onSelect": PropTypes.func,
  "option": PropTypes.object.isRequired,
};

export default TeamValueRendererPage;
