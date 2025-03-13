// src/app/admin/page.tsx
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { usePlayers } from "@/hooks/usePlayers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { jogadores, loading } = usePlayers();
  const [nome, setNome] = useState("");
  const [posicao, setPosicao] = useState("");
  const [editando, setEditando] = useState<string | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editPosicao, setEditPosicao] = useState("");

  // Verifica se o usuário é admin
  useEffect(() => {
    if (!user || user.email !== "admin@example.com") {
      router.push("/");
    }
  }, [user, router]);

  // Adicionar jogador
  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !posicao) return;

    try {
      await addDoc(collection(db, "jogadores"), {
        nome,
        posicao: Number(posicao),
      });
      toast.success("Jogador adicionado com sucesso!");
      setNome("");
      setPosicao("");
    } catch (error) {
      console.error("Erro ao adicionar jogador:", error);
      toast.error("Erro ao adicionar jogador.");
    }
  };

  // Remover jogador
  const handleRemovePlayer = async (id: string) => {
    try {
      await deleteDoc(doc(db, "jogadores", id));
      toast.success("Jogador removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover jogador:", error);
      toast.error("Erro ao remover jogador.");
    }
  };

  // Iniciar edição de jogador
  const iniciarEdicao = (jogador: any) => {
    setEditando(jogador.id);
    setEditNome(jogador.nome);
    setEditPosicao(jogador.posicao.toString());
  };

  // Salvar edição de jogador
  const handleEditPlayer = async (id: string) => {
    if (!editNome || !editPosicao) return;

    try {
      await updateDoc(doc(db, "jogadores", id), {
        nome: editNome,
        posicao: Number(editPosicao),
      });
      toast.success("Jogador atualizado com sucesso!");
      setEditando(null);
    } catch (error) {
      console.error("Erro ao atualizar jogador:", error);
      toast.error("Erro ao atualizar jogador.");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout.");
    }
  };

  // Função para determinar a cor com base na posição
  const getColorByPosition = (posicao: number) => {
    if (posicao === 1) return "#FFD700"; // Ouro
    if (posicao >= 2 && posicao <= 4) return "#1E90FF"; // Azul
    if (posicao >= 5 && posicao <= 9) return "#FF4500"; // Vermelho
    if (posicao >= 10 && posicao <= 16) return "#32CD32"; // Verde
    if (posicao >= 17 && posicao <= 25) return "#000000"; // Preto
    if (posicao >= 26 && posicao <= 36) return "#FFA500"; // Laranja
    return "#FFFFFF"; // Branco (posições 37-50)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Painel de Administração</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 p-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Formulário para adicionar jogador */}
        <form onSubmit={handleAddPlayer} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do Jogador"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
            <input
              type="number"
              placeholder="Posição"
              value={posicao}
              onChange={(e) => setPosicao(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 p-2 rounded mt-4 hover:bg-green-700"
          >
            Adicionar Jogador
          </button>
        </form>

        {/* Lista de jogadores */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Lista de Jogadores</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul className="space-y-2">
              {jogadores.map((jogador) => (
                <li
                  key={jogador.id}
                  className="flex justify-between items-center p-2 bg-gray-700 rounded"
                >
                  {editando === jogador.id ? (
                    // Formulário de edição
                    <div className="flex flex-col space-y-2 w-full">
                      <input
                        type="text"
                        value={editNome}
                        onChange={(e) => setEditNome(e.target.value)}
                        className="w-full p-1 bg-gray-600 rounded"
                        required
                      />
                      <input
                        type="number"
                        value={editPosicao}
                        onChange={(e) => setEditPosicao(e.target.value)}
                        className="w-full p-1 bg-gray-600 rounded"
                        required
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPlayer(jogador.id)}
                          className="bg-blue-600 p-1 rounded hover:bg-blue-700"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditando(null)}
                          className="bg-gray-600 p-1 rounded hover:bg-gray-700"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Exibição normal
                    <>
                      <span>
                        {jogador.nome} (Posição: {jogador.posicao})
                      </span>
                      <span
                        style={{ color: getColorByPosition(jogador.posicao) }}
                      >
                        {getColorNameByPosition(jogador.posicao)}
                      </span>
                      <div>
                        <button
                          onClick={() => iniciarEdicao(jogador)}
                          className="text-blue-400 mr-2 hover:text-blue-500"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleRemovePlayer(jogador.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          Remover
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Função para obter o nome da cor com base na posição
const getColorNameByPosition = (posicao: number) => {
  if (posicao === 1) return "Ouro";
  if (posicao >= 2 && posicao <= 4) return "Azul";
  if (posicao >= 5 && posicao <= 9) return "Vermelho";
  if (posicao >= 10 && posicao <= 16) return "Verde";
  if (posicao >= 17 && posicao <= 25) return "Preto";
  if (posicao >= 26 && posicao <= 36) return "Laranja";
  return "Branco";
};
