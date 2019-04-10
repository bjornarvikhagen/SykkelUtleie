import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingReturn extends Component {
  rental = [];
  FK_BikeID = [];
  AccessoryID = [];
  BikeLocation = '';
  render() {
    // Returns the information needed to return a booking
    return (
      <div>
        <Card title="Register Return">
          <Row>
            <Column width={2}>RentalID:</Column>
            <Column>{this.rental.RentalID}</Column>
          </Row>
          <Row>
            <Column width={2}>Dropoff ID:</Column>
            <Column>{this.rental.FK_DropoffID}</Column>
          </Row>
          <br />
          {/*Gets all the bikes in this rental  */}
          <h5> Rented Bikes: </h5>
          {this.FK_BikeID.map(bikes => (
            <List.Item key={bikes.FK_BikeID}>
              ID: {bikes.FK_BikeID} - {bikes.Brand} - {bikes.Name} - {bikes.Price}kr /day
              {console.log(this.FK_BikeID)}
            </List.Item>
          ))}
          <br />
          {/*Gets all accessories in this rental */}
          <h5> Rented Accessory: </h5>
          {this.AccessoryID.map(acc => (
            <List.Item key={acc.FK_AccessoryID}>
              ID: {acc.FK_AccessoryID} - {acc.Name} - {acc.Price}kr /day
              {console.log(this.AccessoryID)}
            </List.Item>
          ))}
          <br />
          {/* calls the register method*/}
          <Button.Success big onClick={this.register}>
            Register Return
          </Button.Success>
        </Card>
      </div>
    );
  }
  // Gets the information about the booking from the database for this ID
  mounted() {
    bookingService.getBooking(this.props.match.params.id, rental => {
      this.rental = rental;
      console.log(this.rental);
    });
    bookingService.getRentedBikes(this.props.match.params.id, FK_BikeID => {
      this.FK_BikeID = FK_BikeID;
      console.log(this.FK_BikeID);
    });
    bookingService.getRentedAccessories(this.props.match.params.id, AccessoryID => {
      this.AccessoryID = AccessoryID;
      console.log(this.AccessoryID);
    });
  }
  // sets the booking status to completed and updates the location for the bike
  register() {
    history.push('/bookings');
    locationService.updateBikeLocation(this.props.match.params.id, location, () => {
      this.BikeLocation = location;
    });
    console.log(this.rental.RentalID);
    console.log(this.rental.FK_DropoffID);
    console.log(this.FK_BikeID);

    bookingService.changeRentalStatus(this.props.match.params.id, rental => {
      this.RentalID = rental.RentalID;
    });
  }
}
