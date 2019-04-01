import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Maintenance extends Component {
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
                    {bike1.BikeID}, {bike1.Brand}, Status: {bike1.Status} Info: {bike1.Information}<br></br>
                    <Form.Input type="text" value={bike1.Information} onChange={e => (bike1.Information = e.target.value)} />
                    <Button.Danger id={bike1.BikeID} value={bike1.BikeID} class="btn btn-danger btn-sm" onClick={() => this.move1(2, bike1.Information, bike1.BikeID)}>
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
                    {bike2.BikeID}, {bike2.Brand}, Status: {bike2.Status}, <br></br>
                    {bike2.Information}
                    <Button.Success id={bike2.BikeID} value={bike2.BikeID} small onClick={() => this.move2(1, bike2.BikeID)}>
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
  move1(Status, Information, BikeID) {
    bikeService.moveBike1(Status, Information, BikeID, () => {
      bikeService.getBikesS1(bikes1 => {
        this.bikes1 = bikes1;
      });
      bikeService.getBikesS2(bikes2 => {
        this.bikes2 = bikes2;
      });
    });
  }

  move2(Status, Information, BikeID) {
    bikeService.moveBike2(Status, Information, BikeID, () => {
      bikeService.getBikesS1(bikes1 => {
        this.bikes1 = bikes1;
      });
      bikeService.getBikesS2(bikes2 => {
        this.bikes2 = bikes2;
      });
    });
  }
}
