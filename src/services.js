import { connection } from './mysql_connection';

class CustomerService {
  // selects all customers from the database
  getCustomers(success) {
    connection.query('select * from Customer', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // gets all about a customer with a specific CustomerID
  getCustomer(CustomerID, success) {
    connection.query('select * from Customer where CustomerID=?', [CustomerID], (error, results) => {
      // 'select Location.LocationID'
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  // search in the databse for mobilenumers
  searchCustomers(Mobile, success) {
    connection.query('SELECT * FROM Customer WHERE Mobile = ?', [Mobile], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // changes the information about a customer with values from input
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
  // adds a new customer to the databse with specific values
  newCustomer(FirstName, LastName, Mobile, Email, Address, Zip, City, Country) {
    connection.query(
      'insert into Customer (FirstName, LastName, Mobile, Email, Address, Zip, City, Country) values (?, ?, ?, ?, ?, ?, ?, ?)',
      [FirstName, LastName, Mobile, Email, Address, Zip, City, Country],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
  // deletes a customer from the databse with a specific CutsomerID
  deleteCustomer(CustomerID, success) {
    connection.query('delete from Customer where CustomerID = ?', [CustomerID], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

class BikeService {
  // gets the bikes with a specific BikeTypeID from the database
  getBikesT1(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 1', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // gets the bikes with a specific BikeTypeID from the database
  getBikesT2(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 2', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // gets the bikes with a specific BikeTypeID from the database
  getBikesT3(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 3', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // gets the bikes with a specific BikeTypeID from the database
  getBikesT4(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 4', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // gets the bikes with a specific BikeTypeID from the database
  getBikesT5(success) {
    connection.query('select * from Bike where FK_BikeTypeID = 5', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // gets all information about a specific bike in the database
  getBike(BikeID, success) {
    connection.query('select * from Bike where BikeID = ?', [BikeID], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  // updates the status and information about a specific bike
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
  // adds a new bike to the database
  newBike(Brand, Year, Status, Wheelsize, Framesize, Shiftsystem, Information, FK_Location, FK_BikeTypeID) {
    connection.query(
      'insert into Bike (Brand, Year, Status, Wheelsize, Framesize, Shiftsystem, Information, FK_Location, FK_BikeTypeID) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Brand, Year, Status, Wheelsize, Framesize, Shiftsystem, Information, FK_Location, FK_BikeTypeID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
  // deletes a specific bike from the database
  deleteBike(BikeID, success) {
    connection.query('delete from Bike where BikeID = ?', [BikeID], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  // Method to fetch all the bikes with a Status=1 from the database
  getBikesS1(success) {
    connection.query('select * from Bike where Status = 1', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  // Method to fetch all the bikes with a Status=2 from the database
  getBikesS2(success) {
    connection.query('select * from Bike where Status = 2', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  // Method to update every bikes status
  moveBike(Status, BikeID, success) {
    connection.query('UPDATE Bike SET Status = ? WHERE BikeID = ?', [Status, BikeID], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  // This method updates the Status and Information of the chosen BikeID
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

  // This method updates the Status and Information of the chosen BikeID
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
  // gets all the bookings from the databse with an active status
  getActiveBookings(success) {
    connection.query(
      'select * from Rentals r, Customer c where r.FK_CustomerID = c.CustomerID and RentalStatus = "Active"',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // get all the bookings that have the status Completed from the database
  getCompletedBookings(success) {
    connection.query(
      'select * from Rentals r, Customer c where r.FK_CustomerID = c.CustomerID and RentalStatus = "Completed"',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // gets all information about a specific rental from the databse
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
  // selects all the bikes bu a specific biketype that dont need maintenece from the databse
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
  // selects all accessories within a specific accessory type
  getAcc(AccessoryID, success) {
    connection.query('select * from Accessories where FK_AccessoryType = ?', [AccessoryID], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Counts the highest RentalID in the Rental table in the database
  getRentalID(success) {
    connection.query('SELECT MAX(RentalID) as RentalID from Rentals', (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }
  // gets the bikes that belongs to a specific rental
  getBikesinRental(FK_BikeID, success) {
    connection.query('select * from RentedBikes where RentalID = ?', [FK_BikeID], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // get te accessories that belongs to a specific rental
  getAccinRental(FK_AccessoryID, success) {
    connection.query('select * from RentedAccessories where RentalID = ?', [FK_AccessoryID], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // adds a bike to a specific rental
  addBike(RentalID, FK_BikeID) {
    connection.query(
      'insert into RentedBikes (RentalID, FK_BikeID) values (?, ?)',
      [RentalID, FK_BikeID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
  // adds accessory to a specific rental
  addAcc(RentalID, FK_AccessoryID) {
    connection.query(
      'insert into RentedAccessories (RentalID, FK_AccessoryID) values (?, ?)',
      [RentalID, FK_AccessoryID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
  // adds a new booking to the database with specific values
  newBooking(RentalID, StartDate, EndDate, FK_CustomerID, FK_PickupID, FK_DropoffID) {
    connection.query(
      'INSERT INTO Rentals (RentalID, StartDate, EndDate, FK_CustomerID, FK_PickupID, FK_DropoffID) VALUES (?, ?, ?, ?, ?, ?)',
      [RentalID, StartDate, EndDate, FK_CustomerID, FK_PickupID, FK_DropoffID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
  }
  // gets the bikes that belong to a specific rental
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
  // gets the accessories that belongs to a specific rental
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
  // removes all bikes from a specific rental
  removeBike(RentalID) {
    connection.query('delete from RentedBikes where RentalID = ?', [RentalID], (error, results) => {
      if (error) return console.error(error);
    });
  }
  // removes all accessories from a spesific rental
  removeAcc(RentalID) {
    connection.query('delete from RentedAccessories where RentalID = ?', [RentalID], (error, results) => {
      if (error) return console.error(error);
    });
  }
  // updates the PaymentStatus for a specific rental
  pay(RentalID) {
    connection.query('update Rentals set PaymentStatus = "Paid" where RentalID = ?', [RentalID], (error, results) => {
      if (error) return console.error(error);
    });
  }
  // updates a specific bikes location
  updateBikeLocation(BikeID) {
    connection.query('update Bike set FK_Location =? where BikeID = ? )', [BikeID], (error, results) => {
      if (error) return console.error(error);
    });
  }
  // changes the rental status to a specific rental
  changeRentalStatus(RentalID) {
    connection.query(
      'update Rentals set RentalStatus = "Completed" where RentalID = ?',
      [RentalID],
      (error, results) => {
        if (error) return console.error(error);
      }
    );
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
  // updates  specific bikes location when they are returned
  updateBikeLocation(RentalID) {
    connection.query(
      'update Bike inner join RentedBikes on RentedBikes.FK_BikeID = Bike.BikeID inner join Rentals on Rentals.RentalID = RentedBikes.RentalID set Bike.FK_Location = Rentals.FK_DropoffID where Rentals.RentalID = ?',
      [RentalID],
      (error, results) => {
        if (error) return console.error(error);

        console.log(results);
      }
    );
  }
}

export let customerService = new CustomerService();
export let bikeService = new BikeService();
export let bookingService = new BookingService();
export let locationService = new LocationService();
