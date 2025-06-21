const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Equipo = require('./Equipo');

const Partido = sequelize.define('Partido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  equipo_local_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Equipo,
      key: 'id'
    }
  },
  equipo_visitante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Equipo,
      key: 'id'
    }
  },
  ganador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Equipo,
      key: 'id'
    }
  }
}, {
  tableName: 'partidos',
  timestamps: true
});

module.exports = Partido;
