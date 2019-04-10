import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class BikeEdit extends Component {
  bike = null;

  render() {
    if (!this.bike) return null;
    // Returns the information needed about the bike to update the status
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
            {/* calls the save method */}
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            {/*calls the cancel method */}
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }
  // gets the information about the specific bike clicked on
  mounted() {
    bikeService.getBike(this.props.match.params.id, bike => {
      this.bike = bike;
    });
  }
  // saves the information that has been changed to the database
  save() {
    bikeService.updateBike(this.bike, () => {
      history.push('/bikes/' + this.props.match.params.id);
    });
  }
  // cancel the change and takes you back to the details page
  cancel() {
    history.push('/bikes/' + this.props.match.params.id);
  }
}
