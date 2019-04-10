import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class CustomerNew extends Component {
  FirstName = '';
  LastName = '';
  Mobile = '';
  Email = '';
  Address = '';
  Zip = '';
  City = '';
  Country = '';

  render() {
    // Returns the input-fields requierd to add a new Customer to the databse
    return (
      <div>
        <Card title="New Customer">
          <Form.Label>FirstName:</Form.Label>
          <Form.Input type="text" value={this.FirstName} onChange={e => (this.FirstName = e.target.value)} />
          <Form.Label>LastName:</Form.Label>
          <Form.Input type="text" value={this.LastName} onChange={e => (this.LastName = e.target.value)} />
          <Form.Label>Mobile:</Form.Label>
          <Form.Input type="number" value={this.Mobile} onChange={e => (this.Mobile = e.target.value)} />
          <Form.Label>Email:</Form.Label>
          <Form.Input type="text" value={this.Email} onChange={e => (this.Email = e.target.value)} />
          <Form.Label>Address:</Form.Label>
          <Form.Input type="text" value={this.Address} onChange={e => (this.Address = e.target.value)} />
          <Form.Label>Zip:</Form.Label>
          <Form.Input type="number" value={this.Zip} onChange={e => (this.Zip = e.target.value)} />
          <Form.Label>City:</Form.Label>
          <Form.Input type="text" value={this.City} onChange={e => (this.City = e.target.value)} />
          <Form.Label>Country:</Form.Label>
          <Form.Input type="text" value={this.Country} onChange={e => (this.Country = e.target.value)} />
        </Card>
        {/*Calls the method that saves this information to the database */}
        <Button.Success onClick={this.save}>Save</Button.Success>
      </div>
    );
  }
  //Saves the information from the input-fields to the database
  save() {
    history.push('/customers');
    customerService.newCustomer(
      this.FirstName,
      this.LastName,
      this.Mobile,
      this.Email,
      this.Address,
      this.Zip,
      this.City,
      this.Country
    );
  }
}
