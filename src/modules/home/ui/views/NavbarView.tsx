import { Link } from "react-router-dom";

export const NavbarView = () => {
  return (
    <nav className="h-20 border-b font-medium bg-gradient-to-r from-slate-700 via-slate-400 to-amber-400">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full  px-4 lg:px-12 ">
        <h1 className="text-3xl font-bold sm:hidden md:block">
          <Link to="/">Weather</Link>
        </h1>
      </div>
    </nav>
  );
};
