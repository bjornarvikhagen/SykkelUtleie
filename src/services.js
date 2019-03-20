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

  newCustomer(FirstName, LastName, Mobile, Email, Address, Zip, City, Country) {
    connection.query(
      'insert into Customer (FirstName, LastName, Mobile, Email, Address, Zip, City, Country) values (?, ?, ?, ?, ?, ?, ?, ?)',
      [FirstName, LastName, Mobile, Email, Address, Zip, City, Country],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  deleteCustomer(CustomerID, success) {
    connection.query('delete from Customer where CustomerID = ?', [CustomerID], (error, results) => {
      if (error) return console.error(error);

      success();
    });
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

  updateBike(Bike, success) {
    connection.query('update Bike set status=? where BikeID=?', [Bike.Status, Bike.BikeID], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  newBike(Brand, Year, Status, Wheelsize, Framesize, Shiftsystem, Information, FK_Location, FK_BikeTypeID) {
    connection.query(
      'insert into Bike (Brand, Year, Status, Wheelsize, Framesize, Shiftsystem, Information, FK_Location, FK_BikeTypeID) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Brand, Year, Status, Wheelsize, Framesize, Shiftsystem, Information, FK_Location, FK_BikeTypeID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  deleteBike(BikeID, success) {
    connection.query('delete from Bike where BikeID = ?', [BikeID], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

class BookingService {
  getBookings(success) {
    connection.query('select * from Rentals', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class LocationService {
  getLocations(success) {
    connection.query('select * from Location', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

getLocation(LocationID, success) {
  connection.query('select * from Location where LocationID=?', [LocationID], (error, results) => {
    if (error) return console.error(error);

    success(results[0]);
  });
}
}


export let customerService = new CustomerService();
export let bikeService = new BikeService();
export let bookingService = new BookingService();
export let locationService = new LocationService();
