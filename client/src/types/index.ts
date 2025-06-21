export interface Jugador {
  id: number;
  nombre: string;
  posicion: string;
  numero_camiseta: number;
  edad: number;
  equipoId?: number;
  equipo?: {
    nombre: string;
  };
}

export interface Entrenador {
  id: number;
  nombre: string;
  edad: number;
  estrategia: string;
  equipoId?: number;
  equipo?: {
    nombre: string;
  };
}

export interface Equipo {
  id: number;
  nombre: string;
  partidos_ganados: number;
  jugadores?: Jugador[];
  entrenador?: Entrenador;
}

export interface Partido {
  id: number;
  equipo_local_id: number;
  equipo_visitante_id: number;
  ganador_id: number;
  equipoLocal?: {
    nombre: string;
  };
  equipoVisitante?: {
    nombre: string;
  };
  ganador?: {
    nombre: string;
  };
  createdAt: string;
}

export type RootStackParamList = {
  Inicio: undefined;
  ListaJugadores: undefined;
  EditarJugador: {
    id: number;
  };
  AgregarJugador: undefined;
  ListaEntrenadores: undefined;
  EditarEntrenador: {
    id: number;
  };
  AgregarEntrenador: undefined;
  Equipos: undefined;
  AgregarEquipo: undefined;
  EditarEquipo: {
    id: number;
  };
  ListaEquipos: undefined;
  BuscarJugadores: undefined;
  SimularPartido: undefined;
  Ranking: undefined;
};
