import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class CustomerDetails extends Component {
  customer = null;

  render() {
    if (!this.customer) return null;

    return (
      <div>
        <Button.Light onClick={this.back}>Back</Button.Light>
        <Card title="Customer details">
          <Row>
            <Column width={2}>CustomerID:</Column>
            <Column>{this.customer.CustomerID}</Column>
          </Row>
          <Row>
            <Column width={2}>FirstName:</Column>
            <Column>{this.customer.FirstName}</Column>
          </Row>
          <Row>
            <Column width={2}>LastName:</Column>
            <Column>{this.customer.LastName}</Column>
          </Row>
          <Row>
            <Column width={2}>Mobile:</Column>
            <Column> {this.customer.Mobile}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.customer.Email}</Column>
          </Row>
          <Row>
            <Column width={2}>Address:</Column>
            <Column>{this.customer.Address}</Column>
          </Row>
          <Row>
            <Column width={2}>Zip:</Column>
            <Column>{this.customer.Zip}</Column>
          </Row>
          <Row>
            <Column width={2}>City:</Column>
            <Column>{this.customer.City}</Column>
          </Row>
          <Row>
            <Column width={2}>Country:</Column>
            <Column>{this.customer.Country}</Column>
          </Row>
        </Card>
        <Row>
          <Column>
            <Button.Light onClick={this.edit}>Edit</Button.Light>
          </Column>
          <Column right>
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </div>
    );
  }
  mounted() {
    customerService.getCustomer(this.props.match.params.id, customer => {
      this.customer = customer;
    });
  }
  edit() {
    history.push('/customers/' + this.customer.CustomerID + '/edit');
  }
  back() {
    history.push('/customers/');
  }
  delete() {
    customerService.deleteCustomer(this.props.match.params.id, () => history.push('/customers'));
  }
}
