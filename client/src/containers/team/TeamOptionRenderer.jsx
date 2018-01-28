import React from "react";
import PropTypes from "prop-types";


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
            <img src={"/images/small/" + this.props.option.value.file + ".svg"} />
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
