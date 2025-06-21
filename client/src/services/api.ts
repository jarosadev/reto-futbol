import API_CONFIG, {fetchApi} from '../config/api';
import {Equipo, Jugador, Entrenador} from '../types';

// Servicios para Equipos
export const equiposService = {
  getAll: () => fetchApi(API_CONFIG.ENDPOINTS.EQUIPOS),

  getById: (id: number) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.EQUIPOS}/${id}`),

  create: (equipo: Omit<Equipo, 'id'>) =>
    fetchApi(API_CONFIG.ENDPOINTS.EQUIPOS, {
      method: 'POST',
      body: JSON.stringify(equipo),
    }),

  update: (id: number, equipo: Partial<Equipo>) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.EQUIPOS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(equipo),
    }),

  delete: (id: number) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.EQUIPOS}/${id}`, {
      method: 'DELETE',
    }),
};

// Servicios para Jugadores
export const jugadoresService = {
  getAll: () => fetchApi(API_CONFIG.ENDPOINTS.JUGADORES),
  
  getByPosicion: (posicion: string) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.JUGADORES}/posicion/${posicion}`),

  create: (jugador: Omit<Jugador, 'id'>) =>
    fetchApi(API_CONFIG.ENDPOINTS.JUGADORES, {
      method: 'POST',
      body: JSON.stringify(jugador),
    }),
    
  update: (id: number, jugador: Partial<Jugador>) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.JUGADORES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jugador),
    }),
    
  delete: (id: number) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.JUGADORES}/${id}`, {
      method: 'DELETE',
    }),
};

// Servicios para Entrenadores
export const entrenadoresService = {
  getAll: () => fetchApi(API_CONFIG.ENDPOINTS.ENTRENADORES),
  
  create: (entrenador: Omit<Entrenador, 'id'>) =>
    fetchApi(API_CONFIG.ENDPOINTS.ENTRENADORES, {
      method: 'POST',
      body: JSON.stringify(entrenador),
    }),
    
  update: (id: number, entrenador: Partial<Entrenador>) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.ENTRENADORES}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entrenador),
    }),
    
  delete: (id: number) =>
    fetchApi(`${API_CONFIG.ENDPOINTS.ENTRENADORES}/${id}`, {
      method: 'DELETE',
    }),
};

// Servicio para Partidos
export const partidosService = {
  simular: (equipoLocalId: number, equipoVisitanteId: number) =>
    fetchApi(API_CONFIG.ENDPOINTS.SIMULAR_PARTIDO, {
      method: 'POST',
      body: JSON.stringify({
        equipo_local_id: equipoLocalId,
        equipo_visitante_id: equipoVisitanteId,
      }),
    }),
};

// Servicio para Ranking
export const rankingService = {
  get: () => fetchApi(API_CONFIG.ENDPOINTS.RANKING),
  getMasGanados: () => fetchApi(`${API_CONFIG.ENDPOINTS.EQUIPOS}/reportes/mas-ganados`),
};
