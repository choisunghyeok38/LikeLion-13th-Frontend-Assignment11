// DetailPage.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function DetailPage() {
  const { name } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ["pokemonDetail", name],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color={"#e60012"} />
      </div>
    );
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500 ">
                포켓몬 정보를 불러오는 데 실패했습니다.
            </div>;
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-slate-100 font-zen">
      <div className="flex flex-col items-center bg-white border-4 border-red-500 rounded-2xl w-100 p-6 shadow-md">
        <div>
          <img src={pokemon.sprites.front_default}
                alt={pokemon.name} 
                className="w-32 h-32 mb-4 rounded-full border-4 border-black"
                />
        </div>

        <h1 className="text-3xl uppercase mb-4 font-pretendard">{pokemon.name}</h1>

        <div className="flex gap-2 mb-4">
          {pokemon.types.map((t) => (
            <span key={t.type.name}
                className="px-3 py-1 bg-black text-white rounded-full text-sm capitalize"
            >{t.type.name}</span>
          ))}
        </div>
        
        <div className="w-full h-0.5 bg-red-500"></div>

        <ul className="w-full">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}
                className="flex justify-between border-b-2 border-red-500 py-1">
              <span className="font-medium">{stat.stat.name.toUpperCase()}</span>
              <span className="font-medium">{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;