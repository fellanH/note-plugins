import { jsxs as c, jsx as i } from "react/jsx-runtime";
import { useState as p, useCallback as L } from "react";
import A from "@monaco-editor/react";
import { invoke as f } from "@tauri-apps/api/core";
const F = {
  id: "com.origin.monaco",
  name: "Monaco Editor",
  version: "0.1.0",
  description: "VS Code editor — open and edit any file",
  icon: "✏️"
};
async function E(n = {}) {
  return typeof n == "object" && Object.freeze(n), await f("plugin:dialog|open", { options: n });
}
var r;
(function(n) {
  n[n.Audio = 1] = "Audio", n[n.Cache = 2] = "Cache", n[n.Config = 3] = "Config", n[n.Data = 4] = "Data", n[n.LocalData = 5] = "LocalData", n[n.Document = 6] = "Document", n[n.Download = 7] = "Download", n[n.Picture = 8] = "Picture", n[n.Public = 9] = "Public", n[n.Video = 10] = "Video", n[n.Resource = 11] = "Resource", n[n.Temp = 12] = "Temp", n[n.AppConfig = 13] = "AppConfig", n[n.AppData = 14] = "AppData", n[n.AppLocalData = 15] = "AppLocalData", n[n.AppCache = 16] = "AppCache", n[n.AppLog = 17] = "AppLog", n[n.Desktop = 18] = "Desktop", n[n.Executable = 19] = "Executable", n[n.Font = 20] = "Font", n[n.Home = 21] = "Home", n[n.Runtime = 22] = "Runtime", n[n.Template = 23] = "Template";
})(r || (r = {}));
var h;
(function(n) {
  n[n.Start = 0] = "Start", n[n.Current = 1] = "Current", n[n.End = 2] = "End";
})(h || (h = {}));
async function R(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  const e = await f("plugin:fs|read_text_file", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  }), o = e instanceof ArrayBuffer ? e : Uint8Array.from(e);
  return new TextDecoder().decode(o);
}
async function j(n, t, e) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  const o = new TextEncoder();
  await f("plugin:fs|write_text_file", o.encode(t), {
    headers: {
      path: encodeURIComponent(n instanceof URL ? n.toString() : n),
      options: JSON.stringify(e)
    }
  });
}
function T(n) {
  const t = n.split(".").pop()?.toLowerCase() ?? "";
  return {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    md: "markdown",
    rs: "rust",
    css: "css",
    html: "html",
    py: "python",
    sh: "shell",
    toml: "toml",
    yaml: "yaml",
    yml: "yaml"
  }[t] ?? "plaintext";
}
function k(n) {
  return n.split(/[\\/]/).pop() ?? n;
}
function P({ context: n }) {
  const [t, e] = p(null), [o, d] = p(""), [x, g] = p("plaintext"), [s, u] = p(!1), m = n.theme === "dark";
  async function b() {
    const a = await E({ multiple: !1 }), l = Array.isArray(a) ? a[0] : a;
    if (l)
      try {
        const v = await R(l);
        e(l), d(v), g(T(l)), u(!1);
      } catch {
      }
  }
  async function w() {
    if (!(!t || !s))
      try {
        await j(t, o), u(!1);
      } catch {
      }
  }
  const C = L((a) => {
    d(a ?? ""), u(!0);
  }, []);
  return /* @__PURE__ */ c("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ c(
      "div",
      {
        className: `flex shrink-0 items-center gap-2 border-b px-3 py-2 text-sm ${m ? "border-zinc-700 text-zinc-100" : "border-zinc-200 text-zinc-900"}`,
        children: [
          /* @__PURE__ */ c("span", { className: "truncate text-xs opacity-60 font-mono", children: [
            t ? k(t) : "No file open",
            s && " •"
          ] }),
          /* @__PURE__ */ i(
            "button",
            {
              onClick: b,
              className: "ml-auto shrink-0 rounded px-2 py-0.5 text-xs hover:bg-white/10",
              children: "Open"
            }
          ),
          /* @__PURE__ */ i(
            "button",
            {
              onClick: w,
              disabled: !s || !t,
              className: "shrink-0 rounded px-2 py-0.5 text-xs hover:bg-white/10 disabled:opacity-30",
              children: "Save"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ i(
      A,
      {
        height: "100%",
        language: x,
        value: o,
        onChange: C,
        theme: m ? "vs-dark" : "vs-light",
        options: {
          minimap: { enabled: !1 },
          fontSize: 12,
          lineNumbers: "on",
          scrollBeyondLastLine: !1,
          wordWrap: "on"
        }
      }
    ) })
  ] });
}
export {
  P as default,
  F as manifest
};
