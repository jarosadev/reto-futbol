const express = require('express');
const router = express.Router();
const { Equipo, Jugador, Entrenador } = require('../models');

// Crear equipo
router.post('/', async (req, res) => {
  try {
    const equipo = await Equipo.create({ nombre: req.body.nombre });
    res.status(201).json({
      message: "Equipo creado",
      equipo: equipo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los equipos
router.get('/', async (req, res) => {
  try {
    const equipos = await Equipo.findAll({
      include: [
        { 
          model: Jugador, 
          as: 'jugadores',
          attributes: ['id', 'nombre', 'posicion', 'numero_camiseta', 'edad']
        },
        { 
          model: Entrenador, 
          as: 'entrenador',
          attributes: ['id', 'nombre', 'edad', 'estrategia']
        }
      ],
      order: [
        ['updatedAt', 'DESC'],
        ['nombre', 'ASC']]
    });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener equipo por ID con sus jugadores y entrenador
router.get('/:id', async (req, res) => {
  try {
    const equipo = await Equipo.findByPk(req.params.id, {
      include: [
        { model: Jugador, as: 'jugadores' },
        { model: Entrenador, as: 'entrenador' }
      ]
    });
    
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar equipo
router.put('/:id', async (req, res) => {
  try {
    const equipo = await Equipo.findByPk(req.params.id);
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    await equipo.update({ nombre: req.body.nombre });
    res.json({
      message: "Equipo actualizado",
      equipo
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar equipo
router.delete('/:id', async (req, res) => {
  try {
    const equipo = await Equipo.findByPk(req.params.id);
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    await equipo.destroy();
    res.status(204).json({ message: "Equipo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener jugadores de un equipo
router.get('/:equipoId/jugadores', async (req, res) => {
  try {
    const jugadores = await Jugador.findAll({
      where: { equipoId: req.params.equipoId }
    });
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener equipos con más partidos ganados
router.get('/reportes/mas-ganados', async (req, res) => {
  try {
    const equipos = await Equipo.findAll({
      order: [['partidos_ganados', 'DESC']]
    });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
