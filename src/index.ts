import dotenv from "dotenv";
dotenv.config();

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getCoinInfos } from "./helper.js";

// Create server instance
const server = new McpServer({
  name: "crypto",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register tools
server.tool(
  "get-price-today",
  "Get price today for cryptocurrencies",
  {
    state: z
      .string()
      .describe(
        "Symbols of the cryptocurrencies separated by commas. Example: BTC,ETH,SOL"
      ),
  },
  async ({ state }) => {
    try {
      const infos = (await getCoinInfos(state)).data;

      const data: { id: number; symbol: string; description: string }[] = [];

      Object.entries(infos).forEach(([, value]) => {
        for (const item of value) {
          data.push({
            id: item.id,
            symbol: item.symbol,
            description: item.description,
          });
        }
      });

      return {
        content: [
          {
            type: "text",
            text: data.map((item) => item.description).join("\n"),
          },
        ],
      };
    } catch (error: any) {
      console.error("Error fetching data from CoinMarketCap API");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(error),
          },
        ],
      };
    }
  }
);

server.tool(
  "get-porfolio",
  "Get my cryptocurrency portfolio",
  {
    state: z.string(),
  },
  async () => {
    return {
      content: [
        {
          type: "text",
          text: "5000 ZK, 100 Bitcoin, 200 Ethereum",
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
