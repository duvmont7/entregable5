import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  grass: "border-green-200",
  fire: "border-orange-500",
  water: "border-blue-300",
  bug: "border-green-600",
  normal: "border-orange-900",
  fighting: "border-red-800",
  ground: "border-yellow-700",
  poison: "border-violet-700",
  rock: "border-gray-500",
  ghost: "border-blue-900",
  steel: "border-blue-700",
  electric: "border-yellow-300",
  psychic: "border-yellow-400",
  ice: "border-cyan-300",
  dragon: "border-cyan-600",
  dark: "border-black",
  fairy: "border-pink-700",
};

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

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`text-center border-8 rounded-md ${
        bordersByType[pokemon?.types[0].type.name]
      }`}
    >
      {/*Seccion superior */}
      <section
        className={`bg-gradient-to-b ${
          backgroundByType[pokemon?.types[0].type.name]
        } relative h-[150px]`}
      >
        <div className="absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2 ">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </section>

      {/*Seccion inferior */}
      <section>
        <h3
          className={`mt-10 capitalize ${
            textByType[pokemon?.types[0].type.name]
          }`}
        >
          {pokemon?.name}
        </h3>
        <h4 className="capitalize">{types}</h4>
        <span>Type</span>

        <hr />

        <section className="grid grid-cols-3 gap-2 p-2">
          {pokemon?.stats.map((stat) => (
            <div key={stat.stat.name}>
              <h5 className="capitalize">{stat.stat.name}</h5>
              <span className={`${textByType[pokemon?.types[0].type.name]}`}>
                {pokemon?.stat}
                {stat.base_stat}
              </span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
