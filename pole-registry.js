/* =========================================================
   SMART POLE
   POLE REGISTRY CONTROLLER
   ========================================================= */


/* =========================================================
   POLE DATABASE
   ========================================================= */

const poles = [

    {
        id: "POL-001",
        location: "Zone A-01",
        esp32: "ESP32-001",
        status: "online",
        tilt: 1.8,
        sag: 12.4,
        leakage: 0.06,
        battery: 92,
        health: 98,
        lastUpdate: "12 sec ago",
        installation: "18 Aug 2026",
        inspection: "08 Sep 2026"
    },

    {
        id: "POL-002",
        location: "Zone A-02",
        esp32: "ESP32-002",
        status: "online",
        tilt: 2.1,
        sag: 14.2,
        leakage: 0.08,
        battery: 87,
        health: 96,
        lastUpdate: "18 sec ago",
        installation: "18 Aug 2026",
        inspection: "08 Sep 2026"
    },

    {
        id: "POL-003",
        location: "Zone A-03",
        esp32: "ESP32-003",
        status: "warning",
        tilt: 4.7,
        sag: 18.6,
        leakage: 0.13,
        battery: 79,
        health: 84,
        lastUpdate: "21 sec ago",
        installation: "19 Aug 2026",
        inspection: "07 Sep 2026"
    },

    {
        id: "POL-004",
        location: "Zone B-01",
        esp32: "ESP32-004",
        status: "online",
        tilt: 1.3,
        sag: 11.8,
        leakage: 0.05,
        battery: 94,
        health: 99,
        lastUpdate: "11 sec ago",
        installation: "19 Aug 2026",
        inspection: "08 Sep 2026"
    },

    {
        id: "POL-005",
        location: "Zone B-02",
        esp32: "ESP32-005",
        status: "online",
        tilt: 2.4,
        sag: 13.1,
        leakage: 0.07,
        battery: 81,
        health: 95,
        lastUpdate: "14 sec ago",
        installation: "20 Aug 2026",
        inspection: "08 Sep 2026"
    },

    {
        id: "POL-006",
        location: "Zone B-03",
        esp32: "ESP32-006",
        status: "online",
        tilt: 1.9,
        sag: 12.7,
        leakage: 0.05,
        battery: 89,
        health: 97,
        lastUpdate: "16 sec ago",
        installation: "20 Aug 2026",
        inspection: "08 Sep 2026"
    },

    {
        id: "POL-007",
        location: "Zone C-01",
        esp32: "ESP32-007",
        status: "online",
        tilt: 2.0,
        sag: 13.8,
        leakage: 0.06,
        battery: 84,
        health: 96,
        lastUpdate: "19 sec ago",
        installation: "21 Aug 2026",
        inspection: "09 Sep 2026"
    },

    {
        id: "POL-008",
        location: "Zone C-02",
        esp32: "ESP32-008",
        status: "offline",
        tilt: 0,
        sag: 0,
        leakage: 0,
        battery: 61,
        health: 55,
        lastUpdate: "11 min ago",
        installation: "21 Aug 2026",
        inspection: "09 Sep 2026"
    },

    {
        id: "POL-009",
        location: "Zone C-03",
        esp32: "ESP32-009",
        status: "online",
        tilt: 1.6,
        sag: 12.1,
        leakage: 0.04,
        battery: 91,
        health: 98,
        lastUpdate: "10 sec ago",
        installation: "22 Aug 2026",
        inspection: "09 Sep 2026"
    },

    {
        id: "POL-010",
        location: "Zone D-01",
        esp32: "ESP32-010",
        status: "online",
        tilt: 2.8,
        sag: 15.4,
        leakage: 0.09,
        battery: 76,
        health: 91,
        lastUpdate: "23 sec ago",
        installation: "22 Aug 2026",
        inspection: "09 Sep 2026"
    },

    {
        id: "POL-011",
        location: "Zone D-02",
        esp32: "ESP32-011",
        status: "online",
        tilt: 1.5,
        sag: 11.9,
        leakage: 0.05,
        battery: 93,
        health: 99,
        lastUpdate: "13 sec ago",
        installation: "23 Aug 2026",
        inspection: "10 Sep 2026"
    },

    {
        id: "POL-012",
        location: "Zone D-03",
        esp32: "ESP32-012",
        status: "online",
        tilt: 2.2,
        sag: 13.5,
        leakage: 0.07,
        battery: 86,
        health: 96,
        lastUpdate: "17 sec ago",
        installation: "23 Aug 2026",
        inspection: "10 Sep 2026"
    }

];


/* =========================================================
   STATE
   ========================================================= */

let currentFilter = "all";

let searchTerm = "";

let selectedPole = null;


/* =========================================================
   DOM
   ========================================================= */

const registryBody =
    document.getElementById("registryBody");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const visibleCount =
    document.getElementById("visibleCount");

const emptyState =
    document.getElementById("emptyState");


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const now = new Date();

    document.getElementById(
        "currentTime"
    ).textContent =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour12: false
            }
        );


    document.getElementById(
        "currentDate"
    ).textContent =
        now.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

}


setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================================================
   STATUS HELPERS
   ========================================================= */

function statusLabel(status) {

    if (status === "online")
        return "Online";

    if (status === "warning")
        return "Warning";

    return "Offline";

}


function valueClass(
    value,
    type
) {

    if (type === "tilt") {

        if (value > 4)
            return "danger";

        if (value > 3)
            return "warning";

        return "good";

    }


    if (type === "sag") {

        if (value > 20)
            return "danger";

        if (value > 16)
            return "warning";

        return "good";

    }


    if (type === "leakage") {

        if (value > 0.15)
            return "danger";

        if (value > 0.10)
            return "warning";

        return "good";

    }


    if (type === "battery") {

        if (value < 60)
            return "danger";

        if (value < 75)
            return "warning";

        return "good";

    }


    if (type === "health") {

        if (value < 70)
            return "danger";

        if (value < 90)
            return "warning";

        return "good";

    }


    return "";

}


/* =========================================================
   FILTER POLES
   ========================================================= */

function getFilteredPoles() {

    let result =
        [...poles];


    if (
        currentFilter !==
        "all"
    ) {

        result =
            result.filter(
                pole =>
                    pole.status ===
                    currentFilter
            );

    }


    if (searchTerm) {

        const term =
            searchTerm.toLowerCase();


        result =
            result.filter(
                pole =>

                    pole.id
                        .toLowerCase()
                        .includes(term)

                    ||

                    pole.location
                        .toLowerCase()
                        .includes(term)

                    ||

                    pole.esp32
                        .toLowerCase()
                        .includes(term)
            );

    }


    const sort =
        sortSelect.value;


    result.sort(
        (a,b) => {

            if (sort === "id") {

                return a.id.localeCompare(
                    b.id
                );

            }


            if (sort === "health") {

                return b.health - a.health;

            }


            if (sort === "battery") {

                return b.battery - a.battery;

            }


            if (sort === "tilt") {

                return b.tilt - a.tilt;

            }


            if (sort === "sag") {

                return b.sag - a.sag;

            }


            return 0;

        }
    );


    return result;

}


/* =========================================================
   RENDER TABLE
   ========================================================= */

function renderTable() {

    const result =
        getFilteredPoles();


    registryBody.innerHTML = "";


    visibleCount.textContent =
        result.length;


    if (result.length === 0) {

        emptyState.classList.add(
            "show"
        );

        return;

    }


    emptyState.classList.remove(
        "show"
    );


    result.forEach(
        pole => {

            const row =
                document.createElement("tr");


            const status =
                statusLabel(
                    pole.status
                );


            row.innerHTML = `

                <td>

                    <div class="pole-main">

                        <div class="pole-avatar">

                            <i class="fa-solid fa-tower-broadcast"></i>

                        </div>


                        <div>

                            <span class="pole-id">
                                ${pole.id}
                            </span>

                            <span class="pole-device">
                                ${pole.esp32}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="location-cell">

                        <i class="fa-solid fa-location-dot"></i>

                        ${pole.location}

                    </div>

                </td>


                <td>

                    <div class="status-cell">

                        <span
                            class="status-dot-table
                            ${pole.status}"
                        ></span>

                        <span
                            class="status-text
                            ${pole.status}"
                        >
                            ${status}
                        </span>

                    </div>

                </td>


                <td>

                    <span class="${valueClass(
                        pole.tilt,
                        "tilt"
                    )}">

                        ${pole.tilt.toFixed(1)}°

                    </span>

                </td>


                <td>

                    <span class="${valueClass(
                        pole.sag,
                        "sag"
                    )}">

                        ${pole.sag.toFixed(1)}%

                    </span>

                </td>


                <td>

                    <span class="${valueClass(
                        pole.leakage,
                        "leakage"
                    )}">

                        ${pole.leakage.toFixed(2)} A

                    </span>

                </td>


                <td>

                    <div class="battery-cell">

                        <div class="battery-mini">

                            <span
                                style="width:${pole.battery}%"
                            ></span>

                        </div>

                        <span class="${valueClass(
                            pole.battery,
                            "battery"
                        )}">

                            ${pole.battery}%

                        </span>

                    </div>

                </td>


                <td>

                    <div class="health-cell">

                        <span class="${valueClass(
                            pole.health,
                            "health"
                        )}">

                            ${pole.health}%

                        </span>


                        <div class="health-mini">

                            <span
                                style="width:${pole.health}%"
                            ></span>

                        </div>

                    </div>

                </td>


                <td>

                    ${pole.lastUpdate}

                </td>


                <td>

                    <button
                        class="action-button"
                        onclick="openPoleDrawer('${pole.id}')"
                        title="View Pole"
                    >

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                    </button>

                </td>

            `;


            registryBody.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   SUMMARY COUNTERS
   ========================================================= */

function updateCounters() {

    const online =
        poles.filter(
            p =>
                p.status ===
                "online"
        ).length;


    const warning =
        poles.filter(
            p =>
                p.status ===
                "warning"
        ).length;


    const offline =
        poles.filter(
            p =>
                p.status ===
                "offline"
        ).length;


    document.getElementById(
        "totalCount"
    ).textContent =
        poles.length;


    document.getElementById(
        "onlineCount"
    ).textContent =
        online;


    document.getElementById(
        "warningCount"
    ).textContent =
        warning;


    document.getElementById(
        "offlineCount"
    ).textContent =
        offline;

}


/* =========================================================
   FILTER BUTTONS
   ========================================================= */

document
    .querySelectorAll(
        ".filter-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter-button"
                        )
                        .forEach(
                            btn =>
                                btn.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter;


                    renderTable();

                }
            );

        }
    );


/* =========================================================
   SEARCH
   ========================================================= */

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value
                .trim();


        renderTable();

    }
);


/* =========================================================
   SORT
   ========================================================= */

sortSelect.addEventListener(
    "change",
    renderTable
);


/* =========================================================
   OPEN DRAWER
   ========================================================= */

function openPoleDrawer(
    poleId
) {

    selectedPole =
        poles.find(
            pole =>
                pole.id ===
                poleId
        );


    if (!selectedPole)
        return;


    updateDrawer(
        selectedPole
    );


    document
        .getElementById(
            "poleDrawer"
        )
        .classList.add(
            "open"
        );


    document
        .getElementById(
            "drawerOverlay"
        )
        .classList.add(
            "open"
        );

}


/* =========================================================
   UPDATE DRAWER
   ========================================================= */

function updateDrawer(
    pole
) {

    document.getElementById(
        "drawerPoleId"
    ).textContent =
        pole.id;


    document.getElementById(
        "drawerStatus"
    ).textContent =
        statusLabel(
            pole.status
        ).toUpperCase();


    document.getElementById(
        "drawerLastUpdate"
    ).textContent =
        `Updated ${pole.lastUpdate}`;


    document.getElementById(
        "drawerHealth"
    ).textContent =
        `${pole.health}%`;


    document.getElementById(
        "drawerLocation"
    ).textContent =
        pole.location;


    document.getElementById(
        "drawerESP32"
    ).textContent =
        pole.esp32;


    document.getElementById(
        "drawerInstall"
    ).textContent =
        pole.installation;


    document.getElementById(
        "drawerInspection"
    ).textContent =
        pole.inspection;


    document.getElementById(
        "drawerTilt"
    ).textContent =
        `${pole.tilt.toFixed(1)}°`;


    document.getElementById(
        "drawerSag"
    ).textContent =
        `${pole.sag.toFixed(1)}%`;


    document.getElementById(
        "drawerLeakage"
    ).textContent =
        `${pole.leakage.toFixed(2)} A`;


    document.getElementById(
        "drawerBattery"
    ).textContent =
        `${pole.battery}%`;


    /* SENSOR PROGRESS */

    const tiltPercentage =
        Math.min(
            100,
            (pole.tilt / 5) * 100
        );


    const sagPercentage =
        Math.min(
            100,
            (pole.sag / 25) * 100
        );


    const leakagePercentage =
        Math.min(
            100,
            (pole.leakage / .2) * 100
        );


    document.getElementById(
        "tiltProgress"
    ).style.width =
        `${tiltPercentage}%`;


    document.getElementById(
        "sagProgress"
    ).style.width =
        `${sagPercentage}%`;


    document.getElementById(
        "leakageProgress"
    ).style.width =
        `${leakagePercentage}%`;


    document.getElementById(
        "batteryProgress"
    ).style.width =
        `${pole.battery}%`;

}


/* =========================================================
   CLOSE DRAWER
   ========================================================= */

function closeDrawer() {

    document
        .getElementById(
            "poleDrawer"
        )
        .classList.remove(
            "open"
        );


    document
        .getElementById(
            "drawerOverlay"
        )
        .classList.remove(
            "open"
        );

}


document
    .getElementById(
        "closeDrawer"
    )
    .addEventListener(
        "click",
        closeDrawer
    );


document
    .getElementById(
        "drawerOverlay"
    )
    .addEventListener(
        "click",
        closeDrawer
    );


/* =========================================================
   ESCAPE CLOSE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeDrawer();

        }

    }
);


/* =========================================================
   SEARCH SHORTCUT
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement.tagName !==
            "INPUT"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* =========================================================
   FULLSCREEN
   ========================================================= */

document
    .getElementById(
        "fullscreenBtn"
    )
    .addEventListener(
        "click",
        () => {

            if (
                !document.fullscreenElement
            ) {

                document.documentElement
                    .requestFullscreen();

            } else {

                document.exitFullscreen();

            }

        }
    );


/* =========================================================
   MOBILE MENU
   ========================================================= */

document
    .getElementById(
        "mobileMenu"
    )
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(
                    ".sidebar"
                )
                .classList
                .toggle(
                    "open"
                );

        }
    );


/* =========================================================
   EXPORT CSV
   ========================================================= */

document
    .getElementById(
        "exportBtn"
    )
    .addEventListener(
        "click",
        exportRegistry
    );


function exportRegistry() {

    let csv =
        "Pole ID,Location,ESP32,Status,Tilt,Sag,Leakage,Battery,Health,Last Update\n";


    poles.forEach(
        pole => {

            csv +=
                `${pole.id},` +
                `${pole.location},` +
                `${pole.esp32},` +
                `${pole.status},` +
                `${pole.tilt},` +
                `${pole.sag},` +
                `${pole.leakage},` +
                `${pole.battery},` +
                `${pole.health},` +
                `${pole.lastUpdate}\n`;

        }
    );


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;

    link.download =
        "smart-pole-registry.csv";


    link.click();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Registry Exported",
        "Pole registry CSV has been generated."
    );

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;


function showToast(
    title,
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    document.getElementById(
        "toastTitle"
    ).textContent =
        title;


    document.getElementById(
        "toastMessage"
    ).textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   LIVE DATA SIMULATION
   ========================================================= */

function simulateLiveData() {

    poles.forEach(
        pole => {

            if (
                pole.status ===
                "offline"
            ) {

                return;

            }


            pole.tilt +=
                (Math.random() - .5) *
                .08;


            pole.sag +=
                (Math.random() - .5) *
                .25;


            pole.leakage +=
                (Math.random() - .5) *
                .004;


            pole.battery +=
                (Math.random() - .5) *
                .25;


            pole.tilt =
                Math.max(
                    .5,
                    Math.min(
                        5,
                        pole.tilt
                    )
                );


            pole.sag =
                Math.max(
                    8,
                    Math.min(
                        24,
                        pole.sag
                    )
                );


            pole.leakage =
                Math.max(
                    .01,
                    Math.min(
                        .2,
                        pole.leakage
                    )
                );


            pole.battery =
                Math.round(
                    Math.max(
                        40,
                        Math.min(
                            100,
                            pole.battery
                        )
                    )
                );


            /* Dynamic health */

            let health = 100;


            if (
                pole.tilt > 3
            )
                health -= 8;


            if (
                pole.sag > 16
            )
                health -= 7;


            if (
                pole.leakage > .1
            )
                health -= 5;


            if (
                pole.battery < 70
            )
                health -= 5;


            pole.health =
                Math.round(
                    Math.max(
                        50,
                        health
                    )
                );


            /* Dynamic warning */

            if (
                pole.health < 85 &&
                pole.status === "online"
            ) {

                pole.status =
                    "warning";

            }


            if (
                pole.health >= 90 &&
                pole.status === "warning"
            ) {

                pole.status =
                    "online";

            }


            pole.lastUpdate =
                `${Math.floor(
                    Math.random() * 15
                ) + 5} sec ago`;

        }
    );


    updateCounters();

    renderTable();


    document.getElementById(
        "syncTime"
    ).textContent =
        "Just now";

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

updateCounters();

renderTable();


/* =========================================================
   RUN LIVE SIMULATION
   ========================================================= */

setInterval(
    simulateLiveData,
    4000
);


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "SMARTGRID POLE REGISTRY INITIALIZED"
);

console.log(
    `Registered poles: ${poles.length}`
);
