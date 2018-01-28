import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";

import Home from "../../components/home/Home";
import TemplatePrint from "../../components/TemplatePrint";


class HomePage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "leagueName": "Owl's Nest",
      "weeks": [],
      "printed": false,
      "expanded": {},
    };

  }

  componentDidUpdate() {

    ReactDOM.render(<TemplatePrint leagueName={this.state.leagueName} weeks={this.state.weeks} />, document.getElementById("print-mount"));

  }

  onChangeLeagueName(leagueName) {

    this.setState({ leagueName });

  }

  onAddWeek() {

    const weeks = this.state.weeks || [];
    const expanded = this.state.expanded;
    expanded[weeks.push({
      "date": moment(),
      "players": [],
      "days": [{
        "date": moment(),
        "players": [],
        "matchups": [{
          "firstTeam": "",
          "secondTeam": "",
        }],
      }],
    }) - 1] = {};
    this.setState({ weeks, expanded });

  }

  onRemoveWeek(weekIndex) {

    const weeks = this.state.weeks;
    weeks.splice(weekIndex, 1);
    this.setState({ weeks });

  }

  onChangeWeekDate(weekIndex, date) {

    const weeks = this.state.weeks;
    weeks[weekIndex].date = date || moment();
    this.setState({ weeks });

  }

  onChangePlayers(weekIndex, players) {

    const weeks = this.state.weeks;
    weeks[weekIndex].players = players || [];
    this.setState({ weeks });

  }

  onAddDay(weekIndex) {

    const weeks = this.state.weeks || [];
    weeks[weekIndex].days.push({
      "players": [],
      "date": moment(),
      "matchups": [{
        "firstTeam": "",
        "secondTeam": "",
      }],
    });
    this.setState({ weeks });

  }

  onRemoveDay(weekIndex, dayIndex) {

    const weeks = this.state.weeks;
    weeks[weekIndex].days.splice(dayIndex, 1);
    this.setState({ weeks });

  }

  onChangeDate(weekIndex, dayIndex, date) {

    const weeks = this.state.weeks;
    weeks[weekIndex].days[dayIndex].date = date;
    this.setState({ weeks });

  }

  onAddMatchup(weekIndex, dayIndex, firstTeam, secondTeam) {

    const weeks = this.state.weeks;
    weeks[weekIndex].days[dayIndex].matchups.push(firstTeam && secondTeam ? {
      "date": moment(),
      firstTeam,
      secondTeam,
    } : {
      "date": moment(),
      "firstTeam": "",
      "secondTeam": "",
    });
    this.setState({ weeks });

  }

  onChangeMatchup(weekIndex, dayIndex, matchupIndex, firstTeam, secondTeam) {

    const weeks = this.state.weeks;
    weeks[weekIndex].days[dayIndex].matchups[matchupIndex].firstTeam = firstTeam;
    weeks[weekIndex].days[dayIndex].matchups[matchupIndex].secondTeam = secondTeam;
    this.setState({ weeks });

  }

  onRemoveMatchup(weekIndex, dayIndex, matchupIndex) {

    const weeks = this.state.weeks;
    weeks[weekIndex].days[dayIndex].matchups.splice(matchupIndex, 1);
    this.setState({ weeks });

  }

  onPrint() {

    this.setState({
      "printed": true,
    }, () => {

      //redirect

    });

  }

  onExpandedChange(expanded) {

    this.setState({
      "expanded": Object.assign({}, this.state.expanded, expanded),
    });

  }

  render() {

    return (
      <Home
        leagueName={this.state.leagueName}
        weeks={this.state.weeks}
        printed={this.state.printed}
        expanded={this.state.expanded}
        onChangeLeagueName={this.onChangeLeagueName.bind(this)}
        onAddWeek={this.onAddWeek.bind(this)}
        onRemoveWeek={this.onRemoveWeek.bind(this)}
        onChangeWeekDate={this.onChangeWeekDate.bind(this)}
        onChangePlayers={this.onChangePlayers.bind(this)}
        onAddDay={this.onAddDay.bind(this)}
        onRemoveDay={this.onRemoveDay.bind(this)}
        onChangeDate={this.onChangeDate.bind(this)}
        onAddMatchup={this.onAddMatchup.bind(this)}
        onChangeMatchup={this.onChangeMatchup.bind(this)}
        onRemoveMatchup={this.onRemoveMatchup.bind(this)}
        onPrint={this.onPrint.bind(this)}
        onExpandedChange={this.onExpandedChange.bind(this)}
      />
    );

  }

}

export default HomePage;
