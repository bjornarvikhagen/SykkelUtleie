import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Bookings extends Component {
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
