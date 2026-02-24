import { jsxs as l, jsx as n } from "react/jsx-runtime";
import { useState as c, useRef as H, useCallback as E, useEffect as P } from "react";
import { writeTextFile as I, mkdir as M, readTextFile as O } from "@tauri-apps/plugin-fs";
import { openUrl as G } from "@tauri-apps/plugin-opener";
const Q = {
  id: "com.origin.github",
  name: "GitHub PRs",
  version: "0.1.0",
  description: "Track open pull requests for any GitHub repository",
  icon: "🐙"
};
async function U(e, o = {}, i) {
  return window.__TAURI_INTERNALS__.invoke(e, o, i);
}
var S;
(function(e) {
  e[e.Audio = 1] = "Audio", e[e.Cache = 2] = "Cache", e[e.Config = 3] = "Config", e[e.Data = 4] = "Data", e[e.LocalData = 5] = "LocalData", e[e.Document = 6] = "Document", e[e.Download = 7] = "Download", e[e.Picture = 8] = "Picture", e[e.Public = 9] = "Public", e[e.Video = 10] = "Video", e[e.Resource = 11] = "Resource", e[e.Temp = 12] = "Temp", e[e.AppConfig = 13] = "AppConfig", e[e.AppData = 14] = "AppData", e[e.AppLocalData = 15] = "AppLocalData", e[e.AppCache = 16] = "AppCache", e[e.AppLog = 17] = "AppLog", e[e.Desktop = 18] = "Desktop", e[e.Executable = 19] = "Executable", e[e.Font = 20] = "Font", e[e.Home = 21] = "Home", e[e.Runtime = 22] = "Runtime", e[e.Template = 23] = "Template";
})(S || (S = {}));
async function j(...e) {
  return U("plugin:path|join", { paths: e });
}
function q(e) {
  const o = Date.now() - new Date(e).getTime(), i = Math.floor(o / 6e4);
  if (i < 60) return `${i}m ago`;
  const s = Math.floor(i / 60);
  return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
}
function W({ context: e }) {
  const [o, i] = c(""), [s, g] = c(""), [f, z] = c(!1), [w, b] = c(!1), [k, L] = c([]), [u, $] = c(!1), [d, A] = c(null), [R, _] = c(null), N = H(null), p = e.theme === "dark", r = E(async (t, a) => {
    $(!0), A(null);
    try {
      const m = await fetch(
        `https://api.github.com/repos/${t}/${a}/pulls?state=open&per_page=20`
      );
      if (!m.ok) throw new Error(`HTTP ${m.status}`);
      const h = await m.json();
      L(h), _(Date.now());
    } catch {
      A("Could not load PRs — check repo name");
    } finally {
      $(!1);
    }
  }, []);
  P(() => {
    let t = !1;
    async function a() {
      const m = await j(e.workspacePath, "github");
      await M(m, { recursive: !0 });
      const h = await j(m, `${e.cardId}.json`);
      N.current = h;
      try {
        const F = await O(h), x = JSON.parse(F);
        t || (i(x.owner), g(x.repo), z(!0), await r(x.owner, x.repo));
      } catch {
      }
    }
    return a(), () => {
      t = !0;
    };
  }, [e.workspacePath, e.cardId, r]), P(() => {
    if (!f || w) return;
    const t = setInterval(() => r(o, s), 300 * 1e3);
    return () => clearInterval(t);
  }, [f, w, o, s, r]);
  const v = E(async () => {
    const t = o.trim(), a = s.trim();
    !t || !a || N.current && (await I(
      N.current,
      JSON.stringify({ owner: t, repo: a })
    ), i(t), g(a), z(!0), b(!1), await r(t, a));
  }, [o, s, r]), C = R !== null ? Math.floor((Date.now() - R) / 6e4) : null, T = `rounded border px-3 py-2 text-sm outline-none focus:ring-1 ${p ? "border-zinc-600 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:ring-zinc-400" : "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:ring-zinc-400"}`;
  return !f || w ? /* @__PURE__ */ l(
    "div",
    {
      className: `flex h-full flex-col items-center justify-center gap-4 p-6 ${p ? "text-zinc-100" : "text-zinc-900"}`,
      children: [
        /* @__PURE__ */ n("div", { className: "text-3xl", children: "🐙" }),
        /* @__PURE__ */ n("h2", { className: "text-sm font-semibold", children: "Connect a repository" }),
        /* @__PURE__ */ l("div", { className: "flex w-full max-w-xs flex-col gap-2", children: [
          /* @__PURE__ */ n(
            "input",
            {
              className: T,
              placeholder: "Owner",
              value: o,
              onChange: (t) => i(t.target.value),
              onKeyDown: (t) => t.key === "Enter" && v()
            }
          ),
          /* @__PURE__ */ n(
            "input",
            {
              className: T,
              placeholder: "Repository",
              value: s,
              onChange: (t) => g(t.target.value),
              onKeyDown: (t) => t.key === "Enter" && v()
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              className: `rounded py-2 text-sm font-medium transition-colors disabled:opacity-50 ${p ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600" : "bg-zinc-900 text-white hover:bg-zinc-700"}`,
              onClick: v,
              disabled: u,
              children: u ? "Connecting…" : "Connect"
            }
          ),
          d && /* @__PURE__ */ n("p", { className: "text-xs text-red-400", children: d }),
          f && /* @__PURE__ */ n(
            "button",
            {
              className: "text-xs opacity-50 hover:opacity-100",
              onClick: () => b(!1),
              children: "Cancel"
            }
          )
        ] })
      ]
    }
  ) : /* @__PURE__ */ l(
    "div",
    {
      className: `flex h-full flex-col ${p ? "text-zinc-100" : "text-zinc-900"}`,
      children: [
        /* @__PURE__ */ l(
          "div",
          {
            className: `flex items-center gap-2 border-b px-3 py-2 ${p ? "border-zinc-700" : "border-zinc-200"}`,
            children: [
              /* @__PURE__ */ l("span", { className: "flex-1 truncate text-sm font-medium", children: [
                o,
                "/",
                s
              ] }),
              /* @__PURE__ */ n(
                "button",
                {
                  className: "text-sm opacity-50 hover:opacity-100",
                  onClick: () => r(o, s),
                  title: "Refresh",
                  children: "↻"
                }
              ),
              /* @__PURE__ */ n(
                "button",
                {
                  className: "text-sm opacity-50 hover:opacity-100",
                  onClick: () => b(!0),
                  title: "Settings",
                  children: "⚙"
                }
              )
            ]
          }
        ),
        C !== null && /* @__PURE__ */ l("div", { className: "px-3 py-1 text-xs opacity-40", children: [
          "Updated ",
          C === 0 ? "just now" : `${C}m ago`
        ] }),
        /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto", children: [
          u && /* @__PURE__ */ n("div", { className: "flex h-full items-center justify-center text-sm opacity-50", children: "Loading…" }),
          !u && d && /* @__PURE__ */ n("div", { className: "px-3 py-4 text-sm text-red-400", children: d }),
          !u && !d && k.length === 0 && /* @__PURE__ */ n("div", { className: "flex h-full items-center justify-center text-sm opacity-50", children: "No open pull requests 🎉" }),
          !u && !d && k.map((t) => /* @__PURE__ */ n(
            "button",
            {
              className: `w-full border-b px-3 py-2.5 text-left transition-colors ${p ? "border-zinc-700/50 hover:bg-zinc-800" : "border-zinc-100 hover:bg-zinc-50"}`,
              onClick: () => G(t.html_url),
              children: /* @__PURE__ */ l("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ n("span", { className: "mt-0.5 text-xs leading-5", children: t.draft ? "⚫" : "🟢" }),
                /* @__PURE__ */ l("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ l("div", { className: "flex items-baseline gap-1.5", children: [
                    /* @__PURE__ */ l("span", { className: "shrink-0 text-xs opacity-40", children: [
                      "#",
                      t.number
                    ] }),
                    /* @__PURE__ */ n("span", { className: "truncate text-sm leading-5", children: t.title })
                  ] }),
                  /* @__PURE__ */ l("div", { className: "mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1", children: [
                    /* @__PURE__ */ n(
                      "img",
                      {
                        src: t.user.avatar_url,
                        alt: t.user.login,
                        className: "h-4 w-4 rounded-full"
                      }
                    ),
                    /* @__PURE__ */ n("span", { className: "text-xs opacity-50", children: t.user.login }),
                    /* @__PURE__ */ n("span", { className: "text-xs opacity-30", children: "·" }),
                    /* @__PURE__ */ n("span", { className: "text-xs opacity-50", children: q(t.created_at) }),
                    t.labels.map((a) => /* @__PURE__ */ n(
                      "span",
                      {
                        className: "rounded-full px-1.5 py-px text-xs",
                        style: {
                          backgroundColor: `#${a.color}33`,
                          color: `#${a.color}`
                        },
                        children: a.name
                      },
                      a.name
                    ))
                  ] })
                ] })
              ] })
            },
            t.number
          ))
        ] })
      ]
    }
  );
}
export {
  W as default,
  Q as manifest
};
