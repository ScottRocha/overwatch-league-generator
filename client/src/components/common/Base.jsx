import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";

import PrintProvider from "react-easy-print";

import HeaderPage from "../../containers/common/HeaderPage";
import Footer from "./Footer";


const Base = ({ childrenWithProps, history }) => (
  <PrintProvider>

    <div className="root">
      <HeaderPage history={history} />

      <div className="middle-content">
        <Switch>
          {childrenWithProps}
        </Switch>
      </div>

      <Footer />
    </div>

  </PrintProvider>
);

Base.propTypes = {
  "childrenWithProps": PropTypes.array.isRequired,
  "history": PropTypes.object.isRequired,
};

export default Base;
