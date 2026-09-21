/* =========================================================
   SMARTGRID OPTIMIZER
   Sistem Pengoptimum Bajet dan Tenaga Pintar Fasa Tunggal
   Berasaskan IoT Menggunakan ESP32
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const cloudConfig = window.ECOENERGY_CONFIG || {};

const ESP32_BASE_URL =
  cloudConfig.esp32BaseUrl
    ? cloudConfig.esp32BaseUrl.replace(/\/$/, '')
    : '';

const FIREBASE_DATABASE_URL =
  cloudConfig.firebaseDatabaseUrl
    ? cloudConfig.firebaseDatabaseUrl.replace(/\/$/, '')
    : '';

const FIREBASE_DEVICE_PATH =
  cloudConfig.firebaseDevicePath ||
  'devices/esp32-01';


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let relayState = 'off';

let lastReading = {
  voltage: 0,
  current: 0,
  power: 0,
  energy: 0
};

let budgetLimit = 300;

let currentUser = null;

const themeButtons = document.querySelectorAll('[data-theme]');

function applyTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === themeName;
    button.classList.toggle('active', isActive);
  });
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyTheme(button.dataset.theme);
  });
});

applyTheme('ocean');


/* =========================================================
   ELEMENT HELPER
   ========================================================= */

function $(id) {
  return document.getElementById(id);
}


/* =========================================================
   FIREBASE PATH
   ========================================================= */

function firebasePath(path) {

  return (
    FIREBASE_DATABASE_URL +
    '/' +
    FIREBASE_DEVICE_PATH +
    '/' +
    path +
    '.json'
  );

}


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const sitePage = $('sitePage');
const authShell = $('authShell');
const dashboard = $('dashboard');

const openLogin = $('openLogin');
const heroLogin = $('heroLogin');
const backHome = $('backHome');

const loginForm = $('loginForm');
const registerForm = $('registerForm');

const showRegister = $('showRegister');
const showLogin = $('showLogin');

const logout = $('logout');

const message = $('message');

const userName = $('userName');


/* =========================================================
   LOGIN PAGE
   ========================================================= */

function showLoginPage() {

  sitePage.classList.add('hidden');

  authShell.classList.remove('hidden');

  dashboard.classList.add('hidden');

}


function showHomePage() {

  sitePage.classList.remove('hidden');

  authShell.classList.add('hidden');

  dashboard.classList.add('hidden');

}


function showDashboard() {

  sitePage.classList.add('hidden');

  authShell.classList.add('hidden');

  dashboard.classList.remove('hidden');

}


/* =========================================================
   LOGIN BUTTONS
   ========================================================= */

if (openLogin) {

  openLogin.addEventListener(
    'click',
    showLoginPage
  );

}


if (heroLogin) {

  heroLogin.addEventListener(
    'click',
    showLoginPage
  );

}


if (backHome) {

  backHome.addEventListener(
    'click',
    showHomePage
  );

}


/* =========================================================
   SWITCH LOGIN / REGISTER
   ========================================================= */

if (showRegister) {

  showRegister.addEventListener(
    'click',
    function () {

      loginForm.classList.add('hidden');

      registerForm.classList.remove('hidden');

      const title = $('formTitle');
      const subtitle = $('formSubtitle');

      if (title) {
        title.textContent =
          'Cipta Akaun';
      }

      if (subtitle) {
        subtitle.textContent =
          'Daftar untuk lihat tenaga anda.';
      }

    }
  );

}


if (showLogin) {

  showLogin.addEventListener(
    'click',
    function () {

      registerForm.classList.add('hidden');

      loginForm.classList.remove('hidden');

      const title = $('formTitle');
      const subtitle = $('formSubtitle');

      if (title) {
        title.textContent =
          'Selamat Datang Kembali';
      }

      if (subtitle) {
        subtitle.textContent =
          'Log masuk untuk lihat tenaga anda.';
      }

    }
  );

}


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(text) {

  if (!message) return;

  message.textContent = text;

}


/* =========================================================
   LOGIN
   ========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    'submit',
    function (event) {

      event.preventDefault();

      const username =
        $('loginUser').value.trim();

      const password =
        $('loginPass').value;

      /*
       * Demo login
       */

      if (
        username === 'zati' &&
        password === 'Zatie0768&'
      ) {

        currentUser = username;

        localStorage.setItem(
          'ecoenergyUser',
          username
        );

        if (userName) {
          userName.textContent =
            username;
        }

        showMessage('');

        showDashboard();

        updateLiveSensorReadings();

        updateRelayFromFirebase();

      } else {

        showMessage(
          'Username atau password tidak betul.'
        );

      }

    }
  );

}


/* =========================================================
   REGISTER
   ========================================================= */

if (registerForm) {

  registerForm.addEventListener(
    'submit',
    function (event) {

      event.preventDefault();

      const username =
        $('regUser').value.trim();

      const password =
        $('regPass').value;

      const confirm =
        $('regConfirm').value;

      if (!username) {

        showMessage(
          'Sila masukkan username.'
        );

        return;

      }


      if (password.length < 6) {

        showMessage(
          'Password mestilah sekurang-kurangnya 6 aksara.'
        );

        return;

      }


      if (password !== confirm) {

        showMessage(
          'Password tidak sama.'
        );

        return;

      }


      localStorage.setItem(
        'ecoenergyRegisteredUser',
        username
      );

      localStorage.setItem(
        'ecoenergyRegisteredPassword',
        password
      );


      showMessage(
        'Akaun berjaya didaftarkan. Sila log masuk.'
      );


      registerForm.classList.add('hidden');

      loginForm.classList.remove('hidden');

    }
  );

}


/* =========================================================
   LOGOUT
   ========================================================= */

if (logout) {

  logout.addEventListener(
    'click',
    function () {

      currentUser = null;

      localStorage.removeItem(
        'ecoenergyUser'
      );

      dashboard.classList.add('hidden');

      showHomePage();

    }
  );

}


/* =========================================================
   CONNECTION STATUS
   ========================================================= */

function setConnectionStatus(
  connected,
  text = null
) {

  const heroStatus =
    $('heroConnectionStatus');

  const dashboardStatus =
    $('dashboardConnectionStatus');


  if (connected) {

    if (heroStatus) {

      heroStatus.textContent =
        text || 'ESP32 / CLOUD: CONNECTED';

    }


    if (dashboardStatus) {

      dashboardStatus.textContent =
        text || 'ESP32 / Firebase tersambung';

    }

  } else {

    if (heroStatus) {

      heroStatus.textContent =
        'ESP32: OFFLINE';

    }


    if (dashboardStatus) {

      dashboardStatus.textContent =
        'ESP32 / Firebase tidak tersambung';

    }

  }

}


/* =========================================================
   DISPLAY SENSOR
   ========================================================= */

function displayReading(reading) {

  if (!reading) return;


  const voltage =
    Number(reading.voltage) || 0;

  const current =
    Number(reading.current) || 0;

  const power =
    Number(reading.power) || 0;

  const energy =
    Number(reading.energy) || 0;


  lastReading = {
    voltage,
    current,
    power,
    energy
  };


  /* HOME */

  if ($('val-voltage')) {

    $('val-voltage').textContent =
      voltage.toFixed(2) + ' V';

  }


  if ($('val-current')) {

    $('val-current').textContent =
      current.toFixed(2) + ' A';

  }


  if ($('val-power')) {

    $('val-power').textContent =
      power.toFixed(2) + ' W';

  }


  /* DASHBOARD */

  if ($('dashboardVoltage')) {

    $('dashboardVoltage').textContent =
      voltage.toFixed(2) + ' V';

  }


  if ($('dashboardCurrent')) {

    $('dashboardCurrent').textContent =
      current.toFixed(2) + ' A';

  }


  if ($('dashboardPower')) {

    $('dashboardPower').textContent =
      power.toFixed(2) + ' W';

  }


  /* ENERGY */

  if ($('totalKwh')) {

    $('totalKwh').value =
      energy.toFixed(2);

  }


  if ($('dashboardUsage')) {

    $('dashboardUsage').textContent =
      energy.toFixed(2);

  }


  updateBudget(energy);

}


/* =========================================================
   GET SENSOR DATA
   ========================================================= */

async function fetchLatestReading() {

  let reading = null;


  /*
   * 1. Cuba ESP32 secara direct
   * hanya jika esp32BaseUrl digunakan.
   */

  if (ESP32_BASE_URL) {

    try {

      const response =
        await fetch(
          ESP32_BASE_URL +
          '/api/latest',
          {
            method: 'GET'
          }
        );


      if (response.ok) {

        const data =
          await response.json();

        reading =
          data.reading || data;

      }

    } catch (error) {

      console.log(
        'Direct ESP32 gagal:',
        error
      );

    }

  }


  /*
   * 2. Jika direct ESP32 gagal,
   * baca Firebase.
   */

  if (!reading && FIREBASE_DATABASE_URL) {

    try {

      const response =
        await fetch(
          firebasePath('reading'),
          {
            method: 'GET',
            cache: 'no-store'
          }
        );


      if (response.ok) {

        reading =
          await response.json();

      }

    } catch (error) {

      console.log(
        'Firebase reading gagal:',
        error
      );

    }

  }


  if (reading) {

    displayReading(reading);

    setConnectionStatus(
      true,
      'ESP32 / Firebase tersambung'
    );

    return true;

  }


  setConnectionStatus(false);

  return false;

}


/* =========================================================
   LIVE SENSOR UPDATE
   ========================================================= */

async function updateLiveSensorReadings() {

  await fetchLatestReading();

}


/* =========================================================
   RELAY UI
   ========================================================= */

function renderRelayState() {

  const onButton =
    $('relayOn');

  const offButton =
    $('relayOff');

  const text =
    $('relayStatusText');


  if (relayState === 'on') {

    if (onButton) {

      onButton.classList.add(
        'active'
      );

    }


    if (offButton) {

      offButton.classList.remove(
        'active'
      );

    }


    if (text) {

      text.textContent =
        'Relay sedang ON.';

    }

  } else {

    if (onButton) {

      onButton.classList.remove(
        'active'
      );

    }


    if (offButton) {

      offButton.classList.add(
        'active'
      );

    }


    if (text) {

      text.textContent =
        'Relay sedang OFF.';

    }

  }

}


/* =========================================================
   SEND RELAY TO FIREBASE
   ========================================================= */

async function sendRelayToFirebase(
  state
) {

  if (!FIREBASE_DATABASE_URL) {

    throw new Error(
      'Firebase URL belum ditetapkan.'
    );

  }


  const response =
    await fetch(
      firebasePath('relay'),
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify(state)
      }
    );


  if (!response.ok) {

    throw new Error(
      'Firebase gagal menerima arahan relay.'
    );

  }


  return true;

}


/* =========================================================
   SET RELAY
   ========================================================= */

async function setRelayState(
  state
) {

  relayState = state;

  renderRelayState();


  try {

    /*
     * Cuba direct ESP32 dahulu
     */

    if (ESP32_BASE_URL) {

      try {

        const response =
          await fetch(
            ESP32_BASE_URL +
            '/api/relay',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body: JSON.stringify({
                state: state
              })
            }
          );


        if (response.ok) {

          setConnectionStatus(
            true,
            'ESP32 tersambung'
          );

          return;

        }

      } catch (error) {

        console.log(
          'Direct ESP32 relay gagal:',
          error
        );

      }

    }


    /*
     * Jika direct ESP32 tidak digunakan,
     * hantar arahan ke Firebase.
     */

    await sendRelayToFirebase(
      state
    );


    setConnectionStatus(
      true,
      'Arahan relay dihantar ke Firebase'
    );


  } catch (error) {

    console.error(error);

    setConnectionStatus(
      false
    );

    alert(
      'Arahan relay gagal dihantar ke Firebase.'
    );

  }

}


/* =========================================================
   READ RELAY FROM FIREBASE
   ========================================================= */

async function updateRelayFromFirebase() {

  if (!FIREBASE_DATABASE_URL) {
    return;
  }


  try {

    const response =
      await fetch(
        firebasePath('relay'),
        {
          method: 'GET',
          cache: 'no-store'
        }
      );


    if (!response.ok) {
      return;
    }


    const state =
      await response.json();


    if (
      state === 'on' ||
      state === 'off'
    ) {

      relayState = state;

      renderRelayState();

    }

  } catch (error) {

    console.log(
      'Baca relay Firebase gagal:',
      error
    );

  }

}


/* =========================================================
   RELAY BUTTON
   ========================================================= */

if ($('relayOn')) {

  $('relayOn').addEventListener(
    'click',
    function () {

      setRelayState('on');

    }
  );

}


if ($('relayOff')) {

  $('relayOff').addEventListener(
    'click',
    function () {

      setRelayState('off');

    }
  );

}


/* =========================================================
   BUDGET
   ========================================================= */

function updateBudget(
  energy
) {

  const usage =
    Number(energy) || 0;

  const percentage =
    budgetLimit > 0
      ? (usage / budgetLimit) * 100
      : 0;


  const safePercentage =
    Math.min(
      Math.max(
        percentage,
        0
      ),
      100
    );


  const progressBar =
    $('budget-progress-bar');

  const progressText =
    $('budget-progress-text');

  const systemStatus =
    $('system-status-text');

  const recommendation =
    $('smart-recommendation-box');

  const dashboardStatus =
    $('dashboardStatus');


  if (progressBar) {

    progressBar.style.width =
      safePercentage + '%';

  }


  if (progressText) {

    progressText.textContent =
      usage.toFixed(2) +
      ' kWh daripada ' +
      budgetLimit +
      ' kWh sasaran (' +
      percentage.toFixed(1) +
      '%)';

  }


  if (percentage >= 100) {

    if (systemStatus) {

      systemStatus.textContent =
        'BAJET DICAPAI';

    }


    if (dashboardStatus) {

      dashboardStatus.textContent =
        'BAJET DICAPAI';

    }


    if (recommendation) {

      recommendation.textContent =
        'Penggunaan telah mencapai sasaran bajet.';

    }

  } else if (percentage >= 80) {

    if (systemStatus) {

      systemStatus.textContent =
        'HAMPIR HAD';

    }


    if (dashboardStatus) {

      dashboardStatus.textContent =
        'HAMPIR HAD';

    }


    if (recommendation) {

      recommendation.textContent =
        'Penggunaan menghampiri had bajet.';

    }

  } else {

    if (systemStatus) {

      systemStatus.textContent =
        'NORMAL';

    }


    if (dashboardStatus) {

      dashboardStatus.textContent =
        'NORMAL';

    }


    if (recommendation) {

      recommendation.textContent =
        'Penggunaan tenaga masih dalam sasaran.';

    }

  }

}


/* =========================================================
   BILL CALCULATOR
   ========================================================= */

function calculateBill() {

  const kwh =
    Number(
      $('totalKwh')?.value
    ) || 0;


  const days =
    Number(
      $('billingDays')?.value
    ) || 30;


  /*
   * Kadar contoh.
   * Boleh ubah mengikut kadar tarif
   * yang digunakan dalam projek.
   */

  let energyCost = 0;

  let remaining = kwh;


  /*
   * Blok 1
   */

  const block1 =
    Math.min(
      remaining,
      100
    );

  energyCost +=
    block1 * 0.218;

  remaining -= block1;


  /*
   * Blok 2
   */

  if (remaining > 0) {

    const block2 =
      Math.min(
        remaining,
        100
      );

    energyCost +=
      block2 * 0.334;

    remaining -= block2;

  }


  /*
   * Blok 3
   */

  if (remaining > 0) {

    const block3 =
      Math.min(
        remaining,
        300
      );

    energyCost +=
      block3 * 0.516;

    remaining -= block3;

  }


  /*
   * Baki
   */

  if (remaining > 0) {

    energyCost +=
      remaining * 0.546;

  }


  const kwtbb =
    energyCost * 0.016;


  const total =
    energyCost + kwtbb;


  if ($('monthlyUsage')) {

    $('monthlyUsage').textContent =
      kwh.toFixed(2) +
      ' kWh';

  }


  if ($('monthlyCost')) {

    $('monthlyCost').textContent =
      'RM ' +
      total.toFixed(2);

  }


  if ($('kwtbbCost')) {

    $('kwtbbCost').textContent =
      'RM ' +
      kwtbb.toFixed(2);

  }


  if ($('dashboardBill')) {

    $('dashboardBill').textContent =
      'RM ' +
      total.toFixed(2);

  }


  if ($('tariffBreakdown')) {

    $('tariffBreakdown').innerHTML =
      `
      <p>
        Caj tenaga:
        <strong>RM ${energyCost.toFixed(2)}</strong>
      </p>

      <p>
        KWTBB 1.6%:
        <strong>RM ${kwtbb.toFixed(2)}</strong>
      </p>

      <p>
        Tempoh bil:
        <strong>${days} hari</strong>
      </p>
      `;

  }

}


/* =========================================================
   CALCULATOR BUTTON
   ========================================================= */

if ($('calculateUsage')) {

  $('calculateUsage').addEventListener(
    'click',
    calculateBill
  );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeSystem() {

  /*
   * Default relay OFF
   */

  relayState = 'off';

  renderRelayState();

  setConnectionStatus(false, 'ESP32: OFFLINE');


  /*
   * Cuba baca Firebase dan ESP32 sahaja jika URL benar-benar disetkan.
   */

  updateLiveSensorReadings();

  updateRelayFromFirebase();


  /*
   * Kira bil awal
   */

  calculateBill();

}


/* =========================================================
   AUTO REFRESH SENSOR
   ========================================================= */

setInterval(
  function () {

    updateLiveSensorReadings();

  },
  5000
);


/* =========================================================
   AUTO REFRESH RELAY
   ========================================================= */

setInterval(
  function () {

    updateRelayFromFirebase();

  },
  3000
);


/* =========================================================
   START
   ========================================================= */

initializeSystem();
