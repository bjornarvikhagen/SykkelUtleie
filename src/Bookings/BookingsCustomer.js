import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingsCustomer extends Component {
  customers = [];
  render() {
    return (
      <div>
        <div>
          <Form.Label>BookingsCustomer: Find Customer by phone number:</Form.Label>
          <div id="CustomerSearch">
            <input id="CustomerSearchField" type="text" />
            <button id="CustomerSearchButton" onClick={this.mounted}>
              Search
            </button>
          </div>
        </div>
        <div>
          <Card title="Customer">
            <List>
              {this.customers.map(customer => (
                <List.Item key={customer.CustomerID} to={'/new_booking/' + customer.CustomerID}>
                  {customer.CustomerID} - {customer.FirstName} {customer.LastName}
                </List.Item>
              ))}
            </List>
          </Card>
          <Button.Success onClick={this.new}>New Customer</Button.Success>
        </div>
      </div>
    );
  }
  mounted() {
    this.searchValue = document.getElementById('CustomerSearchField').value;
    customerService.searchCustomers(this.searchValue, customers => {
      this.customers = customers;
      console.log(this.customers);
    });
  }
  new() {
    history.push('/new_customer');
  }
}
