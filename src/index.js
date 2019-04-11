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
        <NavBar.Link to="/bookings">Bookings</NavBar.Link>
        <NavBar.Link to="/bikes">Bikes</NavBar.Link>
        <NavBar.Link to="/customers">Customers</NavBar.Link>
        <NavBar.Link to="/locations">Locations</NavBar.Link>
        <NavBar.Link to="/maintenance">Maintenance</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="imgbg">
        <div className="centertext">Welcome to the GoGoBike system!</div>
        <img src="http://s1.1zoom.me/big0/298/Men_Mountains_Lake_493453.jpg" id="rallarimg" />
        <div className="iframebg">
          <iframe
            src="http://free.timeanddate.com/clock/i6pnpjdk/n288/fn3/fs28/fcfff/tct/pct/ftbi/tt0/tw0/tm1/td2/th1/ts1/tb1"
            frameBorder="0"
            allowtransparency="true"
          />
        </div>
      </div>
    );
  }
}

//CUSTOMERS
import Customers from './Customers/Customers';
import CustomerDetails from './Customers/CustomerDetails';
import CustomerNew from './Customers/CustomerNew';
import CustomerEdit from './Customers/CustomerEdit';

//BIKES
import Bikes from './Bikes/Bikes';
import BikeDetails from './Bikes/BikeDetails';
import BikeEdit from './Bikes/BikeEdit';
import BikeNew from './Bikes/BikeNew';

//BOOKINGS
import Bookings from './Bookings/Bookings';
import BookingsCompleted from './Bookings/BookingsCompleted';
import BookingDetails from './Bookings/BookingDetails';
import BookingNew from './Bookings/BookingNew';
import BookingsCustomer from './Bookings/BookingsCustomer';
import BookingReturn from './Bookings/BookingReturn';

//LOCATIONS
import Locations from './Locations/Locations';
import LocationDetails from './Locations/LocationDetails';

//MAINTENANCE
import Maintenance from './Maintenance/Maintenance';

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
      <Route exact path="/bookings_customer/" component={BookingsCustomer} />
      <Route exact path="/bookings/:id/return" component={BookingReturn} />
      <Route exact path="/bookings_completed/" component={BookingsCompleted} />
      <Route exact path="/new_booking/:id" component={BookingNew} />
      <Route exact path="/locations/" component={Locations} />
      <Route exact path="/locations/:id" component={LocationDetails} />
      <Route exact path="/maintenance" component={Maintenance} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
