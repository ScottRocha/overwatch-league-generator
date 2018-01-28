import React from "react";
import PropTypes from "prop-types";


class TeamValueRendererPage extends React.Component {

  constructor(props) {

    super(props);

  }

  render() {

    return (
      <div className="Select-value">
        <span className="Select-value-label">
          <div style={{
            "display": "inline-block",
            "marginRight": 10,
            "verticalAlign": "middle",
          }}>
            <img src={"/images/small/" + this.props.value.value.file + ".svg"} />
          </div>
          <span>{this.props.value.value.name}</span>
          {this.props.children}
        </span>
      </div>
    );

  }

}

TeamValueRendererPage.propTypes = {
  "children": PropTypes.node,
  "placeholder": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  "value": PropTypes.object,
};

export default TeamValueRendererPage;
