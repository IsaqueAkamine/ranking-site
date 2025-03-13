"use client";
import { usePlayers } from "@/hooks/usePlayers";

export default function Ranking() {
  const { jogadores, loading } = usePlayers();

  // Função para determinar a cor com base na posição
  const getColorByPosition = (position: number) => {
    if (position === 1) return "#FFD700"; // Ouro
    if (position >= 2 && position <= 4) return "#1E90FF"; // Azul
    if (position >= 5 && position <= 9) return "#FF4500"; // Vermelho
    if (position >= 10 && position <= 16) return "#32CD32"; // Verde
    if (position >= 17 && position <= 25) return "#000000"; // Preto
    if (position >= 26 && position <= 36) return "#FFA500"; // Laranja
    return "#FFFFFF"; // Branco (posições 37-50)
  };

  // Ordena os jogadores por posição (caso não estejam ordenados no Firestore)
  const jogadoresOrdenados = jogadores.sort((a, b) => a.posicao - b.posicao);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Ranking de Jogadores
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Carregando...</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 text-gray-700 w-12">Posição</th>{" "}
              {/* Largura fixa */}
              <th className="py-2 px-3 text-gray-700">Nome</th>
            </tr>
          </thead>
          <tbody>
            {jogadoresOrdenados.map((jogador) => {
              const color = getColorByPosition(jogador.posicao);

              return (
                <tr
                  key={jogador.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td
                    className="py-3 w-12 text-center" // Largura fixa e texto centralizado
                    style={{ backgroundColor: color }}
                  >
                    <span
                      className="font-medium flex items-center justify-center" // Centraliza o conteúdo
                      style={{
                        color:
                          jogador.posicao >= 17 && jogador.posicao <= 25
                            ? "#FFF"
                            : "#000",
                      }} // Cor do texto branco
                    >
                      {jogador.posicao}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-800">{jogador.nome}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
