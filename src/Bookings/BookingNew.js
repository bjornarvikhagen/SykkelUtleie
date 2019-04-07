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

  render() {
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
          <Form.Input type="number" value={this.FK_CustomerID} onChange={e => (this.FK_CustomerID = e.target.value)} />
          <Form.Label>PickUp:</Form.Label>
          <br />
          <select id="PickUp" value={this.FK_PickupID} onChange={e => (this.FK_PickupID = e.target.value)}>
            <option value={0}>Velg sted..</option>
            <option value={1}>Haugastøl</option>
            <option value={2}>Finse </option>
          </select>
          <br />
          <Form.Label>DropOff:</Form.Label>
          <br />
          <select id="DropOff" value={this.FK_DropoffID} onChange={e => (this.FK_DropoffID = e.target.value)}>
            <option value={0}>Velg sted..</option>
            <option value={1}>Haugastøl</option>
            <option value={2}>Finse </option>
            <option value={3}>Flåm </option>
            <option value={4}>Voss </option>
            <option value={5}>Myrdal </option>
          </select>
          <br />
          <Form.Label>BikeType:</Form.Label>
          <br />
          <select id="type" value={this.FK_BikeTypeID} onChange={this.getBikes}>
            <option value={0}>Choose type..</option>
            <option value={1}>Mountain Bike</option>
            <option value={2}>Racer Bike </option>
            <option value={3}>Downhill Bike </option>
            <option value={4}>Tandem Bike </option>
            <option value={5}>Kids Bike </option>
          </select>
          <br />
          <List>
            {this.FK_BikeID.map(bike => (
              <List.Item key={bike.BikeID}>
                BikeID: {bike.BikeID} - {bike.Name} - {bike.Price} per day{' '}
                <input type="checkbox" value={this.FK_BikeID} onChange={e => (bike.checked = e.target.checked)} />
              </List.Item>
            ))}
          </List>
          <Button.Light onClick={this.addBike}>Add Bike</Button.Light>
          <br /> <br />
          <p> Bikes in this rental: </p>
          <List>
            {this.rentedBikes.map(bikes => (
              <List.Item key={bikes.FK_BikeID}> {bikes.FK_BikeID}</List.Item>
            ))}
          </List>
          <Form.Label>InnvoiceID:</Form.Label>
          <Form.Input
            type="number"
            id="inid"
            value={this.FK_InvoiceID}
            onChange={e => (this.FK_InvoiceID = e.target.value)}
          />
          <br /> <br />
        </Card>
        <Button.Success onClick={this.save}>Save</Button.Success>
      </div>
    );
  }

  mounted() {
    bookingService.getRentalID(rental => {
      this.RentalID = rental.RentalID + 1;
    });

    // bookingService.getBikesinRental(document.getElementById('id').value, rentedBikes => {
    //   this.rentedBikes = rentedBikes;
    // });

    //   //hent bikes som tilhører denne rental ID
    //   bookingService.getBikesinRental(rentedBikes => {
    //     this.rentedBikes = rentedBikes.rentedBikes;
    //   });
  }

  getBikes() {
    bookingService.getBikes(document.getElementById('type').value, FK_BikeID => {
      this.FK_BikeID = FK_BikeID;
    });
  }

  addBike() {
    for (let x = 0; x < this.FK_BikeID.length; x++) {
      if (this.FK_BikeID[x].checked == true) {
        console.log('checked' + this.FK_BikeID[x].BikeID);
        bookingService.addBike(this.RentalID, this.FK_BikeID[x].BikeID, () => {});
      }
    }
  }

  save() {
    history.push('/bookings');
    bookingService.newBooking(
      this.RentalID,
      this.StartDate,
      this.EndDate,
      this.FK_CustomerID,
      this.FK_PickupID,
      this.FK_DropoffID,
      this.FK_InvoiceID
    );
  }
}
