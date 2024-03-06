import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import { LoginPage, UserMainPage } from './Pages';
import { UserAchivPage } from './Pages';
import { UserSubPage } from './Pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LoginPage />} />
      <Route path="/UserMainPage" element={<UserMainPage />} />
      <Route path="/UserAchivPage" element={<UserAchivPage />} />
      <Route path="/UserSubPage" element={<UserSubPage />} />
    </Route>,
  ),
);

const App: React.FC = () => {
  return (
      <RouterProvider router={router} />
  );
};

export default App;
