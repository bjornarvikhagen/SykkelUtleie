import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { customerService, bikeService, bookingService, locationService } from './services';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="AS SykkelUtleie">
        <NavBar.Link to="/customers">Customers</NavBar.Link>
        <NavBar.Link to="/bikes">Bikes</NavBar.Link>
        <NavBar.Link to="/bookings">Bookings</NavBar.Link>
        <NavBar.Link to="/locations">Locations</NavBar.Link>
        <NavBar.Link to="/maintenance">Maintenance</NavBar.Link>
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

class CustomerNew extends Component {
  FirstName = '';
  LastName = '';
  Mobile = '';
  Email = '';
  Address = '';
  Zip = '';
  City = '';
  Country = '';

  render() {
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
        <Button.Success onClick={this.save}>Save</Button.Success>
      </div>
    );
  }
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

class CustomerEdit extends Component {
  customer = null;

  render() {
    if (!this.customer) return null;

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
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
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

  save() {
    customerService.updateCustomer(this.customer, () => {
      history.push('/customers/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/customers/' + this.props.match.params.id);
  }
}

class Bikes extends Component {
  bikes1 = [];
  bikes2 = [];
  bikes3 = [];
  bikes4 = [];
  bikes5 = [];
  render() {
    return (
      <div>
        <Card title="Bikes">
          <Row>
            <Column>
              <p>1 - Mountain Bike</p>
              <List>
                {this.bikes1.map(bike1 => (
                  <List.Item key={bike1.BikeID} to={'/bikes/' + bike1.BikeID}>
                    {bike1.Brand} - {bike1.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>2 - Racer Bike</p>
              <List>
                {this.bikes2.map(bike2 => (
                  <List.Item key={bike2.BikeID} to={'/bikes/' + bike2.BikeID}>
                    {bike2.Brand} - {bike2.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>3 - Downhill Bike</p>
              <List>
                {this.bikes3.map(bike3 => (
                  <List.Item key={bike3.BikeID} to={'/bikes/' + bike3.BikeID}>
                    {bike3.Brand} - {bike3.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>4 - Tandem Bike</p>
              <List>
                {this.bikes4.map(bike4 => (
                  <List.Item key={bike4.BikeID} to={'/bikes/' + bike4.BikeID}>
                    {bike4.Brand} - {bike4.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>5 - Kids Bike</p>
              <List>
                {this.bikes5.map(bike5 => (
                  <List.Item key={bike5.BikeID} to={'/bikes/' + bike5.BikeID}>
                    {bike5.Brand} - {bike5.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
          </Row>
        </Card>
        <Button.Success onClick={this.new}>New Bike</Button.Success>
      </div>
    );
  }

  mounted() {
    bikeService.getBikesT1(bikes1 => {
      this.bikes1 = bikes1;
    });
    bikeService.getBikesT2(bikes2 => {
      this.bikes2 = bikes2;
    });
    bikeService.getBikesT3(bikes3 => {
      this.bikes3 = bikes3;
    });
    bikeService.getBikesT4(bikes4 => {
      this.bikes4 = bikes4;
    });
    bikeService.getBikesT5(bikes5 => {
      this.bikes5 = bikes5;
    });
  }
  new() {
    history.push('/new_bike');
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
            <Button.Light onClick={this.edit}>Update bike status</Button.Light>
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
  edit() {
    history.push('/bikes/' + this.bike.BikeID + '/edit');
  }
  delete() {
    bikeService.deleteBike(this.props.match.params.id, () => history.push('/bikes'));
  }
}

class BikeEdit extends Component {
  bike = null;

  render() {
    if (!this.bike) return null;

    return (
      <div>
        <Card title="Update status">
          <Form.Label>Status:</Form.Label>
          <Form.Input type="text" value={this.bike.Status} onChange={e => (this.bike.Status = e.target.value)} />
          <Form.Label>Information:</Form.Label>
          <Form.Input
            type="text"
            value={this.bike.Information}
            onChange={e => (this.bike.Information = e.target.value)}
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
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

  save() {
    bikeService.updateBike(this.bike, () => {
      history.push('/bikes/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/bikes/' + this.props.match.params.id);
  }
}

class BikeNew extends Component {
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

class Bookings extends Component {
  rentals = [];
  render() {
    return (
      <div>
        <Card title="Bookings">
          <List>
            {this.rentals.map(rental => (
              <List.Item key={rental.RentalID} to={'/bookings/' + rental.RentalID}>
                {rental.RentalID}
              </List.Item>
            ))}
          </List>
        </Card>
        <Button.Success onClick={this.new}>New Booking</Button.Success>
      </div>
    );
  }
  mounted() {
    bookingService.getBookings(rentals => {
      this.rentals = rentals;
    });
  }
  new() {
    history.push('/new_booking');
  }
}

class BookingDetails extends Component {
  rental = [];
  render() {
    if (!this.rental) return null;

    return (
      <div>
        <ul>
          <li> RentalID: {this.rental.RentalID} </li>
          <li> StartDate: {this.rental.toString().StartDate} </li>
          <li> EndDate: {this.rental.toString().EndDate} </li>
          <li> CustomerID: {this.rental.FK_CustomerID} </li>
          <li> BikeID: {this.rental.FK_BikeID} </li>
          <li> PickupID: {this.rental.FK_PickupID} </li>
          <li> DropoffID: {this.rental.FK_DropoffID} </li>
          <li> Accessories: {this.rental.FK_AccessoriesID} </li>
          <li> Invoice ID: {this.rental.FK_InvoiceID} </li>
          <li> BikeTypeID: {this.rental.FK_BikeTypeID} </li>
        </ul>
      </div>
    );
  }

  mounted() {
    bookingService.getBooking(this.props.match.params.id, rental => {
      this.rental = rental;
    });
  }
}

class BookingNew extends Component {
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

class Locations extends Component {
  locations = [];
  render() {
    return (
      <div>
        <Card title="Locations">
          <List>
            {this.locations.map(location => (
              <List.Item key={location.LocationID} to={'/locations/' + location.LocationID}>
                {location.LocationID} - {location.Place} , {location.Address}''
              </List.Item>
            ))}
          </List>
        </Card>
      </div>
    );
  }

  mounted() {
    locationService.getLocations(locations => {
      this.locations = locations;
    });
  }
}

class LocationDetails extends Component {
  location = null;

  render() {
    if (!this.location) return null;

    return (
      <div>
        <Button.Light onClick={this.back}>Back</Button.Light>
        <Card title="Location details">
          <Row>
            <Column width={2}>LocationID:</Column>
            <Column>{this.location.LocationID}</Column>
          </Row>
          <Row>
            <Column width={2}>Address:</Column>
            <Column>{this.location.Address}</Column>
          </Row>
          <Row>
            <Column width={2}>Zip:</Column>
            <Column>{this.location.Zip}</Column>
          </Row>
          <Row>
            <Column width={2}>Place:</Column>
            <Column> {this.location.Place}</Column>
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
    locationService.getLocation(this.props.match.params.id, location => {
      this.location = location;
    });
  }
}

class Maintenance extends Component {
  bikes1 = [];
  bikes2 = [];
  render() {
    return (
      <div>
        {console.log(this.bikes1)}
        {console.log(this.bikes2)}

        <Card title="Maintenance" class="liste">
          <Row>
            <Column>
              <p> OK bikes: </p>
              <List>
                {this.bikes1.map(bike1 => (
                  <List.Item key={bike1.BikeID}>
                    {bike1.BikeID} - {bike1.Brand} - {bike1.Status}, {bike1.Information}
                    <Button.Danger id={bike1.BikeID} value={bike1.BikeID} onClick={() => this.move(2, bike1.BikeID)}>
                      Move to Status 2
                    </Button.Danger>
                  </List.Item>
                ))}
              </List>
            </Column>

            <Column>
              <p> Needs maintenance: </p>
              <List>
                {this.bikes2.map(bike2 => (
                  <List.Item key={bike2.BikeID}>
                    {bike2.BikeID}, {bike2.Brand}, {bike2.Status}, {bike2.Information}
                    <Button.Success id={bike2.BikeID} value={bike2.BikeID} onClick={() => this.move(1, bike2.BikeID)}>
                      Move to Status 1
                    </Button.Success>
                  </List.Item>
                ))}
              </List>
            </Column>
          </Row>
        </Card>
      </div>
    );
  }

  mounted() {
    bikeService.getBikesS1(bikes1 => {
      this.bikes1 = bikes1;
    });
    bikeService.getBikesS2(bikes2 => {
      this.bikes2 = bikes2;
    });
  }
  move(Status, BikeID) {
    console.log(Status, BikeID);
    bikeService.moveBike(Status, BikeID, () => {
      bikeService.getBikesS1(bikes1 => {
        this.bikes1 = bikes1;
      });
      bikeService.getBikesS2(bikes2 => {
        this.bikes2 = bikes2;
      });
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
      <Route exact path="/new_customer" component={CustomerNew} />
      <Route exact path="/customers/:id/edit" component={CustomerEdit} />
      <Route exact path="/bikes" component={Bikes} />
      <Route exact path="/bikes/:id" component={BikeDetails} />
      <Route exact path="/new_bike" component={BikeNew} />
      <Route exact path="/bikes/:id/edit" component={BikeEdit} />
      <Route exact path="/bookings/" component={Bookings} />
      <Route exact path="/bookings/:id" component={BookingDetails} />
      <Route exact path="/new_booking" component={BookingNew} />
      <Route exact path="/locations/" component={Locations} />
      <Route exact path="/locations/:id" component={LocationDetails} />
      <Route exact path="/maintenance" component={Maintenance} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
