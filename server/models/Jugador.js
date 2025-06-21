const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Equipo = require('./Equipo');

const Jugador = sequelize.define('Jugador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  posicion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero_camiseta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'jugadores',
  timestamps: true
});

Jugador.belongsTo(Equipo, { foreignKey: 'equipoId', as: 'equipo' });
Equipo.hasMany(Jugador, { foreignKey: 'equipoId', as: 'jugadores' });

module.exports = Jugador;
