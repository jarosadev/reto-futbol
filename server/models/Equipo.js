const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Equipo = sequelize.define('Equipo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  partidos_ganados: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'equipos',
  timestamps: true
});

module.exports = Equipo;
