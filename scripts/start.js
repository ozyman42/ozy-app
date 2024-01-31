const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const testingDockerContainer = false;

function run(name, command, env, opts = {mayExit: false, pipeOut: true}) {
    const {mayExit, pipeOut} = opts;
    const out = {
        out: {
            line: "",
            stream: process.stdout
        },
        err: {
            line: "",
            stream: process.stderr
        }
    };
    function onData(data, streamId) {
        const outStream = out[streamId];
        outStream.line += data;
        const lines = outStream.line.split("\n");
        outStream.line = lines.pop() ?? "";
        for (const line of lines) {
            if (pipeOut) {
                outStream.stream.write(`[${name}][${streamId}] ${line}\n`);
            }
        }
    }
    function onEnd(streamId) {
        if (out[streamId].line.length > 0) {
            onData("\n", streamId);
        }
    }
    // for running async and writing each to its own file we add the following to the end 
    // > /tmp/some_file 2>&1 &
    const finalCommand = 
        testingDockerContainer ? `${command} > /tmp/${name.replaceAll(" ", "-")}.txt 2>&1` :
        command;
    console.log(`[${name}] STARTING (${finalCommand})`);
    const proc = child_process.exec(finalCommand, {
        env: Object.assign({}, process.env, env || {})
    });
    proc.stdout.on('data', data => {
        onData(data.toString(), 'out');
    });
    proc.stderr.on('data', data => {
        onData(data.toString(), 'err');
    });
    proc.on('close', (code) => {
        Object.keys(out).forEach(onEnd);
        console.log(`[${name}] EXITED WITH CODE ${code}`);
        if (!mayExit) {
            console.log(`exiting due to ${name}`);
            process.exit(1);
        }
    });
}

async function start() {
  const tailScaleDir = path.resolve('/var/lib/tailscale');
  fs.mkdirSync(tailScaleDir, {recursive: true});
  fs.writeFileSync(
    path.resolve(tailScaleDir, 'tailscaled.state'),
    process.env.TAIL_SCALE_STATE
  );
  // https://tailscale.com/kb/1112/userspace-networking
  run("tsd", "tailscaled --tun=userspace-networking --socks5-server=localhost:1055", {}, {mayExit: false, pipeOut: false});
  const secondsToWait = 5;
  console.log(`waiting ${secondsToWait} seconds`);
  await (new Promise(resolve => {setTimeout(resolve, 1000 * secondsToWait);}));
  run("tsup", "tailscale up --hostname=$TAIL_SCALE_MACHINE_NAME --ssh --accept-routes --auth-key=$TAIL_SCALE_AUTH_KEY", {}, {mayExit: true, pipeOut: false});
  run("next app", "pnpm next start", {PORT: 3000});
  run("http2socks5", "node ../../scripts/socks-passthrough.js 4000 http://codespace.ozy.xyz:3000");
  run("envoy", "envoy -c ../../fwd-proxy/envoy.yaml", {}, {mayExit: false, pipeOut: false});
  // keep it running
  return new Promise(resolve => {});
}
// to ping the services run
// wget -qO- http://codespace.ozy.xyz:3000/api/health

start()
    .catch(e => {
        console.log("CATCH BLOCK HIT");
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        console.log("FINALLY BLOCK HIT");
        process.exit(0);
    });

// Hack to prevent silent exit
// https://stackoverflow.com/questions/6442676/how-to-prevent-node-js-from-exiting-while-waiting-for-a-callback
(function wait () {
    setTimeout(wait, 1000);
})();