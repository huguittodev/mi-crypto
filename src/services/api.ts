import type { CryptoList } from "../types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getTopCoins = async ({
  numCryptos,
}: {
  numCryptos: number;
}): Promise<CryptoList> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=${numCryptos}&page=1&sparkline=false`,
    );

    if (response.status === 429) throw new Error("LIMITE_EXCEDIDO");
    if (!response.ok) throw new Error("ERROR_GENERICO");

    return await response.json();
  } catch (error: any) {
    // Error específico para el límite de peticiones excedido
    if (error instanceof TypeError) {
      throw new Error(
        "Límite de peticiones alcanzado. Espera un minuto antes de reintentar.",
      );
    }

    // Si llegara a ser otro tipo de error manual
    throw new Error("Error de conexión inesperado.");
  }
};
