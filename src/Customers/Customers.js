import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Customers extends Component {
  customers = [];
  render() {
    // Returns all Customers from the Customer Database and list them by CustomerID with links to details to each customer
    return (
      <div>
        <Card title="Customers">
          {/* Button that calls the new() method that takes you to the page where you can add a new Customer */}
          <Button.Success onClick={this.new}>New Customer</Button.Success><br/><br/>
          <List>
            {this.customers.map(customer => (
              <List.Item key={customer.CustomerID} to={'/customers/' + customer.CustomerID}>
                {customer.CustomerID} - {customer.FirstName} {customer.LastName}
              </List.Item>
            ))}
          </List>
        </Card>
      </div>
    );
  }
  // Gets all customers from database when page loads
  mounted() {
    customerService.getCustomers(customers => {
      this.customers = customers;
    });
  }
  // Takes you to the page where you can add a new Customer
  new() {
    history.push('/new_customer');
  }
}
