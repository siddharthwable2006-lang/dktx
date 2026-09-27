/* =========================================================
   VIKRAMA SMART POLE
   TAB 6 — SOLAR & BATTERY ENERGY MANAGEMENT
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const CONFIG = {

    /*
     * Demonstration system values.
     *
     * Replace these with the actual specifications
     * of your solar panel, battery and DC load.
     */

    solarRatedPower: 200,

    batteryCapacityAh: 20,

    batteryNominalVoltage: 12,

    /*
     * Future ESP32 endpoint.
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

        solarPower: 142,

        solarVoltage: 18.4,

        solarCurrent: 7.72,

        batterySoc: 86,

        batteryVoltage: 12.7,

        batteryCurrent: 2.3,

        dcLoad: 78,

        mode: "day",

        batteryState: "CHARGING",

        historySolar: [
            20,
            31,
            48,
            66,
            89,
            111,
            132,
            145,
            150,
            148,
            142,
            142
        ],

        historyBattery: [
            67,
            69,
            71,
            73,
            76,
            78,
            80,
            82,
            83,
            84,
            85,
            86
        ]

    },


    "POL-002": {

        solarPower: 118,

        solarVoltage: 17.9,

        solarCurrent: 6.59,

        batterySoc: 74,

        batteryVoltage: 12.4,

        batteryCurrent: 1.8,

        dcLoad: 72,

        mode: "day",

        batteryState: "CHARGING",

        historySolar: [
            15,
            28,
            39,
            55,
            72,
            89,
            103,
            117,
            124,
            121,
            118,
            118
        ],

        historyBattery: [
            59,
            61,
            63,
            65,
            67,
            68,
            70,
            71,
            72,
            73,
            74,
            74
        ]

    },


    "POL-003": {

        solarPower: 156,

        solarVoltage: 19.1,

        solarCurrent: 8.17,

        batterySoc: 91,

        batteryVoltage: 12.9,

        batteryCurrent: 2.8,

        dcLoad: 81,

        mode: "day",

        batteryState: "CHARGING",

        historySolar: [
            21,
            38,
            56,
            78,
            99,
            118,
            133,
            145,
            153,
            158,
            156,
            156
        ],

        historyBattery: [
            72,
            74,
            77,
            80,
            82,
            84,
            86,
            87,
            89,
            90,
            91,
            91
        ]

    },


    "POL-004": {

        solarPower: 84,

        solarVoltage: 16.8,

        solarCurrent: 5.00,

        batterySoc: 68,

        batteryVoltage: 12.2,

        batteryCurrent: 1.0,

        dcLoad: 76,

        mode: "day",

        batteryState: "CHARGING",

        historySolar: [
            11,
            20,
            31,
            43,
            55,
            67,
            76,
            84,
            86,
            83,
            84,
            84
        ],

        historyBattery: [
            61,
            62,
            63,
            64,
            65,
            65,
            66,
            67,
            67,
            68,
            68,
            68
        ]

    },


    "POL-005": {

        solarPower: 0,

        solarVoltage: 0,

        solarCurrent: 0,

        batterySoc: 52,

        batteryVoltage: 11.9,

        batteryCurrent: 6.3,

        dcLoad: 75,

        mode: "night",

        batteryState: "DISCHARGING",

        historySolar: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],

        historyBattery: [
            67,
            65,
            63,
            61,
            60,
            58,
            57,
            56,
            55,
            54,
            53,
            52
        ]

    },


    "POL-006": {

        solarPower: 132,

        solarVoltage: 18.1,

        solarCurrent: 7.29,

        batterySoc: 81,

        batteryVoltage: 12.6,

        batteryCurrent: 2.0,

        dcLoad: 74,

        mode: "day",

        batteryState: "CHARGING",

        historySolar: [
            18,
            27,
            42,
            61,
            79,
            95,
            112,
            125,
            133,
            135,
            132,
            132
        ],

        historyBattery: [
            63,
            65,
            67,
            70,
            72,
            74,
            76,
            78,
            79,
            80,
            81,
            81
        ]

    }

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const poleSelect =
    document.getElementById("poleSelect");

const operationMode =
    document.getElementById("operationMode");

const solarPower =
    document.getElementById("solarPower");

const batterySoc =
    document.getElementById("batterySoc");

const dcLoad =
    document.getElementById("dcLoad");

const energyMode =
    document.getElementById("energyMode");

const modeDescription =
    document.getElementById("modeDescription");

const modeIcon =
    document.getElementById("modeIcon");

const dayNightBadge =
    document.getElementById("dayNightBadge");

const flowSolar =
    document.getElementById("flowSolar");

const flowLoad =
    document.getElementById("flowLoad");

const flowBattery =
    document.getElementById("flowBattery");

const batteryFlowText =
    document.getElementById("batteryFlowText");

const batteryFill =
    document.getElementById("batteryFill");

const batteryVisualPercent =
    document.getElementById("batteryVisualPercent");

const batteryStatus =
    document.getElementById("batteryStatus");

const largeBatteryFill =
    document.getElementById("largeBatteryFill");

const largeBatteryPercent =
    document.getElementById("largeBatteryPercent");

const batteryVoltage =
    document.getElementById("batteryVoltage");

const batteryCurrent =
    document.getElementById("batteryCurrent");

const batteryPower =
    document.getElementById("batteryPower");

const chargeState =
    document.getElementById("chargeState");

const solarMainValue =
    document.getElementById("solarMainValue");

const solarVoltage =
    document.getElementById("solarVoltage");

const solarCurrent =
    document.getElementById("solarCurrent");

const generationState =
    document.getElementById("generationState");

const solarBarFill =
    document.getElementById("solarBarFill");

const solarChart =
    document.getElementById("solarChart");

const batteryChart =
    document.getElementById("batteryChart");

const poleTableBody =
    document.getElementById("poleTableBody");


/* =========================================================
   SELECTOR
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
   BATTERY STATUS
   ========================================================= */

function getBatteryStatus(soc) {

    if (soc >= 40) {

        return {
            key: "healthy",
            label: "HEALTHY"
        };

    }


    if (soc >= 20) {

        return {
            key: "warning",
            label: "LOW"
        };

    }


    return {
        key: "low",
        label: "CRITICAL"
    };

}


/* =========================================================
   ENERGY MODE
   ========================================================= */

function getModeData(pole) {

    if (pole.mode === "night") {

        return {

            label: "BATTERY",

            description:
                "Battery supplying system",

            icon: "☾",

            badge: "☾ NIGHT MODE"

        };

    }


    return {

        label: "SOLAR",

        description:
            "Solar supplying system",

        icon: "☀",

        badge: "☀ DAY MODE"

    };

}


/* =========================================================
   UPDATE MAIN DISPLAY
   ========================================================= */

function updateDisplay(id) {

    const pole =
        poles[id];

    if (!pole) return;


    const mode =
        getModeData(pole);


    const batteryStatusData =
        getBatteryStatus(
            pole.batterySoc
        );


    /*
     * KPI
     */

    solarPower.textContent =
        `${pole.solarPower} W`;

    batterySoc.textContent =
        `${pole.batterySoc}%`;

    dcLoad.textContent =
        `${pole.dcLoad} W`;

    energyMode.textContent =
        mode.label;

    modeDescription.textContent =
        mode.description;

    modeIcon.textContent =
        mode.icon;

    dayNightBadge.textContent =
        mode.badge;


    /*
     * Energy flow
     */

    flowSolar.textContent =
        `${pole.solarPower} W`;

    flowLoad.textContent =
        `${pole.dcLoad} W`;


    if (pole.mode === "night") {

        flowBattery.textContent =
            `-${pole.dcLoad} W`;

        batteryFlowText.textContent =
            "DISCHARGING";

        batteryFlowText.style.color =
            "var(--yellow)";

    }

    else {

        const surplus =
            Math.max(
                0,
                pole.solarPower -
                pole.dcLoad
            );

        flowBattery.textContent =
            `+${surplus} W`;

        batteryFlowText.textContent =
            "CHARGING";

        batteryFlowText.style.color =
            "var(--green)";

    }


    /*
     * Battery visual
     */

    batteryFill.style.width =
        `${pole.batterySoc}%`;

    batteryVisualPercent.textContent =
        `${pole.batterySoc}%`;


    largeBatteryFill.style.width =
        `${pole.batterySoc}%`;

    largeBatteryPercent.textContent =
        `${pole.batterySoc}%`;


    /*
     * Battery information
     */

    batteryStatus.textContent =
        batteryStatusData.label;


    batteryStatus.className =
        `status-badge ${batteryStatusData.key}`;


    batteryVoltage.textContent =
        `${pole.batteryVoltage.toFixed(1)} V`;


    batteryCurrent.textContent =
        `${pole.batteryCurrent.toFixed(1)} A`;


    const calculatedBatteryPower =
        pole.batteryVoltage *
        pole.batteryCurrent;


    batteryPower.textContent =
        `${calculatedBatteryPower.toFixed(1)} W`;


    chargeState.textContent =
        pole.batteryState;


    if (pole.batteryState === "DISCHARGING") {

        chargeState.style.color =
            "var(--yellow)";

    }

    else {

        chargeState.style.color =
            "var(--green)";

    }


    /*
     * Solar information
     */

    solarMainValue.textContent =
        pole.solarPower;


    solarVoltage.textContent =
        `${pole.solarVoltage.toFixed(1)} V`;


    solarCurrent.textContent =
        `${pole.solarCurrent.toFixed(2)} A`;


    if (pole.solarPower > 0) {

        generationState.textContent =
            "ACTIVE";

        generationState.style.color =
            "var(--green)";

    }

    else {

        generationState.textContent =
            "INACTIVE";

        generationState.style.color =
            "var(--muted)";

    }


    /*
     * Solar capacity bar
     */

    const solarPercentage =
        Math.min(
            100,
            (pole.solarPower /
                CONFIG.solarRatedPower) *
                100
        );


    solarBarFill.style.width =
        `${solarPercentage}%`;


    /*
     * Charts
     */

    drawChart(
        solarChart,
        pole.historySolar,
        CONFIG.solarRatedPower,
        "#ffb84d",
        "W"
    );


    drawChart(
        batteryChart,
        pole.historyBattery,
        100,
        "#38e09a",
        "%"
    );


    updateTable();

}


/* =========================================================
   CHART DRAWING
   ========================================================= */

function drawChart(
    svgElement,
    values,
    maxValue,
    lineColor,
    unit
) {

    const width = 900;

    const height = 320;

    const padding = {

        left: 45,

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


    let svg = "";


    /*
     * Grid
     */

    for (let i = 0; i <= 5; i++) {

        const y =
            padding.top +
            (chartHeight / 5) *
            i;


        const value =
            maxValue -
            (maxValue / 5) *
            i;


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
                x="4"
                y="${y + 4}"
                fill="#62748b"
                font-size="10"
            >
                ${Math.round(value)}
            </text>

        `;

    }


    /*
     * Points
     */

    const points =
        values.map((value, index) => {

            const x =
                padding.left +
                (index /
                    (values.length - 1)) *
                chartWidth;


            const y =
                padding.top +
                chartHeight -
                (value / maxValue) *
                chartHeight;


            return `${x},${y}`;

        });


    /*
     * Area
     */

    const polygonPoints =
        `${padding.left},${height - padding.bottom} ` +
        points.join(" ") +
        ` ${width - padding.right},${height - padding.bottom}`;


    svg += `

        <polygon
            points="${polygonPoints}"
            fill="${lineColor}"
            fill-opacity=".06"
        />

    `;


    /*
     * Main line
     */

    svg += `

        <polyline
            points="${points.join(" ")}"
            fill="none"
            stroke="${lineColor}"
            stroke-width="3"
            stroke-linejoin="round"
            stroke-linecap="round"
        />

    `;


    /*
     * Data points
     */

    values.forEach(
        (value, index) => {

            const x =
                padding.left +
                (index /
                    (values.length - 1)) *
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
                    r="3"
                    fill="${lineColor}"
                    stroke="#06111d"
                    stroke-width="2"
                />

            `;

        }
    );


    svgElement.innerHTML =
        svg;

}


/* =========================================================
   POLE TABLE
   ========================================================= */

function updateTable() {

    poleTableBody.innerHTML = "";


    Object.entries(poles).forEach(
        ([id, pole]) => {

            const batteryStatusData =
                getBatteryStatus(
                    pole.batterySoc
                );


            const mode =
                getModeData(pole);


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
                        ${pole.solarPower} W
                    </strong>
                </td>

                <td>
                    <strong>
                        ${pole.batterySoc}%
                    </strong>
                </td>

                <td>
                    ${pole.dcLoad} W
                </td>

                <td>
                    ${mode.label}
                </td>

                <td>
                    ${pole.batteryState}
                </td>

                <td>

                    <span class="
                        table-status
                        ${batteryStatusData.key}
                    ">
                        ${batteryStatusData.label}
                    </span>

                </td>

            `;


            row.style.cursor =
                "pointer";


            row.addEventListener(
                "click",
                () => {

                    poleSelect.value =
                        id;

                    updateDisplay(id);

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );


            poleTableBody.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   SIMULATION
   ========================================================= */

function simulateReading() {

    const id =
        poleSelect.value;


    const pole =
        poles[id];


    if (!pole) return;


    /*
     * If current mode is night,
     * simulate battery discharge.
     */

    if (pole.mode === "night") {

        pole.solarPower = 0;

        pole.solarVoltage = 0;

        pole.solarCurrent = 0;

        pole.batterySoc -=
            Math.random() * 1.5;

        pole.batteryCurrent =
            5.5 +
            Math.random() * 1.5;

        pole.batteryState =
            "DISCHARGING";

    }

    else {

        /*
         * Simulate sunlight variation
         */

        const change =
            (Math.random() - .5) *
            20;


        pole.solarPower =
            Math.max(
                0,
                Math.min(
                    CONFIG.solarRatedPower,
                    pole.solarPower +
                    change
                )
            );


        pole.solarPower =
            Number(
                pole.solarPower.toFixed(0)
            );


        pole.solarVoltage =
            Number(
                (
                    17 +
                    Math.random() * 2
                ).toFixed(1)
            );


        pole.solarCurrent =
            Number(
                (
                    pole.solarPower /
                    pole.solarVoltage
                ).toFixed(2)
            );


        /*
         * Battery charges when
         * solar exceeds the load.
         */

        if (
            pole.solarPower >
            pole.dcLoad
        ) {

            pole.batterySoc +=
                Math.random() * .8;

            pole.batteryState =
                "CHARGING";

            pole.batteryCurrent =
                1.5 +
                Math.random() * 2;

        }

    }


    /*
     * Keep SOC within bounds
     */

    pole.batterySoc =
        Math.max(
            0,
            Math.min(
                100,
                pole.batterySoc
            )
        );


    pole.batterySoc =
        Number(
            pole.batterySoc.toFixed(1)
        );


    /*
     * Add chart values
     */

    pole.historySolar.push(
        pole.solarPower
    );


    pole.historyBattery.push(
        pole.batterySoc
    );


    if (
        pole.historySolar.length >
        12
    ) {

        pole.historySolar.shift();

    }


    if (
        pole.historyBattery.length >
        12
    ) {

        pole.historyBattery.shift();

    }


    updateDisplay(id);

}


/* =========================================================
   DAY / NIGHT MODE
   ========================================================= */

operationMode.addEventListener(
    "change",
    function() {

        const id =
            poleSelect.value;

        const pole =
            poles[id];


        if (this.value === "night") {

            pole.mode =
                "night";

            pole.solarPower =
                0;

            pole.solarVoltage =
                0;

            pole.solarCurrent =
                0;

            pole.batteryState =
                "DISCHARGING";

            pole.batteryCurrent =
                6.0;

        }


        else if (this.value === "day") {

            pole.mode =
                "day";

            pole.solarPower =
                142;

            pole.solarVoltage =
                18.4;

            pole.solarCurrent =
                7.72;

            pole.batteryState =
                "CHARGING";

            pole.batteryCurrent =
                2.3;

        }


        else {

            /*
             * Automatic mode
             *
             * Demo implementation assumes daytime.
             */

            pole.mode =
                "day";

            pole.solarPower =
                142;

            pole.solarVoltage =
                18.4;

            pole.solarCurrent =
                7.72;

            pole.batteryState =
                "CHARGING";

        }


        updateDisplay(id);

    }
);


/* =========================================================
   POLE SELECTION
   ========================================================= */

poleSelect.addEventListener(
    "change",
    () => {

        const id =
            poleSelect.value;


        operationMode.value =
            poles[id].mode;


        updateDisplay(id);

    }
);


/* =========================================================
   BUTTONS
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
        () => {

            updateDisplay(
                poleSelect.value
            );

        }
    );


document
    .getElementById("refreshDataBtn")
    .addEventListener(
        "click",
        () => {

            updateDisplay(
                poleSelect.value
            );

        }
    );


/* =========================================================
   FUTURE ESP32 INTEGRATION
   ========================================================= */

async function fetchESP32Data() {

    /*
     * No endpoint = Demo Mode
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
         * Expected payload:
         *
         * {
         *   "poleId": "POL-001",
         *   "solarPower": 145,
         *   "solarVoltage": 18.5,
         *   "solarCurrent": 7.8,
         *   "batterySoc": 86,
         *   "batteryVoltage": 12.7,
         *   "batteryCurrent": 2.3,
         *   "dcLoad": 78,
         *   "mode": "day",
         *   "batteryState": "CHARGING"
         * }
         */


        if (!data.poleId) {

            return;

        }


        if (!poles[data.poleId]) {

            poles[data.poleId] = {

                solarPower: 0,

                solarVoltage: 0,

                solarCurrent: 0,

                batterySoc: 0,

                batteryVoltage: 0,

                batteryCurrent: 0,

                dcLoad: 0,

                mode: "day",

                batteryState: "UNKNOWN",

                historySolar: [],

                historyBattery: []

            };

        }


        const pole =
            poles[data.poleId];


        pole.solarPower =
            Number(
                data.solarPower || 0
            );


        pole.solarVoltage =
            Number(
                data.solarVoltage || 0
            );


        pole.solarCurrent =
            Number(
                data.solarCurrent || 0
            );


        pole.batterySoc =
            Number(
                data.batterySoc || 0
            );


        pole.batteryVoltage =
            Number(
                data.batteryVoltage || 0
            );


        pole.batteryCurrent =
            Number(
                data.batteryCurrent || 0
            );


        pole.dcLoad =
            Number(
                data.dcLoad || 0
            );


        pole.mode =
            data.mode ||
            "day";


        pole.batteryState =
            data.batteryState ||
            "UNKNOWN";


        pole.historySolar.push(
            pole.solarPower
        );


        pole.historyBattery.push(
            pole.batterySoc
        );


        if (
            pole.historySolar.length >
            12
        ) {

            pole.historySolar.shift();

        }


        if (
            pole.historyBattery.length >
            12
        ) {

            pole.historyBattery.shift();

        }


        populatePoleSelector();

        poleSelect.value =
            data.poleId;

        operationMode.value =
            pole.mode;

        updateDisplay(
            data.poleId
        );

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
   INITIALIZATION
   ========================================================= */

function init() {

    populatePoleSelector();

    updateTable();

    poleSelect.value =
        "POL-001";

    operationMode.value =
        poles["POL-001"].mode;

    updateDisplay(
        "POL-001"
    );

    setupNavigation();


    /*
     * Start ESP32 polling only
     * after endpoint is configured.
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