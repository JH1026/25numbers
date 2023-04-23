import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import TopPage from './pages/TopPage';
import StatsPage from './pages/StatsPage';

function App() {

  const routerElements = createRoutesFromElements(
    <Route path="/" >
      <Route index element={<TopPage />} />
      <Route path="stats" element={<StatsPage />} />
    </Route>
  );

  return <RouterProvider router={createBrowserRouter(routerElements)} />;
}

export default App
