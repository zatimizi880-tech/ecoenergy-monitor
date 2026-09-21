/* =========================================================
   ECOENERGY MONITOR
   STYLE.CSS
   Smart Energy & Budget Dashboard
   ========================================================= */

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

:root {
  --bg: #07111f;
  --bg2: #0b1727;
  --panel: #0d1b2d;
  --line: #1d3148;

  --text: #eef7ff;
  --muted: #8da3b8;

  --cyan: #35d7ff;
  --green: #48e08c;
  --amber: #ffc857;
  --violet: #a78bfa;
  --danger: #ff6b7a;

  --font: "Inter", sans-serif;
  --display: "Space Grotesk", sans-serif;
}


/* =========================================================
   BODY
   ========================================================= */

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  overflow-x: hidden;
}

.hidden {
  display: none !important;
}

button,
input {
  font-family: var(--font);
}

button,
a {
  transition: 0.25s ease;
}


/* =========================================================
   BACKGROUND EFFECT
   ========================================================= */

.ambient {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

.ambient-a {
  width: 420px;
  height: 420px;
  background: #00d4ff;
  top: -120px;
  right: -80px;
}

.ambient-b {
  width: 380px;
  height: 380px;
  background: #36e58d;
  bottom: -120px;
  left: -120px;
}


/* =========================================================
   MAIN PAGE
   ========================================================= */

.site-page {
  position: relative;
  z-index: 1;
}


/* =========================================================
   HEADER
   ========================================================= */

.site-header,
.dash-header {
  height: 78px;

  padding:
    0
    clamp(24px, 6vw, 90px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom:
    1px solid
    rgba(141, 163, 184, 0.16);

  background:
    rgba(7, 17, 31, 0.82);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  position: sticky;
  top: 0;

  z-index: 20;
}


/* =========================================================
   LOGO / BRAND
   ========================================================= */

.brand {
  display: flex;
  align-items: center;
  gap: 10px;

  color: white;
  text-decoration: none;

  font-family: var(--display);
  font-size: 18px;
}

.brand b {
  color: var(--cyan);
}

.brand-icon {
  width: 34px;
  height: 34px;

  display: grid;
  place-items: center;

  border-radius: 10px;

  background:
    linear-gradient(
      135deg,
      var(--cyan),
      var(--green)
    );

  color: #04111d;

  box-shadow:
    0 0 25px
    rgba(53, 215, 255, 0.25);
}


/* =========================================================
   NAVIGATION
   ========================================================= */

.site-nav {
  display: flex;
  gap: 36px;
}

.site-nav a {
  position: relative;

  color: var(--muted);

  text-decoration: none;

  font-size: 12px;
  font-weight: 700;
}

.site-nav a:hover {
  color: var(--cyan);
}

.site-nav a::after {
  content: "";

  position: absolute;

  left: 0;
  bottom: -8px;

  width: 0;
  height: 2px;

  background: var(--cyan);

  transition: 0.25s;
}

.site-nav a:hover::after {
  width: 100%;
}


/* =========================================================
   BUTTON
   ========================================================= */

.ghost-btn {
  border:
    1px solid
    #28445e;

  background:
    rgba(255, 255, 255, 0.02);

  color:
    #dcecff;

  padding:
    11px 16px;

  border-radius: 10px;

  font-weight: 700;

  cursor: pointer;
}

.ghost-btn:hover {
  border-color: var(--cyan);
  color: var(--cyan);

  box-shadow:
    0 0 20px
    rgba(53, 215, 255, 0.1);
}


.primary-btn {
  border: 0;

  border-radius: 10px;

  padding:
    14px 18px;

  background:
    linear-gradient(
      135deg,
      #18bde8,
      #36df8a
    );

  color:
    #04111d;

  font-size: 11px;
  font-weight: 900;

  letter-spacing: 0.5px;

  cursor: pointer;

  box-shadow:
    0 10px 35px
    rgba(53, 215, 255, 0.13);
}

.primary-btn:hover {
  transform:
    translateY(-2px);

  box-shadow:
    0 14px 35px
    rgba(53, 215, 255, 0.2);
}

.primary-btn span {
  margin-left: 20px;
}


/* =========================================================
   HERO
   ========================================================= */

.hero {
  min-height:
    calc(100vh - 78px);

  display: grid;

  grid-template-columns:
    1.08fr
    0.92fr;

  gap: 5vw;

  align-items: center;

  padding:
    70px
    clamp(24px, 7vw, 110px);

  background-image:

    linear-gradient(
      rgba(53, 215, 255, 0.035) 1px,
      transparent 1px
    ),

    linear-gradient(
      90deg,
      rgba(53, 215, 255, 0.035) 1px,
      transparent 1px
    );

  background-size:
    38px 38px;
}

.hero-copy {
  max-width: 720px;
}


/* =========================================================
   SMALL TITLE
   ========================================================= */

.eyebrow {
  font-size: 10px;

  letter-spacing: 2.2px;

  font-weight: 800;

  color:
    var(--cyan);

  margin:
    0 0 15px;
}


/* =========================================================
   ONLINE STATUS
   ========================================================= */

.status-pill {
  display: inline-flex;

  align-items: center;

  gap: 9px;

  padding:
    8px 12px;

  border:
    1px solid
    rgba(72, 224, 140, 0.24);

  background:
    rgba(72, 224, 140, 0.06);

  border-radius: 999px;

  color:
    #aef4cc;

  font-size: 10px;

  font-weight: 700;

  margin-bottom: 24px;
}

.status-pill.small {
  margin: 0;
}

.pulse {
  width: 8px;
  height: 8px;

  border-radius: 50%;

  background:
    var(--green);

  box-shadow:
    0 0 12px
    var(--green);

  animation:
    pulse 1.8s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;

    box-shadow:
      0 0 3px
      var(--green);
  }
}


/* =========================================================
   HEADINGS
   ========================================================= */

h1,
h2,
h3 {
  font-family:
    var(--display);
}

.hero h1 {
  font-size:
    clamp(
      44px,
      6vw,
      82px
    );

  line-height:
    0.98;

  letter-spacing:
    -3px;

  margin:
    0 0 26px;
}

.hero h1 span,
.section h2 span,
.contact-section h2 span {
  color:
    var(--cyan);
}

.lead {
  max-width:
    650px;

  color:
    var(--muted);

  font-size:
    16px;

  line-height:
    1.8;
}


/* =========================================================
   HERO BUTTONS
   ========================================================= */

.hero-actions {
  display: flex;

  align-items: center;

  gap: 26px;

  margin-top:
    30px;
}

.text-link {
  color:
    #b7c7d6;

  text-decoration:
    none;

  font-size:
    12px;

  font-weight:
    700;
}

.text-link:hover {
  color:
    var(--cyan);
}


/* =========================================================
   HERO SENSOR VALUES
   ========================================================= */

.hero-mini-stats {
  display: flex;

  gap: 10px;

  margin-top:
    48px;
}

.hero-mini-stats div {
  min-width:
    125px;

  padding:
    14px 15px;

  border:
    1px solid
    var(--line);

  background:
    rgba(13, 27, 45, 0.6);

  border-radius:
    12px;

  transition:
    0.25s;
}

.hero-mini-stats div:hover {
  border-color:
    var(--cyan);

  transform:
    translateY(-3px);
}

.hero-mini-stats strong {
  display: block;

  font-family:
    var(--display);

  font-size:
    17px;
}

.hero-mini-stats small {
  display: block;

  margin-top:
    5px;

  color:
    var(--muted);

  font-size:
    8px;

  letter-spacing:
    1.3px;
}


/* =========================================================
   ENERGY CONSOLE
   ========================================================= */

.hero-console {
  position:
    relative;

  min-height:
    520px;

  border:
    1px solid
    #1e425b;

  border-radius:
    24px;

  padding:
    24px;

  background:
    linear-gradient(
      160deg,
      rgba(13, 27, 45, 0.94),
      rgba(6, 17, 31, 0.86)
    );

  box-shadow:

    0 30px 80px
    rgba(0, 0, 0, 0.32),

    inset 0 0 60px
    rgba(53, 215, 255, 0.025);

  overflow:
    hidden;
}

.hero-console::before {
  content: "";

  position:
    absolute;

  inset:
    0;

  background:
    linear-gradient(
      transparent 49%,
      rgba(53, 215, 255, 0.035) 50%
    );

  background-size:
    100% 5px;

  pointer-events:
    none;
}

.console-top {
  display:
    flex;

  justify-content:
    space-between;

  color:
    var(--muted);

  font-size:
    9px;

  letter-spacing:
    1.5px;
}

.code {
  font-family:
    monospace;

  color:
    var(--green);
}


/* =========================================================
   ENERGY RING
   ========================================================= */

.energy-ring {
  width:
    260px;

  height:
    260px;

  margin:
    38px
    auto
    30px;

  border-radius:
    50%;

  display:
    grid;

  place-items:
    center;

  text-align:
    center;

  background:

    radial-gradient(
      circle at center,
      #0c1c2d 54%,
      transparent 55%
    ),

    conic-gradient(
      var(--cyan) 0 72%,
      #173149 72% 100%
    );

  box-shadow:
    0 0 60px
    rgba(53, 215, 255, 0.12);
}

.energy-ring small,
.energy-ring span {
  display:
    block;

  color:
    var(--muted);

  font-size:
    8px;

  letter-spacing:
    1.5px;
}

.energy-ring strong {
  display:
    block;

  font:
    700
    48px
    var(--display);

  margin:
    5px 0;

  color:
    white;
}


/* =========================================================
   ENERGY INFO GRID
   ========================================================= */

.console-grid {
  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    10px;
}

.console-grid div {
  padding:
    15px;

  border:
    1px solid
    var(--line);

  background:
    #091522;

  border-radius:
    12px;
}

.console-grid small {
  display:
    block;

  color:
    var(--muted);

  font-size:
    8px;

  letter-spacing:
    1.2px;
}

.console-grid strong {
  display:
    block;

  margin-top:
    7px;

  color:
    #dff7ff;

  font-size:
    12px;
}


/* =========================================================
   SCAN ANIMATION
   ========================================================= */

.scan-line {
  position:
    absolute;

  left:
    0;

  right:
    0;

  height:
    1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--cyan),
      transparent
    );

  box-shadow:
    0 0 12px
    var(--cyan);

  animation:
    scan 4s linear infinite;
}

@keyframes scan {

  from {
    top:
      0;
  }

  to {
    top:
      100%;
  }
}


/* =========================================================
   GENERAL SECTION
   ========================================================= */

.section {
  padding:
    105px
    clamp(24px, 7vw, 110px);
}

.section-tag {
  border-top:
    1px solid
    var(--line);

  padding-top:
    14px;

  margin-bottom:
    55px;

  color:
    #60788e;

  font-size:
    9px;

  letter-spacing:
    1.8px;
}


/* =========================================================
   ABOUT PROJECT
   ========================================================= */

.about-grid {
  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    9vw;
}

.section h2 {
  font-size:
    clamp(
      34px,
      4.6vw,
      62px
    );

  line-height:
    1.06;

  letter-spacing:
    -2px;

  margin:
    0;
}

.about-copy p,
.section-head > p,
.contact-section p {
  color:
    var(--muted);

  line-height:
    1.8;

  font-size:
    14px;
}

.tech-row {
  display:
    flex;

  flex-wrap:
    wrap;

  gap:
    8px;

  margin-top:
    30px;
}

.tech-row span,
.tag {
  border:
    1px solid
    #254057;

  background:
    #0c1a2a;

  padding:
    8px 10px;

  border-radius:
    8px;

  font-size:
    9px;

  font-weight:
    800;

  color:
    #9fdff1;
}


/* =========================================================
   FEATURES
   ========================================================= */

.features-section {
  background:
    #091522;
}

.section-head {
  display:
    flex;

  justify-content:
    space-between;

  gap:
    50px;

  align-items:
    end;
}

.section-head > div {
  max-width:
    720px;
}

.section-head > p {
  max-width:
    390px;
}

.feature-grid {
  display:
    grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap:
    14px;

  margin-top:
    55px;
}

.feature-grid article {
  position:
    relative;

  min-height:
    260px;

  padding:
    24px;

  border:
    1px solid
    var(--line);

  background:
    linear-gradient(
      180deg,
      #0e1c2d,
      #0a1624
    );

  border-radius:
    16px;

  overflow:
    hidden;

  transition:
    0.3s ease;
}

.feature-grid article:hover {
  border-color:
    #2d6684;

  transform:
    translateY(-5px);

  box-shadow:
    0 20px 50px
    rgba(0, 0, 0, 0.2);
}

.feature-no {
  position:
    absolute;

  right:
    18px;

  top:
    16px;

  color:
    #385168;

  font:
    700
    11px
    var(--display);
}

.feature-icon {
  width:
    48px;

  height:
    48px;

  border-radius:
    13px;

  display:
    grid;

  place-items:
    center;

  background:
    rgba(53, 215, 255, 0.09);

  border:
    1px solid
    rgba(53, 215, 255, 0.2);

  color:
    var(--cyan);

  font-weight:
    900;
}

.feature-grid h3 {
  margin:
    55px
    0
    12px;

  font-size:
    18px;
}

.feature-grid p {
  color:
    var(--muted);

  font-size:
    12px;

  line-height:
    1.7;
}


/* =========================================================
   SYSTEM FLOW
   ========================================================= */

.architecture-section {
  background:
    #07111f;
}

.flow {
  display:
    grid;

  grid-template-columns:
    1fr auto
    1fr auto
    1fr auto
    1fr;

  align-items:
    center;

  gap:
    16px;
}

.flow-node {
  padding:
    24px;

  border:
    1px solid
    var(--line);

  background:
    #0a1725;

  border-radius:
    14px;

  transition:
    0.25s;
}

.flow-node:hover {
  transform:
    translateY(-3px);

  border-color:
    #2b607e;
}

.flow-node.active {
  border-color:
    var(--cyan);

  box-shadow:
    0 0 30px
    rgba(53, 215, 255, 0.08);
}

.flow-node b {
  display:
    block;

  font:
    700
    18px
    var(--display);
}

.flow-node small {
  display:
    block;

  color:
    var(--muted);

  margin-top:
    8px;
}

.flow i {
  color:
    var(--cyan);

  font-style:
    normal;
}


/* =========================================================
   CONTACT
   ========================================================= */

.contact-section {
  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    8vw;

  background:
    linear-gradient(
      145deg,
      #081625,
      #0b1f30
    );
}

.contact-section h2 {
  font-size:
    clamp(
      34px,
      4.2vw,
      58px
    );

  margin:
    0;
}

.contact-card {
  border:
    1px solid
    #244057;

  background:
    rgba(5, 15, 26, 0.55);

  border-radius:
    18px;

  padding:
    28px;
}

.avatar {
  width:
    58px;

  height:
    58px;

  border-radius:
    16px;

  display:
    grid;

  place-items:
    center;

  background:
    linear-gradient(
      135deg,
      var(--cyan),
      var(--green)
    );

  color:
    #06121e;

  font:
    800
    24px
    var(--display);

  float:
    right;
}

.contact-card h3 {
  font-size:
    28px;

  margin:
    6px 0 25px;
}

.contact-card small {
  display:
    block;

  color:
    var(--muted);

  font-size:
    8px;

  letter-spacing:
    1.4px;
}

.contact-card a {
  display:
    block;

  padding:
    17px 0;

  border-top:
    1px solid
    var(--line);

  text-decoration:
    none;

  color:
    white;
}

.contact-card a:hover {
  color:
    var(--cyan);
}

.contact-card a strong {
  display:
    block;

  margin-top:
    6px;

  font-size:
    13px;

  word-break:
    break-word;
}


/* =========================================================
   FOOTER
   ========================================================= */

footer {
  display:
    flex;

  justify-content:
    space-between;

  padding:
    24px
    clamp(24px, 7vw, 110px);

  border-top:
    1px solid
    var(--line);

  color:
    #597188;

  font-size:
    9px;

  letter-spacing:
    1.3px;
}


/* =========================================================
   LOGIN PAGE
   ========================================================= */

.auth-shell {
  min-height:
    100vh;

  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  position:
    relative;
}

.back-btn {
  position:
    absolute;

  z-index:
    3;

  top:
    28px;

  left:
    30px;

  border:
    1px solid
    #294158;

  background:
    #091522;

  color:
    #a8bdd0;

  padding:
    10px 14px;

  border-radius:
    9px;

  cursor:
    pointer;
}

.back-btn:hover {
  color:
    var(--cyan);

  border-color:
    var(--cyan);
}


/* LEFT LOGIN */

.auth-showcase {
  padding:
    12vh
    8vw;

  background:
    linear-gradient(
      145deg,
      #06121f,
      #0b2c3d
    );

  position:
    relative;

  overflow:
    hidden;

  display:
    flex;

  flex-direction:
    column;

  justify-content:
    center;
}

.auth-showcase h2 {
  font-size:
    clamp(
      40px,
      5vw,
      70px
    );

  line-height:
    1.02;

  margin:
    0;
}

.auth-showcase h2 span {
  color:
    var(--cyan);
}

.auth-showcase > p:not(.eyebrow) {
  color:
    var(--muted);

  max-width:
    480px;

  line-height:
    1.7;
}


/* ORBIT EFFECT */

.auth-orbit {
  position:
    absolute;

  width:
    480px;

  height:
    480px;

  border:
    1px solid
    rgba(53, 215, 255, 0.13);

  border-radius:
    50%;

  right:
    -180px;

  top:
    10%;

  box-shadow:

    0 0 0 60px
    rgba(53, 215, 255, 0.025),

    0 0 0 120px
    rgba(72, 224, 140, 0.018);
}


/* LOGIN STATS */

.auth-stats {
  display:
    flex;

  gap:
    12px;

  margin-top:
    45px;
}

.auth-stats div {
  padding:
    14px 18px;

  border:
    1px solid
    #264158;

  background:
    rgba(255, 255, 255, 0.025);

  min-width:
    105px;
}

.auth-stats b {
  display:
    block;

  font:
    700
    20px
    var(--display);

  color:
    var(--cyan);
}

.auth-stats span {
  font-size:
    8px;

  color:
    var(--muted);
}


/* RIGHT LOGIN */

.auth-panel {
  display:
    grid;

  place-items:
    center;

  padding:
    40px;

  background:
    #08131f;
}

.login-card {
  width:
    min(100%, 430px);

  padding:
    36px;

  border:
    1px solid
    var(--line);

  background:
    #0b1827;

  border-radius:
    20px;

  box-shadow:
    0 30px 70px
    rgba(0, 0, 0, 0.25);
}

.auth-brand {
  margin-bottom:
    45px;
}

.login-card h2 {
  font-size:
    30px;

  margin:
    0 0 8px;
}

.muted {
  color:
    var(--muted);

  font-size:
    12px;

  margin-bottom:
    28px;
}


/* INPUT */

.login-card label,
.calc-form label {
  display:
    block;

  margin:
    13px 0 7px;

  color:
    #b7c8d8;

  font-size:
    10px;

  font-weight:
    800;
}

.login-card input,
.calc-form input {
  width:
    100%;

  padding:
    14px;

  border:
    1px solid
    #294057;

  background:
    #07131f;

  color:
    white;

  border-radius:
    9px;

  outline:
    none;

  transition:
    0.2s;
}

.login-card input:focus,
.calc-form input:focus {
  border-color:
    var(--cyan);

  box-shadow:
    0 0 0 3px
    rgba(53, 215, 255, 0.07);
}


/* PASSWORD */

.password-wrap {
  position:
    relative;
}

.password-wrap input {
  padding-right:
    75px;
}

.password-wrap button {
  position:
    absolute;

  right:
    8px;

  top:
    8px;

  border:
    0;

  background:
    #12263a;

  color:
    #9db4c7;

  border-radius:
    7px;

  padding:
    7px 9px;

  cursor:
    pointer;
}

.password-wrap button:hover {
  color:
    var(--cyan);
}

.full {
  width:
    100%;

  margin-top:
    22px;
}

.message {
  min-height:
    18px;

  color:
    #ff8190;

  text-align:
    center;

  font-size:
    11px;
}

.security-note {
  text-align:
    center;

  color:
    #647b90;

  font-size:
    9px;

  margin-top:
    20px;
}


/* =========================================================
   DASHBOARD
   ========================================================= */

.dashboard {
  min-height:
    100vh;

  background:
    #07111f;
}

.dash-head-right {
  display:
    flex;

  align-items:
    center;

  gap:
    12px;
}

.dash-wrap {
  max-width:
    1250px;

  margin:
    auto;

  padding:
    55px
    24px
    90px;
}


/* DASHBOARD INTRO */

.dash-intro {
  display:
    flex;

  justify-content:
    space-between;

  align-items:
    end;
}

.dash-intro h1 {
  font-size:
    42px;

  margin:
    0;
}

.dash-intro h1 span {
  color:
    var(--cyan);
}

.dash-intro p {
  color:
    var(--muted);
}

.date-chip {
  padding:
    13px 16px;

  border:
    1px solid
    var(--line);

  border-radius:
    10px;

  background:
    #0b1827;
}

.date-chip small {
  display:
    block;

  color:
    var(--muted);

  font-size:
    8px;
}

.date-chip strong {
  font-size:
    11px;

  color:
    var(--green);
}


/* =========================================================
   SENSOR CARDS
   ========================================================= */

.metric-grid {
  display:
    grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap:
    13px;

  margin-top:
    34px;
}

.metric {
  position:
    relative;

  padding:
    22px;

  border:
    1px solid
    var(--line);

  border-radius:
    15px;

  background:
    #0b1827;

  overflow:
    hidden;

  transition:
    0.25s ease;
}

.metric:hover {
  transform:
    translateY(-3px);

  border-color:
    #31516c;
}

.metric::before {
  content:
    "";

  position:
    absolute;

  left:
    0;

  top:
    0;

  bottom:
    0;

  width:
    3px;

  background:
    var(--cyan);
}

.metric.green::before {
  background:
    var(--green);
}

.metric.amber::before {
  background:
    var(--amber);
}

.metric.violet::before {
  background:
    var(--violet);
}

.metric small {
  color:
    var(--muted);

  font-size:
    8px;

  letter-spacing:
    1.4px;
}

.metric strong {
  display:
    block;

  font:
    700
    27px
    var(--display);

  margin:
    15px 0 8px;
}

.metric span {
  color:
    #758ca1;

  font-size:
    10px;
}


/* =========================================================
   DASHBOARD GRID
   ========================================================= */

.dash-grid {
  display:
    grid;

  grid-template-columns:
    1.5fr
    0.8fr;

  gap:
    13px;

  margin-top:
    13px;
}

.panel {
  border:
    1px solid
    var(--line);

  border-radius:
    15px;

  background:
    #0b1827;

  padding:
    24px;
}

.panel-head {
  display:
    flex;

  justify-content:
    space-between;

  align-items:
    start;
}

.panel h3 {
  font-size:
    20px;

  margin:
    0;
}


/* =========================================================
   BUDGET
   ========================================================= */

.tag.good {
  color:
    #8ff0b8;

  border-color:
    rgba(72, 224, 140, 0.3);
}

.budget-number {
  margin-top:
    35px;
}

.budget-number small {
  display:
    block;

  color:
    var(--muted);

  font-size:
    8px;
}

.budget-number strong {
  display:
    block;

  font:
    700
    36px
    var(--display);

  margin-top:
    6px;
}


/* BUDGET PROGRESS */

.progress-track {
  height:
    10px;

  background:
    #15283a;

  border-radius:
    99px;

  overflow:
    hidden;

  margin:
    24px 0 10px;
}

.progress-track > div {
  height:
    100%;

  width:
    0;

  background:
    linear-gradient(
      90deg,
      var(--green),
      var(--cyan)
    );

  transition:
    0.4s;
}

.budget-panel > p {
  color:
    var(--muted);

  font-size:
    10px;
}


/* RECOMMENDATION */

.recommendation {
  margin-top:
    17px;

  padding:
    13px;

  border-left:
    3px solid
    var(--green);

  background:
    rgba(72, 224, 140, 0.07);

  color:
    #a9c4b5;

  font-size:
    11px;

  line-height:
    1.6;
}


/* =========================================================
   RELAY
   ========================================================= */

.relay-led {
  width:
    10px;

  height:
    10px;

  border-radius:
    50%;

  background:
    var(--green);

  box-shadow:
    0 0 12px
    var(--green);
}

.relay-visual {
  margin:
    35px 0;

  padding:
    20px;

  background:
    #07131f;

  border:
    1px solid
    #1a3045;

  border-radius:
    12px;
}

.relay-visual span {
  display:
    block;

  color:
    var(--muted);

  font-size:
    8px;
}

.relay-visual strong {
  display:
    block;

  margin-top:
    8px;

  font-size:
    13px;
}

.relay-actions {
  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    8px;
}

.relay-btn {
  padding:
    13px;

  border:
    1px solid
    #284057;

  background:
    #0c1b2b;

  color:
    #8fa6b9;

  border-radius:
    9px;

  font-weight:
    900;

  cursor:
    pointer;
}

.relay-btn:hover {
  transform:
    translateY(-2px);
}


/* RELAY ON */

.relay-btn.on.active {
  background:
    var(--green);

  color:
    #06130c;

  border-color:
    var(--green);

  box-shadow:
    0 0 20px
    rgba(72, 224, 140, 0.2);
}


/* RELAY OFF */

.relay-btn.off.active {
  background:
    var(--danger);

  color:
    #1c0509;

  border-color:
    var(--danger);

  box-shadow:
    0 0 20px
    rgba(255, 107, 122, 0.16);
}


/* =========================================================
   ENERGY CALCULATOR
   ========================================================= */

.calculator-card {
  margin-top:
    13px;
}

.calc-icon {
  width:
    42px;

  height:
    42px;

  display:
    grid;

  place-items:
    center;

  border-radius:
    10px;

  background:
    rgba(53, 215, 255, 0.1);

  color:
    var(--cyan);

  font-weight:
    900;
}


/* CALCULATOR FORM */

.calc-form {
  display:
    grid;

  grid-template-columns:
    1.4fr
    1fr
    auto;

  gap:
    12px;

  align-items:
    end;

  margin-top:
    25px;
}


/* CALCULATOR RESULT */

.calc-results {
  display:
    grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap:
    10px;

  margin-top:
    20px;
}

.calc-results div {
  padding:
    16px;

  border:
    1px solid
    var(--line);

  border-radius:
    10px;
}

.calc-results .highlight {
  background:
    linear-gradient(
      135deg,
      rgba(53, 215, 255, 0.12),
      rgba(72, 224, 140, 0.08)
    );

  border-color:
    #2a617b;
}

.calc-results small {
  display:
    block;

  color:
    var(--muted);

  font-size:
    8px;
}

.calc-results strong {
  display:
    block;

  margin-top:
    7px;
}


/* TARIFF BREAKDOWN */

.tariff-breakdown {
  display:
    flex;

  gap:
    8px;

  flex-wrap:
    wrap;

  margin-top:
    12px;
}

.tariff-breakdown p {
  padding:
    8px 10px;

  background:
    #07131f;

  border:
    1px solid
    var(--line);

  border-radius:
    8px;

  color:
    var(--muted);

  font-size:
    10px;

  margin:
    0;
}

.tariff-breakdown strong {
  color:
    white;
}

.tariff-note {
  color:
    #5f778c;

  font-size:
    9px;

  margin-top:
    14px;
}


/* =========================================================
   TABLET RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {

  .site-nav {
    display:
      none;
  }

  .hero,
  .about-grid,
  .contact-section,
  .auth-shell {
    grid-template-columns:
      1fr;
  }

  .hero {
    gap:
      60px;
  }

  .hero-console {
    min-height:
      470px;
  }

  .feature-grid,
  .metric-grid {
    grid-template-columns:
      1fr 1fr;
  }

  .section-head {
    display:
      block;
  }

  .section-head > p {
    margin-top:
      25px;
  }

  .flow {
    grid-template-columns:
      1fr;
  }

  .flow i {
    text-align:
      center;

    transform:
      rotate(90deg);
  }

  .auth-showcase {
    min-height:
      55vh;
  }

  .dash-grid {
    grid-template-columns:
      1fr;
  }

  .dash-intro {
    display:
      block;
  }

  .date-chip {
    display:
      inline-block;

    margin-top:
      12px;
  }
}


/* =========================================================
   PHONE RESPONSIVE
   ========================================================= */

@media (max-width: 560px) {

  .hero {
    padding-top:
      45px;
  }

  .hero h1 {
    font-size:
      46px;

    letter-spacing:
      -2px;
  }

  .lead {
    font-size:
      14px;
  }

  .hero-actions {
    align-items:
      flex-start;

    flex-direction:
      column;

    gap:
      18px;
  }

  .hero-mini-stats {
    display:
      grid;

    grid-template-columns:
      1fr 1fr;
  }

  .hero-mini-stats div {
    min-width:
      0;
  }

  .feature-grid,
  .metric-grid,
  .calc-results,
  .calc-form {
    grid-template-columns:
      1fr;
  }

  .hero-console {
    min-height:
      430px;

    padding:
      16px;
  }

  .energy-ring {
    width:
      220px;

    height:
      220px;
  }

  .energy-ring strong {
    font-size:
      40px;
  }

  .site-header,
  .dash-header {
    padding:
      0 16px;
  }

  .site-header .ghost-btn {
    padding:
      9px 11px;

    font-size:
      10px;
  }

  .brand {
    font-size:
      15px;
  }

  .dash-head-right .status-pill {
    display:
      none;
  }

  .section {
    padding:
      75px 22px;
  }

  .section h2 {
    font-size:
      36px;
  }

  .contact-section {
    gap:
      45px;
  }

  footer {
    display:
      block;

    line-height:
      2;
  }

  .auth-stats {
    flex-wrap:
      wrap;
  }

  .auth-showcase {
    padding:
      90px 28px 55px;
  }

  .auth-panel {
    padding:
      45px 20px;
  }

  .login-card {
    padding:
      27px 20px;
  }

  .dash-intro h1 {
    font-size:
      32px;
  }

  .dash-wrap {
    padding:
      40px 16px 70px;
  }
}
