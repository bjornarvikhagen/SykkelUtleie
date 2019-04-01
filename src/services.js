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
  getBikesT1(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 1', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesT2(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 2', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesT3(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 3', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesT4(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 4', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesT5(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 5', (error, results) => {
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
    connection.query(
      'update Bike set status=?, information=? where BikeID=?',
      [Bike.Status, Bike.Information, Bike.BikeID],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
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

  getBikesS1(success) {
    connection.query('select * from Bike where Status = 1', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getBikesS2(success) {
    connection.query('select * from Bike where Status = 2', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  moveBike1(Status, Information, BikeID, success) {
    connection.query(
      'UPDATE Bike SET Status = ?, Information = ? WHERE BikeID = ?',
      [Status, Information, BikeID],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  moveBike2(Status, Information, BikeID, success) {
    connection.query(
      'UPDATE Bike SET Status = ?, Information = " " WHERE BikeID = ?',
      [Status, Information, BikeID],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class BookingService {
  getBookings(success) {
    connection.query('select * from Rentals', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getBooking(RentalID, success) {
    connection.query('select * from Rentals where RentalID = ?', [RentalID], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  newBooking(
    StartDate,
    EndDate,
    FK_PickupID,
    FK_DropoffID,
    FK_BikeTypeID,
    FK_Accessories,
    FK_InvoiceID,
    FK_CustomerID,
    FK_BikeID
  ) {
    connection.query(
      'insert into Rentals (StartDate, EndDate, FK_PickupID, FK_DropoffID, FK_BikeTypeID, FK_AccessoriesID, FK_InvoiceID, FK_CustomerID, FK_BikeID) values (?, ?, ?, ?, ?, 1, 1, 1, 1)',
      [
        StartDate,
        EndDate,
        FK_PickupID,
        FK_DropoffID,
        FK_BikeTypeID,
        FK_Accessories,
        FK_InvoiceID,
        FK_CustomerID,
        FK_BikeID
      ],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
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
