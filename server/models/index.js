const Equipo = require('./Equipo');
const Jugador = require('./Jugador');
const Entrenador = require('./Entrenador');
const Partido = require('./Partido');

// Relaciones adicionales para Partido
Partido.belongsTo(Equipo, { as: 'equipoLocal', foreignKey: 'equipo_local_id' });
Partido.belongsTo(Equipo, { as: 'equipoVisitante', foreignKey: 'equipo_visitante_id' });
Partido.belongsTo(Equipo, { as: 'ganador', foreignKey: 'ganador_id' });

// Relación inversa para equipos y partidos
Equipo.hasMany(Partido, { as: 'partidosLocales', foreignKey: 'equipo_local_id' });
Equipo.hasMany(Partido, { as: 'partidosVisitantes', foreignKey: 'equipo_visitante_id' });
Equipo.hasMany(Partido, { as: 'partidosGanados', foreignKey: 'ganador_id' });

module.exports = {
  Equipo,
  Jugador,
  Entrenador,
  Partido
};
