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
      // 'select Location.LocationID'
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  searchCustomers(Mobile, success) {
    connection.query('SELECT * FROM Customer WHERE Mobile = ?', [Mobile], (error, results) => {
      if (error) return console.error(error);

      success(results);
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
  moveBike(Status, BikeID, success) {
    connection.query('UPDATE Bike SET Status = ? WHERE BikeID = ?', [Status, BikeID], (error, results) => {
      if (error) return console.error(error);

      success();
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
    connection.query('select * from Rentals r, Customer c where r.FK_CustomerID = c.CustomerID', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getBooking(RentalID, success) {
    connection.query(
      'select * from Rentals r, Customer c, Location l where r.FK_CustomerID = c.CustomerID  and RentalID = ?',
      [RentalID],
      (error, results) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }

  getBikes(BikeID, success) {
    connection.query(
      'SELECT * FROM Bike b, BikeType bt WHERE b.FK_BikeTypeID = bt.BikeTypeID  AND b.FK_BikeTypeID = ? AND b.Status = 1',
      [BikeID],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getAcc(AccessoryID, success) {
    connection.query('select * from Accessories where FK_AccessoryType = ?', [AccessoryID], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getRentalID(success) {
    connection.query('SELECT MAX(RentalID) as RentalID from Rentals', (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getBikesinRental(FK_BikeID, success) {
    connection.query('select * from RentedBikes where RentalID = ?', [FK_BikeID], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getAccinRental(FK_AccessoryID, success) {
    connection.query('select * from RentedAccessories where RentalID = ?', [FK_AccessoryID], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  addBike(RentalID, FK_BikeID) {
    connection.query(
      'insert into RentedBikes (RentalID, FK_BikeID) values (?, ?)',
      [RentalID, FK_BikeID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  addAcc(RentalID, FK_AccessoryID) {
    connection.query(
      'insert into RentedAccessories (RentalID, FK_AccessoryID) values (?, ?)',
      [RentalID, FK_AccessoryID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  newBooking(RentalID, StartDate, EndDate, FK_CustomerID, FK_PickupID, FK_DropoffID) {
    connection.query(
      'INSERT INTO Rentals (RentalID, StartDate, EndDate, FK_CustomerID, FK_PickupID, FK_DropoffID) VALUES (?, ?, ?, ?, ?, ?)',
      [RentalID, StartDate, EndDate, FK_CustomerID, FK_PickupID, FK_DropoffID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }

  getRentedBikes(FK_BikeID, success) {
    connection.query(
      'select * from RentedBikes rb, Bike b, BikeType bt where rb.FK_BikeID = b.BikeID and b.FK_BikeTypeID = bt.BikeTypeID and RentalID = ?',
      [FK_BikeID],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getRentedAccessories(FK_AccessoryID, success) {
    connection.query(
      'select * from RentedAccessories ra, Accessories a where ra.FK_AccessoryID = a.AccessoryID and RentalID = ?',
      [FK_AccessoryID],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  removeBike(RentalID) {
    connection.query('delete from RentedBikes where RentalID = ?', [RentalID], (error, results) => {
      if (error) return console.error(error);
    });
  }

  removeAcc(RentalID) {
    connection.query('delete from RentedAccessories where RentalID = ?', [RentalID], (error, results) => {
      if (error) return console.error(error);
    });
  }
}

class LocationService {
  getBikesLocation1(success) {
    connection.query('select * from Bike where FK_Location = 1', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesLocation2(success) {
    connection.query('select * from Bike where FK_Location = 2', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesLocation3(success) {
    connection.query('select * from Bike where FK_Location = 3', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesLocation4(success) {
    connection.query('select * from Bike where FK_Location = 4', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBikesLocation5(success) {
    connection.query('select * from Bike where FK_Location = 5', (error, results) => {
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
export let bookingService = new BookingService();
export let locationService = new LocationService();
