import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Bookings extends Component {
  rentals = [];
  render() {
    // Returns a list with all active bookings with link to details of the booking
    return (
      <div>
        <Card title="Active Bookings">
          {/*Button that call the new method thats takes you to the new booking page */}
          <Button.Success onClick={this.new}>New Booking</Button.Success>
          {/*Button that takes you to the page with completed bookings */}
          <Button.Success onClick={this.completed}>See Completed Bookings</Button.Success>
          {/*List of all active rented */}
          <List>
            {this.rentals.map(rental => (
              <List.Item key={rental.RentalID} to={'/bookings/' + rental.RentalID}>
                ID {rental.RentalID} - FROM {JSON.stringify(rental.StartDate).slice(0, 11)} TO{' '}
                {JSON.stringify(rental.EndDate).slice(0, 11)} BY {rental.FirstName} {rental.LastName}
              </List.Item>
            ))}
          </List>
        </Card>
      </div>
    );
  }
  // Gets all active bookings from the database when the page loads
  mounted() {
    bookingService.getActiveBookings(rentals => {
      this.rentals = rentals;
    });
  }
  // Takes you to the page where yoy can add a new booking
  new() {
    history.push('/bookings_customer');
  }
  // Link to the list with all completed bookings
  completed() {
    history.push('/bookings_completed/');
  }
}
