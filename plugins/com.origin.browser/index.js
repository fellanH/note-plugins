import { jsxs as d, jsx as a } from "react/jsx-runtime";
import { useState as r, useEffect as A } from "react";
import { invoke as s } from "@tauri-apps/api/core";
const F = {
  id: "com.origin.browser",
  name: "Browser",
  version: "0.1.0",
  description: "View any URL in a panel — great for localhost dev servers",
  icon: "🌐"
};
var g;
(function(n) {
  n[n.Audio = 1] = "Audio", n[n.Cache = 2] = "Cache", n[n.Config = 3] = "Config", n[n.Data = 4] = "Data", n[n.LocalData = 5] = "LocalData", n[n.Document = 6] = "Document", n[n.Download = 7] = "Download", n[n.Picture = 8] = "Picture", n[n.Public = 9] = "Public", n[n.Video = 10] = "Video", n[n.Resource = 11] = "Resource", n[n.Temp = 12] = "Temp", n[n.AppConfig = 13] = "AppConfig", n[n.AppData = 14] = "AppData", n[n.AppLocalData = 15] = "AppLocalData", n[n.AppCache = 16] = "AppCache", n[n.AppLog = 17] = "AppLog", n[n.Desktop = 18] = "Desktop", n[n.Executable = 19] = "Executable", n[n.Font = 20] = "Font", n[n.Home = 21] = "Home", n[n.Runtime = 22] = "Runtime", n[n.Template = 23] = "Template";
})(g || (g = {}));
var h;
(function(n) {
  n[n.Start = 0] = "Start", n[n.Current = 1] = "Current", n[n.End = 2] = "End";
})(h || (h = {}));
async function C(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  await s("plugin:fs|mkdir", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  });
}
async function T(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  const e = await s("plugin:fs|read_text_file", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  }), i = e instanceof ArrayBuffer ? e : Uint8Array.from(e);
  return new TextDecoder().decode(i);
}
async function N(n, t, e) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  const i = new TextEncoder();
  await s("plugin:fs|write_text_file", i.encode(t), {
    headers: {
      path: encodeURIComponent(n instanceof URL ? n.toString() : n),
      options: JSON.stringify(e)
    }
  });
}
async function k(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  return await s("plugin:fs|exists", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  });
}
const L = "http://localhost:3000";
function R(n, t) {
  const e = n.includes("\\") ? "\\" : "/";
  return `${n.endsWith("/") || n.endsWith("\\") ? n.slice(0, -1) : n}${e}${t}`;
}
function $({ context: n }) {
  const [t, e] = r(L), [i, u] = r(L), [v, c] = r(!1), [b, p] = r(0), m = R(n.workspacePath, "browser"), f = R(m, `${n.cardId}.json`);
  A(() => {
    (async () => {
      try {
        if (await k(f)) {
          const o = await T(f), l = JSON.parse(o);
          l.url && (e(l.url), u(l.url));
        }
      } catch {
      }
    })();
  }, []);
  async function w(o) {
    const l = o.trim();
    if (l) {
      e(l), u(l), c(!0), p((E) => E + 1);
      try {
        await C(m, { recursive: !0 }), await N(f, JSON.stringify({ url: l }));
      } catch {
      }
    }
  }
  function U() {
    c(!0), p((o) => o + 1);
  }
  const x = n.theme === "dark";
  return /* @__PURE__ */ d("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ d(
      "div",
      {
        className: `flex shrink-0 items-center gap-2 border-b px-3 py-2 ${x ? "border-zinc-700" : "border-zinc-200"}`,
        children: [
          /* @__PURE__ */ a(
            "input",
            {
              type: "url",
              value: i,
              onChange: (o) => u(o.target.value),
              onKeyDown: (o) => {
                o.key === "Enter" && w(i);
              },
              className: `min-w-0 flex-1 rounded px-2 py-0.5 font-mono text-xs outline-none ${x ? "bg-zinc-800 text-zinc-100 placeholder:text-zinc-500" : "bg-zinc-100 text-zinc-900 placeholder:text-zinc-400"}`,
              placeholder: "http://localhost:3000"
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: () => {
                w(i);
              },
              className: "shrink-0 rounded px-2 py-0.5 text-xs hover:bg-white/10",
              children: "Go"
            }
          ),
          /* @__PURE__ */ a(
            "button",
            {
              onClick: U,
              className: "shrink-0 rounded px-2 py-0.5 text-xs hover:bg-white/10",
              title: "Reload",
              "aria-label": "Reload",
              children: "↻"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ d("div", { className: "relative min-h-0 flex-1", children: [
      v && /* @__PURE__ */ a("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center text-xs opacity-40", children: "Loading…" }),
      /* @__PURE__ */ a(
        "iframe",
        {
          src: t,
          className: "h-full w-full border-0",
          onLoad: () => c(!1)
        },
        b
      )
    ] })
  ] });
}
export {
  $ as default,
  F as manifest
};
