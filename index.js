const LndGrpc = require("lnd-grpc");

const options = {
  host: "127.0.0.1:10001",
  cert: "/Users/austinkelsay/.polar/networks/5/volumes/lnd/alice/tls.cert",
  macaroon:
    "/Users/austinkelsay/.polar/networks/5/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon",
};

const grpc = new LndGrpc(options);

const start = async () => {
  await grpc.connect();

  console.log(grpc.state);

  const { Lightning, Autopilot, Invoices, Channels, Router } = grpc.services;
  // Fetch current balance.
  const balance = await Lightning.walletBalance();

  console.log("balance", balance);

  const channels = await Lightning.channelBalance();

  console.log("channels", channels);

  const invoicePaid = await Router.sendPaymentV2({
    timeout_seconds: 10,
    payment_request:
      "lnbcrt220u1p3usac7pp5sfzn75dezcj9rm2ccz3vu8zmqzwq095jtlkej9gfsyfkvtdgj2fsdqqcqzpgxqyz5vqsp53w0jj45em97dm65u05rnxvvp2edxcnuhwx98en0ghs5uv5ksnjks9qyyssq59dqt0py4s0c4ssxhmsx0mxka3ektcq436fgns20j95ffyl6m5yrwd9wy5fl3eka6q53hclxw3qkvsnlvuq5vkrpprka8y5lya0czjsqjxx48v",
  });

  invoicePaid.on("data", function (response) {
    // A response was received from the server.
    console.log(response);
  });

  // const invoice = await Lightning.
  // const invoice = await Lightning.addInvoice(
  //   { value: 10000, memo: "test" },
  //   async function (err, response) {
  //     // console.log(response);
  //     if (err) reject(err);
  //     else {
  //       const { timestamp, expiry } = await Lightning.decodePayReq({
  //         pay_req: response.payment_request,
  //       });
  //     }
  //   }
  // );
};

start();
