# My Crypto MCP

This Model Context Protocol (MCP) server provides cryptocurrency information through Claude Desktop. It connects to the CoinMarketCap API to fetch real-time cryptocurrency data.

## Features

- Get current cryptocurrency information by symbol
- View a sample cryptocurrency portfolio

## Prerequisites

- [Claude Desktop](https://claude.ai/desktop)
- [Node.js](https://nodejs.org/) (v14 or later)
- CoinMarketCap API key (get one at [coinmarketcap.com/api](https://coinmarketcap.com/api/))

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Configure Claude Desktop

Add the MCP server to Claude Desktop by editing the Claude configuration file:

1. Open Claude Desktop settings
2. Add the following configuration:

```json
{
  "mcpServers": {
    "crypto": {
      "command": "node",
      "args": ["/absolute/path/to/your/project/build/index.js"],
      "env": {
        "CMC_API_KEY": "your-coinmarketcap-api-key"
      }
    }
  }
}
```

> **Important:** Replace `/absolute/path/to/your/project` with the actual path to your project directory and `your-coinmarketcap-api-key` with your actual CoinMarketCap API key.

### 4. Restart Claude Desktop

After adding the configuration, restart Claude Desktop to load the MCP server.

## Using the Crypto MCP

Once configured, you can use the following commands in your chat with Claude:

### Get Cryptocurrency Information

Ask Claude about specific cryptocurrencies by their symbols:

```
Can you get me information about BTC, ETH and SOL using the crypto tool?
```

Claude will fetch the latest information from CoinMarketCap API and display descriptions for the requested cryptocurrencies.

### View Sample Portfolio

Ask Claude about your crypto portfolio:

```
What's in my cryptocurrency portfolio?
```

Claude will display a sample portfolio (5000 ZK, 100 Bitcoin, 200 Ethereum).

## Development

- Source code is in the src directory
- The main MCP server is defined in index.ts
- API interactions are handled in helper.ts

## Troubleshooting

If you encounter issues:

1. Check that your CoinMarketCap API key is valid
2. Verify the path to the build file in Claude Desktop configuration
3. Check console output for any error messages
