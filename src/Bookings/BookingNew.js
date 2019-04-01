import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingNew extends Component {
  StartDate = '';
  EndDate = '';
  FK_PickupID = '';
  FK_DropoffID = '';
  FK_BikeTypeID = '';
  FK_Accessories = '';
  FK_InvoiceID = '';
  FK_CustomerID = '';
  FK_BikeID = '';

  render() {
    return (
      <div>
        <Card title="New Booking">
          <Form.Label>StartDate:</Form.Label>
          <Form.Input type="date" value={this.StartDate} onChange={e => (this.StartDate = e.target.value)} />
          <Form.Label>EndDate:</Form.Label>
          <Form.Input type="date" value={this.EndDate} onChange={e => (this.EndDate = e.target.value)} />
          <Form.Label>PickUp:</Form.Label>
          <br />
          <select value={this.FK_PickupID} onChange={e => (this.FK_PickupID = e.target.value)}>
            <option value={0}>Velg sted..</option>
            <option value={1}>Haugastøl</option>
            <option value={2}>Finse </option>
          </select>
          <br />
          <Form.Label>DropOff:</Form.Label>
          <br />
          <select value={this.FK_DropoffID} onChange={e => (this.FK_DropoffID = e.target.value)}>
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
          <select value={this.FK_BikeTypeID} onChange={e => (this.FK_BikeTypeID = e.target.value)}>
            <option value={0}>Velg type..</option>
            <option value={1}>Mountain Bike</option>
            <option value={2}>Racer Bike </option>
            <option value={3}>Downhill Bike </option>
            <option value={4}>Tandem Bike </option>
            <option value={5}>Kids Bike </option>
          </select>
          <br />
        </Card>
        <Button.Success onClick={this.save}>Save</Button.Success>
      </div>
    );
  }
  save() {
    history.push('/bookings');
    bookingService.newBooking(
      this.StartDate,
      this.EndDate,
      this.FK_PickupID,
      this.FK_DropoffID,
      this.FK_BikeTypeID,
      this.FK_Accessories,
      this.FK_InvoiceID,
      this.FK_CustomerID,
      this.FK_BikeID
    );
  }
}
