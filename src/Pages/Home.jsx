import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";

const Home = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSudmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }

  return (
    <section className="min-h-screen grid grid-rows-[1fr_auto]  relative">
      <section className="grid justify-center items-center content-center ">
        <article>
          <div className=" p-8">
            <img src="/images/pokedex.png" alt="" />
          </div>
          <h1 className="flex text-red-500 text-[30px] content-center justify-center font-bold ">Hello trainer!</h1>
          <p className="flex items-center justify-center content-center text-lg h-8">Give me your name to star:</p>
          <form className="drop-shadow-lg flex grid-cols-2 space-x-2 h-16 justify-center" onSubmit={handleSudmit}>
            <input className="flex justify-end sm:w-[500px] sm:text-[20px] text-lg px-4 " id="nameTrainer" type="text" placeholder="Your name..." />
            <button className="text-white bg-red-600 w-20 sm:w-32 cursor-pointer ">Star!</button>
          </form>
        </article>
      </section>

      <Footer />
    </section>
  );
};

export default Home;
