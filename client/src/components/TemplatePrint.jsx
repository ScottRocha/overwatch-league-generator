import React from "react";
import PropTypes from "prop-types";

import PrintTemplate from "react-print";


const MatchupRows = ({ weekIndex, dayIndex, day }) => {

  const printMatchups = [];

  printMatchups.push(
    <th key={"week-" + weekIndex + "-day-" + dayIndex + "-matchup-day-print"}>
      Day {dayIndex + 1}
      <br />
      {day.date.format("L")}
    </th>
  );

  printMatchups.push(<th key={"week-" + weekIndex + "-day-" + dayIndex + "-matchup-blank-print"}/>);

  for (let matchup = 0; matchup < 3; matchup++) {

    if (day.matchups[matchup]) {

      printMatchups.push(
        <th key={"week-" + weekIndex + "-day-" + dayIndex + "-matchup-" + matchup + "-print"} style={{ "width": "125px" }}>
          <div style={{
            "display": "inline-block",
            "verticalAlign": "middle",
          }}>
            {day.matchups[matchup].firstTeam ? <img src={"/images/medium/" + day.matchups[matchup].firstTeam.value.file + ".svg"} /> : <div />}
          </div>
          <div style={{
            "display": "inline-block",
            "verticalAlign": "middle",
          }}>
            {day.matchups[matchup].secondTeam ? <img src={"/images/medium/" + day.matchups[matchup].secondTeam.value.file + ".svg"} /> : <div />}
          </div>
        </th>
      );

    } else {

      printMatchups.push(<th key={"week-" + weekIndex + "-day-" + dayIndex + "-matchup-" + matchup + "-print"} style={{ "width": "125px" }} />);

    }

  }

  return printMatchups;

};

const PlayerRows = ({ weekIndex, dayIndex, players }) => {

  const printPlayers = [];

  for (let player = 0; player < 6; player++) {

    printPlayers.push(
      <tr key={"week-" + weekIndex + "-day-" + dayIndex + "-player-" + player + "-print"}>
        <td />
        <td>{players[player] ? players[player].label : ""}</td>
        <td />
        <td />
        <td />
      </tr>
    );

  }

  printPlayers.push(
    <tr key={"week-" + weekIndex + "-day-" + dayIndex + "-player-final-print"}>
      <td />
      <td><b>FINAL</b></td>
      <td />
      <td />
      <td />
    </tr>
  );

  return printPlayers;

};

const Print = ({ leagueName, weeks }) => (

  <PrintTemplate>

    {weeks.map((week, weekIndex) => (

      <div key={"week-" + weekIndex + "-print"} className={weeks.length !== weekIndex + 1 ? "page-break" : ""} style={{ "margin": "0", "padding": "0" }}>
        <h2 className={"centered"}>OverWatch League - {leagueName}</h2>
        <h3 className={"centered"}>{week.date.format("L")}</h3>

        {week.days.map((day, dayIndex) => (

          <table className="day-table" key={"week-" + weekIndex + "-day-" + dayIndex + "-print"} style={{ "width": "100%", "margin": "0", "padding": "0" }}>
            <thead>
              <tr>
                <MatchupRows weekIndex={weekIndex} dayIndex={dayIndex} day={day} />
              </tr>
            </thead>

            <tbody>
              <PlayerRows weekIndex={weekIndex} dayIndex={dayIndex} players={week.players || []} />
            </tbody>

          </table>

        ))}

      </div>

    ))}

  </PrintTemplate>

);

Print.propTypes = {
  "leagueName": PropTypes.string.isRequired,
  "weeks": PropTypes.array.isRequired,
};

export default Print;
