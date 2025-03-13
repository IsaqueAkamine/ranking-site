"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Bem-vindo ao Ranking de Jogadores
      </h1>
      {user ? (
        <div className="space-y-4">
          <p>Você está logado como: {user.email}</p>
          <Link
            href="/admin"
            className="bg-blue-600 p-2 rounded hover:bg-blue-700"
          >
            Acessar Painel de Administração
          </Link>
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-green-600 p-2 rounded hover:bg-green-700"
        >
          Fazer Login
        </Link>
      )}
    </div>
  );
}
