import type { CryptoList } from "../types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getTopCoins = async ({
  numCryptos,
}: {
  numCryptos: number;
}): Promise<CryptoList> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${numCryptos}&page=1&sparkline=false`,
    );

    if (!response.ok) {
      throw new Error(`Error al conectar con la API`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las monedas:", error);
    throw error;
  }
};
