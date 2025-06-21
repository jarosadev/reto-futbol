
import React from 'react';
import {TouchableOpacity, Text, View, useColorScheme} from 'react-native';

interface BotonPersonalizadoProps {
  onPress: () => void;
  texto: string;
  estilo?: string;
  deshabilitado?: boolean;
}

const BotonPersonalizado: React.FC<BotonPersonalizadoProps> = ({
  onPress,
  texto,
  estilo = '',
  deshabilitado = false,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={deshabilitado}
      className={`p-4 rounded-xl shadow-lg ${
        deshabilitado
          ? 'bg-gray-400 dark:bg-gray-600'
          : estilo || 'bg-blue-600 dark:bg-blue-500'
      } ${deshabilitado ? 'opacity-50' : 'active:opacity-90'}`}>
      <View className="flex-row items-center justify-center space-x-3 gap-3">
        <Text 
          className={`text-white text-center text-lg font-bold ${
            isDarkMode ? 'opacity-90' : ''
          }`}>
          {texto}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BotonPersonalizado;
