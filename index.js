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

  const { Lightning, Autopilot, Invoices } = grpc.services;
  // Fetch current balance.
  const balance = await Lightning.walletBalance();

  console.log("balance", balance);

  // const invoice = await Lightning.
  const invoice = await Lightning.addInvoice(
    { value: 10000, memo: "test bitch" },
    async function (err, response) {
      console.log(response);
      if (err) reject(err);
      else {
        const { timestamp, expiry } = await Lightning.decodePayReq({
          pay_req: response.payment_request,
        });
        // resolve({
        //   r_hash: response.r_hash,
        //   payment_request: response.payment_request,
        //   expiration: timestamp + expiry,
        // });
      }
    }
  );

  console.log(invoice);
};

start();
