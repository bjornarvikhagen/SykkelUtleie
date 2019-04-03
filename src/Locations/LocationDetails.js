import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class LocationDetails extends Component {
  location = null;

  render() {
    if (!this.location) return null;

    return (
      <div>
        <Button.Light onClick={this.back}>Back</Button.Light>
        <Card title="Location details">
          <Row>
            <Column width={2}>LocationID:</Column>
            <Column>{this.location.LocationID}</Column>
          </Row>
          <Row>
            <Column width={2}>Address:</Column>
            <Column>{this.location.Address}</Column>
          </Row>
          <Row>
            <Column width={2}>Zip:</Column>
            <Column>{this.location.Zip}</Column>
          </Row>
          <Row>
            <Column width={2}>Place:</Column>
            <Column> {this.location.Place}</Column>
          </Row>
        </Card>
      </div>
    );
  }
  mounted() {
    locationService.getLocation(this.props.match.params.id, location => {
      this.location = location;
    });
  }
  back() {
    history.push('/locations');
  }
}
