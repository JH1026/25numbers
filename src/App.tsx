import './App.css'
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import TopPage from './pages/TopPage';
import StatsPage from './pages/StatsPage';

function App() {

  const routerElements = createRoutesFromElements(
    <Route>
      <Route path="" element={<TopPage />} />
      <Route path="top" element={<TopPage />} />
      <Route path="stats" element={<StatsPage />} />
    </Route>
  );

  return <RouterProvider router={createHashRouter(routerElements)} />;
}

export default App
