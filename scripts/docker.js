const { execSync } = require('child_process');

function run(cmd) {
    console.log('running', cmd);
    execSync(cmd, {stdio: 'inherit'});
}

execSync(`docker images --filter "dangling=true" -q --no-trunc`)
    .toString()
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => line.substring('sha256:'.length))
    .forEach(sha => {
        execSync(`docker rmi ${sha}`, {stdio: 'inherit'});
    });
run("docker build . -t test");
run("docker run -it --rm --entrypoint sh -p 8080:80 -e TAIL_SCALE_AUTH_KEY test");
