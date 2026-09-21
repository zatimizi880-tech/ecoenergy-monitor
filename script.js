/* =========================================================
   ECOENERGY MONITOR
   SCRIPT.JS
   ESP32 + PZEM-004T + FIREBASE + RELAY
   ========================================================= */


/* =========================================================
   1. CONFIGURATION
   ========================================================= */

const config = window.ECOENERGY_CONFIG || {};

const firebaseDatabaseUrl =
  (config.firebaseDatabaseUrl || "").replace(/\/$/, "");

const firebaseDevicePath =
  (config.firebaseDevicePath || "devices/esp32-01")
    .replace(/^\/|\/$/g, "");


/* =========================================================
   2. FIREBASE URL
   ========================================================= */

const readingUrl =
  `${firebaseDatabaseUrl}/${firebaseDevicePath}/reading.json`;

const relayUrl =
  `${firebaseDatabaseUrl}/${firebaseDevicePath}/relay.json`;

const lastSeenUrl =
  `${firebaseDatabaseUrl}/${firebaseDevicePath}/lastSeen.json`;


/* =========================================================
   3. LOGIN ACCOUNT
   ========================================================= */

const LOGIN_USERNAME = "zati";

/*
   Masukkan password awak di bawah.
   Contoh:

   const LOGIN_PASSWORD = "password123";
*/

const LOGIN_PASSWORD = "Zatie0768@";


/* =========================================================
   4. ELEMENTS
   ========================================================= */

const sitePage =
  document.getElementById("sitePage");

const authShell =
  document.getElementById("authShell");

const dashboard =
  document.getElementById("dashboard");


/* LOGIN ELEMENT */

const openLogin =
  document.getElementById("openLogin");

const heroLogin =
  document.getElementById("heroLogin");

const backHome =
  document.getElementById("backHome");

const loginForm =
  document.getElementById("loginForm");

const loginUser =
  document.getElementById("loginUser");

const loginPass =
  document.getElementById("loginPass");

const togglePass =
  document.getElementById("togglePass");

const message =
  document.getElementById("message");

const logout =
  document.getElementById("logout");

const userName =
  document.getElementById("userName");


/* =========================================================
   5. HELPER
   ========================================================= */

function safeNumber(value) {

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return number;
}


function formatNumber(value, decimal = 2) {

  return safeNumber(value).toFixed(decimal);
}


/* =========================================================
   6. PAGE CONTROL
   ========================================================= */

function showHome() {

  sitePage.classList.remove("hidden");

  authShell.classList.add("hidden");

  dashboard.classList.add("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function showLoginPage() {

  sitePage.classList.add("hidden");

  dashboard.classList.add("hidden");

  authShell.classList.remove("hidden");

  message.textContent = "";

  loginUser.focus();
}


function showDashboard() {

  sitePage.classList.add("hidden");

  authShell.classList.add("hidden");

  dashboard.classList.remove("hidden");

  userName.textContent = "Zati";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   7. OPEN LOGIN
   ========================================================= */

if (openLogin) {

  openLogin.addEventListener(
    "click",
    showLoginPage
  );
}


if (heroLogin) {

  heroLogin.addEventListener(
    "click",
    showLoginPage
  );
}


/* =========================================================
   8. BACK HOME
   ========================================================= */

if (backHome) {

  backHome.addEventListener(
    "click",
    showHome
  );
}


/* =========================================================
   9. SHOW / HIDE PASSWORD
   ========================================================= */

if (togglePass) {

  togglePass.addEventListener(
    "click",
    function () {

      if (loginPass.type === "password") {

        loginPass.type = "text";

        togglePass.textContent = "Sembunyi";

      } else {

        loginPass.type = "password";

        togglePass.textContent = "Lihat";

      }

    }
  );
}


/* =========================================================
   10. LOGIN
   ========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const username =
        loginUser.value.trim();

      const password =
        loginPass.value;


      if (
        username === LOGIN_USERNAME &&
        password === LOGIN_PASSWORD
      ) {

        message.style.color =
          "#48e08c";

        message.textContent =
          "Login berjaya!";


        /*
          Simpan status login.
          Sesuai untuk demo FYP sahaja.
        */

        localStorage.setItem(
          "ecoenergyLogin",
          "true"
        );


        setTimeout(
          function () {

            showDashboard();

          },
          400
        );

      } else {

        message.style.color =
          "#ff6b7a";

        message.textContent =
          "Username atau password tidak betul.";

      }

    }
  );
}


/* =========================================================
   11. LOGOUT
   ========================================================= */

if (logout) {

  logout.addEventListener(
    "click",
    function () {

      localStorage.removeItem(
        "ecoenergyLogin"
      );

      loginUser.value = "";

      loginPass.value = "";

      showHome();

    }
  );
}


/* =========================================================
   12. FIREBASE GET
   ========================================================= */

async function firebaseGet(url) {

  try {

    const response =
      await fetch(
        url,
        {
          method: "GET",
          cache: "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }


    return await response.json();


  } catch (error) {

    console.error(
      "Firebase GET error:",
      error
    );

    return null;

  }
}


/* =========================================================
   13. FIREBASE PUT
   ========================================================= */

async function firebasePut(
  url,
  value
) {

  try {

    const response =
      await fetch(
        url,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(value)
        }
      );


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }


    return true;


  } catch (error) {

    console.error(
      "Firebase PUT error:",
      error
    );

    return false;

  }
}


/* =========================================================
   14. UPDATE SENSOR DISPLAY
   ========================================================= */

function updateSensorDisplay(data) {

  if (!data) {
    return;
  }


  /*
     Support beberapa nama field
     sekiranya Firebase menggunakan
     voltage / current / power / energy
  */

  const voltage =
    safeNumber(
      data.voltage ??
      data.voltan ??
      0
    );


  const current =
    safeNumber(
      data.current ??
      data.arus ??
      0
    );


  const power =
    safeNumber(
      data.power ??
      data.kuasa ??
      0
    );


  const energy =
    safeNumber(
      data.energy ??
      data.tenaga ??
      0
    );


  /* =======================================================
     LANDING PAGE
     ======================================================= */

  const valVoltage =
    document.getElementById(
      "val-voltage"
    );

  const valCurrent =
    document.getElementById(
      "val-current"
    );

  const valPower =
    document.getElementById(
      "val-power"
    );


  if (valVoltage) {

    valVoltage.textContent =
      `${formatNumber(voltage)} V`;

  }


  if (valCurrent) {

    valCurrent.textContent =
      `${formatNumber(current)} A`;

  }


  if (valPower) {

    valPower.textContent =
      `${formatNumber(power)} W`;

  }


  /* =======================================================
     HERO CONSOLE
     ======================================================= */

  const heroPower =
    document.getElementById(
      "heroPower"
    );

  const heroEnergy =
    document.getElementById(
      "heroEnergy"
    );


  if (heroPower) {

    heroPower.textContent =
      formatNumber(power);

  }


  if (heroEnergy) {

    heroEnergy.textContent =
      `${formatNumber(energy)} kWh`;

  }


  /* =======================================================
     DASHBOARD
     ======================================================= */

  const dashboardVoltage =
    document.getElementById(
      "dashboardVoltage"
    );

  const dashboardCurrent =
    document.getElementById(
      "dashboardCurrent"
    );

  const dashboardPower =
    document.getElementById(
      "dashboardPower"
    );

  const dashboardUsage =
    document.getElementById(
      "dashboardUsage"
    );


  if (dashboardVoltage) {

    dashboardVoltage.textContent =
      `${formatNumber(voltage)} V`;

  }


  if (dashboardCurrent) {

    dashboardCurrent.textContent =
      `${formatNumber(current)} A`;

  }


  if (dashboardPower) {

    dashboardPower.textContent =
      `${formatNumber(power)} W`;

  }


  if (dashboardUsage) {

    dashboardUsage.textContent =
      formatNumber(energy);

  }


  /*
     Masukkan nilai energy semasa
     ke calculator secara automatik.
  */

  const totalKwh =
    document.getElementById(
      "totalKwh"
    );


  if (totalKwh) {

    totalKwh.value =
      formatNumber(energy);

  }


  updateBudgetDisplay(
    energy
  );

}


/* =========================================================
   15. READ SENSOR FROM FIREBASE
   ========================================================= */

async function fetchReading() {

  const data =
    await firebaseGet(
      readingUrl
    );


  if (data) {

    updateSensorDisplay(
      data
    );

  }

}


/* =========================================================
   16. ONLINE / OFFLINE STATUS
   ========================================================= */

function setConnectionStatus(
  online
) {

  const heroStatus =
    document.getElementById(
      "heroConnectionStatus"
    );

  const dashboardStatus =
    document.getElementById(
      "dashboardConnectionStatus"
    );


  if (heroStatus) {

    heroStatus.textContent =
      online
        ? "ESP32 ONLINE"
        : "ESP32 OFFLINE";

  }


  if (dashboardStatus) {

    dashboardStatus.textContent =
      online
        ? "ESP32 ONLINE"
        : "ESP32 OFFLINE";


    if (online) {

      dashboardStatus.style.color =
        "#aef4cc";

      dashboardStatus.style.borderColor =
        "rgba(72,224,140,.3)";

      dashboardStatus.style.background =
        "rgba(72,224,140,.06)";

    } else {

      dashboardStatus.style.color =
        "#ff9aa5";

      dashboardStatus.style.borderColor =
        "rgba(255,107,122,.35)";

      dashboardStatus.style.background =
        "rgba(255,107,122,.07)";

    }

  }


  /*
     Tukar warna pulse.
  */

  document
    .querySelectorAll(".pulse")
    .forEach(
      function (pulse) {

        if (online) {

          pulse.style.background =
            "#48e08c";

          pulse.style.boxShadow =
            "0 0 12px #48e08c";

        } else {

          pulse.style.background =
            "#ff6b7a";

          pulse.style.boxShadow =
            "0 0 12px #ff6b7a";

        }

      }
    );

}


/* =========================================================
   17. CHECK ESP32 HEARTBEAT
   ========================================================= */

async function checkHeartbeat() {

  const lastSeen =
    await firebaseGet(
      lastSeenUrl
    );


  if (
    lastSeen === null ||
    lastSeen === undefined
  ) {

    setConnectionStatus(false);

    return;
  }


  const timestamp =
    Number(lastSeen);


  if (!Number.isFinite(timestamp)) {

    setConnectionStatus(false);

    return;
  }


  const now =
    Date.now();


  const difference =
    now - timestamp;


  /*
     ESP32 heartbeat dihantar setiap
     lebih kurang 5 saat.

     Website anggap ONLINE jika
     lastSeen kurang daripada 20 saat.
  */

  const online =
    difference >= 0 &&
    difference < 20000;


  setConnectionStatus(
    online
  );

}


/* =========================================================
   18. RELAY ELEMENTS
   ========================================================= */

const relayOnButton =
  document.getElementById(
    "relayOn"
  );

const relayOffButton =
  document.getElementById(
    "relayOff"
  );

const relayStatusText =
  document.getElementById(
    "relayStatusText"
  );

const heroRelay =
  document.getElementById(
    "heroRelay"
  );


/* =========================================================
   19. UPDATE RELAY DISPLAY
   ========================================================= */

function updateRelayDisplay(
  state
) {

  const isOn =
    String(state)
      .toLowerCase() === "on";


  if (relayOnButton) {

    relayOnButton.classList.toggle(
      "active",
      isOn
    );

  }


  if (relayOffButton) {

    relayOffButton.classList.toggle(
      "active",
      !isOn
    );

  }


  if (relayStatusText) {

    relayStatusText.textContent =
      isOn
        ? "Relay sedang ON."
        : "Relay sedang OFF.";

  }


  if (heroRelay) {

    heroRelay.textContent =
      isOn
        ? "ON"
        : "OFF";


    heroRelay.style.color =
      isOn
        ? "#48e08c"
        : "#ff6b7a";

  }


  const relayLed =
    document.querySelector(
      ".relay-led"
    );


  if (relayLed) {

    relayLed.style.background =
      isOn
        ? "#48e08c"
        : "#ff6b7a";


    relayLed.style.boxShadow =
      isOn
        ? "0 0 12px #48e08c"
        : "0 0 12px #ff6b7a";

  }

}


/* =========================================================
   20. SEND RELAY COMMAND
   ========================================================= */

async function setRelay(
  state
) {

  const relayState =
    state
      ? "on"
      : "off";


  /*
     Disable button sekejap supaya
     user tidak tekan terlalu banyak.
  */

  if (relayOnButton) {

    relayOnButton.disabled =
      true;

  }


  if (relayOffButton) {

    relayOffButton.disabled =
      true;

  }


  const success =
    await firebasePut(
      relayUrl,
      relayState
    );


  if (success) {

    updateRelayDisplay(
      relayState
    );

  } else {

    alert(
      "Gagal menghantar arahan relay ke Firebase."
    );

  }


  if (relayOnButton) {

    relayOnButton.disabled =
      false;

  }


  if (relayOffButton) {

    relayOffButton.disabled =
      false;

  }

}


/* =========================================================
   21. RELAY ON BUTTON
   ========================================================= */

if (relayOnButton) {

  relayOnButton.addEventListener(
    "click",
    function () {

      setRelay(true);

    }
  );

}


/* =========================================================
   22. RELAY OFF BUTTON
   ========================================================= */

if (relayOffButton) {

  relayOffButton.addEventListener(
    "click",
    function () {

      setRelay(false);

    }
  );

}


/* =========================================================
   23. READ RELAY STATE
   ========================================================= */

async function fetchRelayState() {

  const relayState =
    await firebaseGet(
      relayUrl
    );


  if (
    relayState === null ||
    relayState === undefined
  ) {

    return;
  }


  updateRelayDisplay(
    relayState
  );

}


/* =========================================================
   24. ENERGY COST CALCULATION
   ========================================================= */

function calculateElectricityCost(
  kwh
) {

  let remaining =
    Math.max(
      0,
      safeNumber(kwh)
    );


  let subtotal =
    0;


  const breakdown =
    [];


  /* FIRST 100 kWh */

  const tier1 =
    Math.min(
      remaining,
      100
    );


  if (tier1 > 0) {

    const cost =
      tier1 * 0.218;


    subtotal +=
      cost;


    breakdown.push({
      name:
        "100 kWh pertama",

      kwh:
        tier1,

      rate:
        0.218,

      cost:
        cost
    });


    remaining -=
      tier1;

  }


  /* NEXT 100 kWh */

  const tier2 =
    Math.min(
      remaining,
      100
    );


  if (tier2 > 0) {

    const cost =
      tier2 * 0.334;


    subtotal +=
      cost;


    breakdown.push({
      name:
        "100 kWh seterusnya",

      kwh:
        tier2,

      rate:
        0.334,

      cost:
        cost
    });


    remaining -=
      tier2;

  }


  /* NEXT 300 kWh */

  const tier3 =
    Math.min(
      remaining,
      300
    );


  if (tier3 > 0) {

    const cost =
      tier3 * 0.516;


    subtotal +=
      cost;


    breakdown.push({
      name:
        "300 kWh seterusnya",

      kwh:
        tier3,

      rate:
        0.516,

      cost:
        cost
    });


    remaining -=
      tier3;

  }


  /* ABOVE 500 kWh */

  if (remaining > 0) {

    const cost =
      remaining * 0.546;


    subtotal +=
      cost;


    breakdown.push({
      name:
        "Melebihi 500 kWh",

      kwh:
        remaining,

      rate:
        0.546,

      cost:
        cost
    });

  }


  /*
     KWTBB 1.6%
     Untuk formula prototaip FYP.
  */

  const kwtbb =
    subtotal * 0.016;


  const total =
    subtotal + kwtbb;


  return {

    subtotal:
      subtotal,

    kwtbb:
      kwtbb,

    total:
      total,

    breakdown:
      breakdown

  };

}


/* =========================================================
   25. UPDATE BUDGET DISPLAY
   ========================================================= */

function updateBudgetDisplay(
  energy
) {

  const target =
    300;


  const usage =
    safeNumber(
      energy
    );


  const cost =
    calculateElectricityCost(
      usage
    );


  const percentage =
    Math.min(
      (usage / target) * 100,
      100
    );


  const dashboardBill =
    document.getElementById(
      "dashboardBill"
    );

  const progressBar =
    document.getElementById(
      "budget-progress-bar"
    );

  const progressText =
    document.getElementById(
      "budget-progress-text"
    );

  const dashboardStatus =
    document.getElementById(
      "dashboardStatus"
    );

  const recommendation =
    document.getElementById(
      "smart-recommendation-box"
    );


  if (dashboardBill) {

    dashboardBill.textContent =
      `RM ${cost.total.toFixed(2)}`;

  }


  if (progressBar) {

    progressBar.style.width =
      `${percentage}%`;

  }


  if (progressText) {

    progressText.textContent =
      `${usage.toFixed(2)} kWh daripada ${target} kWh sasaran`;

  }


  /* =======================================================
     SMART STATUS
     ======================================================= */

  if (
    percentage < 70
  ) {

    if (dashboardStatus) {

      dashboardStatus.textContent =
        "NORMAL";

      dashboardStatus.style.color =
        "#8ff0b8";

    }


    if (recommendation) {

      recommendation.textContent =
        "Penggunaan tenaga masih dalam sasaran. Teruskan pemantauan penggunaan elektrik.";

      recommendation.style.borderColor =
        "#48e08c";

    }

  } else if (
    percentage < 90
  ) {

    if (dashboardStatus) {

      dashboardStatus.textContent =
        "PERHATIAN";

      dashboardStatus.style.color =
        "#ffc857";

    }


    if (recommendation) {

      recommendation.textContent =
        "Penggunaan tenaga semakin menghampiri sasaran. Kurangkan penggunaan beban yang tidak diperlukan.";

      recommendation.style.borderColor =
        "#ffc857";

    }

  } else {

    if (dashboardStatus) {

      dashboardStatus.textContent =
        "TINGGI";

      dashboardStatus.style.color =
        "#ff6b7a";

    }


    if (recommendation) {

      recommendation.textContent =
        "Penggunaan tenaga hampir atau telah mencapai sasaran. Pertimbangkan untuk mematikan beban yang tidak diperlukan.";

      recommendation.style.borderColor =
        "#ff6b7a";

    }

  }

}


/* =========================================================
   26. MANUAL BILL CALCULATOR
   ========================================================= */

const calculateUsageButton =
  document.getElementById(
    "calculateUsage"
  );


if (calculateUsageButton) {

  calculateUsageButton.addEventListener(
    "click",
    function () {

      const totalKwhInput =
        document.getElementById(
          "totalKwh"
        );


      const billingDaysInput =
        document.getElementById(
          "billingDays"
        );


      const kwh =
        safeNumber(
          totalKwhInput.value
        );


      const days =
        Math.max(
          1,
          safeNumber(
            billingDaysInput.value
          )
        );


      /*
         Scale kepada 30 hari.

         Contoh:
         10 kWh dalam 5 hari
         → anggaran 60 kWh / 30 hari
      */

      const estimatedMonthlyUsage =
        (kwh / days) * 30;


      const result =
        calculateElectricityCost(
          estimatedMonthlyUsage
        );


      /* DISPLAY USAGE */

      const monthlyUsage =
        document.getElementById(
          "monthlyUsage"
        );


      if (monthlyUsage) {

        monthlyUsage.textContent =
          `${estimatedMonthlyUsage.toFixed(2)} kWh`;

      }


      /* DISPLAY TOTAL COST */

      const monthlyCost =
        document.getElementById(
          "monthlyCost"
        );


      if (monthlyCost) {

        monthlyCost.textContent =
          `RM ${result.total.toFixed(2)}`;

      }


      /* DISPLAY KWTBB */

      const kwtbbCost =
        document.getElementById(
          "kwtbbCost"
        );


      if (kwtbbCost) {

        kwtbbCost.textContent =
          `RM ${result.kwtbb.toFixed(2)}`;

      }


      /* TARIFF BREAKDOWN */

      const tariffBreakdown =
        document.getElementById(
          "tariffBreakdown"
        );


      if (tariffBreakdown) {

        tariffBreakdown.innerHTML =
          "";


        result.breakdown.forEach(
          function (item) {

            const row =
              document.createElement(
                "p"
              );


            row.innerHTML =
              `${item.name}: ` +
              `<strong>` +
              `${item.kwh.toFixed(2)} kWh × ` +
              `RM ${item.rate.toFixed(3)} = ` +
              `RM ${item.cost.toFixed(2)}` +
              `</strong>`;


            tariffBreakdown.appendChild(
              row
            );

          }
        );

      }

    }
  );

}


/* =========================================================
   27. SYSTEM STATUS
   ========================================================= */

function updateSystemStatus() {

  const systemStatus =
    document.getElementById(
      "system-status-text"
    );


  if (!systemStatus) {
    return;
  }


  systemStatus.textContent =
    "NORMAL";

  systemStatus.style.color =
    "#48e08c";

}


/* =========================================================
   28. INITIAL LOAD
   ========================================================= */

async function initialLoad() {

  console.log(
    "EcoEnergy Monitor starting..."
  );


  console.log(
    "Reading URL:",
    readingUrl
  );


  console.log(
    "Relay URL:",
    relayUrl
  );


  console.log(
    "Heartbeat URL:",
    lastSeenUrl
  );


  updateSystemStatus();


  await Promise.all([
    fetchReading(),
    fetchRelayState(),
    checkHeartbeat()
  ]);


  console.log(
    "EcoEnergy Monitor ready."
  );

}


/* =========================================================
   29. AUTO REFRESH
   ========================================================= */

/*
   Sensor reading:
   setiap 5 saat
*/

setInterval(
  fetchReading,
  5000
);


/*
   ESP32 online/offline:
   setiap 5 saat
*/

setInterval(
  checkHeartbeat,
  5000
);


/*
   Relay:
   setiap 3 saat
*/

setInterval(
  fetchRelayState,
  3000
);


/* =========================================================
   30. START APPLICATION
   ========================================================= */

initialLoad();
