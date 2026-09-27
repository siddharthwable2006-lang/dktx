/* =========================================================
   VIKRAMA
   TAB 9 - SYSTEM SETTINGS
   ========================================================= */


/* ================= DEFAULT CONFIG ================= */

const defaultConfig = {

    general: {

        systemName:
            "VIKRAMA Smart Pole System",

        deploymentName:
            "Smart Pole Monitoring Network",

        location:
            "Sanjivani College of Engineering",

        timezone:
            "Asia/Kolkata (IST)",

        compactMode:
            false,

        autoRefresh:
            true,

        demoMode:
            true

    },


    thresholds: {

        tiltWarning:
            3.0,

        tiltCritical:
            5.0,

        sagWarning:
            20,

        sagCritical:
            30,

        leakWarning:
            0.10,

        leakCritical:
            0.30,

        socWarning:
            40,

        socCritical:
            20

    },


    esp32: {

        apiEndpoint:
            "",

        protocol:
            "HTTP / REST",

        pollingInterval:
            5000,

        connectionTimeout:
            3000,

        retryAttempts:
            3,

        espPolling:
            true,

        connectionLogging:
            true

    },


    energy: {

        energyMode:
            "Automatic Day / Night",

        solarStart:
            "06:00",

        solarEnd:
            "18:30",

        minimumSoc:
            20

    },


    notifications: {

        critical:
            true,

        warning:
            true,

        offline:
            true,

        energy:
            true

    }

};


/* ================= WORKING CONFIG ================= */

let config =
    structuredClone(defaultConfig);


/* ================= STORAGE ================= */

function saveConfigToStorage() {

    localStorage.setItem(
        "vikramaSystemConfig",
        JSON.stringify(config)
    );

}


function loadConfigFromStorage() {

    const saved =
        localStorage.getItem(
            "vikramaSystemConfig"
        );


    if (!saved) {
        return;
    }


    try {

        const parsed =
            JSON.parse(saved);


        config = {

            ...structuredClone(defaultConfig),

            ...parsed,

            general: {
                ...defaultConfig.general,
                ...parsed.general
            },

            thresholds: {
                ...defaultConfig.thresholds,
                ...parsed.thresholds
            },

            esp32: {
                ...defaultConfig.esp32,
                ...parsed.esp32
            },

            energy: {
                ...defaultConfig.energy,
                ...parsed.energy
            },

            notifications: {
                ...defaultConfig.notifications,
                ...parsed.notifications
            }

        };

    }

    catch {

        config =
            structuredClone(defaultConfig);

    }

}


/* ================= SETTINGS TABS ================= */

const settingTabs =
    document.querySelectorAll(
        ".setting-tab"
    );


const settingSections =
    document.querySelectorAll(
        ".settings-section"
    );


settingTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            const target =
                tab.dataset.section;


            settingTabs.forEach(item =>
                item.classList.remove(
                    "active"
                )
            );


            settingSections.forEach(section =>
                section.classList.remove(
                    "active"
                )
            );


            tab.classList.add(
                "active"
            );


            document
                .getElementById(target)
                .classList.add("active");

        }
    );

});


/* ================= LOAD UI ================= */

function loadUIFromConfig() {


    /* GENERAL */

    document.getElementById(
        "systemName"
    ).value =
        config.general.systemName;


    document.getElementById(
        "deploymentName"
    ).value =
        config.general.deploymentName;


    document.getElementById(
        "location"
    ).value =
        config.general.location;


    document.getElementById(
        "timezone"
    ).value =
        config.general.timezone;


    document.getElementById(
        "compactMode"
    ).checked =
        config.general.compactMode;


    document.getElementById(
        "autoRefresh"
    ).checked =
        config.general.autoRefresh;


    document.getElementById(
        "demoMode"
    ).checked =
        config.general.demoMode;



    /* THRESHOLDS */

    document.getElementById(
        "tiltWarning"
    ).value =
        config.thresholds.tiltWarning;


    document.getElementById(
        "tiltCritical"
    ).value =
        config.thresholds.tiltCritical;


    document.getElementById(
        "sagWarning"
    ).value =
        config.thresholds.sagWarning;


    document.getElementById(
        "sagCritical"
    ).value =
        config.thresholds.sagCritical;


    document.getElementById(
        "leakWarning"
    ).value =
        config.thresholds.leakWarning;


    document.getElementById(
        "leakCritical"
    ).value =
        config.thresholds.leakCritical;


    document.getElementById(
        "socWarning"
    ).value =
        config.thresholds.socWarning;


    document.getElementById(
        "socCritical"
    ).value =
        config.thresholds.socCritical;



    /* ESP32 */

    document.getElementById(
        "apiEndpoint"
    ).value =
        config.esp32.apiEndpoint;


    document.getElementById(
        "protocol"
    ).value =
        config.esp32.protocol;


    document.getElementById(
        "pollingInterval"
    ).value =
        config.esp32.pollingInterval;


    document.getElementById(
        "connectionTimeout"
    ).value =
        config.esp32.connectionTimeout;


    document.getElementById(
        "retryAttempts"
    ).value =
        config.esp32.retryAttempts;


    document.getElementById(
        "espPolling"
    ).checked =
        config.esp32.espPolling;


    document.getElementById(
        "connectionLogging"
    ).checked =
        config.esp32.connectionLogging;



    /* ENERGY */

    document.getElementById(
        "energyMode"
    ).value =
        config.energy.energyMode;


    document.getElementById(
        "solarStart"
    ).value =
        config.energy.solarStart;


    document.getElementById(
        "solarEnd"
    ).value =
        config.energy.solarEnd;


    document.getElementById(
        "minimumSoc"
    ).value =
        config.energy.minimumSoc;



    /* NOTIFICATIONS */

    document.getElementById(
        "criticalNotifications"
    ).checked =
        config.notifications.critical;


    document.getElementById(
        "warningNotifications"
    ).checked =
        config.notifications.warning;


    document.getElementById(
        "offlineNotifications"
    ).checked =
        config.notifications.offline;


    document.getElementById(
        "energyNotifications"
    ).checked =
        config.notifications.energy;

}


/* ================= READ UI ================= */

function readUIIntoConfig() {


    /* GENERAL */

    config.general.systemName =
        document.getElementById(
            "systemName"
        ).value;


    config.general.deploymentName =
        document.getElementById(
            "deploymentName"
        ).value;


    config.general.location =
        document.getElementById(
            "location"
        ).value;


    config.general.timezone =
        document.getElementById(
            "timezone"
        ).value;


    config.general.compactMode =
        document.getElementById(
            "compactMode"
        ).checked;


    config.general.autoRefresh =
        document.getElementById(
            "autoRefresh"
        ).checked;


    config.general.demoMode =
        document.getElementById(
            "demoMode"
        ).checked;



    /* THRESHOLDS */

    config.thresholds.tiltWarning =
        Number(
            document.getElementById(
                "tiltWarning"
            ).value
        );


    config.thresholds.tiltCritical =
        Number(
            document.getElementById(
                "tiltCritical"
            ).value
        );


    config.thresholds.sagWarning =
        Number(
            document.getElementById(
                "sagWarning"
            ).value
        );


    config.thresholds.sagCritical =
        Number(
            document.getElementById(
                "sagCritical"
            ).value
        );


    config.thresholds.leakWarning =
        Number(
            document.getElementById(
                "leakWarning"
            ).value
        );


    config.thresholds.leakCritical =
        Number(
            document.getElementById(
                "leakCritical"
            ).value
        );


    config.thresholds.socWarning =
        Number(
            document.getElementById(
                "socWarning"
            ).value
        );


    config.thresholds.socCritical =
        Number(
            document.getElementById(
                "socCritical"
            ).value
        );



    /* ESP32 */

    config.esp32.apiEndpoint =
        document.getElementById(
            "apiEndpoint"
        ).value.trim();


    config.esp32.protocol =
        document.getElementById(
            "protocol"
        ).value;


    config.esp32.pollingInterval =
        Number(
            document.getElementById(
                "pollingInterval"
            ).value
        );


    config.esp32.connectionTimeout =
        Number(
            document.getElementById(
                "connectionTimeout"
            ).value
        );


    config.esp32.retryAttempts =
        Number(
            document.getElementById(
                "retryAttempts"
            ).value
        );


    config.esp32.espPolling =
        document.getElementById(
            "espPolling"
        ).checked;


    config.esp32.connectionLogging =
        document.getElementById(
            "connectionLogging"
        ).checked;



    /* ENERGY */

    config.energy.energyMode =
        document.getElementById(
            "energyMode"
        ).value;


    config.energy.solarStart =
        document.getElementById(
            "solarStart"
        ).value;


    config.energy.solarEnd =
        document.getElementById(
            "solarEnd"
        ).value;


    config.energy.minimumSoc =
        Number(
            document.getElementById(
                "minimumSoc"
            ).value
        );



    /* NOTIFICATIONS */

    config.notifications.critical =
        document.getElementById(
            "criticalNotifications"
        ).checked;


    config.notifications.warning =
        document.getElementById(
            "warningNotifications"
        ).checked;


    config.notifications.offline =
        document.getElementById(
            "offlineNotifications"
        ).checked;


    config.notifications.energy =
        document.getElementById(
            "energyNotifications"
        ).checked;

}


/* ================= VALIDATION ================= */

function validateConfig() {


    const errors = [];


    if (
        config.thresholds.tiltWarning >=
        config.thresholds.tiltCritical
    ) {

        errors.push(
            "Pole tilt warning must be lower than critical."
        );

    }


    if (
        config.thresholds.sagWarning >=
        config.thresholds.sagCritical
    ) {

        errors.push(
            "Conductor sag warning must be lower than critical."
        );

    }


    if (
        config.thresholds.leakWarning >=
        config.thresholds.leakCritical
    ) {

        errors.push(
            "Leakage warning must be lower than critical."
        );

    }


    if (
        config.thresholds.socCritical >=
        config.thresholds.socWarning
    ) {

        errors.push(
            "Battery critical SOC should be lower than warning SOC."
        );

    }


    if (
        config.energy.minimumSoc < 0 ||
        config.energy.minimumSoc > 100
    ) {

        errors.push(
            "Minimum battery SOC must be between 0 and 100%."
        );

    }


    if (
        config.esp32.pollingInterval < 1000
    ) {

        errors.push(
            "ESP32 polling interval should not be below 1 second."
        );

    }


    return errors;

}


/* ================= SAVE ================= */

function saveAll() {


    readUIIntoConfig();


    const errors =
        validateConfig();


    if (errors.length) {

        alert(
            "Configuration Error:\n\n" +
            errors.join("\n")
        );

        return;

    }


    saveConfigToStorage();


    document.getElementById(
        "configStatus"
    ).textContent =
        "SAVED";


    showToast(
        "System configuration saved successfully."
    );

}


/* ================= RESET ================= */

function resetConfiguration() {


    const confirmed =
        confirm(
            "Reset VIKRAMA configuration to default demo settings?"
        );


    if (!confirmed) {
        return;
    }


    config =
        structuredClone(
            defaultConfig
        );


    saveConfigToStorage();

    loadUIFromConfig();


    document.getElementById(
        "configStatus"
    ).textContent =
        "DEFAULT";


    showToast(
        "Configuration restored to default settings."
    );

}


/* ================= TOAST ================= */

function showToast(message) {


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        message;


    Object.assign(
        toast.style,
        {

            position: "fixed",

            right: "25px",

            bottom: "25px",

            zIndex: "9999",

            padding: "12px 16px",

            border:
                "1px solid rgba(56,224,154,.3)",

            background:
                "#091421",

            color:
                "#38e09a",

            borderRadius:
                "8px",

            fontSize:
                "10px",

            boxShadow:
                "0 15px 40px rgba(0,0,0,.4)"

        }
    );


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 2500);

}


/* ================= EXPORT ================= */

function exportConfiguration() {


    readUIIntoConfig();


    const exportData = {

        system:
            "VIKRAMA Smart Pole System",

        exportedAt:
            new Date().toISOString(),

        configuration:
            config

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    exportData,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "vikrama-system-configuration.json";


    link.click();


    URL.revokeObjectURL(url);


    showToast(
        "Configuration exported successfully."
    );

}


/* ================= CLEAR DEMO ================= */

function clearDemoData() {


    const confirmed =
        confirm(
            "Clear demonstration data from the dashboard?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "vikramaDemoEvents"
    );


    showToast(
        "Demo event data cleared."
    );

}


/* ================= ADD POLE ================= */

function addPole() {


    const poleId =
        prompt(
            "Enter new Pole ID:",
            "POL-007"
        );


    if (!poleId) {
        return;
    }


    const esp32 =
        prompt(
            "Enter ESP32 Device ID:",
            "ESP32-007"
        );


    if (!esp32) {
        return;
    }


    const tbody =
        document.getElementById(
            "poleTable"
        );


    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>
            <strong>${poleId}</strong>
        </td>

        <td>
            ${esp32}
        </td>

        <td>
            New Zone
        </td>

        <td>
            <span class="table-status offline">
                NOT CONNECTED
            </span>
        </td>

        <td>
            <button class="table-btn">
                Configure
            </button>
        </td>

    `;


    tbody.appendChild(row);


    showToast(
        `${poleId} added to pole registry.`
    );

}


/* ================= EVENT LISTENERS ================= */

document
    .getElementById("saveAllBtn")
    .addEventListener(
        "click",
        saveAll
    );


document
    .getElementById("resetBtn")
    .addEventListener(
        "click",
        resetConfiguration
    );


document
    .getElementById("dangerReset")
    .addEventListener(
        "click",
        resetConfiguration
    );


document
    .getElementById("exportBtn")
    .addEventListener(
        "click",
        exportConfiguration
    );


document
    .getElementById("clearDemoBtn")
    .addEventListener(
        "click",
        clearDemoData
    );


document
    .getElementById("addPoleBtn")
    .addEventListener(
        "click",
        addPole
    );


/* ================= INITIALIZATION ================= */

loadConfigFromStorage();

loadUIFromConfig();