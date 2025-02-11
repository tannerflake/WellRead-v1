import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { ShelvedBooksFactory } from './ShelvedBooks.js';

const User = UserFactory(sequelize);
const ShelvedBooks = ShelvedBooksFactory(sequelize);

// Establish the relationship between User and ShelvedBooks
User.hasMany(ShelvedBooks, {
  foreignKey: 'userId',
  as: 'shelvedBooks',
});

ShelvedBooks.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { User, ShelvedBooks };