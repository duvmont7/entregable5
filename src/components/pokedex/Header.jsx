import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";

const Header = () => {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(setNameTrainer(""));
  };

  return (
    <section className="relative">
      <div className="h-14 bg-red-600 grid items-end">
        <Link to="/" className="max-w-[200px] sm:max-w-[250px] ml-4">
          <img src="/images/pokedex.png" alt="" />
        </Link>
      </div>

      <div className="h-5 bg-black "></div>

      <div className="h-20 aspect-square rounded-full bg-white border-[8px] border-black absolute bottom-3 right-0 -translate-x-1/2 after:content-[''] after:h-12 after:aspect-square after:rounded-full  after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
        <i
          onClick={handleClickLogout}
          className="bx bx-log-out-circle absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-black z-30 text-2xl hover:text-red-500 cursor-pointer"
        ></i>
      </div>
      <div className="h-10 bg-white"></div>
      <div className="h-0.5 bg-black "></div>
    </section>
  );
};

export default Header;
