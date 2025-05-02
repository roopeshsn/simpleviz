require('dotenv').config()

const GOLD_API_KEY = process.env.GOLD_API_KEY;

function createGoldAPIPlugin(pair = "XAU/INR", labelName = "Gold Price (22K)", apiKey=GOLD_API_KEY) {
    return {
      id: `gold-${pair.replace("/", "-").toLowerCase()}`,
      label: labelName,
      fetchData: async function () {
        const res = await fetch(`https://www.goldapi.io/api/${pair}`, {
          headers: {
            "x-access-token": apiKey,
            "Content-Type": "application/json"
          }
        });
  
        const json = await res.json();
        const today = new Date();
        const basePrice = json.price_gram_22k;
  
        const data = [];

        // goldapi.io only provides current price and not historical data
        // so we will generate some fake historical data for the last 30 days
        // this is just for testing purposes and should be replaced with actual historical data
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          data.push({
            date: date.toISOString().split("T")[0],
            price: basePrice + (Math.random() * 20 - 10) 
          });
        }
  
        return data;
      }
    };
  }
  