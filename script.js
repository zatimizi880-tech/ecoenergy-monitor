const authShell = document.querySelector('#authShell');
const sitePage = document.querySelector('#sitePage');
const dashboard = document.querySelector('#dashboard');
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const formTitle = document.querySelector('#formTitle');
const formSubtitle = document.querySelector('#formSubtitle');
const message = document.querySelector('#message');
const API_BASE_URL = window.TNB_API_URL || 'http://localhost:3000';
const cloudConfig = window.ECOENERGY_CONFIG || {};
const ESP32_BASE_URL = cloudConfig.esp32BaseUrl?.replace(/\/$/, '');
const FIREBASE_DATABASE_URL = cloudConfig.firebaseDatabaseUrl?.replace(/\/$/, '');
const FIREBASE_DEVICE_PATH = cloudConfig.firebaseDevicePath || 'devices/esp32-01';
const googleClientId = '380882540325-p0e8nqp4pbkmc3q70131sf7cnjrojbdm.apps.googleusercontent.com';
const users = JSON.parse(localStorage.getItem('tnbUsers') || '{"user123":"password123"}');
let relayState = localStorage.getItem('relayState') || 'off';
let dataTenaga = JSON.parse(localStorage.getItem('dataTenaga') || JSON.stringify({
  kwhSemasa: 0,
  kwhBulanLepas: 0,
  tarikhResetTerakhir: new Date().toISOString()
}));

function semakKitaranBulanan(kwhDariESP32) {
  const tarikhSemasa = new Date();
  const tarikhReset = new Date(dataTenaga.tarikhResetTerakhir);
  if (tarikhSemasa.getMonth() !== tarikhReset.getMonth() || tarikhSemasa.getFullYear() !== tarikhReset.getFullYear()) {
    dataTenaga.kwhBulanLepas = dataTenaga.kwhSemasa;
    dataTenaga.tarikhResetTerakhir = tarikhSemasa.toISOString();
  }
  dataTenaga.kwhSemasa = kwhDariESP32;
  localStorage.setItem('dataTenaga', JSON.stringify(dataTenaga));
  return { kwhSemasa: kwhDariESP32, kwhBulanLepas: dataTenaga.kwhBulanLepas };
}

function openLogin() {
  sitePage.classList.add('hidden');
  authShell.classList.remove('hidden');
  showLogin();
  window.scrollTo(0, 0);
}

function backHome() {
  authShell.classList.add('hidden');
  sitePage.classList.remove('hidden');
  window.scrollTo(0, 0);
}

function showMessage(text, success = false) {
  message.textContent = text;
  message.className = `message${success ? ' success' : ''}`;
}

function showRegister() {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
  formTitle.textContent = 'Cipta Akaun Baru';
  formSubtitle.textContent = 'Mulakan perjalanan tenaga yang lebih bijak.';
  showMessage('');
}

function showLogin() {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  formTitle.textContent = 'Selamat Datang Kembali';
  formSubtitle.textContent = 'Log masuk untuk lihat tenaga anda.';
  showMessage('');
}

function handleGoogleCredential(response) {
  const profile = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
  document.querySelector('#userName').textContent = profile.name || profile.email;
  authShell.classList.add('hidden');
  dashboard.classList.remove('hidden');
}

let googleScriptLoaded = false;

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    if (googleScriptLoaded) {
      reject(new Error('Google script is still loading.'));
      return;
    }

    googleScriptLoaded = true;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google script failed to load.'));
    document.head.appendChild(script);
  });
}

async function initialiseGoogleLogin() {
  const googleButton = document.querySelector('#googleLogin');
  if (!googleButton) {
    return;
  }

  googleButton.addEventListener('click', async () => {
    try {
      await loadGoogleScript();
      if (!window.google?.accounts?.id) {
        throw new Error('Google Identity Services is unavailable.');
      }

      const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
      if (!isLocalhost) {
        showMessage('Google login memerlukan Authorized JavaScript origin yang betul di Google Cloud Console.');
        return;
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleCredential
      });
      window.google.accounts.id.renderButton(googleButton, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        width: 220
      });
    } catch (error) {
      showMessage('Google login belum siap. Tambah http://localhost:5500 dalam Authorized JavaScript origins di Google Cloud Console.');
    }
  });
}

document.querySelector('#openLogin').addEventListener('click', openLogin);
document.querySelector('#heroLogin').addEventListener('click', openLogin);
document.querySelector('#backHome').addEventListener('click', backHome);
window.addEventListener('load', initialiseGoogleLogin);

document.querySelector('#showRegister').addEventListener('click', showRegister);
document.querySelector('#showLogin').addEventListener('click', showLogin);

document.querySelector('#forgotLink').addEventListener('click', (event) => {
  event.preventDefault();
  showMessage('Masukkan username anda dan kami akan bantu pulihkan akses.');
});

document.querySelectorAll('.social-btn').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.provider === 'Google') {
      return;
    }
    showMessage(`Login dengan ${button.dataset.provider} memerlukan sambungan OAuth sebenar.`);
  });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('#loginUser').value.trim();
  const password = document.querySelector('#loginPass').value;
  if (users[username] !== password) {
    showMessage('Username atau password tidak tepat. Cuba semula.');
    return;
  }
  document.querySelector('#userName').textContent = username;
  authShell.classList.add('hidden');
  dashboard.classList.remove('hidden');
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.querySelector('#regUser').value.trim();
  const password = document.querySelector('#regPass').value;
  const confirm = document.querySelector('#regConfirm').value;
  if (!username || password.length < 6) {
    showMessage('Username diperlukan dan password mesti sekurang-kurangnya 6 aksara.');
    return;
  }
  if (password !== confirm) {
    showMessage('Sahkan password anda dengan betul.');
    return;
  }
  if (users[username]) {
    showMessage('Username itu sudah digunakan.');
    return;
  }
  users[username] = password;
  localStorage.setItem('tnbUsers', JSON.stringify(users));
  showLogin();
  document.querySelector('#loginUser').value = username;
  showMessage('Pendaftaran berjaya. Sila log masuk.', true);
});

document.querySelector('#logout').addEventListener('click', () => {
  dashboard.classList.add('hidden');
  authShell.classList.remove('hidden');
  loginForm.reset();
  showLogin();
});

function calculateTnbBill(totalKwh, days = 30) {
  const factor = days / 30;
  const blockLimits = [200 * factor, 100 * factor, 300 * factor, 300 * factor];
  const rates = [0.218, 0.334, 0.516, 0.546, 0.571];
  const labels = ['0–200 kWh', '201–300 kWh', '301–600 kWh', '601–900 kWh', '>900 kWh'];
  let remainingKwh = Math.max(0, totalKwh);
  let baseCost = 0;
  const breakdown = [];

  blockLimits.forEach((limit, index) => {
    const used = Math.min(remainingKwh, limit);
    const cost = used * rates[index];
    breakdown.push({ label: labels[index], used, cost, rate: rates[index] });
    baseCost += cost;
    remainingKwh -= used;
  });

  const finalCost = remainingKwh * rates[4];
  breakdown.push({ label: labels[4], used: remainingKwh, cost: finalCost, rate: rates[4] });
  baseCost += finalCost;
  const kwtbbCharge = totalKwh > 300 * factor ? baseCost * 0.016 : 0;

  return {
    totalKwh: totalKwh.toFixed(2),
    baseCost: baseCost.toFixed(2),
    kwtbbCharge: kwtbbCharge.toFixed(2),
    totalBill: (baseCost + kwtbbCharge).toFixed(2),
    breakdown
  };
}

function updateBudgetProgressBar(currentKwh, targetKwh) {
  const progressBar = document.querySelector('#budget-progress-bar');
  const progressText = document.querySelector('#budget-progress-text');
  const systemStatus = document.querySelector('#system-status-text');
  const percentage = targetKwh > 0 ? (currentKwh / targetKwh) * 100 : 0;
  const displayPercentage = percentage.toFixed(1);
  const barWidth = Math.min(percentage, 100);
  let color = '#28a745';
  let status = 'NORMAL';
  if (percentage >= 100) {
    color = '#dc3545';
    status = 'AMARAN: MELEBIHI BAJET';
  } else if (percentage >= 80) {
    color = '#ffc107';
    status = 'AMARAN: HAMPIR HAD';
  }
  if (progressBar) {
    progressBar.style.width = `${barWidth}%`;
    progressBar.style.backgroundColor = color;
  }
  if (progressText) progressText.textContent = `${currentKwh.toFixed(2)} kWh daripada ${targetKwh.toFixed(2)} kWh sasaran (${displayPercentage}%)`;
  if (systemStatus) {
    systemStatus.textContent = status;
    systemStatus.style.color = color;
    systemStatus.style.backgroundColor = `${color}18`;
  }
  const dashboardStatus = document.querySelector('#dashboardStatus');
  if (dashboardStatus) {
    dashboardStatus.textContent = status;
    dashboardStatus.style.color = color;
  }
  return percentage;
}

function generateSmartRecommendation(currentKwh, targetKwh, remainingDays = 10) {
  const recommendationBox = document.querySelector('#smart-recommendation-box');
  if (!recommendationBox) return;
  if (currentKwh > targetKwh) {
    const excessKwh = (currentKwh - targetKwh).toFixed(2);
    recommendationBox.innerHTML = `<div class="recommendation danger"><strong>Amaran penggunaan tinggi</strong><br>Penggunaan melebihi sasaran sebanyak <strong>${excessKwh} kWh</strong>.<br><em>Cadangan:</em> Matikan penyaman udara atau pemanas air apabila tidak digunakan untuk mengawal kenaikan tarif.</div>`;
    return;
  }
  const remainingKwh = targetKwh - currentKwh;
  const dailyLimit = (remainingKwh / Math.max(remainingDays, 1)).toFixed(2);
  recommendationBox.innerHTML = `<div class="recommendation good"><strong>Penggunaan dalam kawalan</strong><br>Baki <strong>${remainingKwh.toFixed(2)} kWh</strong> untuk ${remainingDays} hari lagi.<br><em>Cadangan:</em> Kekalkan purata sekitar <strong>${dailyLimit} kWh/hari</strong> untuk kekal di bawah bajet.</div>`;
}

function updateCalculation() {
  const totalKwh = Number(document.querySelector('#totalKwh').value);
  const days = Number(document.querySelector('#billingDays').value);
  if (!Number.isFinite(totalKwh) || !Number.isFinite(days) || totalKwh < 0 || days < 1) return;
  const penggunaan = semakKitaranBulanan(totalKwh);
  const bill = calculateTnbBill(totalKwh, days);
  updateBudgetProgressBar(totalKwh, 300);
  generateSmartRecommendation(totalKwh, 300, Math.max(1, 30 - new Date().getDate()));
  document.querySelector('#monthlyUsage').textContent = `${bill.totalKwh} kWh`;
  document.querySelector('#monthlyCost').textContent = `RM ${bill.totalBill}`;
  document.querySelector('#kwtbbCost').textContent = `RM ${bill.kwtbbCharge}`;
  document.querySelector('#dashboardUsage').textContent = penggunaan.kwhSemasa.toFixed(2);
  document.querySelector('#dashboardBill').textContent = `RM ${bill.totalBill}`;
  document.querySelector('#previousUsage').textContent = `Bulan lepas: ${penggunaan.kwhBulanLepas.toFixed(2)} kWh`;
  document.querySelector('#tariffBreakdown').innerHTML = bill.breakdown.map((block) => `<div class="tariff-line"><span>${block.label}</span><strong>${block.used.toFixed(2)} kWh</strong><small>RM ${block.cost.toFixed(2)}</small></div>`).join('');
}

document.querySelector('#calculateUsage').addEventListener('click', updateCalculation);
document.querySelector('#totalKwh').addEventListener('input', updateCalculation);
document.querySelector('#billingDays').addEventListener('input', updateCalculation);
updateCalculation();

async function fetchLatestReading() {
  try {
    let reading = null;
    if (ESP32_BASE_URL) {
        try {
          const response = await fetch(`${ESP32_BASE_URL}/api/latest`, { method: 'GET' });
          if (response.ok) reading = (await response.json()).reading || null;
        } catch (error) {
          console.warn('ESP32 tidak boleh dicapai, cuba Firebase.');
        }
    }
    if (!reading && FIREBASE_DATABASE_URL) {
      const response = await fetch(`${FIREBASE_DATABASE_URL}/${FIREBASE_DEVICE_PATH}/reading.json`);
      if (response.ok) reading = await response.json();
    }
    if (!reading) {
      return false;
    }

    window.lastEspConnected = true;
    setConnectionStatus(true);
    const voltage = Number(reading.voltage || 0);
    const current = Number(reading.current || 0);
    const power = Number(reading.power || 0);
    const energy = Number(reading.energy || 0);
    console.log('Live sensor reading:', { voltage, current, power, energy });

    const voltageElement = document.querySelector('#val-voltage');
    const currentElement = document.querySelector('#val-current');
    const powerElement = document.querySelector('#val-power');

    if (voltageElement) voltageElement.textContent = `${voltage.toFixed(1)} V`;
    if (currentElement) currentElement.textContent = `${current.toFixed(2)} A`;
    if (powerElement) powerElement.textContent = `${power.toFixed(1)} W`;

    const usageInput = document.querySelector('#totalKwh');
    if (usageInput) usageInput.value = energy.toFixed(2);

    const dashboardUsage = document.querySelector('#dashboardUsage');
    if (dashboardUsage) dashboardUsage.textContent = energy.toFixed(2);

    return true;
  } catch (error) {
    return false;
  }
}

function updateLiveSensorReadings() {
  fetchLatestReading().then((ok) => {
    if (!ok) {
      setConnectionStatus(false);
    }
  });
}

function setConnectionStatus(isConnected) {
  const heroStatus = document.querySelector('#heroConnectionStatus');
  const connectionText = document.querySelector('#dashboardConnectionStatus');
  if (heroStatus) heroStatus.textContent = isConnected ? 'ESP32 / CLOUD: CONNECTED' : 'ESP32: OFFLINE';
  if (connectionText) connectionText.textContent = isConnected ? 'ESP32 / Cloud tersambung' : 'ESP32 dan cloud offline';
}

function renderRelayState() {
  const relayStatusText = document.querySelector('#relayStatusText');
  const isOn = relayState === 'on';
  if (relayStatusText) relayStatusText.textContent = `Relay ${isOn ? 'dihidupkan' : 'dimatikan'} dalam mod ${window.lastEspConnected ? 'ESP32' : 'demo'}.`;
  document.querySelector('#relayOn')?.classList.toggle('active', isOn);
  document.querySelector('#relayOff')?.classList.toggle('active', !isOn);
}

async function setRelayState(nextState) {
  relayState = nextState;
  localStorage.setItem('relayState', relayState);
  renderRelayState();
  try {
    let response;
    if (ESP32_BASE_URL) {
      try {
        response = await fetch(`${ESP32_BASE_URL}/api/relay`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ state: nextState }) });
      } catch (error) {
        response = null;
      }
    }
    if ((!response || !response.ok) && FIREBASE_DATABASE_URL) {
      response = await fetch(`${FIREBASE_DATABASE_URL}/${FIREBASE_DEVICE_PATH}/relay.json`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nextState) });
    }
    if (!response) {
      throw new Error('Tiada sumber ESP32 atau Firebase dikonfigurasi.');
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    window.lastEspConnected = true;
    setConnectionStatus(true);
    renderRelayState();
  } catch (error) {
    window.lastEspConnected = false;
    setConnectionStatus(false);
    renderRelayState();
  }
}

document.querySelector('#relayOn').addEventListener('click', () => setRelayState('on'));
document.querySelector('#relayOff').addEventListener('click', () => setRelayState('off'));
renderRelayState();
setConnectionStatus(false);
setInterval(updateLiveSensorReadings, 5000);
