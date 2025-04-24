import axios from "axios";

type Metadata = {
  id: number;
  name: string;
  symbol: string;
  description: string;
};

type ResponseData = {
  data: {
    [key: string]: Metadata[];
  };
};

export async function getCoinInfos(symbol: String) {
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
      },
    });
    return response.data as ResponseData;
  } catch (error) {
    throw error;
  }
}
