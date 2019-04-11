import * as React from 'react';
import { Component } from 'react-simplified';
import { customerService, bikeService, bookingService, locationService } from '../services';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export default class Transport extends Component {
  bikes1 = [];
  bikes2 = [];
  bikes3 = [];
  bikes4 = [];
  bikes5 = [];

  render() {
    return (
      <div>
        <Card title="Transportation">
          <Row>
            <Column>
              <p>1 - Haugastøl</p>
              <List>
                {this.bikes1.map(bike1 => (
                  <List.Item key={bike1.BikeID}>
                    <input type="checkbox" checked={bike1.checked} onChange={e => (bike1.checked = e.target.checked)} />{' '}
                    {bike1.BikeID} - {bike1.Brand}
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>2 - Finse</p>
              <List>
                {this.bikes2.map(bike2 => (
                  <List.Item key={bike2.BikeID}>
                    <input type="checkbox" checked={bike2.checked} onChange={e => (bike2.checked = e.target.checked)} />
                    {bike2.BikeID} - {bike2.Brand}
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>3 - Flåm</p>
              <List>
                {this.bikes3.map(bike3 => (
                  <List.Item key={bike3.BikeID}>
                    <input type="checkbox" checked={bike3.checked} onChange={e => (bike3.checked = e.target.checked)} />
                    {bike3.BikeID} - {bike3.Brand}
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>4 - Voss</p>
              <List>
                {this.bikes4.map(bike4 => (
                  <List.Item key={bike4.BikeID}>
                    <input type="checkbox" checked={bike4.checked} onChange={e => (bike4.checked = e.target.checked)} />
                    {bike4.BikeID} - {bike4.Brand}
                  </List.Item>
                ))}
              </List>
            </Column>
            <Column>
              <p>5 - Myrdal</p>
              <List>
                {this.bikes5.map(bike5 => (
                  <List.Item key={bike5.BikeID}>
                    <input type="checkbox" checked={bike5.checked} onChange={e => (bike5.checked = e.target.checked)} />
                    {bike5.BikeID} - {bike5.Brand}
                  </List.Item>
                ))}
              </List>
            </Column>
          </Row>
          <Row>
            <Column>
              <br />
              <select id="Location1" value={this.FK_Location} onChange={e => (this.FK_Location = e.target.value)}>
                <option>Choose location..</option>
                <option value={1}>Haugastøl</option>
                <option value={2}>Finse </option>
                <option value={3}>Flåm </option>
                <option value={4}>Voss </option>
                <option value={5}>Myrdal </option>
              </select>
              <br />
              <br />
              <Button.Success onClick={this.sendBikes1}>Send to location</Button.Success>
            </Column>
            <Column>
              <br />
              <select id="Location2" value={this.FK_Location} onChange={e => (this.FK_Location = e.target.value)}>
                <option>Choose location..</option>
                <option value={1}>Haugastøl</option>
                <option value={2}>Finse </option>
                <option value={3}>Flåm </option>
                <option value={4}>Voss </option>
                <option value={5}>Myrdal </option>
              </select>
              <br />
              <br />
              <Button.Success onClick={this.sendBikes2}>Send to location</Button.Success>
            </Column>
            <Column>
              <br />
              <select id="Location3" value={this.FK_Location} onChange={e => (this.FK_Location = e.target.value)}>
                <option>Choose location..</option>
                <option value={1}>Haugastøl</option>
                <option value={2}>Finse </option>
                <option value={3}>Flåm </option>
                <option value={4}>Voss </option>
                <option value={5}>Myrdal </option>
              </select>
              <br />
              <br />
              <Button.Success onClick={this.sendBikes3}>Send to location</Button.Success>
            </Column>
            <Column>
              <br />
              <select id="Location4" value={this.FK_Location} onChange={e => (this.FK_Location = e.target.value)}>
                <option>Choose location..</option>
                <option value={1}>Haugastøl</option>
                <option value={2}>Finse </option>
                <option value={3}>Flåm </option>
                <option value={4}>Voss </option>
                <option value={5}>Myrdal </option>
              </select>
              <br />
              <br />
              <Button.Success onClick={this.sendBikes4}>Send to location</Button.Success>
            </Column>
            <Column>
              <br />
              <select id="Location5" value={this.FK_Location} onChange={e => (this.FK_Location = e.target.value)}>
                <option>Choose location..</option>
                <option value={1}>Haugastøl</option>
                <option value={2}>Finse </option>
                <option value={3}>Flåm </option>
                <option value={4}>Voss </option>
                <option value={5}>Myrdal </option>
              </select>
              <br />
              <br />
              <Button.Success onClick={this.sendBikes5}>Send to location</Button.Success>
            </Column>
          </Row>
        </Card>
      </div>
    );
  }

  mounted() {
    locationService.getBikesLocation(FK_Location => {
      this.FK_Location = FK_Location;
    });
    locationService.getBikesLocation1(bikes1 => {
      for (let bike of bikes1) bike.checked = false;
      this.bikes1 = bikes1;
    });

    locationService.getBikesLocation2(bikes2 => {
      for (let bike of bikes2) bike.checked = false;
      this.bikes2 = bikes2;
    });
    locationService.getBikesLocation3(bikes3 => {
      for (let bike of bikes3) bike.checked = false;
      this.bikes3 = bikes3;
    });
    locationService.getBikesLocation4(bikes4 => {
      for (let bike of bikes4) bike.checked = false;
      this.bikes4 = bikes4;
    });
    locationService.getBikesLocation5(bikes5 => {
      for (let bike of bikes5) bike.checked = false;
      this.bikes5 = bikes5;
    });
  }

  sendBikes1() {
    for (let x = 0; x < this.bikes1.length; x++) {
      if (this.bikes1[x].checked == true) {
        console.log(this.bikes1[x].BikeID);
        document.getElementById('Location1').value = this.FK_Location;
        console.log(this.FK_Location);
        locationService.sendBikes(this.FK_Location, this.bikes1[x].BikeID, () => {});
      }
      this.mounted();
    }
  }
  sendBikes2() {
    for (let x = 0; x < this.bikes2.length; x++) {
      if (this.bikes2[x].checked == true) {
        console.log(this.bikes2[x].BikeID);
        document.getElementById('Location2').value = this.FK_Location;
        console.log(this.FK_Location);
        locationService.sendBikes(this.FK_Location, this.bikes2[x].BikeID, () => {});
      }
      this.mounted();
    }
  }
  sendBikes3() {
    for (let x = 0; x < this.bikes3.length; x++) {
      if (this.bikes3[x].checked == true) {
        console.log(this.bikes3[x].BikeID);
        document.getElementById('Location3').value = this.FK_Location;
        console.log(this.FK_Location);
        locationService.sendBikes(this.FK_Location, this.bikes3[x].BikeID, () => {});
      }
      this.mounted();
    }
  }

  sendBikes4() {
    for (let x = 0; x < this.bikes4.length; x++) {
      if (this.bikes4[x].checked == true) {
        console.log(this.bikes4[x].BikeID);
        document.getElementById('Location4').value = this.FK_Location;
        console.log(this.FK_Location);
        locationService.sendBikes(this.FK_Location, this.bikes4[x].BikeID, () => {});
      }
      this.mounted();
    }
  }
  sendBikes5() {
    for (let x = 0; x < this.bikes1.length; x++) {
      if (this.bikes5[x].checked == true) {
        console.log(this.bikes5[x].BikeID);
        document.getElementById('Location5').value = this.FK_Location;
        console.log(this.FK_Location);
        locationService.sendBikes(this.FK_Location, this.bikes5[x].BikeID, () => {});
      }
      this.mounted();
    }
  }
}
