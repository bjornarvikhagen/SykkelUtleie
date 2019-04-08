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
        <Card>
          <div>
            <h5>Find Customer by phone number:</h5>
            <div id="CustomerSearch">
              <input id="CustomerSearchField" type="text" />
              <Button.Success id="CustomerSearchButton" onClick={this.mounted}>
                Search
              </Button.Success>
            </div>{' '}
            <br />
            <h6>Select customer:</h6>
            <List>
              {this.customers.map(customer => (
                <List.Item key={customer.CustomerID} to={'/new_booking/' + customer.CustomerID}>
                  {customer.CustomerID} - {customer.FirstName} {customer.LastName}
                </List.Item>
              ))}
            </List>
          </div>
        </Card>
        <Button.Success onClick={this.new}>New Customer</Button.Success>
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
