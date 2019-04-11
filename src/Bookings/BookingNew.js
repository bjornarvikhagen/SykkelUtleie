import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingNew extends Component {
  RentalID = 0;
  StartDate = '';
  EndDate = '';
  FK_CustomerID = '';
  FK_PickupID = '';
  FK_DropoffID = '';
  FK_BikeTypeID = '';
  FK_BikeID = [];
  rentedBikes = [];
  FK_InvoiceID = '';
  FK_CustomerID = '';
  AccessoryType = '';
  AccessoryID = [];
  rentedAccessories = [];
  customer = null;

  render() {
    if (!this.customer) return null;
    // Returns the inputs, checkboxes and buttons required to add a new booking
    return (
      <div>
        <Card title="New Booking">
          <Form.Label>RentalID:</Form.Label>
          <Form.Input type="number" id="id" value={this.RentalID} onChange={e => (this.RentalID = e.target.value)} />
          <Form.Label>StartDate:</Form.Label>
          <Form.Input type="date" id="start" value={this.StartDate} onChange={e => (this.StartDate = e.target.value)} />
          <Form.Label>EndDate:</Form.Label>
          <Form.Input type="date" id="end" value={this.EndDate} onChange={e => (this.EndDate = e.target.value)} />
          <Form.Label>Customer ID:</Form.Label>
          <Form.Input
            type="number"
            value={this.customer.CustomerID}
            onChange={e => (this.customer.CustomerID = e.target.value)}
          />
          <Form.Label>PickUp:</Form.Label>
          <br />
          <select id="PickUp" value={this.FK_PickupID} onChange={e => (this.FK_PickupID = e.target.value)}>
            <option value={0}>Choose location..</option>
            <option value={1}>Haugastøl</option>
            <option value={2}>Finse </option>
          </select>
          <br />
          <Form.Label>DropOff:</Form.Label>
          <br />
          <select id="DropOff" value={this.FK_DropoffID} onChange={e => (this.FK_DropoffID = e.target.value)}>
            <option value={0}>Choose location..</option>
            <option value={1}>Haugastøl</option>
            <option value={2}>Finse </option>
            <option value={3}>Flåm </option>
            <option value={4}>Voss </option>
            <option value={5}>Myrdal </option>
          </select>
          <br />
          <Form.Label>BikeType:</Form.Label>
          <br />
          {/* Selection of different biketypes. Runs the getbikes method when changed */}
          <select id="type" value={this.FK_BikeTypeID} onChange={this.getBikes}>
            <option value={0}>Choose type..</option>
            <option value={1}>Mountain Bike</option>
            <option value={2}>Racer Bike </option>
            <option value={3}>Downhill Bike </option>
            <option value={4}>Tandem Bike </option>
            <option value={5}>Kids Bike </option>
          </select>
          <br />
          {/*List of all bikes avalible in choosen biketype */}
          <List>
            {this.FK_BikeID.map(bike => (
              <List.Item key={bike.BikeID}>
                BikeID: {bike.BikeID} - {bike.Name} - {bike.Price}kr per day{' '}
                <input type="checkbox" value={this.FK_BikeID} onChange={e => (bike.checked = e.target.checked)} />
              </List.Item>
            ))}
          </List>
          {/*Calls the addbike function that adds the selected bikes to the rental*/}
          <Button.Light onClick={this.addBike}>Add Bike</Button.Light>
          <br /> <br />
          <Form.Label>Bikes in this rental: </Form.Label>
          {/*List of the bikes you have added in this rental */}
          <List>
            {this.rentedBikes.map(bikes => (
              <List.Item key={bikes.FK_BikeID}> BikeID: {bikes.FK_BikeID}</List.Item>
            ))}
          </List>
          <br />
          {/*Removes all the bikes from this rental */}
          <Button.Light onClick={this.removeBike}>Remove bikes</Button.Light>
          <br />
          <Form.Label>Accessory Type:</Form.Label>
          <br />
          {/*Option list with all different types off Accessory. When selected the getAcc method runs */}
          <select id="acctype" value={this.AccessoryType} onChange={this.getAcc}>
            <option value={0}>Choose type..</option>
            <option value={1}>Helmet</option>
            <option value={2}>Bike Bag</option>
            <option value={3}>Lock</option>
            <option value={4}>Cargo Trailer </option>
            <option value={5}>Kids Trailer </option>
          </select>
          <List>
            {/*List of avalible accessory in choosen accessory type */}
            {this.AccessoryID.map(acc => (
              <List.Item key={acc.AccessoryID}>
                {acc.Name} - {acc.Price}kr per day{' '}
                <input type="checkbox" value={this.AccessoryID} onChange={e => (acc.checked = e.target.checked)} />
              </List.Item>
            ))}
          </List>
          {/*Adds checked accessory to the rental */}
          <Button.Light onClick={this.addAcc}>Add Accessory</Button.Light>
          <br /> <br />
          <Form.Label>Accessory in this rental: </Form.Label>
          {/*Shows the accessory selected in this rental */}
          <List>
            {this.rentedAccessories.map(acc => (
              <List.Item key={acc.FK_AccessoryID}> AccessoryID: {acc.FK_AccessoryID}</List.Item>
            ))}
          </List>
          <br />
          {/*Removes all choosen accessory from this rental */}
          <Button.Light onClick={this.removeAcc}>Remove Accessory</Button.Light>
          <br /> <br />
        </Card>
        {/*Saves all the information about the booking to the databse */}
        <Button.Success onClick={this.save}>Save</Button.Success>
      </div>
    );
  }
  // Gets the RentalID for the new booking and the CustomerID for the customer who is making the booking
  mounted() {
    bookingService.getRentalID(rental => {
      this.RentalID = rental.RentalID + 1;
    });
    customerService.getCustomer(this.props.match.params.id, customer => {
      this.customer = customer;
    });
  }
  // Gets the bikes from the database sorted by selected bike type
  getBikes() {
    bookingService.getBikes(document.getElementById('type').value, FK_BikeID => {
      this.FK_BikeID = FK_BikeID;
    });
  }
  // Gets the accessory from the database sorted by the selected Accessorytype
  getAcc() {
    bookingService.getAcc(document.getElementById('acctype').value, AccessoryID => {
      this.AccessoryID = AccessoryID;
    });
  }
  // Adds checked bikes to the rentals and checked what bikes that are in this rental
  addBike() {
    for (let x = 0; x < this.FK_BikeID.length; x++) {
      if (this.FK_BikeID[x].checked == true) {
        console.log('checked bike' + this.FK_BikeID[x].BikeID);
        bookingService.addBike(this.RentalID, this.FK_BikeID[x].BikeID, () => {});
        bookingService.getBikesinRental(this.RentalID, rentedBikes => {
          this.rentedBikes = rentedBikes;
        });
      }
    }
  }
  // Adds checked accessory to the rental and updates the list of accessories in the rental
  addAcc() {
    for (let x = 0; x < this.AccessoryID.length; x++) {
      if (this.AccessoryID[x].checked == true) {
        console.log('checked acc' + this.AccessoryID[x].AccessoryID);
        bookingService.addAcc(this.RentalID, this.AccessoryID[x].AccessoryID, () => {});
        bookingService.getAccinRental(this.RentalID, rentedAccessories => {
          this.rentedAccessories = rentedAccessories;
        });
      }
    }
  }
  // removes all the bikes from this rental
  removeBike() {
    bookingService.removeBike(this.RentalID, () => {});
    console.log(this.RentalID);

    bookingService.getBikesinRental(this.RentalID, rentedBikes => {
      this.rentedBikes = rentedBikes;
    });
  }
  // removes all the accessories from this rental
  removeAcc() {
    bookingService.removeAcc(this.RentalID, () => {});

    bookingService.getAccinRental(this.RentalID, rentedAccessories => {
      this.rentedAccessories = rentedAccessories;
    });
  }
  // saves the information from the inputfields to the database
  save() {
    history.push('/bookings');
    bookingService.newBooking(
      this.RentalID,
      this.StartDate,
      this.EndDate,
      this.customer.CustomerID,
      this.FK_PickupID,
      this.FK_DropoffID
    );
  }
}
