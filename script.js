/* =========================================================
   VIKRAMA SMART POLE DASHBOARD
   JavaScript / Simulated IoT Data
========================================================= */


/* =========================================================
   POLE DATA
========================================================= */

const poles = {

    "POL-001": {
        tilt: 2.4,
        sag: 18.5,
        leakage: 0.08,
        status: "HEALTHY"
    },

    "POL-002": {
        tilt: 3.1,
        sag: 21.4,
        leakage: 0.11,
        status: "HEALTHY"
    },

    "POL-003": {
        tilt: 8.7,
        sag: 39.2,
        leakage: 0.62,
        status: "CRITICAL"
    },

    "POL-004": {
        tilt: 4.3,
        sag: 28.7,
        leakage: 0.17,
        status: "HEALTHY"
    },

    "POL-005": {
        tilt: 6.8,
        sag: 42.5,
        leakage: 0.31,
        status: "WARNING"
    }

};


/* =========================================================
   GLOBAL ENERGY DATA
========================================================= */

let energy = {

    solar: 142,

    battery: 82,

    load: 96,

    voltage: 12.7,

    current: 3.4,

    runtime: 8.6

};


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now = new Date();

    const time =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour12: false
            }
        );

    document.getElementById("clock")
        .textContent = time;

}


setInterval(updateClock, 1000);

updateClock();


/* =========================================================
   SELECT POLE
========================================================= */

function selectPole() {

    const poleId =
        document.getElementById("poleSelect").value;

    const pole =
        poles[poleId];

    document.getElementById("selectedPole")
        .textContent = poleId;


    document.getElementById("tiltValue")
        .textContent =
        pole.tilt.toFixed(1);


    document.getElementById("sagValue")
        .textContent =
        pole.sag.toFixed(1);


    document.getElementById("leakageValue")
        .textContent =
        pole.leakage.toFixed(2);


    /* Progress */

    document.getElementById("tiltProgress")
        .style.width =
        Math.min(
            pole.tilt / 10 * 100,
            100
        ) + "%";


    document.getElementById("sagProgress")
        .style.width =
        Math.min(
            pole.sag / 50 * 100,
            100
        ) + "%";


    document.getElementById("leakageProgress")
        .style.width =
        Math.min(
            pole.leakage / 0.5 * 100,
            100
        ) + "%";


    /* Status */

    const status =
        document.getElementById("poleStatus");


    status.className =
        "status-pill " +
        (
            pole.status === "HEALTHY"
                ? "healthy"
                : "warning"
        );


    status.innerHTML =
        `<span></span>${pole.status}`;


    if (pole.status === "CRITICAL") {

        status.style.color =
            "#ff5d68";

        status.style.background =
            "rgba(255,93,104,.08)";

    }

}


/* =========================================================
   ENERGY UPDATE
========================================================= */

function updateEnergy() {

    /* Simulated solar */

    energy.solar =
        Math.round(
            110 +
            Math.random() * 70
        );


    /* Simulated load */

    energy.load =
        Math.round(
            85 +
            Math.random() * 25
        );


    /* Battery */

    if (energy.solar > energy.load) {

        energy.battery += 0.05;

    } else {

        energy.battery -= 0.03;

    }


    energy.battery =
        Math.max(
            10,
            Math.min(
                100,
                energy.battery
            )
        );


    energy.voltage =
        12.2 +
        energy.battery / 100;


    energy.current =
        energy.solar / 40;


    energy.runtime =
        energy.battery / 9.5;


    /* UI */

    document.getElementById("solarPower")
        .textContent =
        energy.solar + " W";


    document.getElementById("loadPower")
        .textContent =
        energy.load + " W";


    document.getElementById("batteryPercent")
        .textContent =
        Math.round(energy.battery) + "%";


    document.getElementById("batteryLarge")
        .textContent =
        Math.round(energy.battery) + "%";


    document.getElementById("batteryBar")
        .style.width =
        energy.battery + "%";


    document.getElementById("batteryVoltage")
        .textContent =
        energy.voltage.toFixed(1) + " V";


    document.getElementById("batteryCurrent")
        .textContent =
        energy.current.toFixed(1) + " A";


    document.getElementById("runtime")
        .textContent =
        energy.runtime.toFixed(1) + " hrs";


    document.getElementById("lastUpdate")
        .textContent =
        "Updated just now";

}


/* =========================================================
   DAY / NIGHT MODE
========================================================= */

function updateDayNight() {

    const hour =
        new Date().getHours();


    const mode =
        document.getElementById("dayMode");


    if (hour >= 6 && hour < 18) {

        mode.innerHTML =
            `<i class="fa-solid fa-sun"></i>
             DAY MODE`;

        mode.style.color =
            "#ffad42";

        mode.style.background =
            "rgba(255,173,66,.08)";

    } else {

        mode.innerHTML =
            `<i class="fa-solid fa-moon"></i>
             NIGHT MODE`;

        mode.style.color =
            "#38a8ff";

        mode.style.background =
            "rgba(56,168,255,.08)";

    }

}


updateDayNight();

setInterval(
    updateDayNight,
    60000
);


/* =========================================================
   CHART
========================================================= */

const labels = [
    "10:00",
    "10:10",
    "10:20",
    "10:30",
    "10:40",
    "10:50",
    "11:00",
    "11:10",
    "11:20",
    "11:30",
    "11:40",
    "11:50"
];


const datasets = {

    tilt: [
        2.1,
        2.2,
        2.3,
        2.5,
        2.4,
        2.6,
        2.5,
        2.4,
        2.7,
        2.5,
        2.4,
        2.4
    ],

    sag: [
        17,
        18,
        18.2,
        19,
        18.7,
        19.5,
        18.8,
        19.2,
        18.6,
        18.5,
        18.4,
        18.5
    ],

    leakage: [
        0.06,
        0.07,
        0.08,
        0.07,
        0.09,
        0.08,
        0.09,
        0.08,
        0.07,
        0.08,
        0.08,
        0.08
    ]

};


const ctx =
    document
        .getElementById("sensorChart")
        .getContext("2d");


let sensorChart =
    new Chart(
        ctx,
        {

            type: "line",

            data: {

                labels: labels,

                datasets: [
                    {

                        label: "Pole Tilt",

                        data: datasets.tilt,

                        borderColor: "#38a8ff",

                        backgroundColor:
                            "rgba(56,168,255,0.08)",

                        fill: true,

                        tension: 0.4,

                        pointRadius: 2,

                        pointBackgroundColor:
                            "#38a8ff"

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    x: {

                        grid: {

                            color:
                                "rgba(255,255,255,.04)"

                        },

                        ticks: {

                            color: "#60748b",

                            font: {
                                size: 9
                            }

                        }

                    },

                    y: {

                        grid: {

                            color:
                                "rgba(255,255,255,.04)"

                        },

                        ticks: {

                            color: "#60748b",

                            font: {
                                size: 9
                            }

                        }

                    }

                }

            }

        }
    );


/* =========================================================
   CHANGE CHART
========================================================= */

function changeChart(
    type,
    button
) {

    document
        .querySelectorAll(".chart-tab")
        .forEach(
            tab =>
                tab.classList.remove("active")
        );


    button.classList.add("active");


    let label;

    let data;


    if (type === "tilt") {

        label = "Pole Tilt";

        data = datasets.tilt;

    }


    if (type === "sag") {

        label = "Conductor Sag";

        data = datasets.sag;

    }


    if (type === "leakage") {

        label = "Leakage Current";

        data = datasets.leakage;

    }


    sensorChart.data.datasets[0].label =
        label;


    sensorChart.data.datasets[0].data =
        data;


    sensorChart.update();

}


/* =========================================================
   SIMULATE SENSOR CHANGES
========================================================= */

function simulateSensors() {

    const poleId =
        document.getElementById("poleSelect").value;

    const pole =
        poles[poleId];


    /* Small random changes */

    pole.tilt +=
        (Math.random() - 0.5) * 0.15;

    pole.sag +=
        (Math.random() - 0.5) * 0.8;

    pole.leakage +=
        (Math.random() - 0.5) * 0.015;


    /* Prevent negative */

    pole.tilt =
        Math.max(
            0,
            pole.tilt
        );

    pole.sag =
        Math.max(
            0,
            pole.sag
        );

    pole.leakage =
        Math.max(
            0,
            pole.leakage
        );


    /* Update status */

    if (
        pole.tilt >= 8 ||
        pole.sag >= 45 ||
        pole.leakage >= 0.5
    ) {

        pole.status =
            "CRITICAL";

    }

    else if (
        pole.tilt >= 6 ||
        pole.sag >= 38 ||
        pole.leakage >= 0.3
    ) {

        pole.status =
            "WARNING";

    }

    else {

        pole.status =
            "HEALTHY";

    }


    selectPole();

}


/* =========================================================
   UPDATE POLE COUNTS
========================================================= */

function updatePoleCounts() {

    let healthy = 0;

    let warning = 0;

    let critical = 0;


    Object.values(poles)
        .forEach(
            pole => {

                if (
                    pole.status ===
                    "HEALTHY"
                )
                    healthy++;

                else if (
                    pole.status ===
                    "WARNING"
                )
                    warning++;

                else
                    critical++;

            }
        );


    document.getElementById(
        "healthyPoles"
    ).textContent = healthy;


    document.getElementById(
        "warningPoles"
    ).textContent = warning;


    document.getElementById(
        "criticalPoles"
    ).textContent = critical;


    document.getElementById(
        "alertBadge"
    ).textContent =
        warning + critical;


    document.getElementById(
        "alertCount"
    ).textContent =
        (warning + critical) +
        " Active";

}


/* =========================================================
   THEME
========================================================= */

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(
        item => {

            item.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(
                            ".nav-item"
                        )
                        .forEach(
                            nav =>
                                nav.classList
                                    .remove(
                                        "active"
                                    )
                        );


                    this.classList.add(
                        "active"
                    );

                }
            );

        }
    );


/* =========================================================
   START LIVE SIMULATION
========================================================= */

selectPole();

updateEnergy();

updatePoleCounts();


setInterval(
    () => {

        updateEnergy();

        simulateSensors();

        updatePoleCounts();

    },
    3000
);
