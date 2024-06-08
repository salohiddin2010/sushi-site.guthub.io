import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { SharedLayout } from "./components/SharedLayout";
import { routes } from "./routes";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const setRoutes = () =>
    routes.map(({ id, path, element }) => (
      <Route key={id} path={path} element={element} />
    ));

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          {setRoutes()}
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
