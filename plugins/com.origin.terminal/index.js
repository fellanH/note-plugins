import { jsx as u } from "react/jsx-runtime";
import { useRef as w, useEffect as A } from "react";
import { Terminal as h } from "@xterm/xterm";
import { FitAddon as y } from "@xterm/addon-fit";
import { WebglAddon as T } from "@xterm/addon-webgl";
import { ClipboardAddon as b } from "@xterm/addon-clipboard";
import { Channel as g, invoke as n } from "@tauri-apps/api/core";
const R = {
  id: "com.origin.terminal",
  name: "Terminal",
  description: "Full PTY terminal",
  icon: ">_",
  version: "0.0.1"
};
function D({
  context: e
}) {
  const c = w(null);
  return A(() => {
    const t = c.current;
    if (!t) return;
    const o = new h({
      fontFamily: "monospace",
      fontSize: 13,
      theme: { background: "#1e1e1e" },
      cursorBlink: !0
    }), i = new y(), m = new b();
    o.loadAddon(i), o.loadAddon(m);
    const d = new T();
    d.onContextLoss(() => d.dispose()), o.loadAddon(d), o.open(t), i.fit();
    const { cols: f, rows: p } = o, a = new g();
    a.onmessage = (s) => o.write(new Uint8Array(s)), o.onData((s) => {
      n("pty_write", {
        id: e.cardId,
        data: Array.from(new TextEncoder().encode(s))
      }).catch(console.error);
    }), n("pty_spawn", {
      id: e.cardId,
      cols: f,
      rows: p,
      onData: a
    }).catch(console.error);
    let r = null;
    const l = new ResizeObserver(() => {
      r && clearTimeout(r), r = setTimeout(() => {
        i.fit(), n("pty_resize", {
          id: e.cardId,
          cols: o.cols,
          rows: o.rows
        }).catch(console.error);
      }, 50);
    });
    return l.observe(t), () => {
      r && clearTimeout(r), l.disconnect(), o.dispose(), n("pty_destroy", { id: e.cardId }).catch(console.error);
    };
  }, [e.cardId]), /* @__PURE__ */ u(
    "div",
    {
      ref: c,
      style: { width: "100%", height: "100%", background: "#1e1e1e" }
    }
  );
}
export {
  D as default,
  R as manifest
};
