import "babel-polyfill";

import React from "react";
import { render } from "react-dom";

import { MuiThemeProvider } from "material-ui";
import { createMuiTheme } from "material-ui/styles";

import { BrowserRouter, Route } from "react-router-dom";

import BasePage from "./containers/common/BasePage";

import HomePage from "bundle-loader?lazy&name=homepage!./containers/home/HomePage";

import NotFound from "bundle-loader?lazy&name=notfound!./components/common/NotFound";

// insert module CSS
import "react-table/react-table.css";
import "react-select-plus/dist/react-select-plus.css";

render(
  <MuiThemeProvider theme={createMuiTheme()}>
    <BrowserRouter>
      <Route
        render={(props) => {

          return (
            <div>
              <BasePage {...props}>
                <Route exact path="/" bundle={HomePage} />

                <Route bundle={NotFound} />
              </BasePage>
            </div>
          );

        }}
      />
    </BrowserRouter>
  </MuiThemeProvider>, document.getElementById("react-no-print"));
