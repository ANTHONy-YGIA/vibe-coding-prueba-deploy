# TaskFlow

Aplicación web de gestión de tareas creada como prueba de infraestructura y despliegue para la competencia universitaria de Vibe Coding.

## Funcionalidades

- Crear, editar y eliminar tareas (con confirmación antes de eliminar).
- Marcar tareas como completadas o pendientes.
- Filtrar por todas, pendientes y completadas.
- Estadísticas de progreso: total, pendientes, completadas y porcentaje.
- Persistencia en `localStorage`: los datos se conservan al recargar.
- Validación de formularios (título obligatorio, de 3 a 120 caracteres).
- Estados vacíos para cada filtro y diseño responsive.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Lucide React. Sin backend ni servicios de pago.

## Requisitos

- Node.js 20.19 o superior (probado con Node 26 y npm 11).

## Ejecución local

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en el navegador.

## Scripts

| Comando           | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente.     |
| `npm run build`   | Comprobación de tipos y build de producción en `dist/`. |
| `npm run preview` | Sirve localmente el build de producción.           |

## Estructura

```
src/
├── App.tsx                 # Composición de la interfaz
├── main.tsx                # Punto de entrada
├── index.css               # Tailwind y estilos base
├── components/             # TaskForm, TaskItem, FilterTabs, StatsPanel, EmptyState
├── hooks/useTasks.ts       # Estado, filtros, estadísticas y persistencia
├── types/task.ts           # Tipos del dominio
└── utils/                  # localStorage, validación y generación de ids
```

Los datos se guardan en la clave `taskflow.tasks.v1` del `localStorage`. Si el contenido guardado está corrupto, la app lo ignora y arranca vacía.
