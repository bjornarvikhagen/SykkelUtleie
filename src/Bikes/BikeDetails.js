import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

// Shows the details of the spesific bike you clicked on
export default class BikeDetails extends Component {
  bike = null;

  render() {
    if (!this.bike) return null;
    // returns all information stored about the bike you cliked from the database
    return (
      <div>
        {/* Button that takes you back to the list of all bikes */}
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
            {/*Button that takes you to the page you can update the bike status, calls the edit method */}
            <Button.Light onClick={this.edit}>Update bike status</Button.Light>
          </Column>
          <Column right>
            {/* Button that deletes this spesific bike from the database calls the delete method*/}
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </div>
    );
  }
  // collects the information about the bike you clicked from the database
  mounted() {
    bikeService.getBike(this.props.match.params.id, bike => {
      this.bike = bike;
    });
  }
  // takes you to the edit page when edit button is pushed
  edit() {
    history.push('/bikes/' + this.bike.BikeID + '/edit');
  }
  // takes you back to list of bikes when back-button is pushed
  back() {
    history.push('/bikes/');
  }
  // runs when delete-button is pushed and removes the bike from the database
  delete() {
    bikeService.deleteBike(this.props.match.params.id, () => history.push('/bikes'));
  }
}
