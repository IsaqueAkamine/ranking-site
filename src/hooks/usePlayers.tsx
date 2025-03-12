import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface Jogador {
  id: string;
  nome: string;
  posicao: number;
  cor: string;
}

export function usePlayers() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const q = query(collection(db, "jogadores"), orderBy("posicao"));
      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Jogador[];
      setJogadores(lista);
      setLoading(false);
    };

    fetchPlayers();
  }, []);

  return { jogadores, loading };
}
