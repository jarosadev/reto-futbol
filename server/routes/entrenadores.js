const express = require('express');
const router = express.Router();
const { Entrenador, Equipo } = require('../models');

// Crear entrenador y asignarlo a un equipo
router.get('/', async (req, res) => {
  try {
    const entrenadores = await Entrenador.findAll({
      include: [{
        model: Equipo,
        as: 'equipo',
        attributes: ['nombre']
      }]
    });
    res.json(entrenadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, edad, estrategia, equipoId } = req.body;
    
    // Verificar que el equipo existe
    const equipo = await Equipo.findByPk(equipoId);
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    // Verificar si el equipo ya tiene un entrenador
    const entrenadorExistente = await Entrenador.findOne({
      where: { equipoId: equipoId }
    });

    if (entrenadorExistente) {
      return res.status(400).json({ error: 'El equipo ya tiene un entrenador asignado' });
    }

    const entrenador = await Entrenador.create({
      nombre,
      edad,
      estrategia,
      equipoId: equipoId
    });

    res.status(201).json({
      message: "Entrenador asignado",
      entrenador: entrenador
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener entrenador de un equipo específico
router.get('/equipo/:equipoId', async (req, res) => {
  try {
    const entrenador = await Entrenador.findOne({
      where: { equipoId: req.params.equipoId }
    });

    if (!entrenador) {
      return res.status(404).json({ error: 'Entrenador no encontrado para este equipo' });
    }

    res.json(entrenador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar entrenador
router.put('/:id', async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (!entrenador) {
      return res.status(404).json({ error: 'Entrenador no encontrado' });
    }

    const { nombre, edad, estrategia, equipoId } = req.body;
    
    if (equipoId && equipoId !== entrenador.equipoId) {
      // Verificar que el nuevo equipo existe
      const equipo = await Equipo.findByPk(equipoId);
      if (!equipo) {
        return res.status(404).json({ error: 'Equipo no encontrado' });
      }

      // Verificar si el nuevo equipo ya tiene un entrenador
      const entrenadorExistente = await Entrenador.findOne({
        where: { equipoId: equipoId }
      });

      if (entrenadorExistente) {
        return res.status(400).json({ error: 'El equipo ya tiene un entrenador asignado' });
      }
    }

    await entrenador.update({
      nombre,
      edad,
      estrategia,
      equipoId: equipoId || entrenador.equipoId
    });

    res.json({
      message: "Entrenador actualizado",
      entrenador
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar entrenador
router.delete('/:id', async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (!entrenador) {
      return res.status(404).json({ error: 'Entrenador no encontrado' });
    }

    await entrenador.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
