import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class CustomerEdit extends Component {
  customer = null;

  render() {
    if (!this.customer) return null;
    // Returns all the input-fields requierd to change a customers information
    return (
      <div>
        <Card title="Edit Customer">
          <Form.Label>FirstName:</Form.Label>
          <Form.Input
            type="text"
            value={this.customer.FirstName}
            onChange={e => (this.customer.FirstName = e.target.value)}
          />
          <Form.Label>LastName:</Form.Label>
          <Form.Input
            type="text"
            value={this.customer.LastName}
            onChange={e => (this.customer.LastName = e.target.value)}
          />
          <Form.Label>Mobile:</Form.Label>
          <Form.Input
            type="number"
            value={this.customer.Mobile}
            onChange={e => (this.customer.Mobile = e.target.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input type="text" value={this.customer.Email} onChange={e => (this.customer.Email = e.target.value)} />
          <Form.Label>Address:</Form.Label>
          <Form.Input
            type="text"
            value={this.customer.Address}
            onChange={e => (this.customer.Address = e.target.value)}
          />
          <Form.Label>Zip:</Form.Label>
          <Form.Input type="number" value={this.customer.Zip} onChange={e => (this.customer.Zip = e.target.value)} />
          <Form.Label>City:</Form.Label>
          <Form.Input type="text" value={this.customer.City} onChange={e => (this.customer.City = e.target.value)} />
          <Form.Label>Country:</Form.Label>
          <Form.Input
            type="text"
            value={this.customer.Country}
            onChange={e => (this.customer.Country = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            {/*Calls the method that saves the information to the database */}
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            {/*Calls the method cancel that takes you back to customerdetails */}
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }
  // Gets all information about this specific customer stored in the database
  mounted() {
    customerService.getCustomer(this.props.match.params.id, customer => {
      this.customer = customer;
    });
  }
  // Saves the changes from the input-fields to the databse for this CustomerID
  save() {
    customerService.updateCustomer(this.customer, () => {
      history.push('/customers/' + this.props.match.params.id);
    });
  }
  // Takes you back to page with details about the customer
  cancel() {
    history.push('/customers/' + this.props.match.params.id);
  }
}
