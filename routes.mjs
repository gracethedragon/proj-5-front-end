import { resolve } from "path";

export default function routes(app) {
  // Root route renders Webpack-generated main.html file
  app.get("/", (request, response) => {
    response.sendFile(resolve("dist", "main.html"));
  });

  app.get("/retrieve-tracked-transactions", (req, res) => {
    const tradedTransactions = [
      {
        transaction: {
          id: 1,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.5,
          network: "ETH",
          sendingAddress: "0x248fb95fc8e064faeb5c8cbeab59d06558ceec80",
          retrievingAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          historicalPrices: 1045.68 / 0.5,
        },
        transactionStatistics: {
          transactionValueUSD: { value: 1045.68 },
          CurrentValueUSD: { value: 1018.71 }, //2037.42*0.5
        },
      },
      {
        transaction: {
          id: 2,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.5,
          network: "ETH",
          sendingAddress: "0x248fb95fc8e064faeb5c8cbeab59d06558ceec80",
          retrievingAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          historicalPrices: 1045.68 / 0.5,
        },
        transactionStatistics: {
          transactionValueUSD: 1045.68,
          CurrentValueUSD: 1018.71, //2037.42*0.5
        },
      },
    ];

    res.send({ tradedTransactions });
  });

  app.post("/track-transaction", (req, res) => {
    const response = {
      transaction: [
        {
          id: 1,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.5,
          network: "ETH",
          transactionType: "BUY",
          txValue: { date: "2022/05/22", value: 1000.21 },
          currentValue: { date: "2022/05/24", value: 1018.71 },
        },
      ],
      stats: {
        unrealisedGL: (1018.71 - 1000.21) / 1018.71,
      },
    };
    res.send(response);
  });
}
