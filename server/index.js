require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize, createDatabaseIfNotExists } = require('./config/db');
const equiposRoutes = require('./routes/equipos');
const jugadoresRoutes = require('./routes/jugadores');
const entrenadoresRoutes = require('./routes/entrenadores');
const partidosRoutes = require('./routes/partidos');

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Rutas
app.use('/api/equipos', equiposRoutes);
app.use('/api/jugadores', jugadoresRoutes);
app.use('/api/entrenadores', entrenadoresRoutes);
app.use('/api/partidos', partidosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestión de Equipos de Fútbol' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Sincronizar base de datos y iniciar servidor
const initServer = async () => {
  try {
    // Crear base de datos si no existe
    await createDatabaseIfNotExists();
    
    // Sincronizar todos los modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada');

    // Iniciar servidor
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

initServer();
