const child_process = require('child_process');
const path = require('path');
const fs = require('fs');

const testingDockerContainer = false;

function run(name, command, env) {
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
            outStream.stream.write(`[${name}][${streamId}] ${line}`);
        }
    }
    function onEnd(streamId) {
        if (out[streamId].line.length > 0) {
            onData("\n", streamId);
        }
    }
    const finalCommand = 
        testingDockerContainer ? `${command} > /tmp/${name.replaceAll(" ", "-")}.txt 2>&1` :
        command;
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
        process.exit(1);
    });
}

async function start() {
    // for running async add the following to the end 
    // > /tmp/some_file 2>&1 &
    run("tsd", "tailscaled --tun=userspace-networking --socks5-server=localhost:1055");
    console.log('waiting 5 seconds');
    await (new Promise(resolve => {setTimeout(resolve, 5000);}));
    run("tsup", "tailscale up --hostname=ozy-app --accept-routes --auth-key=$TAIL_SCALE_AUTH_KEY");
    run("next app", "pnpm next start");
    run("envoy", "envoy -c ../../fwd-proxy/envoy.yaml");
}
// to ping the services run
// wget -qO- http://codespace.ozy.xyz:3000/api/health

start().catch(e => {console.log(e); process.exit(1);}).finally(() => {process.exit(0)});