require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'futbol_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const createDatabaseIfNotExists = async () => {
  // Crear conexión sin base de datos para crear la base si no existe
  const sequelizeNoDb = new Sequelize('mysql', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  });

  try {
    await sequelizeNoDb.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'futbol_db'}\`;`);
    console.log('Base de datos creada o ya existente');
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
    throw error;
  } finally {
    await sequelizeNoDb.close();
  }
};

module.exports = {
  sequelize,
  createDatabaseIfNotExists
};
