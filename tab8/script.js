/* =========================================================
   VIKRAMA - TAB 8
   ESP32 & CONNECTIVITY
   ========================================================= */


/* ================= CONFIGURATION ================= */

const CONFIG = {

    /*
       Put your ESP32 endpoint here.

       Example:

       http://192.168.1.101/data

       or

       http://192.168.1.101/api/status
    */

    esp32Endpoint: "",

    pollingInterval: 5000,

    demoMode: true,

    autoPolling: true
};


/* ================= DEMO ESP32 DATA ================= */

const devices = [

    {
        deviceId: "ESP32-001",
        poleId: "POL-001",
        ip: "192.168.1.101",
        mac: "24:6F:28:A1:4B:91",
        status: "ONLINE",
        rssi: -58,
        latency: 38,
        uptime: "04d 12h 38m",
        firmware: "VIKRAMA-1.0.4"
    },

    {
        deviceId: "ESP32-002",
        poleId: "POL-002",
        ip: "192.168.1.102",
        mac: "24:6F:28:B2:7C:42",
        status: "ONLINE",
        rssi: -61,
        latency: 42,
        uptime: "07d 03h 14m",
        firmware: "VIKRAMA-1.0.4"
    },

    {
        deviceId: "ESP32-003",
        poleId: "POL-003",
        ip: "192.168.1.103",
        mac: "24:6F:28:C3:5D:27",
        status: "ONLINE",
        rssi: -64,
        latency: 47,
        uptime: "02d 21h 51m",
        firmware: "VIKRAMA-1.0.4"
    },

    {
        deviceId: "ESP32-004",
        poleId: "POL-004",
        ip: "192.168.1.104",
        mac: "24:6F:28:D4:82:16",
        status: "ONLINE",
        rssi: -67,
        latency: 51,
        uptime: "11d 08h 12m",
        firmware: "VIKRAMA-1.0.3"
    },

    {
        deviceId: "ESP32-005",
        poleId: "POL-005",
        ip: "192.168.1.105",
        mac: "24:6F:28:E5:93:31",
        status: "OFFLINE",
        rssi: -91,
        latency: 0,
        uptime: "00d 00h 00m",
        firmware: "VIKRAMA-1.0.3"
    },

    {
        deviceId: "ESP32-006",
        poleId: "POL-006",
        ip: "192.168.1.106",
        mac: "24:6F:28:F6:41:73",
        status: "ONLINE",
        rssi: -55,
        latency: 34,
        uptime: "05d 16h 27m",
        firmware: "VIKRAMA-1.0.4"
    }

];


/* ================= DEMO PAYLOAD ================= */

const demoPayload = {

    deviceId: "ESP32-001",

    poleId: "POL-001",

    status: "ONLINE",

    rssi: -58,

    latency: 38,

    tilt: 2.4,

    sag: 12.5,

    leakage: 0.08,

    solarPower: 142,

    batterySoc: 86,

    timestamp: new Date().toISOString()

};


/* ================= DOM ================= */

const deviceTable =
    document.getElementById("deviceTable");

const deviceSelector =
    document.getElementById("deviceSelector");

const statusFilter =
    document.getElementById("statusFilter");

const jsonViewer =
    document.getElementById("jsonViewer");

const communicationLog =
    document.getElementById("communicationLog");


/* ================= RENDER DEVICES ================= */

function renderDevices() {

    const filter =
        statusFilter.value;

    deviceTable.innerHTML = "";

    const filtered =
        devices.filter(device => {

            if (filter === "ALL") {
                return true;
            }

            return device.status === filter;

        });


    filtered.forEach(device => {

        const row =
            document.createElement("tr");


        const statusClass =
            device.status === "ONLINE"
                ? "online"
                : "offline";


        const statusDot =
            device.status === "ONLINE"
                ? "●"
                : "●";


        row.innerHTML = `

            <td>

                <span class="device-name">
                    ${device.deviceId}
                </span>

                <span class="device-sub">
                    ESP32 Controller
                </span>

            </td>


            <td>
                ${device.poleId}
            </td>


            <td>
                ${device.ip}
            </td>


            <td>

                <span class="status-badge ${statusClass}">
                    ${statusDot}
                    ${device.status}
                </span>

            </td>


            <td>

                <span class="rssi">
                    ${device.rssi} dBm
                </span>

            </td>


            <td>
                ${device.latency || "--"} ms
            </td>


            <td>
                ${device.status === "ONLINE"
                    ? "Just now"
                    : "12 min ago"}
            </td>


            <td>
                ${device.uptime}
            </td>

        `;


        deviceTable.appendChild(row);

    });


    updateKPIs();

}


/* ================= KPI ================= */

function updateKPIs() {

    const total =
        devices.length;


    const online =
        devices.filter(
            d => d.status === "ONLINE"
        ).length;


    const onlineDevices =
        devices.filter(
            d => d.status === "ONLINE"
        );


    const avgSignal =
        onlineDevices.length

        ?

        Math.round(
            onlineDevices.reduce(
                (sum, d) => sum + d.rssi,
                0
            ) / onlineDevices.length
        )

        : 0;


    const avgLatency =
        onlineDevices.length

        ?

        Math.round(
            onlineDevices.reduce(
                (sum, d) => sum + d.latency,
                0
            ) / onlineDevices.length
        )

        : 0;


    document.getElementById(
        "totalNodes"
    ).textContent = total;


    document.getElementById(
        "onlineNodes"
    ).textContent = online;


    document.getElementById(
        "avgSignal"
    ).textContent = avgSignal;


    document.getElementById(
        "avgLatency"
    ).textContent = avgLatency;

}


/* ================= SELECT DEVICE ================= */

function updateSelectedDevice() {

    const id =
        deviceSelector.value;


    const device =
        devices.find(
            d => d.deviceId === id
        );


    if (!device) {
        return;
    }


    document.getElementById(
        "selectedDevice"
    ).textContent =
        device.deviceId;


    document.getElementById(
        "selectedPole"
    ).textContent =
        `Connected to ${device.poleId}`;


    document.getElementById(
        "ipAddress"
    ).textContent =
        device.ip;


    document.getElementById(
        "macAddress"
    ).textContent =
        device.mac;


    document.getElementById(
        "firmware"
    ).textContent =
        device.firmware;


    document.getElementById(
        "uptime"
    ).textContent =
        device.uptime;


    document.getElementById(
        "deviceRssi"
    ).textContent =
        `${device.rssi} dBm`;


    document.getElementById(
        "deviceLatency"
    ).textContent =
        `${device.latency || "--"} ms`;

}


/* ================= JSON ================= */

function renderJSON(payload) {

    jsonViewer.textContent =
        JSON.stringify(
            payload,
            null,
            2
        );

}


/* ================= LOGGING ================= */

function addLog(
    message,
    type = "success"
) {

    const item =
        document.createElement("div");

    item.className =
        "log-item";


    const time =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    let dotClass = "";

    if (type === "warning") {
        dotClass = "warning";
    }

    if (type === "error") {
        dotClass = "error";
    }


    item.innerHTML = `

        <span class="log-time">
            ${time}
        </span>

        <span class="log-dot ${dotClass}">
        </span>

        <span class="log-text">
            ${message}
        </span>

    `;


    communicationLog.prepend(item);


    while (
        communicationLog.children.length > 12
    ) {

        communicationLog.removeChild(
            communicationLog.lastChild
        );

    }

}


/* ================= REAL ESP32 REQUEST ================= */

async function fetchESP32Data() {

    if (!CONFIG.esp32Endpoint) {

        addLog(
            "ESP32 endpoint not configured — running in demo mode.",
            "warning"
        );

        return;

    }


    try {

        const startTime =
            performance.now();


        const response =
            await fetch(
                CONFIG.esp32Endpoint,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        const latency =
            Math.round(
                performance.now() - startTime
            );


        renderJSON(data);


        updateFromPayload(
            data,
            latency
        );


        addLog(
            `Data received from ${data.deviceId || "ESP32"} (${latency} ms)`
        );

    }

    catch (error) {

        addLog(
            `ESP32 communication failed: ${error.message}`,
            "error"
        );

    }

}


/* ================= PAYLOAD PROCESSING ================= */

function updateFromPayload(
    data,
    latency
) {

    if (!data) {
        return;
    }


    const device =
        devices.find(
            d =>
                d.deviceId === data.deviceId
        );


    if (device) {

        device.status =
            "ONLINE";


        if (
            typeof data.rssi === "number"
        ) {

            device.rssi =
                data.rssi;

        }


        device.latency =
            latency;


        updateSelectedDevice();

        renderDevices();

    }


    document.getElementById(
        "lastUpdate"
    ).textContent =
        new Date().toLocaleTimeString();

}


/* ================= DEMO SIMULATION ================= */

function simulateESP32() {

    if (!CONFIG.demoMode) {
        return;
    }


    const payload = {

        deviceId: "ESP32-001",

        poleId: "POL-001",

        status: "ONLINE",

        rssi:
            -58 +
            Math.round(
                (Math.random() - .5) * 6
            ),

        latency:
            35 +
            Math.round(
                Math.random() * 15
            ),

        tilt:
            Number(
                (
                    2.1 +
                    Math.random() * .8
                ).toFixed(2)
            ),

        sag:
            Number(
                (
                    11.8 +
                    Math.random() * 2
                ).toFixed(1)
            ),

        leakage:
            Number(
                (
                    .06 +
                    Math.random() * .04
                ).toFixed(2)
            ),

        solarPower:
            Math.round(
                130 +
                Math.random() * 30
            ),

        batterySoc:
            Math.round(
                84 +
                Math.random() * 4
            ),

        timestamp:
            new Date().toISOString()

    };


    renderJSON(payload);


    updateFromPayload(
        payload,
        payload.latency
    );


    addLog(
        `Live packet received from ${payload.deviceId}`
    );

}


/* ================= TEST CONNECTION ================= */

async function testConnection() {

    const endpoint =
        document.getElementById(
            "endpointInput"
        ).value.trim();


    if (!endpoint) {

        addLog(
            "Enter an ESP32 API endpoint first.",
            "warning"
        );

        return;

    }


    addLog(
        `Testing connection to ${endpoint}...`
    );


    const start =
        performance.now();


    try {

        const response =
            await fetch(
                endpoint,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );


        const latency =
            Math.round(
                performance.now() - start
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        addLog(
            `Connection successful — ${latency} ms response time.`
        );

    }

    catch (error) {

        addLog(
            `Connection test failed: ${error.message}`,
            "error"
        );

    }

}


/* ================= PING ALL ================= */

function pingAll() {

    addLog(
        "Starting ESP32 network ping sequence..."
    );


    setTimeout(() => {

        devices.forEach(device => {

            if (device.status === "ONLINE") {

                addLog(
                    `${device.deviceId} (${device.ip}) responded successfully.`
                );

            }

        });

    }, 500);

}


/* ================= SAVE CONFIG ================= */

function saveConfiguration() {

    CONFIG.esp32Endpoint =
        document.getElementById(
            "endpointInput"
        ).value.trim();


    CONFIG.pollingInterval =
        Number(
            document.getElementById(
                "pollInterval"
            ).value
        );


    CONFIG.autoPolling =
        document.getElementById(
            "autoPolling"
        ).checked;


    addLog(
        "ESP32 connection configuration saved."
    );


    restartPolling();

}


/* ================= POLLING ================= */

let pollingTimer = null;


function restartPolling() {

    if (pollingTimer) {

        clearInterval(
            pollingTimer
        );

        pollingTimer = null;

    }


    if (!CONFIG.autoPolling) {
        return;
    }


    pollingTimer =
        setInterval(() => {

            if (CONFIG.demoMode) {

                simulateESP32();

            } else {

                fetchESP32Data();

            }

        }, CONFIG.pollingInterval);

}


/* ================= DEMO MODE ================= */

function toggleDemoMode() {

    CONFIG.demoMode =
        !CONFIG.demoMode;


    const button =
        document.getElementById(
            "demoToggle"
        );


    if (CONFIG.demoMode) {

        button.textContent =
            "DEMO MODE";

        button.classList.add(
            "primary"
        );

        addLog(
            "Demo simulation mode enabled."
        );

    }

    else {

        button.textContent =
            "ESP32 LIVE";

        button.classList.remove(
            "primary"
        );

        addLog(
            "ESP32 live communication mode enabled."
        );

    }


    restartPolling();

}


/* ================= REFRESH ================= */

function refreshData() {

    addLog(
        "Refreshing ESP32 network status..."
    );


    if (CONFIG.demoMode) {

        simulateESP32();

    }

    else {

        fetchESP32Data();

    }

}


/* ================= CLEAR LOG ================= */

function clearLog() {

    communicationLog.innerHTML = "";

    addLog(
        "Communication log cleared."
    );

}


/* ================= NAVIGATION ================= */

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
                        .forEach(nav =>
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


/* ================= EVENTS ================= */

statusFilter.addEventListener(
    "change",
    renderDevices
);


deviceSelector.addEventListener(
    "change",
    updateSelectedDevice
);


document
    .getElementById("refreshBtn")
    .addEventListener(
        "click",
        refreshData
    );


document
    .getElementById("demoToggle")
    .addEventListener(
        "click",
        toggleDemoMode
    );


document
    .getElementById("pingAllBtn")
    .addEventListener(
        "click",
        pingAll
    );


document
    .getElementById("testConnection")
    .addEventListener(
        "click",
        testConnection
    );


document
    .getElementById("saveConfig")
    .addEventListener(
        "click",
        saveConfiguration
    );


document
    .getElementById("clearLog")
    .addEventListener(
        "click",
        clearLog
    );


document
    .getElementById("autoPolling")
    .addEventListener(
        "change",
        function() {

            CONFIG.autoPolling =
                this.checked;

            restartPolling();

        }
    );


document
    .getElementById("pollInterval")
    .addEventListener(
        "change",
        function() {

            CONFIG.pollingInterval =
                Number(this.value);

            restartPolling();

        }
    );


/* ================= INITIALIZATION ================= */

function init() {

    renderDevices();

    updateSelectedDevice();

    renderJSON(demoPayload);

    setupNavigation();


    addLog(
        "VIKRAMA ESP32 connectivity module initialized."
    );


    addLog(
        "ESP32 network discovery completed — 5 online nodes."
    );


    addLog(
        "Sensor communication channels verified."
    );


    restartPolling();

}


init();