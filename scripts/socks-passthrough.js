const http = require('http');
const httpProxy = require('http-proxy');
const { SocksProxyAgent } = require('socks-proxy-agent');
const socksProxy = 'socks5://127.0.0.1:1055';
const ingressPort = parseInt(process.argv[2]);
const destinationUrl = process.argv[3];
const socksAgent = new SocksProxyAgent(socksProxy);
const proxy = httpProxy.createProxyServer({});
// Error handling for the proxy
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err.message);

  let problem = '';
  if (!res.headersSent) {
    if (err.code === 'ECONNREFUSED') {
      problem = 'Bad Gateway';
      res.writeHead(502);
    } else {
      problem = 'Internal Server Error';
      res.writeHead(500);
    }
  }

  res.end({problem, cause: err.message});
});
const server = http.createServer((req, res) => {
  proxy.web(req, res, { agent: socksAgent, target: destinationUrl, changeOrigin: true });
});
server.listen(ingressPort, () => {
  console.log(`Proxy server listening on port ${ingressPort}`);
  console.log('Forwarding to', destinationUrl);
});