const express = require('express');
const router = express.Router();
const { Jugador, Equipo } = require('../models');

// Crear jugador y asignarlo a un equipo
router.get('/', async (req, res) => {
  try {
    const jugadores = await Jugador.findAll({
      include: [{
        model: Equipo,
        as: 'equipo',
        attributes: ['nombre']
      }]
    });
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, posicion, numero_camiseta, edad, equipoId } = req.body;
    
    // Verificar que el equipo existe
    const equipo = await Equipo.findByPk(equipoId);
    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    const jugador = await Jugador.create({
      nombre,
      posicion,
      numero_camiseta,
      edad,
      equipoId: equipoId
    });

    res.status(201).json({
      message: "Jugador añadido",
      jugador: jugador
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar jugadores por posición
router.get('/posicion/:posicion', async (req, res) => {
  try {
    const jugadores = await Jugador.findAll({
      where: { posicion: req.params.posicion },
      include: [{
        model: Equipo,
        as: 'equipo',
        attributes: ['nombre']
      }]
    });
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar jugador
router.put('/:id', async (req, res) => {
  try {
    const jugador = await Jugador.findByPk(req.params.id);
    if (!jugador) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    const { nombre, posicion, numero_camiseta, edad, equipoId } = req.body;
    
    if (equipoId) {
      const equipo = await Equipo.findByPk(equipoId);
      if (!equipo) {
        return res.status(404).json({ error: 'Equipo no encontrado' });
      }
    }

    await jugador.update({
      nombre,
      posicion,
      numero_camiseta,
      edad,
      equipoId: equipoId || jugador.equipoId
    });

    res.json({
      message: "Jugador actualizado",
      jugador
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar jugador
router.delete('/:id', async (req, res) => {
  try {
    const jugador = await Jugador.findByPk(req.params.id);
    if (!jugador) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

    await jugador.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
