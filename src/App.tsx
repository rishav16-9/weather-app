import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { NavbarView } from "./modules/home/ui/views/NavbarView";

function App() {
  const Home = lazy(() => import("./app/home/Home"));

  return (
    <div>
      <NavbarView />
      <main className="flex-grow">
        <Suspense fallback={<p>loading ...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
