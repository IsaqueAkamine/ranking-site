import { PlayersName } from "@/mocks/Jogadores";
import React from "react";

// const players = Array.from({ length: 50 }, (_, i) => `Jogador ${i + 1}`);
const players = PlayersName;

export default function Ranking() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Ranking de Jogadores
        </h1>
        <ul className="divide-y divide-gray-700">
          {players.map((player, index) => (
            <li key={index} className="py-2 px-4 flex justify-between">
              <span className="font-medium">{index + 1}.</span>
              <span>{player}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
