"use client";
import Ranking from "@/components/Ranking";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Ranking
            </Link>
            {user?.email === "admin@example.com" && (
              <Link
                href="/admin"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Admin
              </Link>
            )}
          </div>
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="pt-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bem-vindo ao Ranking de Tênis Toledão 2025
        </h1>
        {user ? (
          <div className="space-y-8">
            <Ranking />
          </div>
        ) : (
          <div className="text-center">
            <Link
              href="/login"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Fazer Login
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
