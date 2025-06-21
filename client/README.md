# Reto Fútbol - Aplicación Móvil

Aplicación móvil desarrollada en React Native para la gestión de equipos, jugadores y partidos de fútbol.

## Estructura del Proyecto

```
client/
├── src/
│   ├── assets/           # Recursos estáticos e iconos
│   │   └── iconos/      # Iconos de la aplicación
│   ├── components/      # Componentes reutilizables
│   │   ├── BotonConIcono.tsx
│   │   ├── BotonPersonalizado.tsx
│   │   ├── ModalSeleccion.tsx
│   │   ├── TarjetaEntrenador.tsx
│   │   ├── TarjetaEquipo.tsx
│   │   └── TarjetaJugador.tsx
│   ├── config/         # Configuración de la aplicación
│   │   └── api.ts      # Configuración de endpoints
│   ├── screens/        # Pantallas de la aplicación
│   │   ├── Inicio.tsx
│   │   ├── Ranking.tsx
│   │   ├── SimularPartido.tsx
│   │   ├── entrenadores/
│   │   ├── equipos/
│   │   └── jugadores/
│   ├── services/       # Servicios de API
│   └── types/         # Definiciones de TypeScript
├── android/           # Configuración nativa Android
└── ios/              # Configuración nativa iOS
```

## Requisitos Previos

1. Node.js (v16 o superior)
2. JDK 11 o superior
3. Android Studio y Android SDK para desarrollo Android
4. Xcode (solo macOS) para desarrollo iOS
5. CocoaPods (solo macOS) para dependencias iOS

## Configuración del Entorno

1. Instala las dependencias:
```bash
npm install
```

2. Crea y configura el archivo .env:
```bash
cp .env.example .env
```

Configura las siguientes variables:
- PHYSICAL_DEVICE: 'true' si usas un dispositivo físico
- LOCAL_IP: Tu IP local si usas un dispositivo físico

## Ejecutar la Aplicación

### Android

1. Inicia Metro:
```bash
npm start
```

2. En otra terminal, inicia la aplicación:
```bash
npm run android
```

### iOS (solo macOS)

1. Instala las dependencias de CocoaPods:
```bash
cd ios && pod install && cd ..
```

2. Inicia Metro:
```bash
npm start
```

3. En otra terminal, inicia la aplicación:
```bash
npm run ios
```

## Desarrollo

### Comandos Útiles

- `npm start`: Inicia el servidor Metro
- `npm run android`: Compila e instala la app en Android
- `npm run ios`: Compila e instala la app en iOS

### Recarga y Depuración

- Recarga: Agita el dispositivo o presiona R dos veces en el emulador
- Menú de desarrollo: 
  - Android: Ctrl/Cmd + M
  - iOS: Cmd + D
- Chrome DevTools: Selecciona "Debug JS Remotely" en el menú de desarrollo

## Solución de Problemas

### Android

1. Error de conexión al servidor:
   - Verifica que el servidor backend esté corriendo
   - Para emulador: usa `10.0.2.2` como host
   - Para dispositivo físico: usa tu IP local

2. Error de compilación:
   - Limpia el cache: `cd android && ./gradlew clean`
   - Reinstala node_modules: `rm -rf node_modules && npm install`

### iOS

1. Error de CocoaPods:
   - Reinstala pods: `cd ios && pod deintegrate && pod install`
   - Actualiza pods: `pod repo update`

2. Error de compilación:
   - Limpia el proyecto Xcode
   - Elimina la carpeta build: `rm -rf ios/build`

## Convenciones de Código

- Usar TypeScript para todo el código
- Seguir el estilo de código definido en .eslintrc.js
- Componentes en PascalCase
- Archivos de componentes con extensión .tsx
- Utilizar tipos explícitos, evitar 'any'
