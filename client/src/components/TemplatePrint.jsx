import React from "react";
import PropTypes from "prop-types";
import PrintTemplate from "react-print";

import ReactSVG from "react-svg";

import Divider from "material-ui/Divider";
import Grid from "material-ui/Grid";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";

const Print = ({ leagueName, days }) => (
  <PrintTemplate>
    <div style={{ "width": "100%", "height": "100%" }}>
      <h2 className={"centered"}>OverWatch League - {leagueName}</h2>

      {days.map((day, dayIndex) => (

        <Table key={"day-" + dayIndex + "-print"}>
          <TableHead>
            <TableRow>
              <TableCell>
                Day {dayIndex}
              </TableCell>
              <TableCell>

              </TableCell>

              {day.matchups.map((matchup, matchupIndex) => (
                <TableCell key={"day-" + dayIndex + "-matchup-" + matchupIndex + "-print"}>
                  {matchup[0].value.name} - {matchup[1].value.name}
                </TableCell>
              ))}

            </TableRow>
          </TableHead>
          <TableBody>

            {day.players.map((player, playerIndex) => (
              <TableRow key={"day-" + dayIndex + "-player-" + playerIndex + "-print"}>
                <TableCell />
                <TableCell>
                  {player.label}
                </TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell/>
              </TableRow>
            ))}

          </TableBody>
        </Table>

      ))}
    </div>
  </PrintTemplate>
);

Print.propTypes = {
  "leagueName": PropTypes.string.isRequired,
  "days": PropTypes.array.isRequired,
};

export default Print;
