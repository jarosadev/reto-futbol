# Reto Fútbol - Sistema de Gestión Deportiva

Este proyecto consiste en un sistema de gestión deportiva con un backend en Express.js y un frontend móvil en React Native.

## Tecnologías Utilizadas

### Backend
- Node.js con Express
- MySQL como base de datos
- Sequelize como ORM
- Cors para manejo de CORS
- Helmet para seguridad
- Morgan para logging

### Frontend
- React Native
- TypeScript
- TailwindCSS para estilos

## Estructura del Proyecto

```
RetoFutbol/
├── server/                 # Backend - Servidor Express
│   ├── config/            # Configuración (DB, etc.)
│   ├── models/            # Modelos de Sequelize
│   │   ├── Entrenador.js
│   │   ├── Equipo.js
│   │   ├── Jugador.js
│   │   └── Partido.js
│   └── routes/            # Rutas de la API
│       ├── entrenadores.js
│       ├── equipos.js
│       ├── jugadores.js
│       └── partidos.js
│
└── client/                # Frontend - App React Native
    ├── src/
    │   ├── assets/       # Recursos estáticos
    │   ├── components/   # Componentes reutilizables
    │   ├── config/       # Configuración
    │   ├── screens/      # Pantallas de la aplicación
    │   ├── services/     # Servicios de API
    │   └── types/        # Definiciones de TypeScript
    ├── android/          # Configuración nativa Android
    └── ios/              # Configuración nativa iOS
```

## Configuración del Backend

1. Navega al directorio del servidor:
```bash
cd server
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
npm run init
```

4. Configura las variables de entorno en el archivo `.env`:
- `PORT`: Puerto donde correrá el servidor (por defecto 3000)
- `ALLOWED_ORIGINS`: URLs permitidas para CORS
- Variables de la base de datos:
  - `DB_HOST`: Host de MySQL (por defecto 'localhost')
  - `DB_USER`: Usuario de MySQL (por defecto 'root')
  - `DB_PASSWORD`: Contraseña de MySQL
  - `DB_NAME`: Nombre de la base de datos (por defecto 'futbol_db')

## Configuración del Frontend

1. Navega al directorio del cliente:
```bash
cd client
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno en el archivo `.env`:
- `PHYSICAL_DEVICE`: Establecer en 'true' si se usa un dispositivo físico
- `LOCAL_IP`: Tu IP local cuando uses un dispositivo físico

## Ejecutar el Proyecto

### Backend

1. Asegúrate de tener MySQL instalado y corriendo en tu sistema.

2. Inicia el servidor:

Para producción:
```bash
npm start
```

Para desarrollo (con auto-recarga):
```bash
npm run dev
```

El servidor estará disponible en:
- Localhost: http://localhost:3000
- Red local: http://TU_IP_LOCAL:3000

### Frontend

#### Para Emulador Android

1. Inicia Metro:
```bash
cd client
npm start
```

2. En otra terminal, inicia la aplicación:
```bash
npm run android
```

La aplicación se conectará automáticamente al backend usando `10.0.2.2:3000`

#### Para Dispositivo Físico

1. Configura `.env`:
```
PHYSICAL_DEVICE=true
LOCAL_IP=TU_IP_LOCAL
```

2. Inicia Metro:
```bash
cd client
npm start
```

3. En otra terminal, inicia la aplicación:
```bash
npm run android
```

## Solución de Problemas

1. Error de CORS:
   - Verifica que tu origen esté incluido en `ALLOWED_ORIGINS` en el backend
   - Asegúrate de usar la URL correcta según tu entorno (emulador/dispositivo físico)

2. No se puede conectar al servidor:
   - Verifica que el servidor esté corriendo
   - Confirma que estás usando la IP correcta
   - Asegúrate de que no hay firewalls bloqueando las conexiones
   - Verifica que MySQL esté corriendo

3. Errores en el emulador Android:
   - Usa `adb reverse tcp:3000 tcp:3000` para redirigir el puerto
   - Reinicia el empaquetador Metro y la aplicación

## Notas Importantes

- Para dispositivos físicos, asegúrate de que tu teléfono esté en la misma red WiFi que tu computadora.
- La IP local se puede obtener con:
  - Windows: `ipconfig` en CMD
  - Mac/Linux: `ifconfig` en Terminal
- El emulador de Android usa `10.0.2.2` para acceder al localhost de la máquina host.
- Para iOS, tanto el emulador como el dispositivo físico pueden usar `localhost` cuando están en la misma red.
