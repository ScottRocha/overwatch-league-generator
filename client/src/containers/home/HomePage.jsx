import React from "react";

import Home from "../../components/home/Home";


class HomePage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "leagueName": "",
      "days": [],
      "printed": false,
      "expanded": {},
    };

  }

  onChangeLeagueName(leagueName) {

    this.setState({ leagueName });

  }

  onAddDay() {

    const days = this.state.days || [];
    const expanded = this.state.expanded;
    expanded[days.push({
      "players": [],
      "matchups": [[ "", "" ]],
    }) - 1] = {};
    this.setState({ days, expanded });

  }

  onRemoveDay(dayIndex) {

    const days = this.state.days;
    days.splice(dayIndex, 1);
    this.setState({ days });

  }

  onAddPlayer(dayIndex, playerName) {

    const days = this.state.days;
    days[dayIndex].players.push(playerName);
    this.setState({ days });

  }

  onChangePlayers(dayIndex, players) {

    const days = this.state.days;
    days[dayIndex].players = players || [];
    this.setState({ days });

  }

  onAddMatchup(dayIndex, firstTeam, secondTeam) {

    const days = this.state.days;
    days[dayIndex].matchups.push(firstTeam && secondTeam ? [ firstTeam, secondTeam ] : []);
    this.setState({ days });

  }

  onChangeMatchup(dayIndex, matchupIndex, firstTeam, secondTeam) {

    const days = this.state.days;
    days[dayIndex].matchups[matchupIndex] = [ firstTeam, secondTeam ];
    this.setState({ days });

  }

  onRemoveMatchup(dayIndex, matchupIndex) {

    const days = this.state.days;
    days[dayIndex].matchups.splice(matchupIndex, 1);
    this.setState({ days });

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
        days={this.state.days}
        printed={this.state.printed}
        expanded={this.state.expanded}
        onChangeLeagueName={this.onChangeLeagueName.bind(this)}
        onAddDay={this.onAddDay.bind(this)}
        onRemoveDay={this.onRemoveDay.bind(this)}
        onAddPlayer={this.onAddPlayer.bind(this)}
        onChangePlayers={this.onChangePlayers.bind(this)}
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
