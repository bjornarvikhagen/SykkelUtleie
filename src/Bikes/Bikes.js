import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Bikes extends Component {
  bikes1 = [];
  bikes2 = [];
  bikes3 = [];
  bikes4 = [];
  bikes5 = [];
  render() {
    return (
      <div>
        <Card title="Bikes">
          <Button.Success onClick={this.new}>New Bike</Button.Success>
          <Row>
            <Column>
              <p>1 - Mountain Bike</p>
              <List>
                {this.bikes1.map(bike1 => (
                  <List.Item key={bike1.BikeID} to={'/bikes/' + bike1.BikeID}>
                    {bike1.Brand} - {bike1.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>2 - Racer Bike</p>
              <List>
                {this.bikes2.map(bike2 => (
                  <List.Item key={bike2.BikeID} to={'/bikes/' + bike2.BikeID}>
                    {bike2.Brand} - {bike2.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>3 - Downhill Bike</p>
              <List>
                {this.bikes3.map(bike3 => (
                  <List.Item key={bike3.BikeID} to={'/bikes/' + bike3.BikeID}>
                    {bike3.Brand} - {bike3.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>4 - Tandem Bike</p>
              <List>
                {this.bikes4.map(bike4 => (
                  <List.Item key={bike4.BikeID} to={'/bikes/' + bike4.BikeID}>
                    {bike4.Brand} - {bike4.Framesize}''
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>5 - Kids Bike</p>
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
    bikeService.getBikesT1(bikes1 => {
      this.bikes1 = bikes1;
    });
    bikeService.getBikesT2(bikes2 => {
      this.bikes2 = bikes2;
    });
    bikeService.getBikesT3(bikes3 => {
      this.bikes3 = bikes3;
    });
    bikeService.getBikesT4(bikes4 => {
      this.bikes4 = bikes4;
    });
    bikeService.getBikesT5(bikes5 => {
      this.bikes5 = bikes5;
    });
  }
  new() {
    history.push('/new_bike');
  }
}
