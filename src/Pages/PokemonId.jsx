import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Header";

const backgroundByType = {
  grass: "from-green-500 to-green-200 ",
  fire: "from-orange-500 to-orange-200 ",
  water: "from-blue-500 to-blue-200 ",
  bug: "from-green-600 to-black ",
  normal: "from-orange-950 to-red-600 ",
  fighting: "from-red-900 to-orange-500",
  ground: "from-yellow-700 to-yellow-600",
  poison: "from-violet-700 to-violet-300",
  rock: "from-gray-500 to-gray-200",
  ghost: "from-blue-900 to-white",
  steel: "from-blue-700 to-indigo-700",
  electric: "from-yellow-200 to-amber-300",
  psychic: "from-yellow-400 to-yellow-700",
  ice: "from-cyan-400 to-cyan-300 ",
  dragon: "from-cyan-600 to-cyan-500",
  dark: "from-black to-gray-700",
  fairy: "from-pink-700 to-pink-200",
};

const textByType = {
  grass: "text-green-500",
  fire: "text-orange-500",
  water: "text-blue-500",
  bug: "text-green-600",
  normal: "text-orange-900",
  fighting: "text-red-800",
  ground: "text-yellow-700",
  poison: "text-violet-800",
  rock: "text-gray-500",
  ghost: "text-blue-900",
  electric: "text-yellow-500",
  psychic: "text-amber-600",
  dark: "text-black",
  fairy: "text-pink-700",
};

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgres}%`;
  };

  return (
    <section>
      <Header />

      <section className="px-2 py-14">
        <article className="max-w-[768px] mx-auto shadow-xl p-4">
          {/*Lo demas */}

          <section
            className={`bg-gradient-to-b ${
              backgroundByType[pokemon?.types[0].type.name]
            } relative h-[150px]`}
          >
            <article>
              <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
                <img
                  src={pokemon?.sprites.other["official-artwork"].front_default}
                  alt=""
                />
              </div>
            </article>
          </section>

          <section>
            <div>
              <h3>#{pokemon?.id}</h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2
                className={`font-bold capitalize ${
                  textByType[pokemon?.types[0].type.name]
                }`}
              >
                {pokemon?.name}
              </h2>
              <hr />
            </div>

            <div className="flex justify-center gap-6 text-center">
              <div>
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>

              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>
          </section>
          <section className="grid md:grid-cols-2 gap-4">
            {/* tipos */}
            <section className="text-center">
              <h3>Types</h3>

              <section className="grid grid-cols-2 gap-4 mt-4">
                {pokemon?.types.map((type) => (
                  <article
                    className="p-2 px-8 border-[1px] border-gray-300 capitalize"
                    key={type.type.name}
                  >
                    {type.type.name}
                  </article>
                ))}
              </section>
            </section>
            {/* habilidades */}
            <section className="text-center">
              <h3>Abilities</h3>

              <section className="grid grid-cols-2 gap-4 mt-4">
                {pokemon?.abilities.map((ability) => (
                  <article
                    className="p-2 px-8 border-[1px] border-gray-300 capitalize truncate"
                    key={ability.ability.name}
                  >
                    {ability.ability.name}
                  </article>
                ))}
              </section>
            </section>
          </section>

          {/* stats*/}
          <section>
            <h3>Stats</h3>
            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between">
                    <h5 className="capitalize">{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </section>

                  <div className="bg-gray-100 h-6 rounded-sm">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
