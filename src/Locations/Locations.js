import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Locations extends Component {
  bikes1 = [];
  bikes2 = [];
  bikes3 = [];
  bikes4 = [];
  bikes5 = [];
  render() {
    return (
      <div>
        <Card title="Locations">
          <Row>
            <Column>
              <p>1 - Haugastøl</p>
              <List>
                {this.bikes1.map(bike1 => (
                  <List.Item key={bike1.BikeID} to={'/bikes/' + bike1.BikeID}>
                    {bike1.BikeID} - {bike1.Brand}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>2 - Finse</p>
              <List>
                {this.bikes2.map(bike2 => (
                  <List.Item key={bike2.BikeID} to={'/bikes/' + bike2.BikeID}>
                    {bike2.Brand} - {bike2.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>3 - Flåm</p>
              <List>
                {this.bikes3.map(bike3 => (
                  <List.Item key={bike3.BikeID} to={'/bikes/' + bike3.BikeID}>
                    {bike3.Brand} - {bike3.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>4 - Voss</p>
              <List>
                {this.bikes4.map(bike4 => (
                  <List.Item key={bike4.BikeID} to={'/bikes/' + bike4.BikeID}>
                    {bike4.Brand} - {bike4.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>5 - Myrdal</p>
              <List>
                {this.bikes5.map(bike5 => (
                  <List.Item key={bike5.BikeID} to={'/bikes/' + bike5.BikeID}>
                    {bike5.Brand} - {bike5.Framesize}''
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
    locationService.getBikesLocation1(bikes1 => {
      this.bikes1 = bikes1;
    });
    locationService.getBikesLocation2(bikes2 => {
      this.bikes2 = bikes2;
    });
    locationService.getBikesLocation3(bikes3 => {
      this.bikes3 = bikes3;
    });
    locationService.getBikesLocation4(bikes4 => {
      this.bikes4 = bikes4;
    });
    locationService.getBikesLocation5(bikes5 => {
      this.bikes5 = bikes5;
    });
  }

}
