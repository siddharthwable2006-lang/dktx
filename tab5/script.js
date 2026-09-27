/* =========================================================
   VIKRAMA SMART POLE
   TAB 5 — LEAKAGE CURRENT MONITORING
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const CONFIG = {

    /*
     * DEMO thresholds
     *
     * These are demonstration values only.
     * Configure them according to the actual electrical
     * system, sensor characteristics and engineering
     * requirements before deployment.
     */

    normalLimit: 0.10,

    warningLimit: 0.30,

    /*
     * Future ESP32 endpoint
     *
     * Example:
     *
     * esp32Endpoint: "http://192.168.4.1/data"
     */

    esp32Endpoint: "",

    pollingInterval: 5000

};


/* =========================================================
   DEMO POLE DATA
   ========================================================= */

const poles = {

    "POL-001": {

        leakage: 0.08,

        analogVoltage: 2.54,

        signal: "Stable",

        history: [
            0.06,
            0.07,
            0.08,
            0.07,
            0.08,
            0.09,
            0.08,
            0.08,
            0.07,
            0.08,
            0.08,
            0.08
        ]

    },


    "POL-002": {

        leakage: 0.13,

        analogVoltage: 2.59,

        signal: "Stable",

        history: [
            0.09,
            0.10,
            0.11,
            0.12,
            0.12,
            0.13,
            0.12,
            0.13,
            0.14,
            0.13,
            0.13,
            0.13
        ]

    },


    "POL-003": {

        leakage: 0.07,

        analogVoltage: 2.52,

        signal: "Stable",

        history: [
            0.05,
            0.06,
            0.06,
            0.07,
            0.06,
            0.07,
            0.08,
            0.07,
            0.07,
            0.06,
            0.07,
            0.07
        ]

    },


    "POL-004": {

        leakage: 0.22,

        analogVoltage: 2.70,

        signal: "Stable",

        history: [
            0.13,
            0.15,
            0.16,
            0.17,
            0.18,
            0.19,
            0.18,
            0.20,
            0.21,
            0.22,
            0.21,
            0.22
        ]

    },


    "POL-005": {

        leakage: 0.36,

        analogVoltage: 2.87,

        signal: "Fluctuating",

        history: [
            0.21,
            0.23,
            0.25,
            0.28,
            0.27,
            0.30,
            0.32,
            0.31,
            0.34,
            0.33,
            0.35,
            0.36
        ]

    },


    "POL-006": {

        leakage: 0.09,

        analogVoltage: 2.55,

        signal: "Stable",

        history: [
            0.07,
            0.08,
            0.08,
            0.09,
            0.08,
            0.09,
            0.09,
            0.08,
            0.09,
            0.08,
            0.09,
            0.09
        ]

    }

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const poleSelect =
    document.getElementById("poleSelect");

const currentValue =
    document.getElementById("currentValue");

const currentPole =
    document.getElementById("currentPole");

const currentStatus =
    document.getElementById("currentStatus");

const statusBadge =
    document.getElementById("statusBadge");

const lastUpdated =
    document.getElementById("lastUpdated");

const analogOutput =
    document.getElementById("analogOutput");

const signalStatus =
    document.getElementById("signalStatus");

const alertStrip =
    document.getElementById("alertStrip");

const alertTitle =
    document.getElementById("alertTitle");

const alertText =
    document.getElementById("alertText");

const trendChart =
    document.getElementById("trendChart");

const poleTableBody =
    document.getElementById("poleTableBody");

const normalCount =
    document.getElementById("normalCount");

const warningCount =
    document.getElementById("warningCount");

const criticalCount =
    document.getElementById("criticalCount");

const totalPoles =
    document.getElementById("totalPoles");


/* =========================================================
   STATUS
   ========================================================= */

function getStatus(current) {

    if (current <= CONFIG.normalLimit) {

        return {
            key: "normal",
            label: "NORMAL"
        };

    }

    if (current <= CONFIG.warningLimit) {

        return {
            key: "warning",
            label: "WARNING"
        };

    }

    return {
        key: "critical",
        label: "CRITICAL"
    };

}


/* =========================================================
   POPULATE POLE SELECT
   ========================================================= */

function populatePoleSelector() {

    poleSelect.innerHTML = "";

    Object.keys(poles).forEach(id => {

        const option =
            document.createElement("option");

        option.value = id;

        option.textContent = id;

        poleSelect.appendChild(option);

    });

}


/* =========================================================
   UPDATE KPI COUNTERS
   ========================================================= */

function updateCounters() {

    let normal = 0;

    let warning = 0;

    let critical = 0;


    Object.values(poles).forEach(pole => {

        const status =
            getStatus(pole.leakage);

        if (status.key === "normal") {
            normal++;
        }

        if (status.key === "warning") {
            warning++;
        }

        if (status.key === "critical") {
            critical++;
        }

    });


    totalPoles.textContent =
        Object.keys(poles).length;

    normalCount.textContent =
        normal;

    warningCount.textContent =
        warning;

    criticalCount.textContent =
        critical;

}


/* =========================================================
   UPDATE MAIN DISPLAY
   ========================================================= */

function updateMainDisplay(id) {

    const pole = poles[id];

    if (!pole) return;


    const status =
        getStatus(pole.leakage);


    currentValue.textContent =
        pole.leakage.toFixed(2);


    currentPole.textContent =
        id;


    currentStatus.textContent =
        status.label.charAt(0) +
        status.label.slice(1).toLowerCase();


    statusBadge.textContent =
        status.label;


    statusBadge.className =
        "status-badge " +
        status.key;


    analogOutput.textContent =
        pole.analogVoltage.toFixed(2) +
        " V";


    signalStatus.textContent =
        pole.signal;


    lastUpdated.textContent =
        "Just now";


    /*
     * Update alert area
     */

    if (status.key === "normal") {

        alertStrip.style.background =
            "rgba(56,224,154,.045)";

        alertStrip.style.borderColor =
            "rgba(56,224,154,.12)";

        alertTitle.textContent =
            "Electrical condition normal";

        alertText.textContent =
            "Leakage current is currently within the configured monitoring range.";

    }


    else if (status.key === "warning") {

        alertStrip.style.background =
            "rgba(247,201,72,.045)";

        alertStrip.style.borderColor =
            "rgba(247,201,72,.16)";

        alertTitle.textContent =
            "Leakage current requires observation";

        alertText.textContent =
            "The measured current has entered the configured warning range.";

    }


    else {

        alertStrip.style.background =
            "rgba(255,92,112,.055)";

        alertStrip.style.borderColor =
            "rgba(255,92,112,.18)";

        alertTitle.textContent =
            "Critical leakage condition detected";

        alertText.textContent =
            "The measured value has exceeded the configured critical threshold. Inspect the associated electrical system.";

    }


    drawChart(pole.history);

}


/* =========================================================
   DRAW SVG CHART
   ========================================================= */

function drawChart(values) {

    const width = 900;

    const height = 320;

    const padding = {

        left: 50,

        right: 20,

        top: 20,

        bottom: 35

    };


    const chartWidth =
        width -
        padding.left -
        padding.right;


    const chartHeight =
        height -
        padding.top -
        padding.bottom;


    const maxValue =
        Math.max(
            CONFIG.warningLimit + 0.10,
            ...values
        );


    let svg = "";


    /*
     * Horizontal grid
     */

    for (let i = 0; i <= 5; i++) {

        const y =
            padding.top +
            (chartHeight / 5) * i;

        const value =
            maxValue -
            (maxValue / 5) * i;


        svg += `

            <line
                x1="${padding.left}"
                y1="${y}"
                x2="${width - padding.right}"
                y2="${y}"
                stroke="rgba(255,255,255,.055)"
                stroke-width="1"
            />

            <text
                x="5"
                y="${y + 4}"
                fill="#62748b"
                font-size="10"
            >
                ${value.toFixed(2)}
            </text>

        `;

    }


    /*
     * Normal range
     */

    const normalY =
        padding.top +
        chartHeight -
        (CONFIG.normalLimit / maxValue) *
        chartHeight;


    svg += `

        <rect
            x="${padding.left}"
            y="${normalY}"
            width="${chartWidth}"
            height="${height - padding.bottom - normalY}"
            fill="rgba(56,224,154,.045)"
        />

    `;


    /*
     * Warning threshold
     */

    const warningY =
        padding.top +
        chartHeight -
        (CONFIG.warningLimit / maxValue) *
        chartHeight;


    svg += `

        <line
            x1="${padding.left}"
            y1="${warningY}"
            x2="${width - padding.right}"
            y2="${warningY}"
            stroke="rgba(247,201,72,.55)"
            stroke-width="1"
            stroke-dasharray="6 5"
        />

        <text
            x="${width - 110}"
            y="${warningY - 7}"
            fill="#f7c948"
            font-size="9"
        >
            Warning
        </text>

    `;


    /*
     * Critical threshold
     */

    const criticalY =
        padding.top +
        chartHeight -
        (CONFIG.warningLimit / maxValue) *
        chartHeight;


    /*
     * Line points
     */

    const points =
        values.map((value, index) => {

            const x =
                padding.left +
                (index / (values.length - 1)) *
                chartWidth;

            const y =
                padding.top +
                chartHeight -
                (value / maxValue) *
                chartHeight;

            return `${x},${y}`;

        });


    const polygonPoints =
        `${padding.left},${height - padding.bottom} ` +
        points.join(" ") +
        ` ${width - padding.right},${height - padding.bottom}`;


    /*
     * Area
     */

    svg += `

        <polygon
            points="${polygonPoints}"
            fill="rgba(37,217,255,.055)"
        />

    `;


    /*
     * Main line
     */

    svg += `

        <polyline
            points="${points.join(" ")}"
            fill="none"
            stroke="#25d9ff"
            stroke-width="3"
            stroke-linejoin="round"
            stroke-linecap="round"
        />

    `;


    /*
     * Data points
     */

    values.forEach((value, index) => {

        const x =
            padding.left +
            (index / (values.length - 1)) *
            chartWidth;

        const y =
            padding.top +
            chartHeight -
            (value / maxValue) *
            chartHeight;


        svg += `

            <circle
                cx="${x}"
                cy="${y}"
                r="3.5"
                fill="#25d9ff"
                stroke="#06111d"
                stroke-width="2"
            />

        `;

    });


    trendChart.innerHTML = svg;

}


/* =========================================================
   TABLE
   ========================================================= */

function updateTable() {

    poleTableBody.innerHTML = "";


    Object.entries(poles).forEach(
        ([id, pole]) => {

            const status =
                getStatus(pole.leakage);


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <span class="pole-id">
                        ${id}
                    </span>
                </td>

                <td>
                    <strong>
                        ${pole.leakage.toFixed(2)} A
                    </strong>
                </td>

                <td>

                    <span class="
                        table-status
                        ${status.key}
                    ">
                        ${status.label}
                    </span>

                </td>

                <td>
                    ACS712
                </td>

                <td>

                    <span class="signal-good">
                        ● ${pole.signal}
                    </span>

                </td>

                <td>
                    Just now
                </td>

            `;


            /*
             * Click table row
             */

            row.addEventListener(
                "click",
                () => {

                    poleSelect.value = id;

                    updateMainDisplay(id);

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );


            row.style.cursor = "pointer";

            poleTableBody.appendChild(row);

        }
    );

}


/* =========================================================
   SIMULATE READING
   ========================================================= */

function simulateReading() {

    const id =
        poleSelect.value;


    const pole =
        poles[id];


    if (!pole) return;


    /*
     * Generate small random change
     */

    const variation =
        (Math.random() - .5) *
        0.035;


    let newValue =
        pole.leakage +
        variation;


    /*
     * Keep demo values in sensible range
     */

    newValue =
        Math.max(
            0.02,
            Math.min(
                0.50,
                newValue
            )
        );


    pole.leakage =
        Number(newValue.toFixed(3));


    /*
     * Update sensor voltage
     */

    pole.analogVoltage =
        Number(
            (
                2.50 +
                pole.leakage *
                1.05
            ).toFixed(2)
        );


    /*
     * Signal state
     */

    if (Math.random() > .85) {

        pole.signal =
            "Fluctuating";

    } else {

        pole.signal =
            "Stable";

    }


    /*
     * Add new history point
     */

    pole.history.push(
        pole.leakage
    );


    if (pole.history.length > 12) {

        pole.history.shift();

    }


    updateMainDisplay(id);

    updateCounters();

    updateTable();

}


/* =========================================================
   REFRESH DATA
   ========================================================= */

function refreshData() {

    updateCounters();

    updateTable();

    updateMainDisplay(
        poleSelect.value
    );

}


/* =========================================================
   FUTURE ESP32 DATA
   ========================================================= */

async function fetchESP32Data() {

    /*
     * If no endpoint has been configured,
     * keep dashboard in demo mode.
     */

    if (!CONFIG.esp32Endpoint) {

        return;

    }


    try {

        const response =
            await fetch(
                CONFIG.esp32Endpoint,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "ESP32 response error"
            );

        }


        const data =
            await response.json();


        /*
         * Expected example:
         *
         * {
         *   "poleId": "POL-001",
         *   "leakage": 0.08,
         *   "analogVoltage": 2.54
         * }
         */


        if (!data.poleId) return;


        if (!poles[data.poleId]) {

            poles[data.poleId] = {

                leakage: 0,

                analogVoltage: 0,

                signal: "Stable",

                history: []

            };

        }


        const pole =
            poles[data.poleId];


        pole.leakage =
            Number(data.leakage || 0);


        pole.analogVoltage =
            Number(
                data.analogVoltage || 0
            );


        pole.signal =
            data.signal ||
            "Stable";


        pole.history.push(
            pole.leakage
        );


        if (pole.history.length > 12) {

            pole.history.shift();

        }


        /*
         * Add pole to selector if required
         */

        populatePoleSelector();


        poleSelect.value =
            data.poleId;


        refreshData();


    }

    catch (error) {

        console.warn(
            "ESP32 connection failed:",
            error
        );

    }

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                function(event) {

                    /*
                     * This standalone page does not
                     * navigate to the other modules yet.
                     */

                    event.preventDefault();

                    document
                        .querySelectorAll(".nav-item")
                        .forEach(
                            nav =>
                            nav.classList.remove(
                                "active"
                            )
                        );


                    this.classList.add(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

document
    .getElementById("simulateBtn")
    .addEventListener(
        "click",
        simulateReading
    );


document
    .getElementById("refreshBtn")
    .addEventListener(
        "click",
        refreshData
    );


document
    .getElementById("refreshDataBtn")
    .addEventListener(
        "click",
        refreshData
    );


poleSelect.addEventListener(
    "change",
    () => {

        updateMainDisplay(
            poleSelect.value
        );

    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {

    populatePoleSelector();

    updateCounters();

    updateTable();

    poleSelect.value =
        "POL-001";

    updateMainDisplay(
        "POL-001"
    );

    setupNavigation();

    /*
     * Poll ESP32 when an endpoint
     * has been configured.
     */

    if (CONFIG.esp32Endpoint) {

        setInterval(
            fetchESP32Data,
            CONFIG.pollingInterval
        );

    }

}


/* =========================================================
   START
   ========================================================= */

init();