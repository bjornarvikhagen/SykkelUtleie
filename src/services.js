import { connection } from './mysql_connection';

class CustomerService {
  getCustomers(success) {
    connection.query('select * from Customer', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getCustomer(CustomerID, success) {
    connection.query('select * from Customer where CustomerID=1', [CustomerID], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
}

class BikeService {
  getBikes(success) {
    connection.query('select * from Bike', (error, results) => {
      if (error) return console.error(error);

      success(results0[0]);
    });
  }

  getBikes(BikeID, success) {
    connection.query('select * from Bike where BikeID = ?', [BikeID], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
export let customerService = new CustomerService();
export let bikeService = new BikeService();