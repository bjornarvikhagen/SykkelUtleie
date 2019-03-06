import * as React from "react";
import { Component } from "react-simplified";
import ReactDOM from "react-dom";
import { NavLink, HashRouter, Route } from "react-router-dom";
import { studentService } from "./services";
import { Card, List, Row, Column, NavBar, Button, Form } from "./widgets";

import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/newstudent">New Student</NavBar.Link>
        <NavBar.Link to="/subjects">Subjects</NavBar.Link>
        <NavBar.Link to="/newsubject">New Subject</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to WhiteBoard</Card>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <Card title="Students">
        <List>
          {this.students.map(student => (
            <List.Item key={student.id} to={"/students/" + student.id}>
              {student.name}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    studentService.getStudents(students => {
      this.students = students;
    });
  }
}

class StudentDetails extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  edit() {
    history.push("/students/" + this.student.id + "/edit");
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={e => (this.student.name = e.target.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={e => (this.student.email = e.target.value)}
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
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push("/students/" + this.props.match.params.id);
    });
  }

  cancel() {
    history.push("/students/" + this.props.match.params.id);
  }
}

class StudentNew extends Component {
  name = "";
  email = "";

  render() {
    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.name}
            onChange={event => (this.name = event.target.value)}
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.email}
            onChange={event => (this.email = event.target.value)}
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

  save() {
    studentService.newStudent(
      this.props.match.params.id,
      this.name,
      this.email,
      () => {
        history.push("/students");
      }
    );
  }

  cancel() {
    history.push("/students/" + this.props.match.params.id);
  }
}

class SubjectList extends Component {
  subjects = [];

  render() {
    return (
      <Card title="Subjects">
        <List>
          {this.subjects.map(subject => (
            <List.Item key={subject.id} to={"/subjects/" + subject.id}>
              {subject.name}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    studentService.getSubjects(subjects => {
      this.subjects = subjects;
    });
  }
}

class SubjectDetails extends Component {
  subject = null;

  render() {
    if (!this.subject) return null;

    return (
      <div>
        <Card title="Subject details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.subject.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Subject id:</Column>
            <Column>{this.subject.subid}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getSubject(this.props.match.params.id, subject => {
      this.subject = subject;
    });
  }

  edit() {
    history.push("/subjects/" + this.subject.id + "/edit");
  }
}

class SubjectEdit extends Component {
  subject = null;

  render() {
    if (!this.subject) return null;

    return (
      <div>
        <Card title="Edit subject">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.subject.name}
            onChange={e => (this.subject.name = e.target.value)}
          />
          <Form.Label>Subject id:</Form.Label>
          <Form.Input
            type="text"
            value={this.subject.email}
            onChange={e => (this.subject.email = e.target.value)}
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
    studentService.getSubject(this.props.match.params.id, subject => {
      this.subject = subject;
    });
  }

  save() {
    studentService.updateSubject(this.subject, () => {
      history.push("/subjects/" + this.props.match.params.id);
    });
  }

  cancel() {
    history.push("/subjects/" + this.props.match.params.id);
  }
}

class SubjectNew extends Component {
  name = "";
  subid = "";

  render() {
    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.name}
            onChange={event => (this.name = event.target.value)}
          />
          <Form.Label>Subject id:</Form.Label>
          <Form.Input
            type="text"
            value={this.subid}
            onChange={event => (this.subid = event.target.value)}
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

  save() {
    studentService.newStudent(
      this.props.match.params.id,
      this.name,
      this.subid,
      () => {
        history.push("/subjects");
      }
    );
  }

  cancel() {
    history.push("/subjects/" + this.props.match.params.id);
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route path="/newstudent" component={StudentNew} />
      <Route exact path="/subjects" component={SubjectList} />
      <Route exact path="/subjects/:id" component={SubjectDetails} />
      <Route exact path="/subjects/:id/edit" component={SubjectEdit} />
      <Route path="/newsubject" component={SubjectNew} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
