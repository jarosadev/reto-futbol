import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert, useColorScheme, RefreshControl} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BotonPersonalizado from '../../components/BotonPersonalizado';
import TarjetaEntrenador from '../../components/TarjetaEntrenador';
import {RootStackParamList, Entrenador} from '../../types';
import {entrenadoresService} from '../../services/api';

type ListaEntrenadoresScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ListaEntrenadores'>;
};

const ListaEntrenadores: React.FC<ListaEntrenadoresScreenProps> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargarEntrenadores = async () => {
    setCargando(true);
    try {
      const data = await entrenadoresService.getAll();
      setEntrenadores(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los entrenadores');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarEntrenadores();
    });

    return unsubscribe;
  }, [navigation]);

  const confirmarEliminar = (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de que desea eliminar este entrenador?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarEntrenador(id),
        },
      ],
    );
  };

  const eliminarEntrenador = async (id: number) => {
    try {
      await entrenadoresService.delete(id);
      Alert.alert('Éxito', 'Entrenador eliminado correctamente');
      cargarEntrenadores();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el entrenador');
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={cargarEntrenadores} />
        }>
        <View className="p-4 pb-24">
          <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Lista de Entrenadores
          </Text>

          {entrenadores.length > 0 ? (
            <View className="space-y-4">
              {entrenadores.map((entrenador) => (
                <TarjetaEntrenador
                  key={entrenador.id}
                  entrenador={entrenador}
                  onEdit={(id) => navigation.navigate('EditarEntrenador', {id})}
                  onDelete={confirmarEliminar}
                />
              ))}
            </View>
          ) : (
            <View className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No hay entrenadores registrados
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <BotonPersonalizado
          texto="Agregar Entrenador"
          onPress={() => navigation.navigate('AgregarEntrenador')}
          estilo="bg-purple-600"
        />
      </View>
    </View>
  );
};

export default ListaEntrenadores;
