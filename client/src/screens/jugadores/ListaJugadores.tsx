import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert, useColorScheme, RefreshControl} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import TarjetaJugador from '../../components/TarjetaJugador';
import {RootStackParamList, Jugador} from '../../types';
import {jugadoresService} from '../../services/api';

type ListaJugadoresScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ListaJugadores'>;
};

const ListaJugadores: React.FC<ListaJugadoresScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargarJugadores = async () => {
    setCargando(true);
    try {
      const data = await jugadoresService.getAll();
      setJugadores(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los jugadores');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarJugadores();
    });

    return unsubscribe;
  }, [navigation]);

  const confirmarEliminar = (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de que desea eliminar este jugador?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarJugador(id),
        },
      ],
    );
  };

  const eliminarJugador = async (id: number) => {
    try {
      await jugadoresService.delete(id);
      Alert.alert('Éxito', 'Jugador eliminado correctamente');
      cargarJugadores();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el jugador');
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={cargarJugadores} />
        }>
        <View className="p-4">
          <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Lista de Jugadores
          </Text>

          {jugadores.length > 0 ? (
            <View className="space-y-4">
              {jugadores.map((jugador) => (
                <TarjetaJugador
                  key={jugador.id}
                  jugador={jugador}
                  onEdit={(id) => navigation.navigate('EditarJugador', {id})}
                  onDelete={confirmarEliminar}
                />
              ))}
            </View>
          ) : (
            <View className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No hay jugadores registrados
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View className={`p-4 flex-row space-x-2 gap-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <View className="flex-1">
          <BotonPersonalizado
            texto="Buscar Jugadores"
            onPress={() => navigation.navigate('BuscarJugadores')}
            estilo="bg-blue-500"
          />
        </View>
        <View className="flex-1">
          <BotonPersonalizado
            texto="Agregar Jugador"
            onPress={() => navigation.navigate('AgregarJugador')}
            estilo="bg-green-600"
          />
        </View>
      </View>
    </View>
  );
};

export default ListaJugadores;
