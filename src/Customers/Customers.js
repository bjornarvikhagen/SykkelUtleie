import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Customers extends Component {
  customers = [];
  render() {
    return (
      <div>
        <Card title="Customers">
          <List>
            {this.customers.map(customer => (
              <List.Item key={customer.CustomerID} to={'/customers/' + customer.CustomerID}>
                {customer.CustomerID} - {customer.FirstName} {customer.LastName}
              </List.Item>
            ))}
          </List>
        </Card>
        <Button.Success onClick={this.new}>New Customer</Button.Success>
      </div>
    );
  }

  mounted() {
    customerService.getCustomers(customers => {
      this.customers = customers;
    });
  }
  new() {
    history.push('/new_customer');
  }
}
