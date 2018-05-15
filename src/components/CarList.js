import React from 'react';
import {load, writeCSV, createSheet} from '../helpers/spreadsheet';
import config from '../config'

class CarList extends React.Component {

  state = {
    cars: [],
    error: null
  };

  componentDidMount() {
    window.gapi.load('client', this.initClient);
  }

  initClient = async () => {
    await window.gapi.client
        .init({
          apiKey: config.apiKey,
          discoveryDocs: config.discoveryDocs,
          scope: config.scope,
          clientId: config.clientId
        });
    const {spreadsheetId, spreadsheetUrl} = await createSheet();
    console.log(spreadsheetId, spreadsheetUrl);
    writeCSV(spreadsheetId);
    // .then(() => load(this.onLoad))
    // .then(() => window.gapi.auth2.getAuthInstance().isSignedIn.get())
    // .then(isSignedIn => {
    //   if (isSignedIn) return writeCSV();
    //   return window.gapi.auth2.getAuthInstance().signIn()
    // })
    // .then(() => writeCSV())
  };

  onLoad = (data, error) => {
    if (data) {
      const {cars} = data;
      this.setState({cars});
    } else {
      this.setState({error});
    }
  };

  render() {
    const {cars, error} = this.state;
    if (error) {
      return <div>{this.state.error}</div>;
    }
    return (
        <ul>
          {cars.map((car, i) => (
              <li key={i}>
                {car.year} {car.make} {car.model}
              </li>
          ))}
        </ul>
    );
  }
}

export default CarList;