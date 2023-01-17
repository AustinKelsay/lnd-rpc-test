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

  const invoice = await Invoices.subscribeSingleInvoice({
    r_hash_str: "a",
  });

  console.log(invoice);
};

start();
