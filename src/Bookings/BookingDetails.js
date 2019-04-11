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

        <Card title="Booking details:">
          <Column right>
            <Button.Danger onClick={this.return}>Register return</Button.Danger>
          </Column>
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
          <Row>
            <Column width={2}>Payment status:</Column>
            <Column>
              {this.rental.PaymentStatus}{' '}
              <Button.Success id="paid" onClick={this.pay}>
                Update to Paid
              </Button.Success>
            </Column>
          </Row>
          <br />
          <h5> Rented Bikes: </h5>
          {this.FK_BikeID.map(bikes => (
            <List.Item key={bikes.FK_BikeID}>
              ID: {bikes.FK_BikeID} - {bikes.Brand} - {bikes.Name} - {bikes.Price}kr /day
              {console.log(this.FK_BikeID)}
            </List.Item>
          ))}
          <br />
          <h5> Rented Accessory: </h5>
          {this.AccessoryID.map(acc => (
            <List.Item key={acc.FK_AccessoryID}>
              ID: {acc.FK_AccessoryID} - {acc.Name} - {acc.Price}kr /day
              {console.log(this.AccessoryID)}
            </List.Item>
          ))}
          <br />
          <h5>Price:</h5>
          <span id="pris" />
        </Card>
      </div>
    );
  }

  mounted() {
    bookingService.getBooking(this.props.match.params.id, rental => {
      this.rental = rental;

      let startdate = Date.parse(JSON.stringify(this.rental.StartDate).replace(/\"/g, ''));
      let enddate = Date.parse(JSON.stringify(this.rental.EndDate).replace(/\"/g, ''));

      console.log(startdate / 8.64e7);
      console.log(enddate / 8.64e7);
      console.log(enddate / 8.64e7 - startdate / 8.64e7);
    });

    bookingService.getRentedBikes(this.props.match.params.id, FK_BikeID => {
      this.FK_BikeID = FK_BikeID;
    });
    bookingService.getRentedAccessories(this.props.match.params.id, AccessoryID => {
      this.AccessoryID = AccessoryID;
    });

    let totalpris = 0;

    setTimeout(() => {
      this.FK_BikeID.forEach(el => (totalpris += el.Price));
      this.AccessoryID.forEach(el => (totalpris += el.Price));

      document.getElementById('pris').innerHTML = totalpris;
    }, 1000);
  }

  pay() {
    bookingService.pay(this.props.match.params.id, rentals => {
      this.pay = rentals.PaymentStatus;
    });
    this.mounted();
  }

  back() {
    history.push('/bookings');
  }
  return() {
    history.push('/bookings/' + this.rental.RentalID + '/return');
  }
}
