const { createLnRpc } = require("@radar/lnrpc");

(async () => {
  const lnRpcClient = await createLnRpc({
    /*
     * By default lnrpc connects to `localhost:10001`,
     * however we can point to any host.
     */
    // server: '173.239.209.2:3001',

    /*
     * By default  lnrpc looks for your tls certificate at:
     * `~/.lnd/tls.cert`, unless it detects you're using macOS and
     * defaults to `~/Library/Application\ Support/Lnd/tls.cert`
     * however you can configure your own SSL certificate path like:
     */
    tls: "/Users/austinkelsay/.polar/networks/5/volumes/lnd/alice/tls.cert",

    /*
     * You can also provide a TLS certificate directly as a string
     * (Just make sure you don't commit this to git).
     * Overwrites: `tls`
     */
    // cert: process.env.MY_SSL_CERT,

    /*
     * Optional path to configure macaroon authentication
     * from LND generated macaroon file.
     */
    macaroonPath:
      "/Users/austinkelsay/.polar/networks/5/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon",

    /*
     * Optional way to configure macaroon authentication by
     * passing a hex encoded string of your macaroon file.
     * Encoding: `xxd -ps -u -c 1000 ./path/to/data/admin.macaroon`
     * Details: https://github.com/lightningnetwork/lnd/blob/dc3db4b/docs/macaroons.md#using-macaroons-with-grpc-clients
     */
    // macaroon: process.env.MY_MACAROON_HEX,
  });

  try {
    const getInfoResponse = await lnRpcClient.getInfo();
    console.log(getInfoResponse);

    // All requests are promisified and typed
    const { confirmedBalance } = await lnRpcClient.walletBalance();

    // ...and you're off!
    console.log(confirmedBalance);
  } catch (error) {
    console.error(error);
  }
})();
