import React from 'react';
import { View, ScrollView, Text, useColorScheme } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BotonConIcono from '../components/BotonConIcono';
import { RootStackParamList } from '../types';

type InicioScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Inicio'>;
};

const Inicio: React.FC<InicioScreenProps> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const menuOptions = [
    {
      text: 'Ver Jugadores',
      screen: 'ListaJugadores',
      color: 'bg-blue-600',
      icon: require('../assets/iconos/Jugadores.png'),
    },
    {
      text: 'Ver Entrenadores',
      screen: 'ListaEntrenadores',
      color: 'bg-purple-600',
      icon: require('../assets/iconos/Entrenadores.png'),
    },
    {
      text: 'Ver Equipos',
      screen: 'Equipos',
      color: 'bg-green-600',
      icon: require('../assets/iconos/Equipos.png'),
    },
    {
      text: 'Simular Partido',
      screen: 'SimularPartido',
      color: 'bg-indigo-600',
      icon: require('../assets/iconos/VS.png'),
    },
    {
      text: 'Ver Ranking',
      screen: 'Ranking',
      color: 'bg-pink-600',
      icon: require('../assets/iconos/Ranking.png'),
    },
  ] as const;

  return (
    <View
      className={`flex-1  ${isDarkMode ? 'bg-blue-950' : 'bg-slate-200'}`}
    >
      <ScrollView className="flex-1">
        <View className="px-6 pt-2">
          <View className="items-center my-4">
            <Text
              className={`text-5xl mt-5 font-extrabold mb-3 text-center ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}
            >
              Reto Futbol
            </Text>
            <Text className={`text-lg  text-center mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              Gestión de equipos de fútbol
            </Text>
            <View className="w-24 h-1.5 bg-emerald-700  pt-2 opacity-70 rounded-full" />
          </View>

          <View className="flex-row flex-wrap justify-between">
            {menuOptions.map(({ screen, color, icon, text }) => (
              <View key={screen} className="w-[45%] mb-2">
                <BotonConIcono
                  onPress={() => navigation.navigate(screen as any)}
                  icono={icon}
                  estilo={`${color} p-4 rounded-3xl shadow-2xl`}
                />
                <Text
                  className={`text-center my-3 text-lg font-semibold ${isDarkMode ? 'text-slate-200' : 'text-emerald-900'}`}
                >
                  {text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Inicio;
