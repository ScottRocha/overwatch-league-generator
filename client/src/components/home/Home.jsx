import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import Select from "react-select-plus";

import DocumentTitle from "react-document-title";

import Button from "material-ui/Button";
import Card, { CardActions, CardHeader, CardContent } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Grid from "material-ui/Grid";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import TextField from "material-ui/TextField";

import TeamOptionRenderer from "../../containers/team/TeamOptionRenderer";
import TeamValueRenderer from "../../containers/team/TeamValueRenderer";
import TemplatePrint from "../TemplatePrint";

const teamOptions = [
  { "value": { "file": "boston-uprising", "name": "Boston Uprising" } },
  { "value": { "file": "dallas-fuel", "name": "Dallas Fuel" } },
  { "value": { "file": "florida-mayhem", "name": "Florida Mayhem" } },
  { "value": { "file": "houston-outlaws", "name": "Houston Outlaws" } },
  { "value": { "file": "london-spitfire", "name": "London Spitfire" } },
  { "value": { "file": "los-angeles-gladiators", "name": "Los Angeles Gladiators" } },
  { "value": { "file": "new-york-excelsior", "name": "New-York Excelsior" } },
  { "value": { "file": "philadelphia-fusion", "name": "Philadelphia Fusion" } },
  { "value": { "file": "san-francisco-shock", "name": "San Francisco Shock" } },
  { "value": { "file": "seoul-dynasty", "name": "Seoul Dynasty" } },
  { "value": { "file": "shanghai-dragons", "name": "Shanghai Dragons" } },
];

const Home = ({
  leagueName, days, printed, expanded, onChangeLeagueName, onAddDay, onRemoveDay,
  onChangePlayers, onAddMatchup, onChangeMatchup, onRemoveMatchup, onPrint, onExpandedChange,
}) => (
  <DocumentTitle title={"Home - OverWatch League Generator"}>
    <div>
      <Grid container spacing={8} justify="center">
        <Grid item sm={10} className={"centered"}>
          <Card className="centered-card">
            <CardHeader
              title="OverWatch League Generator Page"
              subtitle="Please enter your information to generate a League Print-out"
            />
            <CardContent>
              <div style={{ "padding": "0px 20%", "marginBottom": "10px" }}>
                <TextField
                  name="leagueName"
                  label="League Name"
                  fullWidth={true}
                  value={leagueName}
                  onChange={(event) => onChangeLeagueName(event.target.value)}
                  error={!leagueName && printed}
                  helperText={!leagueName && printed && "This field is required"}
                />
              </div>
              <ReactTable
                manual
                data={days}
                columns={[ {
                  "Header": "Day",
                  "Cell": (row) => row.index + 1,
                  "maxWidth": 50,
                }, {
                  "Header": "Players",
                  "Cell": (row) => (
                    <Select.Creatable
                      multi
                      isValidNewOption={(option) => {

                        return option.label && row.original.players.length !== 6;

                      }}
                      options={[ { "label": "Mike", "value": "Mike" }, { "label": "Kat", "value": "Kat" }, { "label": "Joey", "value": "Joey" } ]}
                      onChange={(players) => onChangePlayers(row.index, players)}
                      value={row.original.players}
                    />
                  ),
                }, {
                  "Header": () => (
                    <Button disabled={days.length === 4} raised color="primary" style={{ "width": "100%" }} onClick={() => onAddDay()}>
                      Add Day
                    </Button>
                  ),
                  "Cell": (row) => (
                    <Button raised color="accent" style={{ "width": "100%" }} onClick={() => onRemoveDay(row.index)}>
                      Remove Day
                    </Button>
                  ),
                  "maxWidth": 200,
                } ]}
                expanded={expanded}
                onExpandedChange={(newExpanded) => {

                  onExpandedChange(newExpanded);

                }}
                SubComponent={(row) => (

                  <Table style={{ "textAlign": "center" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ "width": "50px" }}>Order</TableCell>
                        <TableCell>Team 1</TableCell>
                        <TableCell>Team 2</TableCell>
                        <TableCell style={{ "width": "200px", "padding": "5px" }}>
                          <Button disabled={row.original.matchups.length === 3} raised color="primary" style={{ "width": "100%" }} onClick={() => onAddMatchup(row.index, "", "")}>
                            Add Matchup
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.original.matchups.map((matchup, matchupIndex) => (

                        <TableRow key={"day-" + row.index + "-matchup-" + matchupIndex}>
                          <TableCell style={{ "width": "50px" }}>{matchupIndex + 1}</TableCell>
                          <TableCell>
                            <Select
                              optionComponent={TeamOptionRenderer}
                              valueComponent={TeamValueRenderer}
                              options={teamOptions}
                              onChange={(value) => onChangeMatchup(row.index, matchupIndex, value, row.original.matchups[matchupIndex][1])}
                              value={row.original.matchups[matchupIndex][0]}
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              optionComponent={TeamOptionRenderer}
                              valueComponent={TeamValueRenderer}
                              options={teamOptions}
                              onChange={(value) => onChangeMatchup(row.index, matchupIndex, row.original.matchups[matchupIndex][0], value)}
                              value={row.original.matchups[matchupIndex][1]}
                            />
                          </TableCell>
                          <TableCell style={{ "width": "200px", "padding": "5px" }}>
                            <Button raised color="accent" style={{ "width": "100%" }} onClick={() => onRemoveMatchup(row.index, matchupIndex)}>
                              Remove Matchup
                            </Button>
                          </TableCell>
                        </TableRow>

                      ))}
                    </TableBody>
                  </Table>

                )}
                filterable={false}
                sortable={false}
              >
              </ReactTable>
            </CardContent>
            <Divider />
            <CardActions>
              <Button raised color="accent" onClick={onPrint}>
                Print / Download
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {ReactDOM.render(<TemplatePrint leagueName={leagueName} days={days} />, document.getElementById("print-mount"))}
    </div>
  </DocumentTitle>
);

Home.propTypes = {
  "leagueName": PropTypes.string.isRequired,
  "days": PropTypes.array.isRequired,
  "printed": PropTypes.bool.isRequired,
  "expanded": PropTypes.object.isRequired,
  "onChangeLeagueName": PropTypes.func.isRequired,
  "onAddDay": PropTypes.func.isRequired,
  "onRemoveDay": PropTypes.func.isRequired,
  "onAddPlayer": PropTypes.func.isRequired,
  "onChangePlayers": PropTypes.func.isRequired,
  "onAddMatchup": PropTypes.func.isRequired,
  "onChangeMatchup": PropTypes.func.isRequired,
  "onRemoveMatchup": PropTypes.func.isRequired,
  "onPrint": PropTypes.func.isRequired,
  "onExpandedChange": PropTypes.func.isRequired,
};

export default Home;
