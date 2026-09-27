/* =========================================================
   VIKRAMA SMART POLE
   TAB 7 — ALERTS & EVENT CENTER
   ========================================================= */


/* =========================================================
   DEMO EVENT DATABASE
   ========================================================= */

let events = [

    {
        id: "EVT-1005",
        time: "14:28:12",
        age: "2 min ago",
        pole: "POL-005",
        type: "sag",
        severity: "critical",
        title: "Critical Conductor Sag Detected",
        message: "Conductor sag measured at 34.2 cm.",
        value: "34.2 cm",
        sensor: "Ultrasonic",
        status: "active"
    },


    {
        id: "EVT-1004",
        time: "14:24:37",
        age: "6 min ago",
        pole: "POL-004",
        type: "leakage",
        severity: "critical",
        title: "High Leakage Current",
        message: "Leakage current exceeded demonstration threshold.",
        value: "0.36 A",
        sensor: "ACS712",
        status: "active"
    },


    {
        id: "EVT-1003",
        time: "14:17:04",
        age: "14 min ago",
        pole: "POL-003",
        type: "tilt",
        severity: "warning",
        title: "Pole Tilt Warning",
        message: "Pole inclination has increased above configured warning level.",
        value: "4.8°",
        sensor: "MPU6050",
        status: "acknowledged"
    },


    {
        id: "EVT-1002",
        time: "14:11:25",
        age: "20 min ago",
        pole: "POL-002",
        type: "sag",
        severity: "warning",
        title: "Conductor Sag Inspection",
        message: "Conductor sag requires field inspection.",
        value: "24.1 cm",
        sensor: "Ultrasonic",
        status: "active"
    },


    {
        id: "EVT-1001",
        time: "13:58:41",
        age: "33 min ago",
        pole: "POL-005",
        type: "energy",
        severity: "warning",
        title: "Battery SOC Reduced",
        message: "Battery state of charge is below normal operating target.",
        value: "48%",
        sensor: "Battery Monitor",
        status: "active"
    },


    {
        id: "EVT-0999",
        time: "13:42:10",
        age: "50 min ago",
        pole: "POL-001",
        type: "energy",
        severity: "info",
        title: "Battery Charging Started",
        message: "Solar surplus detected and battery charging initiated.",
        value: "+64 W",
        sensor: "Energy Monitor",
        status: "resolved"
    },


    {
        id: "EVT-0998",
        time: "13:31:28",
        age: "1 hr ago",
        pole: "POL-006",
        type: "network",
        severity: "info",
        title: "ESP32 Reconnected",
        message: "ESP32 communication link restored.",
        value: "ONLINE",
        sensor: "ESP32",
        status: "resolved"
    },


    {
        id: "EVT-0997",
        time: "13:17:52",
        age: "1 hr ago",
        pole: "POL-001",
        type: "tilt",
        severity: "warning",
        title: "Pole Tilt Variation",
        message: "Minor change detected in pole inclination.",
        value: "3.2°",
        sensor: "MPU6050",
        status: "acknowledged"
    },


    {
        id: "EVT-0996",
        time: "12:48:19",
        age: "2 hr ago",
        pole: "POL-003",
        type: "sag",
        severity: "info",
        title: "Sag Measurement Updated",
        message: "Conductor measurement returned to normal range.",
        value: "14.8 cm",
        sensor: "Ultrasonic",
        status: "resolved"
    },


    {
        id: "EVT-0995",
        time: "12:25:43",
        age: "2 hr ago",
        pole: "POL-002",
        type: "leakage",
        severity: "info",
        title: "Leakage Returned Normal",
        message: "Leakage current returned to normal monitoring range.",
        value: "0.09 A",
        sensor: "ACS712",
        status: "resolved"
    }

];


/* =========================================================
   DOM
   ========================================================= */

const severityFilter =
    document.getElementById(
        "severityFilter"
    );

const typeFilter =
    document.getElementById(
        "typeFilter"
    );

const poleFilter =
    document.getElementById(
        "poleFilter"
    );

const eventList =
    document.getElementById(
        "eventList"
    );

const eventTableBody =
    document.getElementById(
        "eventTableBody"
    );

const eventCount =
    document.getElementById(
        "eventCount"
    );

const criticalCount =
    document.getElementById(
        "criticalCount"
    );

const warningCount =
    document.getElementById(
        "warningCount"
    );

const infoCount =
    document.getElementById(
        "infoCount"
    );

const unresolvedCount =
    document.getElementById(
        "unresolvedCount"
    );

const healthScore =
    document.getElementById(
        "healthScore"
    );

const healthCritical =
    document.getElementById(
        "healthCritical"
    );

const healthWarning =
    document.getElementById(
        "healthWarning"
    );

const healthRing =
    document.getElementById(
        "healthRing"
    );

const healthStatus =
    document.getElementById(
        "healthStatus"
    );


/* =========================================================
   ICONS
   ========================================================= */

function getEventIcon(type) {

    const icons = {

        tilt: "⌁",

        sag: "⌒",

        leakage: "⚡",

        energy: "☀",

        network: "◉"

    };


    return icons[type] || "!";

}


/* =========================================================
   FILTER EVENTS
   ========================================================= */

function getFilteredEvents() {

    const severity =
        severityFilter.value;

    const type =
        typeFilter.value;

    const pole =
        poleFilter.value;


    return events.filter(
        event => {

            const severityMatch =
                severity === "all" ||
                event.severity === severity;


            const typeMatch =
                type === "all" ||
                event.type === type;


            const poleMatch =
                pole === "all" ||
                event.pole === pole;


            return (
                severityMatch &&
                typeMatch &&
                poleMatch
            );

        }
    );

}


/* =========================================================
   TIMELINE
   ========================================================= */

function renderTimeline() {

    const filtered =
        getFilteredEvents();


    eventList.innerHTML = "";


    filtered.forEach(
        event => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "event-item";


            item.innerHTML = `

                <div class="
                    event-indicator
                    ${event.severity}
                ">

                    ${getEventIcon(event.type)}

                </div>


                <div class="event-main">

                    <strong>
                        ${event.title}
                    </strong>

                    <p>
                        ${event.message}
                    </p>

                    <div class="event-main-meta">

                        <span>
                            ${event.pole}
                        </span>

                        <span>
                            ${event.sensor}
                        </span>

                        <span>
                            ${event.value}
                        </span>

                    </div>

                </div>


                <div class="event-time">
                    ${event.age}
                </div>

            `;


            eventList.appendChild(item);

        }
    );


    eventCount.textContent =
        `${filtered.length} EVENTS`;

}


/* =========================================================
   EVENT TABLE
   ========================================================= */

function renderTable() {

    const filtered =
        getFilteredEvents();


    eventTableBody.innerHTML = "";


    filtered.forEach(
        event => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <span class="event-id">
                        ${event.id}
                    </span>
                </td>

                <td>
                    ${event.time}
                </td>

                <td>
                    ${event.pole}
                </td>

                <td>
                    ${formatType(event.type)}
                </td>

                <td>
                    ${event.message}
                </td>

                <td>

                    <span class="
                        severity-badge
                        ${event.severity}
                    ">

                        ${event.severity.toUpperCase()}

                    </span>

                </td>

                <td>

                    <span class="
                        status-badge-table
                        ${event.status}
                    ">

                        ${event.status.toUpperCase()}

                    </span>

                </td>

                <td>

                    <button
                        class="action-button"
                        onclick="
                            handleEventAction('${event.id}')
                        ">

                        ${event.status === "resolved"
                            ? "View"
                            : "Acknowledge"}

                    </button>

                </td>

            `;


            eventTableBody.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   FORMAT EVENT TYPE
   ========================================================= */

function formatType(type) {

    const names = {

        tilt: "Pole Tilt",

        sag: "Conductor Sag",

        leakage: "Leakage",

        energy: "Energy",

        network: "Network"

    };


    return names[type] || type;

}


/* =========================================================
   UPDATE KPI
   ========================================================= */

function updateKPIs() {

    const critical =
        events.filter(
            e =>
            e.severity === "critical"
        ).length;


    const warning =
        events.filter(
            e =>
            e.severity === "warning"
        ).length;


    const info =
        events.filter(
            e =>
            e.severity === "info"
        ).length;


    const unresolved =
        events.filter(
            e =>
            e.status !== "resolved"
        ).length;


    criticalCount.textContent =
        critical;


    warningCount.textContent =
        warning;


    infoCount.textContent =
        info;


    unresolvedCount.textContent =
        unresolved;


    healthCritical.textContent =
        critical;


    healthWarning.textContent =
        warning;


    /*
     * Demo health score.
     *
     * This is a dashboard visualization,
     * not a certified safety metric.
     */

    let score =
        100 -
        (critical * 9) -
        (warning * 3);


    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    healthScore.textContent =
        score;


    const circumference =
        301.59;


    const offset =
        circumference -
        (score / 100) *
        circumference;


    healthRing.style.strokeDashoffset =
        offset;


    if (critical > 0) {

        healthStatus.textContent =
            "ATTENTION REQUIRED";

        healthStatus.style.color =
            "var(--yellow)";

    }

    else {

        healthStatus.textContent =
            "SYSTEM STABLE";

        healthStatus.style.color =
            "var(--green)";

    }

}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function render() {

    renderTimeline();

    renderTable();

    updateKPIs();

}


/* =========================================================
   EVENT ACTION
   ========================================================= */

function handleEventAction(id) {

    const event =
        events.find(
            e => e.id === id
        );


    if (!event) return;


    if (
        event.status !== "resolved"
    ) {

        event.status =
            "acknowledged";

    }


    render();

}


/* =========================================================
   ACKNOWLEDGE VISIBLE
   ========================================================= */

function acknowledgeVisible() {

    const filtered =
        getFilteredEvents();


    filtered.forEach(
        event => {

            if (
                event.status !== "resolved"
            ) {

                event.status =
                    "acknowledged";

            }

        }
    );


    render();

}


/* =========================================================
   CLEAR RESOLVED
   ========================================================= */

function clearResolved() {

    events =
        events.filter(
            event =>
            event.status !== "resolved"
        );


    render();

}


/* =========================================================
   FOCUS EVENT
   ========================================================= */

function focusEvent(id) {

    const event =
        events.find(
            e => e.id === id
        );


    if (!event) return;


    poleFilter.value =
        event.pole;


    severityFilter.value =
        event.severity;


    typeFilter.value =
        event.type;


    render();


    window.scrollTo({

        top: document
            .querySelector(
                ".event-panel"
            )
            .offsetTop - 30,

        behavior: "smooth"

    });

}


/* =========================================================
   FILTER LISTENERS
   ========================================================= */

severityFilter.addEventListener(
    "change",
    render
);


typeFilter.addEventListener(
    "change",
    render
);


poleFilter.addEventListener(
    "change",
    render
);


/* =========================================================
   BUTTONS
   ========================================================= */

document
    .getElementById("ackAllBtn")
    .addEventListener(
        "click",
        acknowledgeVisible
    );


document
    .getElementById("clearBtn")
    .addEventListener(
        "click",
        clearResolved
    );


document
    .getElementById("refreshBtn")
    .addEventListener(
        "click",
        () => {

            render();

        }
    );


document
    .getElementById("notificationBtn")
    .addEventListener(
        "click",
        () => {

            alert(
                "VIKRAMA Alert Center: " +
                unresolvedCount.textContent +
                " unresolved events."
            );

        }
    );


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
                        .querySelectorAll(
                            ".nav-item"
                        )
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
   DEMO LIVE EVENT
   ========================================================= */

function generateDemoEvent() {

    /*
     * Demo-only event simulation.
     *
     * In the actual ESP32 version,
     * this should be replaced with
     * incoming sensor events.
     */

    const demoEvents = [

        {
            type: "tilt",
            severity: "warning",
            title: "Pole Tilt Variation",
            message: "Pole inclination changed from previous reading.",
            value: "3.7°",
            sensor: "MPU6050"
        },

        {
            type: "sag",
            severity: "warning",
            title: "Sag Measurement Updated",
            message: "Conductor sag requires continued monitoring.",
            value: "21.4 cm",
            sensor: "Ultrasonic"
        },

        {
            type: "leakage",
            severity: "info",
            title: "Leakage Reading Updated",
            message: "Leakage current measurement received.",
            value: "0.08 A",
            sensor: "ACS712"
        },

        {
            type: "network",
            severity: "info",
            title: "ESP32 Heartbeat Received",
            message: "ESP32 node communication confirmed.",
            value: "ONLINE",
            sensor: "ESP32"
        }

    ];


    const source =
        demoEvents[
            Math.floor(
                Math.random() *
                demoEvents.length
            )
        ];


    const poles =
        [
            "POL-001",
            "POL-002",
            "POL-003",
            "POL-004",
            "POL-005",
            "POL-006"
        ];


    const pole =
        poles[
            Math.floor(
                Math.random() *
                poles.length
            )
        ];


    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );


    const newEvent = {

        id:
            "EVT-" +
            (
                1006 +
                events.length
            ),

        time: time,

        age: "just now",

        pole: pole,

        type: source.type,

        severity: source.severity,

        title: source.title,

        message: source.message,

        value: source.value,

        sensor: source.sensor,

        status: "active"

    };


    events.unshift(
        newEvent
    );


    /*
     * Keep demo database manageable.
     */

    if (
        events.length >
        25
    ) {

        events.pop();

    }


    render();

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {

    render();

    setupNavigation();

}


/* =========================================================
   START
   ========================================================= */

init();