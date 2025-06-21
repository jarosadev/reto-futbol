import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar pantallas
import Inicio from './src/screens/Inicio';
import ListaJugadores from './src/screens/jugadores/ListaJugadores';
import ListaEntrenadores from './src/screens/entrenadores/ListaEntrenadores';
import FormularioEquipo from './src/screens/equipos/FormularioEquipo';
import FormularioJugador from './src/screens/jugadores/FormularioJugador';
import FormularioEntrenador from './src/screens/entrenadores/FormularioEntrenador';
import ListaEquipos from './src/screens/equipos/ListaEquipos';
import BuscarJugadores from './src/screens/jugadores/BuscarJugadores';
import SimularPartido from './src/screens/SimularPartido';
import Ranking from './src/screens/Ranking';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#065F46', // Verde esmeralda oscuro
          },
          headerTintColor: '#f3fb7b', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListaJugadores"
          component={ListaJugadores}
          options={{ title: 'Gestión de Jugadores' }}
        />
        <Stack.Screen
          name="ListaEntrenadores"
          component={ListaEntrenadores}
          options={{ title: 'Gestión de Entrenadores' }}
        />
        <Stack.Screen
          name="AgregarEquipo"
          component={FormularioEquipo}
          options={{ title: 'Crear Equipo' }}
        />
        <Stack.Screen
          name="EditarEquipo"
          component={FormularioEquipo}
          options={{ title: 'Editar Equipo' }}
        />
        <Stack.Screen
          name="AgregarJugador"
          component={FormularioJugador}
          options={{ title: 'Agregar Jugador' }}
        />
        <Stack.Screen
          name="EditarJugador"
          component={FormularioJugador}
          options={{ title: 'Editar Jugador' }}
        />
        <Stack.Screen
          name="AgregarEntrenador"
          component={FormularioEntrenador}
          options={{ title: 'Agregar Entrenador' }}
        />
        <Stack.Screen
          name="EditarEntrenador"
          component={FormularioEntrenador}
          options={{ title: 'Editar Entrenador' }}
        />
        <Stack.Screen
          name="Equipos"
          component={ListaEquipos}
          options={{ title: 'Lista de Equipos' }}
        />
        <Stack.Screen
          name="BuscarJugadores"
          component={BuscarJugadores}
          options={{ title: 'Buscar Jugadores' }}
        />
        <Stack.Screen
          name="SimularPartido"
          component={SimularPartido}
          options={{ title: 'Simular Partido' }}
        />
        <Stack.Screen
          name="Ranking"
          component={Ranking}
          options={{ title: 'Ranking de Equipos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
