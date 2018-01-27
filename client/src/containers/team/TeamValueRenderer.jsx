import React from "react";
import PropTypes from "prop-types";

import ReactSVG from "react-svg";


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
            <ReactSVG path={"/images/" + this.props.value.value.file + ".svg"} style={{ "width": "15", "height": "15" }} />
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
