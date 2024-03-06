import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import { LoginPage, UserMainPage } from './Pages';
import { UserAchivHisPage } from './Pages';
import { UserSubPage } from './Pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LoginPage />} />
      <Route path="/UserMainPage" element={<UserMainPage />} />
      <Route path="/HistoriaOsiagniec" element={<UserAchivHisPage />} />
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
