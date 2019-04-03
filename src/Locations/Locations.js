import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Locations extends Component {
  locations = [];
  render() {
    return (
      <div>
        <Card title="Locations">
          <List>
            {this.locations.map(location => (
              <List.Item key={location.LocationID} to={'/locations/' + location.LocationID}>
                {location.LocationID} - {location.Place} , {location.Address}
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
