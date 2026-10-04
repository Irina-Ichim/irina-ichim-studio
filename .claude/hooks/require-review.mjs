import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const PR_CREATE = /\bgh\s+pr\s+create\b/;
const BASE_FLAG = /(?:--base|-B)[\s=]+["']?([\w./-]+)/;

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function block(reason) {
  process.stderr.write(`PR bloqueada: ${reason}\n`);
  process.exit(2);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const input = JSON.parse(await readStdin());
const command = input.tool_input?.command ?? "";
if (!PR_CREATE.test(command)) process.exit(0);

const base = BASE_FLAG.exec(command)?.[1];
const branch = git("branch", "--show-current");

if (!base) block("indica la rama destino con --base dev (o --base main solo desde dev).");
if (base === "main" && branch !== "dev") block(`a main solo se llega desde dev, y esta rama es ${branch}.`);
if (base !== "main" && base !== "dev") block(`la rama destino tiene que ser dev o main, no ${base}.`);

const head = git("rev-parse", "HEAD");
const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const approval = join(projectDir, ".claude", "revisiones", `${head}.ok`);

if (!existsSync(approval)) {
  block(`el commit ${head.slice(0, 7)} no tiene la aprobación del agente pr-reviewer. Lánzalo, resuelve lo bloqueante y vuelve a intentarlo.`);
}
