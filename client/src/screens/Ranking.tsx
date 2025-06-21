import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, RefreshControl, Alert, useColorScheme} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TarjetaEquipo from '../components/TarjetaEquipo';
import {RootStackParamList, Equipo} from '../types';
import {rankingService} from '../services/api';

type RankingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Ranking'>;
};

const Ranking: React.FC<RankingScreenProps> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargarRanking = async () => {
    setCargando(true);
    try {
      const data = await rankingService.getMasGanados();
      setEquipos(data);
    } catch (error) {
      Alert.alert('Error', 'Error al cargar el ranking');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarRanking();
  }, []);

  return (
    <ScrollView
      className={isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}
      refreshControl={
        <RefreshControl refreshing={cargando} onRefresh={cargarRanking} />
      }>
      <View className="p-4">
        <Text className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Ranking de Equipos
        </Text>
        
        {equipos.length > 0 ? (
          equipos.map((equipo, index) => (
            <View key={equipo.id} className="flex-row items-start space-x-4 mb-4 gap-4">
              <View 
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg mt-4
                  ${index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-amber-700' : 
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                <Text 
                  className={`font-bold text-lg ${
                    index <= 2 ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {index + 1}
                </Text>
              </View>
              <View className="flex-1">
                <TarjetaEquipo equipo={equipo} />
              </View>
            </View>
          ))
        ) : (
          <View className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No hay equipos registrados en el ranking
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Ranking;
