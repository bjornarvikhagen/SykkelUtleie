import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BikeDetails extends Component {
  bike = null;

  render() {
    if (!this.bike) return null;

    return (
      <div>
        <Button.Light onClick={this.back}>Back</Button.Light>
        <Card title="Bike details">
          <Row>
            <Column width={2}>BikeID:</Column>
            <Column>{this.bike.BikeID}</Column>
          </Row>
          <Row>
            <Column width={2}>Brand:</Column>
            <Column>{this.bike.Brand}</Column>
          </Row>
          <Row>
            <Column width={2}>BikeType:</Column>
            <Column>{this.bike.FK_BikeTypeID}</Column>
          </Row>
          <Row>
            <Column width={2}>Year:</Column>
            <Column>{this.bike.Year}</Column>
          </Row>
          <Row>
            <Column width={2}>Status:</Column>
            <Column>{this.bike.Status}</Column>
          </Row>
          <Row>
            <Column width={2}>Wheelsize:</Column>
            <Column>{this.bike.Wheelsize}</Column>
          </Row>
          <Row>
            <Column width={2}>Framesize:</Column>
            <Column>{this.bike.Framesize}</Column>
          </Row>
          <Row>
            <Column width={2}>Shiftsystem:</Column>
            <Column>{this.bike.Shiftsystem}</Column>
          </Row>
          <Row>
            <Column width={2}>Information:</Column>
            <Column>{this.bike.Information}</Column>
          </Row>
        </Card>
        <Row>
          <Column>
            <Button.Light onClick={this.edit}>Update bike status</Button.Light>
          </Column>
          <Column right>
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    bikeService.getBike(this.props.match.params.id, bike => {
      this.bike = bike;
    });
  }
  edit() {
    history.push('/bikes/' + this.bike.BikeID + '/edit');
  }
  back() {
    history.push('/bikes/');
  }
  delete() {
    bikeService.deleteBike(this.props.match.params.id, () => history.push('/bikes'));
  }
}
