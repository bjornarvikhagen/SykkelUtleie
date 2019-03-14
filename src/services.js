import { connection } from './mysql_connection';

class CustomerService {
  getCustomers(success) {
    connection.query('select * from Customer', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getCustomer(CustomerID, success) {
    connection.query('select * from Customer where CustomerID=?', [CustomerID], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateCustomer(Customer, success) {
    connection.query(
      'update Customer set FirstName=?, LastName=?, Mobile=?, Email=?, Address=?, Zip=?, City=?, Country=? where CustomerID=?',
      [
        Customer.FirstName,
        Customer.LastName,
        Customer.Mobile,
        Customer.Email,
        Customer.Address,
        Customer.Zip,
        Customer.City,
        Customer.Country,
        Customer.CustomerID
      ],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  newCustomer(FirstName, LastName, Mobile, Email, Address, Zip, City, Country, FK_ReservationID) {
    connection.query(
      'insert into Customer (FirstName, LastName, Mobile, Email, Address, Zip, City, Country, FK_ReservationID) values (?, ?, ?, ?, ?, ?, ?, ?,1)',
      [FirstName, LastName, Mobile, Email, Address, Zip, City, Country, FK_ReservationID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
}

class BikeService {
  getBikes(success) {
    connection.query('select * from Bike', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBike(BikeID, success) {
    connection.query('select * from Bike where BikeID = ?', [BikeID], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
}
export let customerService = new CustomerService();
export let bikeService = new BikeService();
