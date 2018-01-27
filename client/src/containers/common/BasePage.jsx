import React from "react";
import { matchPath } from "react-router-dom";

import Bundle from "../../containers/common/Bundle";
import Base from "../../components/common/Base";


class BasePage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "path": this.props.location.pathname,
    };

  }

  render() {

    const childrenWithProps = React.Children.map(this.props.children, (child) => {

      const props = {
        "path": child.props.path,
        "history": this.props.history,
        "match": matchPath(this.props.history.location.pathname, {
          "path": child.props.path,
          "exact": true,
          "strict": false,
        }),
      };

      return React.cloneElement(child, {
        "render": () =>
          <Bundle load={child.props.bundle}>{(Component) => <Component {...props} />}</Bundle>,
      });

    });

    return (
      <Base
        childrenWithProps={childrenWithProps}
        isAuthenticated={this.props.isAuthenticated}
        user={this.props.user}
        history={this.props.history} />
    );

  }

}

export default BasePage;
