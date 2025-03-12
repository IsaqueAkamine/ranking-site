// import Ranking from "@/components/Ranking";

// export default function Home() {
//   return <Ranking />;
// }

// "use client";
// import { auth } from "@/lib/firebase";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [user, setUser] = useState(auth.currentUser);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(setUser);
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       {user ? <p>Logado como: {user.email}</p> : <p>Usuário não autenticado</p>}
//     </div>
//   );
// }

// "use client";
// import { useAuth } from "@/hooks/useAuth";

// export default function Home() {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold">Ranking de Jogadores</h1>

//       {user ? (
//         <div className="mt-4">
//           <p>Bem-vindo, {user.email}</p>
//           <button onClick={logout} className="bg-red-500 p-2 mt-2 rounded">
//             Sair
//           </button>
//         </div>
//       ) : (
//         <a href="/login" className="mt-4 text-blue-400">
//           Fazer login
//         </a>
//       )}
//     </div>
//   );
// }

"use client";
import { usePlayers } from "@/hooks/usePlayers";

export default function Home() {
  const { jogadores, loading } = usePlayers();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Ranking de Jogadores</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full max-w-2xl bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-2">Posição</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Cor</th>
            </tr>
          </thead>
          <tbody>
            {jogadores.map((jogador) => (
              <tr key={jogador.id} className="border-t border-gray-700">
                <td className="p-2">{jogador.posicao}</td>
                <td className="p-2">{jogador.nome}</td>
                <td className="p-2" style={{ color: getColor(jogador.cor) }}>
                  {jogador.cor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const getColor = (cor: string) => {
  const cores = {
    ouro: "#FFD700",
    azul: "#1E90FF",
    vermelho: "#FF4500",
    verde: "#32CD32",
    preto: "#000000",
    laranja: "#FFA500",
    branco: "#FFFFFF",
  };
  return cores[cor] || "#FFFFFF";
};
