const { execSync } = require('child_process');

function run(cmd, env) {
    console.log('running', cmd);
    execSync(cmd, {stdio: 'inherit', env: Object.assign({}, process.env, env)});
}

// for full clean run
// docker system prune -f
execSync(`docker images --filter "dangling=true" -q --no-trunc`)
    .toString()
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => line.substring('sha256:'.length))
    .forEach(sha => {
        execSync(`docker rmi ${sha}`, {stdio: 'inherit'});
    });
const imageName = 'test';
run(`docker build . -t ${imageName}`, {});
run([
  "docker run -it --rm --entrypoint sh",
  "-p 8080:80 -p 8030:3000",
  "-e TAIL_SCALE_AUTH_KEY",
  "-e TAIL_SCALE_STATE",
  "-e TAIL_SCALE_MACHINE_NAME",
  imageName
].join(" "), {
    TAIL_SCALE_MACHINE_NAME: "ozy-app-codespace",
    TAIL_SCALE_STATE: process.env.TAIL_SCALE_OZY_APP_STATE
});
