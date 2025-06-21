const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Equipo = require('./Equipo');

const Entrenador = sequelize.define('Entrenador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estrategia: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'entrenadores',
  timestamps: true
});

// Un entrenador pertenece a un equipo y un equipo tiene un entrenador
Entrenador.belongsTo(Equipo, { foreignKey: 'equipoId', as: 'equipo' });
Equipo.hasOne(Entrenador, { foreignKey: 'equipoId', as: 'entrenador' });

module.exports = Entrenador;
