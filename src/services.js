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

  updateCustomer(CustomerID, success) {
    connection.query(
      'update Customer set FirstName=?, LastName=?, Mobile=?, Email=?, Address=?, Zip=?, City=?, Country=? where CustomerID=?',
      [
        customer.FirstName,
        customer.Lastname,
        customer.Mobile,
        customer.Email,
        customer.Address,
        customer.Zip,
        customer.City,
        customer.Country,
        customer.CustomerID
      ],
      (error, results) => {
        if (error) return console.error(error);

        success();
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
