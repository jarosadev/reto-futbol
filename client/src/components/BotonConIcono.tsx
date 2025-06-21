import React from 'react';
import {TouchableOpacity, View, Image, ImageSourcePropType} from 'react-native';

interface BotonConIconoProps {
  onPress: () => void;
  icono: ImageSourcePropType;
  estilo?: string;
  deshabilitado?: boolean;
}

const BotonConIcono: React.FC<BotonConIconoProps> = ({
  onPress,
  icono,
  estilo = '',
  deshabilitado = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={deshabilitado}
      className={`rounded-2xl shadow-lg flex-1 aspect-square ${
        deshabilitado
          ? 'bg-gray-400 dark:bg-gray-600'
          : estilo || 'bg-blue-600 dark:bg-blue-500'
      } ${deshabilitado ? 'opacity-50' : 'active:opacity-90'}`}
    >
      <View className="flex-1 items-center justify-center ">
        <Image
          source={icono}
          className="w-full h-full invert dark:invert-0"
          resizeMode="contain"
          tintColor="#FFFFFF"
        />
      </View>
    </TouchableOpacity>
  );
};

export default BotonConIcono;
