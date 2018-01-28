import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import Select from "react-select-plus";

import { DatePicker } from "material-ui-pickers";
import DocumentTitle from "react-document-title";

import Button from "material-ui/Button";
import Card, { CardActions, CardHeader, CardContent } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Grid from "material-ui/Grid";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import TextField from "material-ui/TextField";

import TeamOptionRenderer from "../../containers/team/TeamOptionRenderer";
import TeamValueRenderer from "../../containers/team/TeamValueRenderer";


const teamOptions = [
  { "value": { "file": "boston-uprising", "name": "Boston Uprising" } },
  { "value": { "file": "dallas-fuel", "name": "Dallas Fuel" } },
  { "value": { "file": "florida-mayhem", "name": "Florida Mayhem" } },
  { "value": { "file": "houston-outlaws", "name": "Houston Outlaws" } },
  { "value": { "file": "london-spitfire", "name": "London Spitfire" } },
  { "value": { "file": "los-angeles-gladiators", "name": "Los Angeles Gladiators" } },
  { "value": { "file": "los-angeles-valiant", "name": "Los Angeles Valiant" } },
  { "value": { "file": "new-york-excelsior", "name": "New-York Excelsior" } },
  { "value": { "file": "philadelphia-fusion", "name": "Philadelphia Fusion" } },
  { "value": { "file": "san-francisco-shock", "name": "San Francisco Shock" } },
  { "value": { "file": "seoul-dynasty", "name": "Seoul Dynasty" } },
  { "value": { "file": "shanghai-dragons", "name": "Shanghai Dragons" } },
];

const Home = ({
  leagueName, weeks, printed, expanded, onChangeLeagueName, onAddWeek, onRemoveWeek, onChangeWeekDate, onChangePlayers,
  onAddDay, onRemoveDay, onChangeDate, onAddMatchup, onChangeMatchup, onRemoveMatchup, onPrint, onExpandedChange,
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
                data={weeks}
                columns={[ {
                  "Header": "Week",
                  "Cell": (row) => row.index + 1,
                  "maxWidth": 50,
                }, {
                  "Header": "Week Start Date",
                  "Cell": (row) => (
                    <DatePicker
                      value={row.original.date}
                      onChange={(value) => onChangeWeekDate(row.index, value)}
                    />
                  ),
                  "maxWidth": 200,
                }, {
                  "Header": "Players",
                  "Cell": (row) => (
                    <Select.Creatable
                      multi
                      isValidNewOption={(option) => option.label && row.original.players.length !== 6}
                      options={[ { "label": "Mike", "value": "Mike" }, { "label": "Kat", "value": "Kat" }, { "label": "Joey", "value": "Joey" } ]}
                      onChange={(players) => onChangePlayers(row.index, players)}
                      value={row.original.players}
                    />
                  ),
                }, {
                  "Header": () => <div />,
                  "Cell": (row) => (
                    <Button raised disabled={row.original.days.length === 4} color="primary" style={{ "width": "100%" }} onClick={() => onAddDay(row.index)}>
                      Add Day
                    </Button>
                  ),
                  "maxWidth": 200,
                }, {
                  "Header": () => (
                    <Button raised color="primary" style={{ "width": "100%" }} onClick={() => onAddWeek()}>
                      Add Week
                    </Button>
                  ),
                  "Cell": (row) => (
                    <Button raised color="secondary" style={{ "width": "100%" }} onClick={() => onRemoveWeek(row.index)}>
                      Remove Week
                    </Button>
                  ),
                  "maxWidth": 200,
                } ]}
                expanded={expanded}
                onExpandedChange={(newExpanded) => {

                  onExpandedChange(newExpanded);

                }}
                SubComponent={(row) => (

                  <div>

                    {row.original.days.map((day, dayIndex) => (

                      <Table key={"week-" + row.index + "day-" + dayIndex} style={{ "textAlign": "center" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ "width": "50px" }}>Order</TableCell>
                            <TableCell style={{ "width": "200px", "padding": "5px" }}>
                              Day Date:
                              <DatePicker
                                value={day.date}
                                onChange={(value) => onChangeDate(row.index, dayIndex, value)}
                              />
                            </TableCell>
                            <TableCell style={{ "width": "250px", "padding": "5px" }}>Team 1</TableCell>
                            <TableCell style={{ "width": "250px", "padding": "5px" }}>Team 2</TableCell>
                            <TableCell style={{ "width": "200px", "padding": "5px" }}>
                              <Button raised color="secondary" style={{ "width": "100%" }} onClick={() => onRemoveDay(row.index, dayIndex)}>
                                Remove Day
                              </Button>
                            </TableCell>
                            <TableCell style={{ "width": "200px", "padding": "5px" }}>
                              <Button disabled={day.matchups.length === 3} raised color="primary" style={{ "width": "100%" }} onClick={() => onAddMatchup(row.index, dayIndex, "", "")}>
                                Add Matchup
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>

                          {day.matchups.map((matchup, matchupIndex) => (

                            <TableRow key={"week-" + row.index + "day-" + dayIndex + "-matchup-" + matchupIndex}>
                              <TableCell style={{ "width": "50px" }}>{matchupIndex + 1}</TableCell>
                              <TableCell style={{ "width": "200px", "padding": "5px" }} />
                              <TableCell style={{ "width": "250px", "padding": "5px" }}>
                                <Select
                                  optionComponent={TeamOptionRenderer}
                                  valueComponent={TeamValueRenderer}
                                  options={teamOptions}
                                  onChange={(value) => onChangeMatchup(row.index, dayIndex, matchupIndex, value, day.matchups[matchupIndex].secondTeam)}
                                  value={day.matchups[matchupIndex].firstTeam}
                                />
                              </TableCell>
                              <TableCell style={{ "width": "250px", "padding": "5px" }}>
                                <Select
                                  optionComponent={TeamOptionRenderer}
                                  valueComponent={TeamValueRenderer}
                                  options={teamOptions}
                                  onChange={(value) => onChangeMatchup(row.index, dayIndex, matchupIndex,day.matchups[matchupIndex].firstTeam, value)}
                                  value={day.matchups[matchupIndex].secondTeam}
                                />
                              </TableCell>
                              <TableCell style={{ "width": "200px", "padding": "5px" }} />
                              <TableCell style={{ "width": "200px", "padding": "5px" }}>
                                <Button raised color="secondary" style={{ "width": "100%" }} onClick={() => onRemoveMatchup(row.index, dayIndex, matchupIndex)}>
                                  Remove Matchup
                                </Button>
                              </TableCell>
                            </TableRow>

                          ))}

                        </TableBody>
                      </Table>

                    ))}

                  </div>
                )}
                filterable={false}
                sortable={false}
              >
              </ReactTable>
            </CardContent>
            <Divider />
            <CardActions>
              <Button raised color="secondary" onClick={onPrint}>
                Print / Download
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  </DocumentTitle>
);

Home.propTypes = {
  "leagueName": PropTypes.string.isRequired,
  "weeks": PropTypes.array.isRequired,
  "printed": PropTypes.bool.isRequired,
  "expanded": PropTypes.object.isRequired,
  "onChangeLeagueName": PropTypes.func.isRequired,
  "onAddWeek": PropTypes.func.isRequired,
  "onRemoveWeek": PropTypes.func.isRequired,
  "onChangeWeekDate": PropTypes.func.isRequired,
  "onChangePlayers": PropTypes.func.isRequired,
  "onAddDay": PropTypes.func.isRequired,
  "onRemoveDay": PropTypes.func.isRequired,
  "onChangeDate": PropTypes.func.isRequired,
  "onAddMatchup": PropTypes.func.isRequired,
  "onChangeMatchup": PropTypes.func.isRequired,
  "onRemoveMatchup": PropTypes.func.isRequired,
  "onPrint": PropTypes.func.isRequired,
  "onExpandedChange": PropTypes.func.isRequired,
};

export default Home;
