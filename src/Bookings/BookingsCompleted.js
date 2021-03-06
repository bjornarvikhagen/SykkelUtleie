import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingsCompleted extends Component {
  rentals = [];
  render() {
    // Returns a list of all completed bookings with link to details of the booking
    return (
      <div>
        <Button.Light onClick={this.back}>Back</Button.Light>
        <Card title="Completed Bookings">
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
  // gets the rentals with status completed from the database
  mounted() {
    bookingService.getCompletedBookings(rentals => {
      this.rentals = rentals;
    });
  }
  // takes you bavk to active bookings
  back() {
    history.push('/bookings/');
  }
}
