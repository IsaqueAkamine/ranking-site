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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Ranking de Jogadores
        </h1>
        <div className="bg-gray-800 rounded-lg p-6">
          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : (
            <ul className="space-y-2">
              {jogadoresOrdenados.map((jogador) => {
                const color = getColorByPosition(jogador.posicao);

                return (
                  <li
                    key={jogador.id}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: color }}
                      >
                        <span
                          className="text-white font-medium"
                          style={{
                            color: jogador.posicao >= 37 ? "#000" : "#FFF",
                          }}
                        >
                          {jogador.posicao}
                        </span>
                      </div>
                      <span className="text-gray-200">{jogador.nome}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
