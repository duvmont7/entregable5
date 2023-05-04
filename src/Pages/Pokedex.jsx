import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";
import { useRef } from "react";
import { paginationLogic } from "../utils/pagination";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const input = useRef(null);

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  // logica de la paginación con useMemo
  const { lastPage, pagesInBlock, pokemonInPage } = useMemo(
    () => paginationLogic(currentPage, pokemonsByName),
    [currentPage, pokemons, pokemonName, currentType]
  );

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

      axios
        .get(URL)
        .then((res) => {
          const pokemonsByType = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonName, currentType]);

  useEffect(() => {
    setPokemonName("");
    input.current.value = "";
  }, [currentType]);

  return (
    <section className="min-h-screen">
      <Header />

      <section className="py-6 px-20 grid grid-cols-1 sm:grid-rows-[2] text-lg sm:text-xl">
        <h3 className="">
          <span className="text-red-500">Welcome {nameTrainer},</span>{" "}
          <span>here you can find your favorite pokemon...</span>{" "}
        </h3>

        <form
          className="sm:justify-between place-content-center grid lg:grid-cols-2 drop-shadow-lg p-8 items-center sm:gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex p-4">
            <input
              className="w-full h-10 sm:w-96 sm:h-10 p-4"
              id="pokemonName"
              type="text"
              placeholder="Search your pokemon"
              ref={input}
            />
            <button className="w-20 text-white bg-red-600 cursor-pointer sm:w-32 h-10">
              Search
            </button>
          </div>

          <select
            className=" w-80 h-10 px-3 capitalize "
            onChange={(e) => setCurrentType(e.target.value)}
          >
            <option className="text-lg" value="">All</option>
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>

      {/* Paginacion*/}
      <ul className="flex gap-3 justify-center p-4 px-2 flex-wrap">
        <li
          onClick={() => setCurrentPage(1)}
          className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
        >
          {"<<"}
        </li>
        <li
          onClick={handleClickPreviusPage}
          className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
        >
          {"<"}
        </li>
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => setCurrentPage(numberPage)}
            className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${
              numberPage === currentPage && "bg-red-300"
            } `}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}
        <li
          onClick={handleClickNextPage}
          className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
        >
          {">"}
        </li>

        {/* Ultima pagina*/}
        <li
          onClick={() => setCurrentPage(lastPage)}
          className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
        >
          {">>"}
        </li>
      </ul>

      <section className="p-4 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] max-w-[1000px] mx-auto">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
    </section>
  );
};

export default Pokedex;
