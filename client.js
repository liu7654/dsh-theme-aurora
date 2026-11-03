/**
 * 深夜极光 · 浏览器侧
 * 只做两件事：注入一层固定背景（星空 / 极光帘幕 / 山脊 / 湖面），
 * 覆盖 --dsw-alias-* 语义 token，让界面变半透明。
 * 不改布局、不改字号、不改交互。
 */
window.__ModuleLoader__.load({
  id: "dsh-theme-aurora",
  factory() {
    const CSS = `
    /* ===== 场景层 ===== */
    #dsh-aurora-scene{
      position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;
      background:linear-gradient(180deg,#03060f 0%,#061225 38%,#08182b 62%,#061420 100%);
    }
        #dsh-aurora-scene::before{
      content:"";position:absolute;inset:0;pointer-events:none;
      background:
        radial-gradient(62% 42% at 18% 6%,#3dffb059,transparent 72%),
        radial-gradient(50% 38% at 72% 2%,#35d0ff4a,transparent 74%),
        radial-gradient(60% 46% at 48% 34%,#2ff0c82e,transparent 78%),
        radial-gradient(46% 34% at 86% 60%,#7a6bff2e,transparent 74%);
      filter:blur(18px);
    }
#dsh-aurora-scene .au-stars{position:absolute;inset:0 0 24% 0;overflow:hidden}
    #dsh-aurora-scene .au-stars i{
      position:absolute;display:block;border-radius:50%;background:#dff1ff;
      box-shadow:0 0 6px #cfe8ff;animation:au-tw 5s ease-in-out infinite;
    }
    @keyframes au-tw{0%,100%{opacity:.25;transform:scale(.85)}50%{opacity:1;transform:scale(1.1)}}
    #dsh-aurora-scene .au-curtain{
      position:absolute;left:-12%;right:-12%;top:2%;height:56%;
      filter:blur(9px);mix-blend-mode:screen;transform-origin:50% 0;
      -webkit-mask-image:linear-gradient(180deg,#000 0 16%,#000c 42%,#0006 66%,#0000 100%);
      mask-image:linear-gradient(180deg,#000 0 16%,#000c 42%,#0006 66%,#0000 100%);
    }
    #dsh-aurora-scene .a1{
      background:
        repeating-linear-gradient(93deg,#0000 0 11px,#3dffb0d9 11px 15px,#0000 15px 36px),
        repeating-linear-gradient(87deg,#0000 0 24px,#2ff0c8a6 24px 29px,#0000 29px 62px),
        linear-gradient(180deg,#3dffb000 0%,#3dffb0b3 16%,#2ff0c899 44%,#35d0ff4d 70%,#0000 94%);
      animation:au-1 26s ease-in-out infinite alternate;
    }
    #dsh-aurora-scene .a2{
      opacity:.85;
      background:
        repeating-linear-gradient(85deg,#0000 0 17px,#35d0ffb3 17px 21px,#0000 21px 48px),
        repeating-linear-gradient(95deg,#0000 0 31px,#7a6bff8c 31px 35px,#0000 35px 74px),
        linear-gradient(180deg,#0000 0%,#35d0ff8c 26%,#7a6bff73 56%,#3dffb040 76%,#0000 94%);
      animation:au-2 34s ease-in-out infinite alternate;
    }
    #dsh-aurora-scene .a3{
      opacity:.55;
      background:
        repeating-linear-gradient(100deg,#0000 0 13px,#c86bff99 13px 17px,#0000 17px 52px),
        linear-gradient(180deg,#0000 0%,#c86bff80 30%,#7a6bff66 60%,#0000 90%);
      animation:au-3 42s ease-in-out infinite alternate;
    }
    @keyframes au-1{0%{transform:translate3d(-3%,0,0) skewX(-5deg) scaleY(.94);opacity:.7}
      100%{transform:translate3d(4%,1%,0) skewX(3deg) scaleY(1.1);opacity:.82}}
    @keyframes au-2{0%{transform:translate3d(2%,1%,0) skewX(4deg) scaleY(1.04);opacity:.45}
      100%{transform:translate3d(-4%,-1%,0) skewX(-4deg) scaleY(.9);opacity:.9}}
    @keyframes au-3{0%{transform:translate3d(-2%,0,0) skewX(-3deg);opacity:.28}
      100%{transform:translate3d(3%,2%,0) skewX(5deg);opacity:.62}}
    #dsh-aurora-scene .au-haze{
      position:absolute;left:0;right:0;bottom:12%;height:42%;pointer-events:none;
      background:radial-gradient(60% 100% at 40% 100%,#2ff0c833,transparent 72%),
                 radial-gradient(50% 90% at 74% 100%,#35d0ff26,transparent 74%);
      filter:blur(24px);
    }
    #dsh-aurora-scene .au-ridge{position:absolute;left:0;right:0;bottom:22%;height:30%}
    #dsh-aurora-scene .au-ridge svg{width:100%;height:100%;display:block}
    #dsh-aurora-scene .au-lake{
      position:absolute;left:0;right:0;bottom:0;height:22%;
      background:
        repeating-linear-gradient(180deg,#3dffb033 0 1px,#0000 1px 5px),
        linear-gradient(180deg,#0a1c2c,#040d16 62%,#02060b);
      -webkit-mask-image:linear-gradient(180deg,#000,#000 72%,#0000);
      mask-image:linear-gradient(180deg,#000,#000 72%,#0000);
    }

    /* ===== 极光罩：盖在 UI 之上，只提亮，让实心面板也有极光感 ===== */
    #dsh-aurora-veil{
      position:fixed;inset:0;pointer-events:none;z-index:50;
      mix-blend-mode:screen;opacity:.26;filter:blur(18px);
      background:
        radial-gradient(60% 40% at 20% 0%,#3dffb0,transparent 62%),
        radial-gradient(52% 38% at 72% 4%,#35d0ff,transparent 64%),
        radial-gradient(46% 34% at 46% 22%,#7a6bff,transparent 68%);
      animation:au-veil 24s ease-in-out infinite alternate;
    }
    @keyframes au-veil{
      0%{transform:translate3d(-2%,0,0) scaleY(1);opacity:.18}
      100%{transform:translate3d(2%,2%,0) scaleY(1.08);opacity:.32}
    }
    /* ===== token 覆盖：把画布让给极光 ===== */
    html{background:#03060f !important}
    body{background:transparent !important}
    body > div{position:relative;z-index:1}
    #dsh-aurora-scene{z-index:0}
    body{
      --dsw-alias-bg-base: transparent !important;
      --dsw-alias-bg-layer-1: rgba(10,22,40,.52) !important;
      --dsw-alias-bg-layer-2: rgba(13,30,51,.62) !important;
      --dsw-alias-bg-module-platform: rgba(18,37,59,.74) !important;
      --dsw-alias-label-primary: #e8f4ff !important;
      --dsw-alias-label-secondary: #a9c2d9 !important;
      --dsw-alias-label-tertiary: #7f97b0 !important;
      --dsw-alias-border-l1: #7ef0ce26 !important;
      --dsw-alias-border-l2: #7ef0ce40 !important;
      --dsw-alias-brand-primary: #3dffb0 !important;
      --dsw-alias-state-business-primary: #3dffb0 !important;
      --dsw-alias-interactive-bg-hover: #7ef0ce1f !important;
    }

    @media (prefers-reduced-motion: reduce){
      #dsh-aurora-scene *{animation:none !important}
    }
    `;

    const sceneHtml = () => {
      let stars = "";
      for (let i = 0; i < 120; i++) {
        const x = (Math.random() * 100).toFixed(2);
        const y = (Math.random() * 62).toFixed(2);
        const s = (Math.random() * 1.6 + 0.6).toFixed(2);
        const o = (Math.random() * 0.6 + 0.3).toFixed(2);
        const d = (Math.random() * 5 + 3).toFixed(1);
        const dl = (Math.random() * 8).toFixed(1);
        stars += `<i style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;opacity:${o};animation-duration:${d}s;animation-delay:-${dl}s"></i>`;
      }
      return `
        <div class="au-stars">${stars}</div>
        <div class="au-curtain a1"></div>
        <div class="au-curtain a2"></div>
        <div class="au-curtain a3"></div>
        <div class="au-ridge">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0 250 L120 190 L220 224 L330 150 L430 206 L540 168 L650 222 L760 176 L880 214 L980 156 L1090 200 L1200 166 L1310 206 L1440 158 L1440 320 L0 320 Z" fill="#081524"/>
            <path d="M0 272 L100 236 L190 262 L280 214 L380 258 L470 226 L560 268 L660 232 L750 266 L860 222 L950 260 L1050 230 L1150 264 L1250 234 L1340 262 L1440 228 L1440 320 L0 320 Z" fill="#050b14"/>
          </svg>
        </div>
        <div class="au-haze"></div>
        <div class="au-lake"></div>
      `;
    };

    const install = () => {
      if (document.getElementById("dsh-aurora-scene")) return () => {};

      const style = document.createElement("style");
      style.dataset.plugin = "dsh-theme-aurora";
      style.textContent = CSS;
      document.head.appendChild(style);

      const scene = document.createElement("div");
      scene.id = "dsh-aurora-scene";
      scene.setAttribute("aria-hidden", "true");
      scene.innerHTML = sceneHtml();
      document.body.appendChild(scene);


      // 强制暗色：不管用户当前是 light 还是 system，先切到暗底，避免白字白底
      const root = document.documentElement;
      const prevScheme = root.style.colorScheme;
      const hadDark = document.body.hasAttribute("data-ds-dark-theme");
      const prevBg = document.body.style.backgroundColor;
      root.style.colorScheme = "dark";
      document.body.setAttribute("data-ds-dark-theme", "");

      // 把「铺满视口且不透明」的壳层让开。
      // Electron 的窗口 frame（.mP3x-q_frame，bg rgb(27,27,28)）就是这种，会盖住场景层。
      const restores = [];
      const isOpaque = (color) => {
        if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return false;
        const m = color.match(/rgba?\(([^)]+)\)/);
        if (!m) return true;
        const parts = m[1].split(",").map((v) => parseFloat(v));
        const alpha = parts.length > 3 ? parts[3] : 1;
        return alpha > 0.5;
      };
      const clearShells = () => {
        const w = window.innerWidth, h = window.innerHeight;
        document.querySelectorAll("body *").forEach((el) => {
          if (el.id === "dsh-aurora-scene") return;
          const r = el.getBoundingClientRect();
          if (r.width < w * 0.7 || r.height < h * 0.6) return;
          const cs = getComputedStyle(el);
          if (cs.position === "fixed") return;
          if (isOpaque(cs.backgroundColor)) {
            restores.push([el, "backgroundColor", el.style.backgroundColor]);
            el.style.backgroundColor = "transparent";
          }
          if (cs.backgroundImage && cs.backgroundImage !== "none") {
            restores.push([el, "backgroundImage", el.style.backgroundImage]);
            el.style.backgroundImage = "none";
          }
        });
      };
      clearShells();
      // 壳层可能是稍后挂载的，补跑几次
      const timers = [
        setTimeout(clearShells, 400),
        setTimeout(clearShells, 1500),
        setTimeout(clearShells, 3000),
      ];

      return () => {
        timers.forEach(clearTimeout);
        style.remove();
        scene.remove();
        restores.forEach(([el, prop, value]) => { el.style[prop] = value; });
        root.style.colorScheme = prevScheme;
        document.body.style.backgroundColor = prevBg;
        if (!hadDark) document.body.removeAttribute("data-ds-dark-theme");
      };
    };

    return {
      inject: [],
      apply(ctx) {
        if (ctx && typeof ctx.effect === "function") ctx.effect(install);
        else install();
      },
    };
  },
});
