import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BikeNew extends Component {
  Brand = '';
  Year = '';
  Status = '';
  Wheelsize = '';
  Framesize = '';
  Shiftsystem = '';
  Information = '';
  FK_Location = '';
  FK_BikeTypeID = '';

  render() {
    return (
      <div>
        <Card title="New Bike">
          <Form.Label>Brand:</Form.Label>
          <Form.Input type="text" value={this.Brand} onChange={e => (this.Brand = e.target.value)} />
          <Form.Label>Year:</Form.Label>
          <Form.Input type="number" value={this.Year} onChange={e => (this.Year = e.target.value)} />
          <Form.Label>Status:</Form.Label>
          <Form.Input type="number" value={this.Status} onChange={e => (this.Status = e.target.value)} />
          <Form.Label>Wheelsize:</Form.Label>
          <Form.Input type="number" value={this.Wheelsize} onChange={e => (this.Wheelsize = e.target.value)} />
          <Form.Label>Framesize:</Form.Label>
          <Form.Input type="number" value={this.Framesize} onChange={e => (this.Framesize = e.target.value)} />
          <Form.Label>Shiftsystem:</Form.Label>
          <Form.Input type="text" value={this.Shiftsystem} onChange={e => (this.Shiftsystem = e.target.value)} />
          <Form.Label>Information:</Form.Label>
          <Form.Input type="text" value={this.Informatioin} onChange={e => (this.Information = e.target.value)} />
          <Form.Label>Location:</Form.Label>
          <Form.Input type="number" value={this.FK_Location} onChange={e => (this.FK_Location = e.target.value)} />
          <Form.Label>Bike type:</Form.Label>
          <Form.Input type="number" value={this.FK_BikeTypeID} onChange={e => (this.FK_BikeTypeID = e.target.value)} />
        </Card>
        <Button.Success onClick={this.add}>Add</Button.Success>
      </div>
    );
  }
  add() {
    history.push('/bikes');
    bikeService.newBike(
      this.Brand,
      this.Year,
      this.Status,
      this.Wheelsize,
      this.Framesize,
      this.Shiftsystem,
      this.Information,
      this.FK_Location,
      this.FK_BikeTypeID
    );
  }
}
