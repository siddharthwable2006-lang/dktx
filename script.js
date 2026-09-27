/* =========================================================
   SMART POLE COMMAND CENTER
   Dashboard Controller
   ========================================================= */


/* =========================================================
   1. APPLICATION STATE
   ========================================================= */

const appState = {

    demoMode: true,

    esp32Connected: true,

    updateInterval: 3000,

    selectedSite: "Industrial Site A",

    poles: [

        {
            poleId: "POL-001",
            status: "online",
            tilt: 1.8,
            sag: 12.4,
            leakage: 0.06,
            battery: 92,
            health: 98
        },

        {
            poleId: "POL-002",
            status: "online",
            tilt: 2.1,
            sag: 14.2,
            leakage: 0.08,
            battery: 87,
            health: 96
        },

        {
            poleId: "POL-003",
            status: "warning",
            tilt: 4.7,
            sag: 18.6,
            leakage: 0.13,
            battery: 79,
            health: 84
        },

        {
            poleId: "POL-004",
            status: "online",
            tilt: 1.3,
            sag: 11.8,
            leakage: 0.05,
            battery: 94,
            health: 99
        },

        {
            poleId: "POL-005",
            status: "online",
            tilt: 2.4,
            sag: 13.1,
            leakage: 0.07,
            battery: 81,
            health: 95
        },

        {
            poleId: "POL-006",
            status: "online",
            tilt: 1.9,
            sag: 12.7,
            leakage: 0.05,
            battery: 89,
            health: 97
        },

        {
            poleId: "POL-007",
            status: "online",
            tilt: 2.0,
            sag: 13.8,
            leakage: 0.06,
            battery: 84,
            health: 96
        },

        {
            poleId: "POL-008",
            status: "offline",
            tilt: 0,
            sag: 0,
            leakage: 0,
            battery: 61,
            health: 55
        },

        {
            poleId: "POL-009",
            status: "online",
            tilt: 1.6,
            sag: 12.1,
            leakage: 0.04,
            battery: 91,
            health: 98
        },

        {
            poleId: "POL-010",
            status: "online",
            tilt: 2.8,
            sag: 15.4,
            leakage: 0.09,
            battery: 76,
            health: 91
        },

        {
            poleId: "POL-011",
            status: "online",
            tilt: 1.5,
            sag: 11.9,
            leakage: 0.05,
            battery: 93,
            health: 99
        },

        {
            poleId: "POL-012",
            status: "online",
            tilt: 2.2,
            sag: 13.5,
            leakage: 0.07,
            battery: 86,
            health: 96
        }

    ],

    energy: {

        solarPower: 142,

        dcLoad: 78,

        batterySOC: 82,

        batteryVoltage: 12.7,

        batteryCurrent: 2.4,

        todaySolar: 4.82,

        todayLoad: 3.16

    }

};


/* =========================================================
   2. DOM HELPERS
   ========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);


/* =========================================================
   3. CLOCK
   ========================================================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString(
        "en-IN",
        {
            hour12: false
        }
    );

    const date = now.toLocaleDateString(
        "en-IN",
        {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

    $("#currentTime").textContent = time;

    $("#currentDate").textContent = date;

}


setInterval(updateClock, 1000);

updateClock();


/* =========================================================
   4. CALCULATE NETWORK STATISTICS
   ========================================================= */

function calculateNetworkStats() {

    const total = appState.poles.length;

    const online = appState.poles.filter(
        pole => pole.status !== "offline"
    ).length;

    const critical = appState.poles.filter(
        pole => pole.health < 70
    ).length;

    const averageHealth =
        appState.poles.reduce(
            (sum, pole) => sum + pole.health,
            0
        ) / total;

    const availability =
        (online / total) * 100;

    return {

        total,

        online,

        critical,

        averageHealth,

        availability

    };

}


/* =========================================================
   5. UPDATE KPI CARDS
   ========================================================= */

function updateKPIs() {

    const stats = calculateNetworkStats();

    $("#totalPoles").textContent =
        stats.total;

    $("#onlinePoles").textContent =
        stats.online;

    $("#criticalPoles").textContent =
        stats.critical;

    $("#availability").textContent =
        `${stats.availability.toFixed(1)}%`;

    $("#availabilityBar").style.width =
        `${stats.availability}%`;

    $("#criticalPercentage").textContent =
        `${((stats.critical / stats.total) * 100).toFixed(1)}%`;

    $("#criticalBar").style.width =
        `${(stats.critical / stats.total) * 100}%`;

    $("#systemHealth").textContent =
        `${stats.averageHealth.toFixed(1)}%`;

    $("#healthBar").style.width =
        `${stats.averageHealth}%`;

    $("#healthRingValue").textContent =
        stats.averageHealth.toFixed(1);

    updateHealthRing(stats.averageHealth);

}


/* =========================================================
   6. HEALTH RING
   ========================================================= */

function updateHealthRing(value) {

    const circumference = 314;

    const offset =
        circumference -
        (value / 100) * circumference;

    const ring =
        document.querySelector(".ring-progress");

    if (ring) {

        ring.style.strokeDashoffset =
            offset;

    }

}


/* =========================================================
   7. RENDER POLE TABLE
   ========================================================= */

function renderPoleTable() {

    const table =
        $("#poleTable");

    table.innerHTML = "";


    appState.poles
        .slice(0, 6)
        .forEach(pole => {

            const row =
                document.createElement("tr");


            let statusText = "Online";

            let statusClass = "online";

            if (pole.status === "warning") {

                statusText = "Warning";

                statusClass = "warning";

            }


            if (pole.status === "offline") {

                statusText = "Offline";

                statusClass = "offline";

            }


            const tiltClass =
                pole.tilt > 4
                    ? "value-danger"
                    : pole.tilt > 3
                        ? "value-warning"
                        : "value-good";


            const sagClass =
                pole.sag > 20
                    ? "value-danger"
                    : pole.sag > 16
                        ? "value-warning"
                        : "value-good";


            const leakageClass =
                pole.leakage > 0.15
                    ? "value-danger"
                    : pole.leakage > 0.10
                        ? "value-warning"
                        : "value-good";


            const healthClass =
                pole.health < 70
                    ? "value-danger"
                    : pole.health < 90
                        ? "value-warning"
                        : "value-good";


            row.innerHTML = `

                <td>

                    <span class="pole-id">
                        ${pole.poleId}
                    </span>

                </td>


                <td>

                    <div class="status-cell">

                        <span
                            class="table-status-dot ${statusClass}"
                        ></span>

                        ${statusText}

                    </div>

                </td>


                <td>

                    <span class="${tiltClass}">
                        ${pole.tilt.toFixed(1)}°
                    </span>

                </td>


                <td>

                    <span class="${sagClass}">
                        ${pole.sag.toFixed(1)}%
                    </span>

                </td>


                <td>

                    <span class="${leakageClass}">
                        ${pole.leakage.toFixed(2)} A
                    </span>

                </td>


                <td>

                    <span class="
                        ${pole.battery < 70
                            ? "value-warning"
                            : "value-good"}
                    ">

                        ${pole.battery}%

                    </span>

                </td>


                <td>

                    <div class="health-cell">

                        <strong
                            class="${healthClass}"
                        >
                            ${pole.health}%
                        </strong>

                        <div class="health-mini-bar">

                            <span
                                style="
                                    width:${pole.health}%
                                "
                            ></span>

                        </div>

                    </div>

                </td>

            `;


            table.appendChild(row);

        });

}


/* =========================================================
   8. RENDER ALERTS
   ========================================================= */

function renderAlerts() {

    const alerts = [

        {
            type: "danger",

            icon: "fa-triangle-exclamation",

            title: "Pole Tilt Threshold Exceeded",

            description:
                "POL-003 detected at 4.7° tilt.",

            time: "2 min ago"

        },

        {
            type: "warning",

            icon: "fa-wave-square",

            title: "Conductor Sag Warning",

            description:
                "POL-003 sag measured at 18.6%.",

            time: "6 min ago"

        },

        {
            type: "info",

            icon: "fa-wifi",

            title: "Pole Communication Lost",

            description:
                "POL-008 is currently offline.",

            time: "11 min ago"

        }

    ];


    const container =
        $("#alertsList");


    container.innerHTML = "";


    alerts.forEach(alert => {

        const element =
            document.createElement("div");

        element.className =
            "alert-item";


        element.innerHTML = `

            <div class="
                alert-icon
                ${alert.type}
            ">

                <i class="
                    fa-solid
                    ${alert.icon}
                "></i>

            </div>


            <div class="alert-content">

                <strong>
                    ${alert.title}
                </strong>

                <span>
                    ${alert.description}
                </span>

            </div>


            <span class="alert-time">
                ${alert.time}
            </span>

        `;


        container.appendChild(element);

    });

}


/* =========================================================
   9. ENERGY SYSTEM
   ========================================================= */

function updateEnergySystem() {

    const energy =
        appState.energy;


    $("#solarPower").textContent =
        Math.round(energy.solarPower);


    $("#dcLoad").textContent =
        Math.round(energy.dcLoad);


    $("#batterySOC").textContent =
        `${Math.round(energy.batterySOC)}%`;


    $("#batterySOCText").textContent =
        `${Math.round(energy.batterySOC)}%`;


    $("#batteryVoltage").textContent =
        `${energy.batteryVoltage.toFixed(1)} V`;


    $("#batteryCurrent").textContent =
        `${energy.batteryCurrent.toFixed(1)} A`;


    $("#todaySolar").textContent =
        `${energy.todaySolar.toFixed(2)} kWh`;


    $("#todayLoad").textContent =
        `${energy.todayLoad.toFixed(2)} kWh`;


    $("#batteryLevel").style.height =
        `${energy.batterySOC}%`;


    const batteryStatus =
        energy.solarPower > energy.dcLoad
            ? "Charging"
            : "Discharging";


    $("#batteryStatus").textContent =
        batteryStatus;


    $("#batteryStatus").className =
        batteryStatus === "Charging"
            ? "green-text"
            : "value-warning";

}


/* =========================================================
   10. DEMO TELEMETRY
   ========================================================= */

function simulateTelemetry() {

    if (!appState.demoMode) {

        return;

    }


    /* Solar variation */

    const solarVariation =
        (Math.random() - 0.5) * 12;


    appState.energy.solarPower =
        Math.max(
            80,
            Math.min(
                190,
                appState.energy.solarPower +
                solarVariation
            )
        );


    /* Load variation */

    const loadVariation =
        (Math.random() - 0.5) * 6;


    appState.energy.dcLoad =
        Math.max(
            55,
            Math.min(
                110,
                appState.energy.dcLoad +
                loadVariation
            )
        );


    /* Battery behavior */

    if (
        appState.energy.solarPower >
        appState.energy.dcLoad
    ) {

        appState.energy.batterySOC += 0.15;

        appState.energy.batteryCurrent =
            2 +
            Math.random() * 0.8;

    } else {

        appState.energy.batterySOC -= 0.08;

        appState.energy.batteryCurrent =
            -(1.2 + Math.random() * 0.8);

    }


    appState.energy.batterySOC =
        Math.max(
            20,
            Math.min(
                100,
                appState.energy.batterySOC
            )
        );


    /* Battery voltage */

    appState.energy.batteryVoltage =
        12.1 +
        (
            appState.energy.batterySOC / 100
        ) * 0.8;


    /* Small pole variations */

    appState.poles.forEach(
        pole => {

            if (pole.status === "offline") {

                return;

            }


            const tiltChange =
                (Math.random() - 0.5) * 0.12;


            const sagChange =
                (Math.random() - 0.5) * 0.4;


            const leakageChange =
                (Math.random() - 0.5) * 0.01;


            pole.tilt =
                Math.max(
                    0.5,
                    pole.tilt + tiltChange
                );


            pole.sag =
                Math.max(
                    8,
                    pole.sag + sagChange
                );


            pole.leakage =
                Math.max(
                    0.01,
                    pole.leakage + leakageChange
                );


            /* Recalculate health */

            let health = 100;


            if (pole.tilt > 3) {

                health -= 8;

            }


            if (pole.sag > 16) {

                health -= 7;

            }


            if (pole.leakage > 0.1) {

                health -= 5;

            }


            health +=
                (Math.random() - 0.5) * 2;


            pole.health =
                Math.round(
                    Math.max(
                        50,
                        Math.min(
                            100,
                            health
                        )
                    )
                );

        }
    );

}


/* =========================================================
   11. LAST UPDATE
   ========================================================= */

function updateLastUpdate() {

    const now =
        new Date();

    const time =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour12: false
            }
        );


    $("#lastUpdate").textContent =
        time;

}


/* =========================================================
   12. ESP32 DATA API
   ========================================================= */

/*
    When your ESP32 is ready, set:

    appState.demoMode = false;

    and change:

    ESP32_ENDPOINT

    Example:

    http://192.168.4.1/data

*/


const ESP32_ENDPOINT =
    "http://192.168.4.1/data";


async function fetchESP32Data() {

    if (appState.demoMode) {

        return;

    }


    try {

        const response =
            await fetch(
                ESP32_ENDPOINT,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    },

                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        processESP32Data(data);


        setESP32Connection(true);


    } catch (error) {

        console.error(
            "ESP32 connection error:",
            error
        );


        setESP32Connection(false);

    }

}


/* =========================================================
   13. PROCESS ESP32 DATA
   ========================================================= */

function processESP32Data(data) {

    /*
        Expected ESP32 payload:

        {
            "deviceId": "ESP32-001",

            "poles": [

                {
                    "poleId": "POL-001",
                    "tilt": 1.5,
                    "sag": 12.2,
                    "leakage": 0.05,
                    "battery": 87,
                    "health": 96
                }

            ],

            "energy": {

                "solarPower": 150,
                "dcLoad": 80,
                "batterySOC": 87,
                "batteryVoltage": 12.7,
                "batteryCurrent": 2.5

            }

        }
    */


    if (Array.isArray(data.poles)) {

        data.poles.forEach(
            incomingPole => {

                const existingPole =
                    appState.poles.find(
                        pole =>
                            pole.poleId ===
                            incomingPole.poleId
                    );


                if (existingPole) {

                    Object.assign(
                        existingPole,
                        incomingPole
                    );

                } else {

                    appState.poles.push(
                        incomingPole
                    );

                }

            }
        );

    }


    if (data.energy) {

        Object.assign(
            appState.energy,
            data.energy
        );

    }


    updateDashboard();

}


/* =========================================================
   14. ESP32 CONNECTION STATUS
   ========================================================= */

function setESP32Connection(connected) {

    appState.esp32Connected =
        connected;


    const status =
        $(".connection-status");


    const dot =
        $(".connection-dot");


    const small =
        status?.querySelector("small");


    if (!status || !dot || !small) {

        return;

    }


    if (connected) {

        dot.style.background =
            "var(--green)";

        dot.style.boxShadow =
            "0 0 9px rgba(34,197,94,0.7)";

        small.textContent =
            "Connected";

        small.style.color =
            "var(--green)";

    } else {

        dot.style.background =
            "var(--red)";

        dot.style.boxShadow =
            "0 0 9px rgba(239,68,68,0.7)";

        small.textContent =
            "Disconnected";

        small.style.color =
            "var(--red)";

    }

}


/* =========================================================
   15. UPDATE COMPLETE DASHBOARD
   ========================================================= */

function updateDashboard() {

    updateKPIs();

    renderPoleTable();

    renderAlerts();

    updateEnergySystem();

    updateLastUpdate();

}


/* =========================================================
   16. FULLSCREEN
   ========================================================= */

function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement
            .requestFullscreen()
            .catch(
                error =>
                    console.log(
                        "Fullscreen error:",
                        error
                    )
            );

    } else {

        document.exitFullscreen();

    }

}


$("#fullscreenBtn")
    ?.addEventListener(
        "click",
        toggleFullscreen
    );


/* =========================================================
   17. MOBILE SIDEBAR
   ========================================================= */

const mobileMenu =
    $(".mobile-menu");


mobileMenu?.addEventListener(
    "click",
    () => {

        $(".sidebar")
            .classList
            .toggle("mobile-open");

    }
);


/* =========================================================
   18. NAVIGATION INTERACTION
   ========================================================= */

$$(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            event => {

                event.preventDefault();


                $$(".nav-item")
                    .forEach(
                        nav =>
                            nav.classList
                                .remove("active")
                    );


                item.classList
                    .add("active");


                const pageName =
                    item
                        .querySelector("span:last-child")
                        ?.textContent;


                if (
                    pageName &&
                    pageName !== "Overview"
                ) {

                    showToast(
                        `${pageName} module selected`,
                        "This module will be connected in the next tab."
                    );

                }

            }
        );

    });


/* =========================================================
   19. TOAST
   ========================================================= */

let toastTimeout;


function showToast(
    title,
    message
) {

    const toast =
        $("#toast");


    const titleElement =
        toast.querySelector("strong");


    const messageElement =
        toast.querySelector("span");


    titleElement.textContent =
        title;


    messageElement.textContent =
        message;


    toast.classList
        .add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(
            () => {

                toast.classList
                    .remove("show");

            },
            3000
        );

}


/* =========================================================
   20. SITE SELECTOR
   ========================================================= */

$(".site-selector")
    ?.addEventListener(
        "click",
        () => {

            showToast(
                "Site Selector",
                "Industrial Site A is currently active."
            );

        }
    );


/* =========================================================
   21. ALERT BUTTON
   ========================================================= */

$(".alerts-button")
    ?.addEventListener(
        "click",
        () => {

            showToast(
                "Alert Center",
                "Opening active system events."
            );

        }
    );


/* =========================================================
   22. VIEW REGISTRY
   ========================================================= */

$(".view-all")
    ?.addEventListener(
        "click",
        () => {

            showToast(
                "Pole Registry",
                "Pole registry module selected."
            );

        }
    );


/* =========================================================
   23. PANEL ACTION
   ========================================================= */

$(".panel-action")
    ?.addEventListener(
        "click",
        () => {

            showToast(
                "System Health",
                "Health diagnostics are currently active."
            );

        }
    );


/* =========================================================
   24. PERIODIC TELEMETRY
   ========================================================= */

setInterval(
    () => {

        simulateTelemetry();

        updateDashboard();

        fetchESP32Data();

    },
    appState.updateInterval
);


/* =========================================================
   25. INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDashboard();

        setESP32Connection(true);

        console.log(
            "SMART POLE COMMAND CENTER INITIALIZED"
        );

        console.log(
            "Demo Mode:",
            appState.demoMode
        );

        console.log(
            "ESP32 Endpoint:",
            ESP32_ENDPOINT
        );

    }
);
