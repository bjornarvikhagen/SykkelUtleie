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
