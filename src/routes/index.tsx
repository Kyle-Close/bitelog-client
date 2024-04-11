import { Route, Routes } from 'react-router-dom';
import pagesData from './PagesData';
import { BASE_CLIENT_URL } from '../config/axiosConfig';

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element }) => {
    return (
      <Route key={title} path={`${BASE_CLIENT_URL}${path}`} element={element} />
    );
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
