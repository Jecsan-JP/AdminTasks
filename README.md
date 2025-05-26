# AdminTasks - Gestor de Tareas

AdminTasks es una aplicación web moderna para la gestión de tareas, desarrollada con Next.js, React y MongoDB. Permite a los usuarios organizar sus tareas, subtareas y comentarios de manera eficiente.

## Características Principales

- ✨ Gestión completa de tareas (crear, editar, eliminar)
- 📋 Subtareas con dependencias de estado
- 💬 Sistema de comentarios en tareas
- 🔄 Filtrado por estado (pendiente/completada)
- 🔐 Autenticación con JWT
- 📱 Diseño responsivo
- 🎨 Interfaz moderna con Tailwind CSS

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- MongoDB (local o Atlas)

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd AdminTasks
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Configura las variables de entorno:
Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
```env
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_jwt
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
src/
├── app/                 # Páginas y layouts de Next.js
├── common/             # Componentes y utilidades compartidas
├── features/           # Características principales
│   ├── auth/          # Autenticación
│   ├── tasks/         # Gestión de tareas
│   └── comments/      # Sistema de comentarios
└── styles/            # Estilos globales
```

## Tecnologías Utilizadas

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - TypeScript

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - JWT para autenticación

## Uso

1. **Registro/Login**:
   - Crea una cuenta o inicia sesión con tus credenciales

2. **Gestión de Tareas**:
   - Crea nuevas tareas con el botón "+ Nueva tarea"
   - Edita o elimina tareas existentes
   - Marca tareas como completadas/pendientes

3. **Subtareas**:
   - Agrega subtareas a cualquier tarea principal
   - El estado de la tarea principal depende de sus subtareas

4. **Comentarios**:
   - Agrega comentarios a las tareas
   - Edita o elimina comentarios existentes

5. **Filtrado**:
   - Usa el selector para filtrar tareas por estado

## Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Contacto

Para cualquier consulta o sugerencia, por favor contacta a:
- jecsanabdelr@gmail.com
