import { execFileSync } from "node:child_process";

const PR_CREATE = /\bgh\s+pr\s+create\b/;
const BASE_FLAG = /(?:--base|-B)[\s=]+["']?([\w./-]+)/g;

function block(reason) {
  process.stderr.write(`PR bloqueada: ${reason}\n`);
  process.exit(2);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const raw = await readStdin();
let command;
try {
  command = JSON.parse(raw).tool_input?.command ?? "";
} catch {
  if (PR_CREATE.test(raw)) block("no se ha podido leer el comando, así que no se puede verificar.");
  process.exit(0);
}
if (!PR_CREATE.test(command)) process.exit(0);

const bases = [...command.matchAll(BASE_FLAG)].map((match) => match[1]);
if (bases.length > 1) block("hay más de un --base en el comando; deja solo el de la rama destino.");
const base = bases[0];
let branch;
try {
  branch = execFileSync("git", ["branch", "--show-current"], { encoding: "utf8" }).trim();
} catch {
  block("no se ha podido leer la rama actual con git.");
}

if (!base) block("indica la rama destino con --base main (las ramas de trabajo se fusionan en dev sin PR).");
if (base !== "main" && base !== "dev") block(`la rama destino tiene que ser main o dev, no ${base}.`);
if (base === "main" && branch !== "dev") block(`a main solo se llega desde dev, y esta rama es ${branch || "un commit suelto (detached HEAD)"}.`);
