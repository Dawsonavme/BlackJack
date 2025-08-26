import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { transform } from "esbuild";

const root = resolve(process.cwd());
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml"
};

http.createServer(async (req, res) => {
  try {
    let pathname = decodeURI(new URL(req.url, "http://x").pathname);
    if (pathname === "/") pathname = "/index.html";
    const file = join(root, pathname);
    const ext = extname(file).toLowerCase();

    // Serve TS files as transformed JS
    if (ext === ".ts" || ext === ".tsx") {
      const src = await readFile(file, "utf8");
      const out = await transform(src, {
        loader: ext === ".tsx" ? "tsx" : "ts",
        format: "esm",
        target: "es2020",
        sourcemap: "inline"
      });
      res.setHeader("Content-Type", "text/javascript; charset=utf-8");
      res.end(out.code);
      return;
    }

    // Static files
    const buf = await readFile(file);
    res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
    res.end(buf);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
}).listen(5173, () => {
  console.log("Dev server running at http://localhost:5173");
});
