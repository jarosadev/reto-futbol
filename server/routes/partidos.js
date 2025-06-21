const express = require('express');
const router = express.Router();
const { Partido, Equipo } = require('../models');
const { Op } = require('sequelize');

// Simular un partido entre dos equipos
router.post('/simular', async (req, res) => {
  try {
    const { equipo_local_id, equipo_visitante_id } = req.body;

    // Verificar que los equipos existan
    const [equipoLocal, equipoVisitante] = await Promise.all([
      Equipo.findByPk(equipo_local_id),
      Equipo.findByPk(equipo_visitante_id)
    ]);

    if (!equipoLocal || !equipoVisitante) {
      return res.status(404).json({ error: 'Uno o ambos equipos no existen' });
    }

    if (equipo_local_id === equipo_visitante_id) {
      return res.status(400).json({ error: 'Un equipo no puede jugar contra sí mismo' });
    }

    // Determinar ganador aleatoriamente
    const ganador_id = Math.random() < 0.5 ? equipo_local_id : equipo_visitante_id;
    const ganador = ganador_id === equipo_local_id ? equipoLocal : equipoVisitante;

    // Crear el partido
    const partido = await Partido.create({
      equipo_local_id,
      equipo_visitante_id,
      ganador_id
    });

    // Incrementar contador de partidos ganados
    await Equipo.increment('partidos_ganados', {
      where: { id: ganador_id }
    });

    // Obtener información completa del partido
    const partidoCompleto = await Partido.findByPk(partido.id, {
      include: [
        { model: Equipo, as: 'equipoLocal' },
        { model: Equipo, as: 'equipoVisitante' },
        { model: Equipo, as: 'ganador' }
      ]
    });

    res.status(201).json({
      message: "Partido simulado",
      ganador: {
        id: ganador.id,
        nombre: ganador.nombre
      },
      partido: partidoCompleto
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener historial de partidos
router.get('/', async (req, res) => {
  try {
    const partidos = await Partido.findAll({
      include: [
        { 
          model: Equipo, 
          as: 'equipoLocal',
          attributes: ['nombre']
        },
        { 
          model: Equipo, 
          as: 'equipoVisitante',
          attributes: ['nombre']
        },
        { 
          model: Equipo, 
          as: 'ganador',
          attributes: ['nombre']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const partidosFormateados = partidos.map(partido => ({
      id: partido.id,
      equipo_local_nombre: partido.equipoLocal.nombre,
      equipo_visitante_nombre: partido.equipoVisitante.nombre,
      ganador_nombre: partido.ganador.nombre,
      fecha: partido.createdAt
    }));

    res.json(partidosFormateados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
