import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('flights/:source/:destination/:dep/:arr?', 'routes/flights.tsx'),
  // route('flights/:source/:destination/:dep', 'routes/flights.tsx'),
] satisfies RouteConfig
