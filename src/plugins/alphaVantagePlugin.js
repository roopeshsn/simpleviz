require('dotenv').config()

const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

function createAlphaVantagePlugin(symbol, displayName, apiKey=ALPHAVANTAGE_API_KEY) {
    return {
      id: `stock-${symbol.toLowerCase()}`,
      label: `Stock: ${displayName}`,
      fetchData: async function () {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const series = data["Time Series (Daily)"];
        if (!series) {
          alert(`Error loading ${symbol}`);
          return [];
        }

        return Object.entries(series)
          .slice(0, 30)
          .map(([date, ohlc]) => ({
            date,
            price: parseFloat(ohlc["4. close"])
          }))
          .reverse();
      }
    };
  }


