import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { NavbarView } from "./modules/home/ui/views/NavbarView";
function App() {
  const Home = lazy(() => import("./app/home/Home"));
  return (
    <div>
      <Suspense fallback={<p>loading ...</p>}>
        <NavbarView/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
