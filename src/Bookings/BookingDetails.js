import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BookingDetails extends Component {
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
