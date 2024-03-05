import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import { LoginPage, UserPage } from './Pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LoginPage />} />
      <Route path="/UserPage" element={<UserPage />} />
    </Route>,
  ),
);

const App: React.FC = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
