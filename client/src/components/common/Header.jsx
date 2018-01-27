import React from "react";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";


const Header = ({ history }) => (
  <div>
    <Paper style={{ "position": "fixed", "left": 0, "top": 0, "right": 0, "zIndex": 9000 }}>
      <AppBar>
        <Toolbar>
          <Typography type="title" color="inherit" style={{ "cursor": "pointer" }} onClick={() => history.push("/")}>
            OverWatch League Generator
          </Typography>
        </Toolbar>
      </AppBar>
    </Paper>
  </div>
);

Header.propTypes = {
  "history": PropTypes.object.isRequired,
};

export default Header;
