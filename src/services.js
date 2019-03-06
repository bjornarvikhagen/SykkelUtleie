import { connection } from './mysql_connection';

class StudentService {
  getStudents(success) {
    connection.query('select * from Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    connection.query('select * from Students where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    connection.query(
      'update Students set name=?, email=? where id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  newStudent(id, name, email, success) {
    connection.query('insert into Students (name, email) values (?, ?)', [name, email, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  getSubjects(success) {
    connection.query('select * from Subjects', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getSubject(id, success) {
    connection.query('select * from Subjects where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateSubjects(id, name, subid, success) {
    connection.query('update Subjects set name=?, subid=? where id=?', [name, subid, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  newSubject(id, name, subid, success) {
    connection.query('insert into Subjects (name, subid) values (?, ?)', [name, subid, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let studentService = new StudentService();
