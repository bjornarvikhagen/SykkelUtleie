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
