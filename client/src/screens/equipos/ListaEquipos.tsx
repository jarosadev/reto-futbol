import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert, useColorScheme, RefreshControl} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import TarjetaEquipo from '../../components/TarjetaEquipo';
import {RootStackParamList, Equipo} from '../../types';
import {equiposService} from '../../services/api';

type ListaEquiposScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ListaEquipos'>;
};

const ListaEquipos: React.FC<ListaEquiposScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargarEquipos = async () => {
    setCargando(true);
    try {
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (error) {
      console.error('Error al cargar equipos:', error);
      Alert.alert('Error', 'No se pudieron cargar los equipos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarEquipos();
    });

    return unsubscribe;
  }, [navigation]);

  const confirmarEliminar = (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de que desea eliminar este equipo?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarEquipo(id),
        },
      ],
    );
  };

  const eliminarEquipo = async (id: number) => {
    try {
      await equiposService.delete(id);
      Alert.alert('Éxito', 'Equipo eliminado correctamente');
      cargarEquipos(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
      Alert.alert('Error', 'No se pudo eliminar el equipo');
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={cargarEquipos} />
        }>
        <View className="p-4 pb-24">
          <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Lista de Equipos
          </Text>

          {equipos.length > 0 ? (
            <View className="space-y-4">
              {equipos.map((equipo) => (
                <TarjetaEquipo
                  key={equipo.id}
                  equipo={equipo}
                  onEdit={(id) => navigation.navigate('EditarEquipo', {id})}
                  onDelete={confirmarEliminar}
                />
              ))}
            </View>
          ) : (
            <View className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No hay equipos registrados
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <BotonPersonalizado
          texto="Agregar Equipo"
          onPress={() => navigation.navigate('AgregarEquipo')}
          estilo="bg-indigo-600"
        />
      </View>
    </View>
  );
};

export default ListaEquipos;
