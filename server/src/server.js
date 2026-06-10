const os = require('os');
const app = require('./app');
const { port, host } = require('./config');

function lanAddresses() {
  const nets = os.networkInterfaces();
  const ips = [];
  for (const iface of Object.values(nets)) {
    for (const net of iface) {
      if (net.family === 'IPv4' && !net.internal) ips.push(net.address);
    }
  }
  return ips;
}

app.listen(port, host, () => {
  console.log(`QuickSlot API listening on port ${port}`);
  console.log(`  local:   http://localhost:${port}`);
  for (const ip of lanAddresses()) {
    console.log(`  network: http://${ip}:${port}   <- use this from a phone`);
  }
});
