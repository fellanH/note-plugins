import { jsxs as f, jsx as a } from "react/jsx-runtime";
import { useState as m, useEffect as g } from "react";
import { invoke as l } from "@tauri-apps/api/core";
const z = {
  id: "com.origin.filetree",
  name: "File Tree",
  version: "0.1.0",
  description: "Browse your local filesystem",
  icon: "📁"
};
async function b(n = {}) {
  return typeof n == "object" && Object.freeze(n), await l("plugin:dialog|open", { options: n });
}
var L;
(function(n) {
  n[n.Audio = 1] = "Audio", n[n.Cache = 2] = "Cache", n[n.Config = 3] = "Config", n[n.Data = 4] = "Data", n[n.LocalData = 5] = "LocalData", n[n.Document = 6] = "Document", n[n.Download = 7] = "Download", n[n.Picture = 8] = "Picture", n[n.Public = 9] = "Public", n[n.Video = 10] = "Video", n[n.Resource = 11] = "Resource", n[n.Temp = 12] = "Temp", n[n.AppConfig = 13] = "AppConfig", n[n.AppData = 14] = "AppData", n[n.AppLocalData = 15] = "AppLocalData", n[n.AppCache = 16] = "AppCache", n[n.AppLog = 17] = "AppLog", n[n.Desktop = 18] = "Desktop", n[n.Executable = 19] = "Executable", n[n.Font = 20] = "Font", n[n.Home = 21] = "Home", n[n.Runtime = 22] = "Runtime", n[n.Template = 23] = "Template";
})(L || (L = {}));
var R;
(function(n) {
  n[n.Start = 0] = "Start", n[n.Current = 1] = "Current", n[n.End = 2] = "End";
})(R || (R = {}));
async function v(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  await l("plugin:fs|mkdir", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  });
}
async function S(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  return await l("plugin:fs|read_dir", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  });
}
async function N(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  const i = await l("plugin:fs|read_text_file", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  }), e = i instanceof ArrayBuffer ? i : Uint8Array.from(i);
  return new TextDecoder().decode(e);
}
async function P(n, t, i) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  const e = new TextEncoder();
  await l("plugin:fs|write_text_file", e.encode(t), {
    headers: {
      path: encodeURIComponent(n instanceof URL ? n.toString() : n),
      options: JSON.stringify(i)
    }
  });
}
async function k(n, t) {
  if (n instanceof URL && n.protocol !== "file:")
    throw new TypeError("Must be a file URL.");
  return await l("plugin:fs|exists", {
    path: n instanceof URL ? n.toString() : n,
    options: t
  });
}
function h(n, t) {
  const i = n.includes("\\") ? "\\" : "/";
  return `${n.endsWith("/") || n.endsWith("\\") ? n.slice(0, -1) : n}${i}${t}`;
}
function F(n) {
  if (n.isDirectory) return "📁";
  const t = n.name.split(".").pop()?.toLowerCase() ?? "";
  return t === "ts" || t === "tsx" ? "📄" : t === "json" ? "{}" : t === "md" ? "📝" : "📄";
}
async function T(n) {
  return (await S(n)).map((e) => ({
    name: e.name,
    path: h(n, e.name),
    isDirectory: e.isDirectory
  })).sort((e, c) => e.isDirectory !== c.isDirectory ? e.isDirectory ? -1 : 1 : e.name.localeCompare(c.name));
}
function C(n, t, i) {
  return n.map((e) => e.path === t ? { ...e, children: i } : e.children ? {
    ...e,
    children: C(e.children, t, i)
  } : e);
}
function E({ node: n, depth: t, expandedPaths: i, onToggle: e }) {
  const c = i.has(n.path), p = n.isDirectory ? c ? "📂" : "📁" : F(n);
  return /* @__PURE__ */ f("div", { children: [
    /* @__PURE__ */ f(
      "div",
      {
        onClick: () => e(n),
        className: "flex cursor-pointer items-center gap-1 rounded px-1 py-0.5 text-xs hover:bg-white/10",
        style: { paddingLeft: `${4 + t * 14}px` },
        children: [
          /* @__PURE__ */ a("span", { className: "shrink-0 select-none", children: p }),
          /* @__PURE__ */ a("span", { className: "truncate opacity-90", children: n.name })
        ]
      }
    ),
    n.isDirectory && c && n.children?.map((s) => /* @__PURE__ */ a(
      E,
      {
        node: s,
        depth: t + 1,
        expandedPaths: i,
        onToggle: e
      },
      s.path
    ))
  ] });
}
function _({
  context: n
}) {
  const [t, i] = m(null), [e, c] = m([]), [p, s] = m(/* @__PURE__ */ new Set()), w = h(n.workspacePath, "filetree"), d = h(w, `${n.cardId}.json`);
  g(() => {
    (async () => {
      try {
        if (await k(d)) {
          const r = await N(d), o = JSON.parse(r);
          o.rootPath && i(o.rootPath);
        }
      } catch {
      }
    })();
  }, []), g(() => {
    t && (T(t).then(c).catch(() => c([])), s(/* @__PURE__ */ new Set()));
  }, [t]);
  async function U() {
    const r = await b({ directory: !0 }), o = Array.isArray(r) ? r[0] : r;
    if (o) {
      i(o);
      try {
        await v(w, { recursive: !0 }), await P(d, JSON.stringify({ rootPath: o }));
      } catch {
      }
    }
  }
  async function A(r) {
    if (r.isDirectory) {
      if (p.has(r.path)) {
        s((o) => {
          const u = new Set(o);
          return u.delete(r.path), u;
        });
        return;
      }
      if (!r.children)
        try {
          const o = await T(r.path);
          c((u) => C(u, r.path, o));
        } catch {
          return;
        }
      s((o) => /* @__PURE__ */ new Set([...o, r.path]));
    }
  }
  const x = n.theme === "dark";
  return /* @__PURE__ */ f(
    "div",
    {
      className: `flex h-full flex-col font-mono text-sm ${x ? "text-zinc-100" : "text-zinc-900"}`,
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            className: `flex shrink-0 items-center gap-2 border-b px-3 py-2 ${x ? "border-zinc-700" : "border-zinc-200"}`,
            children: [
              /* @__PURE__ */ a("span", { className: "truncate text-xs opacity-60", children: t ? t.split(/[\\/]/).pop() || t : "No folder open" }),
              /* @__PURE__ */ a(
                "button",
                {
                  onClick: U,
                  className: "ml-auto shrink-0 rounded px-2 py-0.5 text-xs hover:bg-white/10",
                  children: "Open"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ f("div", { className: "min-h-0 flex-1 overflow-y-auto py-1", children: [
          !t && /* @__PURE__ */ a("p", { className: "px-3 py-8 text-center text-xs opacity-40", children: "Open a folder to browse files" }),
          e.map((r) => /* @__PURE__ */ a(
            E,
            {
              node: r,
              depth: 0,
              expandedPaths: p,
              onToggle: A
            },
            r.path
          ))
        ] })
      ]
    }
  );
}
export {
  _ as default,
  z as manifest
};
