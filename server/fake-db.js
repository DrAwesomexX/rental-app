const Rental = require('./models/rental.js');
const User = require('./models/user.js');

class Fakedb {
  constructor() {
    this.rentals = [
      {
        title: 'Nice view on ocean',
        city: 'San Francisco',
        street: 'Main street',
        category: 'condo',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        bedrooms: 4,
        shared: true,
        description: 'Very nice apartment in center of the city.',
        dailyRate: 43
      },
      {
        title: 'Modern apartment in center',
        city: 'New York',
        street: 'Time Square',
        category: 'apartment',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        bedrooms: 1,
        shared: false,
        description: 'Very nice apartment in center of the city.',
        dailyRate: 11
      },
      {
        title: 'Old house in nature',
        city: 'Spisska Nova Ves',
        street: 'Banicka 1',
        category: 'house',
        image:
          'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
        bedrooms: 5,
        shared: true,
        description: 'Very nice apartment in center of the city.',
        dailyRate: 23
      }
    ];

    this.users = [
      {
        username: 'test user',
        email: 'test@gmail.com',
        password: 'testtest'
      }
    ];
  }
  async cleandb() {
    await User.remove({});
    await Rental.remove({});
  }
  pushDataToDB() {
    /*In this function we have to iterate the above data and each instance of iteration we create a rental model assign this data to a model
      and save model to database*/

    const user = new User(this.users[0]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);

      newRental.save();
    });
    user.save();
  }
  async seedDb() {
    await this.cleandb();
    this.pushDataToDB();
  }
}
module.exports = Fakedb;
