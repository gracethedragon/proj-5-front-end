import { resolve } from "path";

export default function routes(app) {
  // Root route renders Webpack-generated main.html file
  app.get("/", (request, response) => {
    response.sendFile(resolve("dist", "main.html"));
  });

  app.get("/all-transactions", (req, res) => {
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
        {
          id: 2,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.5,
          network: "ETH",
          transactionType: "BUY",
          txValue: { date: "2022/05/23", value: 1001.21 },
          currentValue: { date: "2022/05/24", value: 1018.71 },
        },
        {
          id: 3,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.2,
          network: "ETH",
          transactionType: "BUY",
          txValue: { date: "2022/05/23", value: 1001.15 },
          currentValue: { date: "2022/05/24", value: 1018.71 },
        },
      ],
      stats: {
        saleoutlay: 0,
        outlay: 1000.21 + 1001.21 + 1001.15,
        actualrev: 0,
        unrealrev: 1018.71 + 1018.71 + 1018.71,
        actualgl: 0,
        unrealgl:
          ((1018.71 + 1018.71 + 1018.7 - (1000.21 + 1001.21 + 1001.15)) /
            (1018.71 + 1018.71 + 1018.71)) *
          100,
      },
    };
    res.send(response);
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
        unrealgl: (1018.71 - 1000.21) / 1018.71,
      },
    };
    res.send(response);
  });

  app.get("/all-views", (req, res) => {
      const response = {
        views: [
          {
            id: 1,
            viewname: "default viewname",
            createdDate: new Date(),
          },
          {
            id: 2,
            viewname: "default viewname 2",
            createdDate: new Date(),
          },
          {
            id: 3,
            viewname: "default viewname 3",
            createdDate: new Date(),
          },
        ],
        
      };
      res.send(response);
    });
  

     app
      .get("/get-view", (req,res)=>{
       const response = {
      transactions: [
        {
          id: 1,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.5,
          network: "ETH",
          transactionType: "BUY",
          txValue: { date: "2022/05/22", value: 1000.21 },
          currentValue: { date: "2022/05/24", value: 1018.71 },
        },
        {
          id: 2,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.5,
          network: "ETH",
          transactionType: "BUY",
          txValue: { date: "2022/05/23", value: 1001.21 },
          currentValue: { date: "2022/05/24", value: 1018.71 },
        },
        {
          id: 3,
          hash: "0x53285927aeb2594eaa5af6d9bd8560b4abcf7e6795ae40450496770d47e075ac",
          qty: 0.2,
          network: "ETH",
          transactionType: "BUY",
          txValue: { date: "2022/05/23", value: 1001.15 },
          currentValue: { date: "2022/05/24", value: 1018.71 },
        },
      ],
      stats: {
        saleoutlay: 0,
        outlay: 1000.21 + 1001.21 + 1001.15,
        actualrev: 0,
        unrealrev: 1018.71 + 1018.71 + 1018.71,
        actualgl: 0,
        unrealgl:
          ((1018.71 + 1018.71 + 1018.7 - (1000.21 + 1001.21 + 1001.15)) /
            (1018.71 + 1018.71 + 1018.71)) *
          100,
      },
    };
    res.send(response);
  });
}