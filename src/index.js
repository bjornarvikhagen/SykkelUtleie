import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { customerService, bikeService } from './services';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="AS SykkelUtleie">
        <NavBar.Link to="/customers">Customers</NavBar.Link>
        <NavBar.Link to="/bikes">Bikes</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to RallRall</Card>;
  }
}

class Customers extends Component {
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

class CustomerDetails extends Component {
  customer = [];

  render() {
    if (!this.customer) return null;

    return (
      <div>
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
}

class Bikes extends Component {
  bikes = [];
  render() {
    return (
      <div>
        <Card title="Bikes">
          <List>
            {this.bikes.map(bike => (
              <List.Item key={bike.BikeID} to={'/bikes/' + bike.BikeID}>
                {bike.BikeID} - {bike.Brand} , {bike.Framesize}''
              </List.Item>
            ))}
          </List>
        </Card>
        <Button.Success onClick={this.new}>New Bike</Button.Success>
      </div>
    );
  }

  mounted() {
    bikeService.getBikes(bikes => {
      this.bikes = bikes;
    });
  }

  edit() {
    history.push('/bikes/' + this.bike.BikeID + '/edit');
  }
}

class BikeDetails extends Component {
  bike = null;

  render() {
    if (!this.bike) return null;

    return (
      <div>
        <Card title="Bike details">
          <Row>
            <Column width={2}>BikeID:</Column>
            <Column>{this.bike.BikeID}</Column>
          </Row>
          <Row>
            <Column width={2}>Brand:</Column>
            <Column>{this.bike.Brand}</Column>
          </Row>
          <Row>
            <Column width={2}>BikeType:</Column>
            <Column>{this.bike.FK_BikeTypeID}</Column>
          </Row>
          <Row>
            <Column width={2}>Year:</Column>
            <Column>{this.bike.Year}</Column>
          </Row>
          <Row>
            <Column width={2}>Status:</Column>
            <Column>{this.bike.Status}</Column>
          </Row>
          <Row>
            <Column width={2}>Wheelsize:</Column>
            <Column>{this.bike.Wheelsize}</Column>
          </Row>
          <Row>
            <Column width={2}>Framesize:</Column>
            <Column>{this.bike.Framesize}</Column>
          </Row>
          <Row>
            <Column width={2}>Shiftsystem:</Column>
            <Column>{this.bike.Shiftsystem}</Column>
          </Row>
          <Row>
            <Column width={2}>Information:</Column>
            <Column>{this.bike.Information}</Column>
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
    bikeService.getBike(this.props.match.params.id, bike => {
      this.bike = bike;
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/customers" component={Customers} />
      <Route exact path="/customers/:id" component={CustomerDetails} />
      <Route exact path="/bikes" component={Bikes} />
      <Route exact path="/bikes/:id" component={BikeDetails} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
