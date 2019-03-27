import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingNew extends Component {
  StartDate = '';
  EndDate = '';
  FK_CustomerID = '';
  FK_BikeID = '';
  FK_PickupID = '';
  FK_DropoffID = '';
  FK_Accessories = '';
  FK_InvoiceID = '';
  FK_BikeTypeID = '';

  render() {
    return (
      <div>
        <Card title="New Booking">
          <Form.Label>StartDate:</Form.Label>
          <Form.Input type="date" value={this.StartDate} onChange={e => (this.StartDate = e.target.value)} />
          <Form.Label>EndDate:</Form.Label>
          <Form.Input type="date" value={this.EndDate} onChange={e => (this.EndDate = e.target.value)} />
          <Form.Label>Customer ID:</Form.Label>
          <Form.Input type="text" value={this.FK_CustomerID} onChange={e => (this.FK_CustomerID = e.target.value)} />
          <Form.Label>Bike ID:</Form.Label>
          <Form.Input type="text" value={this.FK_BikeID} onChange={e => (this.FK_BikeID = e.target.value)} />
          <Form.Label>Pick up ID:</Form.Label>
          <Form.Input type="number" value={this.FK_PickupID} onChange={e => (this.FK_PickupID = e.target.value)} />
          <Form.Label>Drop off ID:</Form.Label>
          <Form.Input type="text" value={this.FK_DropoffID} onChange={e => (this.FK_DropoffID = e.target.value)} />
          <Form.Label>Accessories:</Form.Label>
          <Form.Input type="text" value={this.FK_Accessories} onChange={e => (this.FK_Accessories = e.target.value)} />
          <Form.Label>Invoice ID:</Form.Label>
          <Form.Input type="text" value={this.FK_InvoiceID} onChange={e => (this.FK_InvoiceID = e.target.value)} />
          <Form.Label>Bike Type ID:</Form.Label>
          <Form.Input type="text" value={this.FK_BikeTypeID} onChange={e => (this.FK_BikeTypeID = e.target.value)} />
        </Card>
        <Button.Success onClick={this.save}>Save</Button.Success>
      </div>
    );
  }
  save() {
    history.push('/bookings');
    customerService.newBooking(
      this.StartDate,
      this.EndDate,
      this.FK_CustomerID,
      this.FK_BikeID,
      this.FK_PickupID,
      this.FK_DropoffID,
      this.FK_Accessories,
      this.FK_InvoiceID,
      this.FK_BikeTypeID
    );
  }
}
