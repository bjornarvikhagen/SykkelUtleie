import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingDetails extends Component {
  rental = [];
  FK_BikeID = [];
  AccessoryID = [];

  render() {
    if (!this.rental) return null;

    return (
      <div>
        <Button.Light onClick={this.back}>Back</Button.Light>
        <Card title="Booking details">
          <Row>
            <Column width={2}>RentalID:</Column>
            <Column>{this.rental.RentalID}</Column>
          </Row>
          <Row>
            <Column width={2}>StartDate:</Column>
            <Column>{JSON.stringify(this.rental.StartDate)}</Column>
          </Row>
          <Row>
            <Column width={2}>EndDate:</Column>
            <Column>{JSON.stringify(this.rental.EndDate)}</Column>
          </Row>
          <Row>
            <Column width={2}>CustomerID:</Column>
            <Column id="customer">
              {' '}
              {this.rental.FK_CustomerID} - {this.rental.FirstName} {this.rental.LastName}
            </Column>
          </Row>
          <Row>
            <Column width={2}>PickupID:</Column>
            <Column>{this.rental.FK_PickupID}</Column>
          </Row>
          <Row>
            <Column width={2}>DropoffID:</Column>
            <Column>{this.rental.FK_DropoffID}</Column>
          </Row>
          <br />
          <h5> Rented Bikes: </h5>
          {this.FK_BikeID.map(bikes => (
            <List.Item key={bikes.FK_BikeID}>
              {' '}
              ID: {bikes.FK_BikeID} - {bikes.Brand} - {bikes.Name} - {bikes.Price}kr /day
            </List.Item>
          ))}
          <br />
          <h5> Rented Accessory: </h5>
          {this.AccessoryID.map(acc => (
            <List.Item key={acc.FK_AccessoryID}>
              {' '}
              ID: {acc.FK_AccessoryID} - {acc.Name} - {acc.Price}kr /day
            </List.Item>
          ))}
        </Card>
      </div>
    );
  }

  mounted() {
    bookingService.getBooking(this.props.match.params.id, rental => {
      this.rental = rental;
    });

    bookingService.getRentedBikes(this.props.match.params.id, FK_BikeID => {
      this.FK_BikeID = FK_BikeID;
    });
    bookingService.getRentedAccessories(this.props.match.params.id, AccessoryID => {
      this.AccessoryID = AccessoryID;
    });
  }

  back() {
    history.push('/bookings');
  }
}
