import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

// Define the attributes for the ShelvedBooks model
interface ShelvedBooksAttributes {
  id: number;
  title: string;
  image: string;
  author: string;
  userId: number; // Foreign key to reference the User model
  isFavorite: boolean;
  isWantToRead: boolean;
}

// Define the optional attributes for creating a new ShelvedBooks
interface ShelvedBooksCreationAttributes extends Optional<ShelvedBooksAttributes, 'id'> {}

// Define the ShelvedBooks class extending Sequelize's Model
export class ShelvedBooks extends Model<ShelvedBooksAttributes, ShelvedBooksCreationAttributes> implements ShelvedBooksAttributes {
  public id!: number;
  public title!: string;
  public image!: string;
  public author!: string;
  public userId!: number;
  public isFavorite!: boolean;
  public isWantToRead!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the ShelvedBooksFactory function to initialize the ShelvedBooks model
export function ShelvedBooksFactory(sequelize: Sequelize): typeof ShelvedBooks {
  ShelvedBooks.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isWantToRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'shelved_books', // Name of the table in PostgreSQL
      sequelize,                  // The Sequelize instance that connects to PostgreSQL
    }
  );

  return ShelvedBooks; // Return the initialized ShelvedBooks model
}