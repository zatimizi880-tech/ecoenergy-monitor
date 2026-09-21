:root {
  --bg: #07151f;
  --bg-2: #0d1e2c;
  --panel: rgba(13, 24, 35, 0.82);
  --panel-strong: rgba(16, 31, 42, 0.96);
  --line: rgba(150, 205, 236, 0.18);
  --text: #edf7ff;
  --muted: #9bb6cc;
  --muted-2: #dfeef7;
  --primary: #6ce0ff;
  --primary-2: #b9f6ff;
  --green: #7cf3bc;
  --green-strong: #4fe09b;
  --warning: #ffd76d;
  --danger: #ff7a88;
  --shadow: 0 24px 70px rgba(1, 9, 16, 0.55);

  --page-bg-1: #091823;
  --page-bg-2: #102a38;
  --page-bg-3: #103a4a;
  --hero-glow: rgba(108, 224, 255, 0.22);
  --soft-panel: rgba(255, 255, 255, 0.08);
  --soft-border: rgba(170, 210, 236, 0.14);
}

body[data-theme="sunset"] {
  --primary: #ff9d6c;
  --primary-2: #ffd7a8;
  --page-bg-1: #2b1b1a;
  --page-bg-2: #5f4b4a;
  --page-bg-3: #ec8f6a;
  --hero-glow: rgba(255, 170, 110, 0.24);
}

body[data-theme="violet"] {
  --primary: #9d8cff;
  --primary-2: #d7d0ff;
  --page-bg-1: #1a1733;
  --page-bg-2: #352d5d;
  --page-bg-3: #7e63d4;
  --hero-glow: rgba(158, 123, 255, 0.24);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  background:
    radial-gradient(circle at 14% 10%, rgba(108, 224, 255, 0.2), transparent 18%),
    radial-gradient(circle at 82% 8%, rgba(82, 226, 171, 0.12), transparent 16%),
    linear-gradient(135deg, #060d14 0%, #081821 32%, #0d1f2b 62%, #102635 100%);
  color: var(--text);
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(90deg, rgba(108, 224, 255, 0.04), transparent 30%, rgba(108, 224, 255, 0.03));
  pointer-events: none;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

img {
  max-width: 100%;
}

.hidden {
  display: none !important;
}

.site-page,
.auth-shell,
.dashboard {
  min-height: 100vh;
}

.site-page {
  width: min(1240px, calc(100% - 36px));
  margin: 0 auto;
  padding: 22px 0 34px;
}

.site-page::before {
  content: "";
  position: absolute;
  inset: 90px 10% auto 10%;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(108, 224, 255, 0.12), transparent 62%);
  filter: blur(26px);
  pointer-events: none;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 28px;
  border: 1px solid rgba(150, 205, 236, 0.12);
  border-radius: 22px;
  background: rgba(9, 18, 27, 0.78);
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px rgba(3, 10, 17, 0.32), 0 0 0 1px rgba(108, 224, 255, 0.04);
}

.theme-picker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.theme-swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.25);
  padding: 0;
  background: var(--swatch, #6ce0ff);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
}

.theme-swatch[data-theme="ocean"] { --swatch: linear-gradient(135deg, #6ce0ff, #7cf3bc); }
.theme-swatch[data-theme="sunset"] { --swatch: linear-gradient(135deg, #ffb26b, #ff7a88); }
.theme-swatch[data-theme="violet"] { --swatch: linear-gradient(135deg, #9d8cff, #d7d0ff); }

.theme-swatch.active {
  border-color: #ffffff;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.15), 0 0 18px rgba(255,255,255,0.12);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  font-size: 0.96rem;
}

.brand-mark span {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), #60a8ff);
  color: #06161c;
  font-weight: 800;
  box-shadow: 0 0 18px rgba(108, 224, 255, 0.6);
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;
  flex: 1;
  color: rgba(235, 245, 255, 0.85);
  font-size: 1rem;
  font-weight: 500;
}

.site-nav a {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.site-nav a:hover {
  opacity: 1;
}

.nav-login,
.primary-btn,
.logout-btn,
.relay-btn,
.back-home {
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.nav-login,
.primary-btn,
.logout-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0.9rem 1.4rem;
  border-radius: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav-login {
  background: rgba(8, 18, 26, 0.7);
  border: 1px solid rgba(108, 224, 255, 0.8);
  color: var(--text);
  box-shadow: inset 0 0 0 1px rgba(108, 224, 255, 0.2);
}

.primary-btn {
  background: linear-gradient(135deg, #1465d8 0%, #1d8af0 38%, #56d2ff 100%);
  color: #f5fbff;
  box-shadow: 0 16px 30px rgba(18, 96, 196, 0.28);
}

.primary-btn.green {
  background: linear-gradient(135deg, var(--green) 0%, #c1ffdd 100%);
  color: #0a2d23;
}

.nav-login:hover,
.primary-btn:hover,
.logout-btn:hover,
.relay-btn:hover,
.back-home:hover {
  transform: translateY(-1px);
}

.hero-section {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 30px;
  padding: 52px 0 18px;
  position: relative;
}

.hero-copy {
  max-width: 620px;
  z-index: 2;
}

.hero-copy,
.hero-visual,
.energy-panel,
.form-panel,
.dashboard,
.sensor-panel,
.budget-card,
.calculator-card,
.relay-card,
.usage-card,
.metric-grid article,
.service-grid article,
.site-header,
.auth-shell,
.form-wrap {
  position: relative;
}

.iot-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0.45rem 0.8rem;
  border: 1px solid rgba(108, 224, 255, 0.25);
  border-radius: 999px;
  background: rgba(93, 175, 223, 0.08);
  color: var(--primary-2);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.dot,
.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px rgba(118, 240, 179, 0.9);
}

.eyebrow {
  margin: 18px 0 10px;
  color: var(--primary-2);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 700;
}

.hero-copy h1,
.about-grid h2,
.services-section h2,
.contact-section h2,
.auth-shell h1,
.form-heading h2,
.dashboard h2 {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  line-height: 1.03;
  letter-spacing: -0.05em;
}

.hero-copy h1 {
  font-size: clamp(3.2rem, 5vw, 6rem);
  margin-bottom: 12px;
  line-height: 0.88;
  letter-spacing: -0.065em;
  font-weight: 700;
}

.hero-copy h1 span,
.about-grid h2 span,
.services-section h2 span,
.contact-section h2 span,
.auth-shell h1 span,
.dashboard h2 span {
  color: var(--primary-2);
}

#val-voltage {
  color: #65dcff;
}

#val-current {
  color: #7cf3bc;
}

#val-power {
  color: #f7d76a;
}

#heroBudget {
  color: #d79dfc;
}

.hero-copy p {
  max-width: 540px;
  color: rgba(223, 238, 247, 0.88);
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 24px;
}

.learn-link,
.arrow-link,
.switch-copy a,
.text-btn,
.check a {
  color: var(--primary-2);
}

.learn-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.hero-visual {
  min-height: 520px;
  display: grid;
  place-items: center;
}

.visual-orbit {
  position: absolute;
  inset: 6% 10% auto auto;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(108, 224, 255, 0.18);
  border-radius: 50%;
  box-shadow: 0 0 0 18px rgba(108, 224, 255, 0.03);
}

.visual-bolt {
  position: absolute;
  right: 18%;
  top: 12%;
  display: grid;
  place-items: center;
  width: 102px;
  height: 102px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(108, 224, 255, 0.2), rgba(118, 240, 179, 0.1));
  border: 1px solid rgba(108, 224, 255, 0.2);
  color: var(--primary-2);
  font-size: 3rem;
  font-weight: 700;
  box-shadow: 0 18px 48px rgba(64, 150, 198, 0.22);
  animation: floatCard 4s ease-in-out infinite;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.sensor-panel {
  width: min(100%, 500px);
  padding: 18px 18px 16px;
  border-radius: 26px;
  background: linear-gradient(180deg, rgba(11, 23, 34, 0.96), rgba(15, 29, 40, 0.96));
  border: 1px solid rgba(137, 197, 236, 0.2);
  box-shadow: 0 25px 55px rgba(2, 7, 14, 0.5), 0 0 0 1px rgba(108, 224, 255, 0.06);
  transform: translateY(4px);
  animation: floatCard 5.5s ease-in-out infinite;
}

.sensor-header,
.sensor-footer,
.budget-heading,
.calculator-intro,
.dashboard-head,
.form-row,
.contact-section,
.about-grid,
.section-kicker,
.metric-grid,
.service-grid,
.days,
.calculator-form,
.calculation-result,
.relay-actions,
.dashboard-content,
.energy-content,
.form-wrap {
  display: flex;
}

.sensor-header,
.sensor-footer,
.budget-heading,
.dashboard-head,
.section-kicker,
.calculator-intro,
.form-row,
.contact-section,
.about-grid,
.metric-grid,
.service-grid,
.days,
.calculator-form,
.calculation-result,
.relay-actions,
.dashboard-head {
  justify-content: space-between;
  align-items: center;
}

.sensor-header {
  margin-bottom: 14px;
  color: var(--muted-2);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sensor-header small {
  color: #ff8d97;
  font-weight: 700;
}

.sensor-header small,
.sensor-footer,
.metric-grid article small,
.contact-meta,
.muted,
.secure-note,
.tariff-note,
.form-heading p,
.switch-copy,
.demo-hint,
.service-grid p,
.about-grid p,
.contact-detail p,
.budget-heading p,
.calculator-intro p,
#smart-recommendation-box,
#budget-progress-text,
.metric-grid article span,
#relayStatusText,
#dashboardConnectionStatus,
#previousUsage,
#dashboardUsage em,
#system-status-text {
  color: var(--muted);
}

.sensor-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.sensor-grid div {
  padding: 14px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(157, 214, 232, 0.08);
}

.sensor-grid small {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.sensor-grid strong {
  font-size: 1.42rem;
  font-weight: 700;
}

.sensor-footer {
  margin-top: 16px;
  gap: 14px;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.visual-label {
  position: absolute;
  left: 8%;
  bottom: 10%;
  color: var(--muted-2);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.6;
}

.visual-label b {
  color: var(--text);
  font-size: 1.1rem;
}

.content-section {
  padding: 90px 0 0;
}

.section-kicker {
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-kicker .eyebrow {
  margin: 0;
}

.about-grid,
.contact-section {
  gap: 28px;
  align-items: end;
}

.about-grid h2,
.services-section h2,
.contact-section h2 {
  font-size: clamp(2.3rem, 4vw, 4rem);
  width: min(100%, 600px);
}

.about-grid > div {
  max-width: 500px;
}

.about-grid p,
.contact-detail p,
.services-section p,
.auth-shell .intro {
  color: var(--muted-2);
  font-size: 1.1rem;
  line-height: 1.8;
}

.arrow-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  font-weight: 700;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 34px;
}

.service-grid article,
.metric-grid article,
.budget-card,
.calculator-card,
.relay-card,
.usage-card {
  padding: 24px 22px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(15, 27, 36, 0.9), rgba(12, 20, 28, 0.9));
  border: 1px solid rgba(151, 202, 232, 0.14);
  box-shadow: 0 18px 40px rgba(4, 9, 15, 0.3), 0 0 0 1px rgba(108, 224, 255, 0.04);
}

.service-grid article b {
  display: inline-block;
  margin-bottom: 10px;
  color: var(--primary-2);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
}

.service-grid h3,
.dashboard h3 {
  margin: 0 0 8px;
  font-size: 1.45rem;
}

.auth-shell {
  display: block;
  min-height: 100vh;
  width: min(1180px, calc(100% - 28px));
  margin: 0 auto;
  padding: 0 0 30px;
  background: linear-gradient(180deg, #07151f 0%, #0a1d2b 30%, #0d2030 100%);
  border-radius: 0;
  box-shadow: inset 0 0 0 1px rgba(108, 224, 255, 0.08);
}

.auth-topbar {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  padding: 18px 20px 10px;
}

.mini-card {
  padding: 16px 18px 14px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(12, 23, 35, 0.86), rgba(22, 42, 58, 0.82));
  border: 1px solid rgba(108, 224, 255, 0.18);
  min-height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 12px 24px rgba(10, 23, 35, 0.2);
}

.mini-top {
  font-size: clamp(2rem, 2.6vw, 3rem);
  color: #0d2d3b;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.05em;
}

.mini-top span {
  font-size: 0.55em;
  vertical-align: middle;
}

.mini-label {
  margin-top: 8px;
  color: #1a3850;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.4;
}

.energy-panel,
.form-panel {
  min-height: auto;
}

.energy-panel {
  display: flex;
  align-items: stretch;
  padding: 28px 24px 18px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-right: none;
  overflow: visible;
  box-shadow: none;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(119, 166, 201, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(119, 166, 201, 0.05) 1px, transparent 1px);
  background-size: 26px 26px;
}

.sun-ring {
  position: absolute;
  top: 12%;
  right: 14%;
  width: 290px;
  height: 290px;
  border-radius: 50%;
  border: 1px solid rgba(108, 224, 255, 0.18);
  box-shadow: 0 0 80px rgba(108, 224, 255, 0.12);
}

.bolt {
  position: absolute;
  right: 16%;
  top: 21%;
  display: grid;
  place-items: center;
  width: 110px;
  height: 110px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(108, 224, 255, 0.18), rgba(118, 240, 179, 0.12));
  border: 1px solid rgba(108, 224, 255, 0.18);
  color: var(--primary-2);
  font-size: 4rem;
  font-weight: 700;
}

.energy-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  gap: 12px;
}

.energy-content h1,
.form-heading h2 {
  font-size: clamp(2.4rem, 4vw, 4.2rem);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 14px;
}

.stat-card {
  padding: 18px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
}

.stat-card strong {
  display: block;
  color: var(--primary-2);
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-family: 'Space Grotesk', sans-serif;
}

.stat-card small {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 24px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-left: none;
  box-shadow: none;
}

.back-home {
  position: absolute;
  top: 20px;
  left: 10px;
  background: transparent;
  color: #1d3d50;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.2rem;
}

.form-wrap {
  width: min(100%, 520px);
  padding: 60px 22px 10px;
  border-radius: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.form-wrap .brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px 6px 6px;
  border-radius: 14px;
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(58, 117, 148, 0.16);
}

.form-heading {
  margin-bottom: 18px;
  text-align: left;
}

.form-heading .eyebrow {
  margin-bottom: 10px;
}

.form-heading h2 {
  margin-bottom: 8px;
  font-size: clamp(2rem, 3vw, 2.7rem);
  line-height: 1.08;
}

.social-login {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 0 0 18px;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.72rem 0.5rem;
  border-radius: 12px;
  border: 1px solid rgba(71, 125, 164, 0.18);
  background: linear-gradient(135deg, rgba(20, 30, 44, 0.8), rgba(17, 54, 77, 0.76));
  color: #edf7ff;
  font-weight: 600;
  transition: 0.2s ease;
  box-shadow: 0 10px 18px rgba(10, 23, 35, 0.18);
}

.social-btn:hover {
  transform: translateY(-1px);
  border-color: rgba(108, 224, 255, 0.5);
  box-shadow: 0 12px 25px rgba(18, 46, 64, 0.22);
}

.google {
  background: linear-gradient(135deg, rgba(27, 39, 48, 0.8), rgba(38, 62, 81, 0.78));
}

.email {
  background: linear-gradient(135deg, rgba(19, 38, 52, 0.8), rgba(18, 64, 78, 0.76));
}

.facebook {
  background: linear-gradient(135deg, rgba(17, 29, 41, 0.8), rgba(29, 61, 84, 0.76));
}

.social-icon {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.08);
}

.divider {
  position: relative;
  margin: 4px 0 14px;
  text-align: center;
  color: #3d6679;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.divider::before {
  content: "";
  position: absolute;
  inset: 50% 0 auto;
  height: 1px;
  background: rgba(53, 94, 119, 0.2);
}

.divider span {
  position: relative;
  z-index: 1;
  background: rgba(234, 249, 255, 0.8);
  padding: 0 10px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form label {
  margin-top: 8px;
  color: #1a2d3f;
  font-size: 0.9rem;
  font-weight: 600;
}

.auth-form input,
.calculator-form input {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid rgba(107, 159, 191, 0.25);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(13, 25, 36, 0.76), rgba(18, 38, 49, 0.8));
  color: #edf7ff;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
}

.auth-form input:focus,
.calculator-form input:focus {
  border-color: rgba(108, 224, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(108, 224, 255, 0.12), inset 0 0 0 1px rgba(255,255,255,0.08);
  background: rgba(9, 19, 28, 0.9);
}

.form-row {
  align-items: center;
  gap: 16px;
  margin: 8px 0;
}

.check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1d4253;
}

.check input {
  width: auto;
  accent-color: var(--primary);
}

.text-btn {
  background: transparent;
  border: none;
  padding: 0;
  font-size: inherit;
  font-weight: 700;
}

.switch-copy,
.secure-note,
.tariff-note {
  margin: 12px 0 0;
  font-size: 0.88rem;
  text-align: center;
}

.secure-note {
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(110, 224, 255, 0.08), rgba(113, 240, 179, 0.06));
  border: 1px solid rgba(116, 228, 255, 0.12);
  color: var(--primary-2);
  font-weight: 600;
}

.message {
  min-height: 22px;
  margin: 16px 0 0;
  font-size: 0.9rem;
  color: var(--primary-2);
}

.dashboard {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 50px;
}

.dashboard-head {
  padding: 18px 22px;
  margin-bottom: 22px;
  border: 1px solid rgba(170, 210, 236, 0.12);
  border-radius: 22px;
  background: rgba(9, 20, 28, 0.7);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.dashboard-content {
  flex-direction: column;
  gap: 24px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.metric-grid article {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric-grid article strong {
  font-size: clamp(1.7rem, 2vw, 2.3rem);
  font-family: 'Space Grotesk', sans-serif;
}

.metric-grid article strong em {
  font-style: normal;
  color: var(--muted);
  font-size: 0.75rem;
}

.metric-grid .status {
  color: var(--green);
}

.energy-panel .brand-mark,
.dashboard .brand-mark {
  font-size: 0.9rem;
}

.relay-card,
.budget-card,
.usage-card,
.calculator-card {
  display: grid;
  gap: 20px;
}

.relay-card {
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
}

.relay-card p {
  margin: 0;
  color: var(--muted-2);
}

.relay-actions {
  justify-content: flex-end;
  gap: 14px;
}

.relay-btn {
  min-width: 96px;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(169, 209, 234, 0.12);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.relay-btn.active {
  background: linear-gradient(135deg, var(--green) 0%, #d9ffe8 100%);
  color: #062b1c;
  box-shadow: 0 14px 26px rgba(118, 240, 179, 0.22);
}

.budget-card {
  gap: 18px;
}

.budget-heading {
  gap: 18px;
}

.budget-heading h3 {
  margin: 6px 0 4px;
}

#system-status-text {
  color: var(--green);
  font-size: 0.86rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.progress-track {
  width: 100%;
  height: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  border: 1px solid rgba(170, 210, 236, 0.08);
}

#budget-progress-bar {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--green) 0%, var(--primary) 100%);
  box-shadow: 0 0 18px rgba(108, 224, 255, 0.26);
}

.recommendation-box {
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(118, 240, 179, 0.06);
  border: 1px solid rgba(118, 240, 179, 0.12);
  color: var(--muted-2);
}

.usage-card {
  gap: 18px;
}

.bars {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  align-items: end;
  gap: 12px;
  height: 160px;
  padding-top: 12px;
}

.bars i {
  display: block;
  background: linear-gradient(180deg, rgba(108, 224, 255, 0.75), rgba(77, 149, 255, 0.4));
  border-radius: 12px 12px 0 0;
  min-height: 10%;
  box-shadow: 0 8px 20px rgba(108, 224, 255, 0.15);
}

.days {
  gap: 12px;
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.days span {
  width: 100%;
  text-align: center;
}

.calculator-intro {
  align-items: center;
  gap: 20px;
}

.calculator-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(108, 224, 255, 0.08);
  border: 1px solid rgba(108, 224, 255, 0.14);
  color: var(--primary-2);
  font-size: 1.7rem;
}

.calculator-form {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 16px;
  align-items: end;
}

.calculator-form label {
  display: block;
  margin-bottom: 8px;
  color: var(--muted-2);
}

.calculation-result {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 4px;
}

.calculation-result > div {
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(170, 210, 236, 0.08);
}

.calculation-result small {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.calculation-result strong {
  font-size: 1.15rem;
}

.result-highlight {
  background: rgba(108, 224, 255, 0.06) !important;
}

.tariff-breakdown {
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(170, 210, 236, 0.08);
}

.tariff-breakdown p {
  margin: 0 0 8px;
  color: var(--muted-2);
}

.tariff-breakdown p:last-child {
  margin-bottom: 0;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 26px 8px 0;
  color: var(--muted);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 1000px) {
  .hero-section,
  .auth-shell,
  .relay-card,
  .calculator-form,
  .metric-grid,
  .service-grid {
    grid-template-columns: 1fr;
  }

  .hero-section {
    display: grid;
  }

  .auth-shell {
    display: grid;
  }

  .site-nav {
    display: none;
  }

  .energy-panel,
  .form-panel {
    border-radius: 24px;
    border: 1px solid rgba(137, 197, 236, 0.18);
  }

  .form-panel {
    margin-top: 16px;
  }
}

@media (max-width: 640px) {
  .site-page,
  .dashboard {
    width: min(100% - 20px, 1200px);
  }

  .site-header {
    padding: 16px 18px;
  }

  .brand-mark {
    font-size: 0.8rem;
  }

  .nav-login,
  .primary-btn,
  .logout-btn {
    width: 100%;
  }

  .hero-copy h1,
  .about-grid h2,
  .services-section h2,
  .contact-section h2,
  .auth-shell h1,
  .form-heading h2,
  .dashboard h2 {
    line-height: 1.08;
    letter-spacing: -0.04em;
  }

  .hero-actions,
  .site-footer,
  .section-kicker,
  .sensor-footer,
  .budget-heading,
  .calculator-intro,
  .dashboard-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .sensor-grid,
  .stats-container,
  .calculation-result,
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .relay-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .days {
    gap: 8px;
    font-size: 0.64rem;
  }
}
