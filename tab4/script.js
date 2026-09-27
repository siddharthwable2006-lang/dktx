/*
====================================================
 VIKRAMA SMART POLE SYSTEM

 TAB 4 — CONDUCTOR SAG MONITORING

 Standalone GitHub Pages Module

 Current version:
 Demo telemetry

 Future:
 ESP32 / API integration

====================================================
*/


/* ==================================================
   DEMO DATA
================================================== */

const spans = [

  {
    id: "POL-001",
    location: "Main Gate • Sector A",
    device: "ESP32-001",

    sag: 12.5,

    spanLength: 30,

    sensorDistance: 1.25,

    clearance: 8.4,

    history: [
      10.5,
      10.8,
      11.0,
      11.2,
      11.5,
      11.4,
      11.7,
      11.9,
      12.0,
      12.2,
      12.4,
      12.5
    ]
  },


  {
    id: "POL-002",
    location: "Workshop • Sector A",
    device: "ESP32-002",

    sag: 18.6,

    spanLength: 30,

    sensorDistance: 1.86,

    clearance: 7.8,

    history: [
      15.0,
      15.2,
      15.5,
      15.7,
      16.0,
      16.3,
      16.7,
      17.0,
      17.3,
      17.8,
      18.2,
      18.6
    ]
  },


  {
    id: "POL-003",
    location: "Storage Yard • Sector B",
    device: "ESP32-003",

    sag: 24.8,

    spanLength: 35,

    sensorDistance: 2.48,

    clearance: 6.9,

    history: [
      18.0,
      18.5,
      19.0,
      19.6,
      20.1,
      20.7,
      21.3,
      22.0,
      22.7,
      23.3,
      24.0,
      24.8
    ]
  },


  {
    id: "POL-004",
    location: "Admin Block • Sector B",
    device: "ESP32-004",

    sag: 8.4,

    spanLength: 28,

    sensorDistance: 0.84,

    clearance: 9.1,

    history: [
      8.9,
      8.6,
      8.8,
      8.5,
      8.4,
      8.3,
      8.6,
      8.4,
      8.2,
      8.4,
      8.3,
      8.4
    ]
  },


  {
    id: "POL-005",
    location: "Parking Area • Sector C",
    device: "ESP32-005",

    sag: 34.2,

    spanLength: 32,

    sensorDistance: 3.42,

    clearance: 5.7,

    history: [
      24.0,
      25.1,
      26.0,
      27.2,
      28.0,
      29.0,
      30.1,
      30.8,
      31.7,
      32.5,
      33.4,
      34.2
    ]
  },


  {
    id: "POL-006",
    location: "Utility Zone • Sector C",
    device: "ESP32-006",

    sag: 15.3,

    spanLength: 30,

    sensorDistance: 1.53,

    clearance: 8.0,

    history: [
      14.2,
      14.4,
      14.5,
      14.7,
      14.9,
      15.0,
      15.2,
      15.0,
      15.1,
      15.2,
      15.4,
      15.3
    ]
  }

];


/* ==================================================
   SELECTED SPAN
================================================== */

let selected = spans[0];


/* ==================================================
   SHORT SELECTOR
================================================== */

const $ = id =>
  document.getElementById(id);


/* ==================================================
   SAG CONDITION
================================================== */

function getCondition(sag) {


  if (sag > 30) {

    return {

      name: "CRITICAL",

      color: "var(--red)",

      icon: "!",

      text:
        "Conductor sag exceeds the configured critical threshold."

    };

  }


  if (sag > 20) {

    return {

      name: "INSPECTION",

      color: "var(--yellow)",

      icon: "!",

      text:
        "Conductor sag is above the normal operating range."

    };

  }


  return {

    name: "NORMAL",

    color: "var(--green)",

    icon: "✓",

    text:
      "Conductor sag is within the configured operating range."

  };

}


/* ==================================================
   KPI COUNTERS
================================================== */

function updateCounters() {


  const normal =
    spans.filter(
      span => span.sag <= 20
    ).length;


  const warning =
    spans.filter(
      span =>
        span.sag > 20 &&
        span.sag <= 30
    ).length;


  const critical =
    spans.filter(
      span => span.sag > 30
    ).length;


  $("total").textContent =
    spans.length;


  $("normal").textContent =
    normal;


  $("warning").textContent =
    warning;


  $("critical").textContent =
    critical;

}


/* ==================================================
   SELECT OPTIONS
================================================== */

function populateSelect() {


  $("poleSelect").innerHTML =

    spans.map(
      span => `

        <option value="${span.id}">

          ${span.id}
          — ${span.location}

        </option>

      `
    ).join("");


  $("poleSelect").value =
    selected.id;

}


/* ==================================================
   SAG RATIO
================================================== */

function calculateSagRatio(
  sag,
  span
) {

  if (!span) return 0;

  return (
    sag / (span * 100)
  ) * 100;

}


/* ==================================================
   DRAW CHART
================================================== */

function drawChart(values) {


  const width = 700;

  const height = 230;

  const max = 40;


  const points =

    values.map(
      (value, index) => {


        const x =

          (
            index /
            (values.length - 1)
          ) * width;


        const y =

          height -

          (
            Math.min(
              value,
              max
            ) / max
          ) * height;


        return [
          x,
          y
        ];

      }
    );


  const line =

    points.map(
      (point, index) =>

        (
          index
            ? "L"
            : "M"
        )

        +

        point[0].toFixed(1)

        +

        " "

        +

        point[1].toFixed(1)

    ).join(" ");


  const area =

    line

    +

    " L "

    +

    width

    +

    " "

    +

    height

    +

    " L 0 "

    +

    height

    +

    " Z";


  $("linePath")
    .setAttribute(
      "d",
      line
    );


  $("areaPath")
    .setAttribute(
      "d",
      area
    );


  $("points").innerHTML =

    points.map(
      point => `

        <circle

          cx="${point[0]}"

          cy="${point[1]}"

          r="4"

          fill="#25d9ff"

          stroke="#07121f"

          stroke-width="2"

        />

      `
    ).join("");

}


/* ==================================================
   UPDATE CONDUCTOR VISUAL
================================================== */

function updateConductorVisual() {


  /*
  Convert sag into SVG displacement.

  This is a visual representation only.
  It is not a physical-scale engineering drawing.
  */


  const maxSag = 40;


  const sag =
    Math.min(
      selected.sag,
      maxSag
    );


  const centerY =
    70 +
    (
      sag /
      maxSag
    ) * 170;


  const path = `

    M 90 70

    Q 400 ${centerY}

    710 70

  `;


  $("conductorPath")
    .setAttribute(
      "d",
      path
    );


  /*
  Center sensor point
  */


  $("sensorPoint")
    .setAttribute(
      "cy",
      centerY
    );


  /*
  Measurement line
  */


  $("measurementLine")
    .setAttribute(
      "y2",
      centerY
    );


  /*
  Visual sag
  */


  $("visualSag")
    .textContent =

    selected.sag.toFixed(1)
    +
    " cm";

}


/* ==================================================
   RENDER
================================================== */

function render() {


  const condition =
    getCondition(
      selected.sag
    );


  /*
  Basic information
  */


  $("selectedId")
    .textContent =
    selected.id;


  $("selectedLocation")
    .textContent =
    selected.location;


  $("device")
    .textContent =
    selected.device;


  /*
  Measurements
  */


  $("currentSag")
    .textContent =

    selected.sag.toFixed(1)
    +
    " cm";


  $("spanLength")
    .textContent =

    selected.spanLength
    +
    " m";


  $("sensorDistance")
    .textContent =

    selected.sensorDistance.toFixed(2)
    +
    " m";


  $("clearance")
    .textContent =

    selected.clearance.toFixed(1)
    +
    " m";


  /*
  Sag ratio
  */


  const ratio =

    calculateSagRatio(
      selected.sag,
      selected.spanLength
    );


  $("sagRatio")
    .textContent =

    ratio.toFixed(2)
    +
    "%";


  /*
  Meter
  */


  $("sagMeter")
    .style.width =

    Math.min(
      selected.sag / 40 * 100,
      100
    )
    +
    "%";


  $("sagMeter")
    .style.background =
    condition.color;


  /*
  Condition
  */


  $("conditionText")
    .textContent =
    condition.name;


  $("conditionText")
    .style.color =
    condition.color;


  $("conditionSub")
    .textContent =
    condition.text;


  $("conditionIcon")
    .textContent =
    condition.icon;


  $("conditionIcon")
    .style.color =
    condition.color;


  $("conditionIcon")
    .style.borderColor =
    condition.color + "55";


  $("conditionIcon")
    .style.background =
    condition.color + "14";


  /*
  Engineering note
  */


  if (
    selected.sag <= 20
  ) {

    $("engineeringNote").textContent =

      "Current conductor sag is within the configured normal range.";

  }

  else if (
    selected.sag <= 30
  ) {

    $("engineeringNote").textContent =

      "Elevated sag has been detected. Inspect conductor tension, support condition and environmental effects according to site procedure.";

  }

  else {

    $("engineeringNote").textContent =

      "Critical conductor sag is detected in this demo profile. Follow the site's inspection and isolation procedure before physical intervention.";

  }


  $("alertCard")
    .style.borderLeftColor =
    condition.color;


  /*
  Timestamp
  */


  $("update")
    .textContent =
    "Just now";


  /*
  Visual profile
  */


  updateConductorVisual();


  /*
  Trend
  */


  drawChart(
    selected.history
  );

}


/* ==================================================
   SELECT SPAN
================================================== */

function selectSpan(id) {


  selected =

    spans.find(
      span => span.id === id
    )
    ||
    spans[0];


  $("poleSelect").value =
    selected.id;


  render();

}


/* ==================================================
   REFRESH ALL DEMO DATA
================================================== */

function refreshData() {


  spans.forEach(
    span => {


      const delta =

        (
          Math.random() -
          .5
        ) * 1.2;


      span.sag =

        Math.max(
          1,
          +(
            span.sag +
            delta
          ).toFixed(1)
        );


      span.sensorDistance =

        +(
          span.sag / 10
        ).toFixed(2);


      span.clearance =

        Math.max(
          2,
          +(
            10 -
            span.sag * .12
          ).toFixed(1)
        );


      span.history = [

        ...span.history.slice(1),

        span.sag

      ];

    }
  );


  selected =

    spans.find(
      span =>
        span.id === selected.id
    );


  updateCounters();

  render();

}


/* ==================================================
   SIMULATE CURRENT SPAN
================================================== */

function simulateReading() {


  selected.sag =

    +(
      Math.random() * 40
    ).toFixed(1);


  selected.sensorDistance =

    +(
      selected.sag / 10
    ).toFixed(2);


  selected.clearance =

    Math.max(
      2,
      +(
        10 -
        selected.sag * .12
      ).toFixed(1)
    );


  selected.history = [

    ...selected.history.slice(1),

    selected.sag

  ];


  updateCounters();

  render();

}


/* ==================================================
   NAVIGATION
================================================== */

function navigation() {


  document
    .querySelectorAll(".nav-item")
    .forEach(
      item => {


        item.addEventListener(
          "click",
          event => {


            event.preventDefault();


            /*
            Current tab stays active.
            Other tabs can be connected
            when their standalone modules
            are created.
            */


            if (
              item.textContent
                .includes(
                  "Conductor Sag"
                )
            ) {

              return;

            }


            alert(

              `${item.textContent.trim()} will be connected when that dashboard tab is built.`

            );

          }
        );

      }
    );

}


/* ==================================================
   ESP32 API INTEGRATION
====================================================

Example ESP32 response:

{
  "poleId": "POL-001",
  "sag": 15.4,
  "sensorDistance": 1.54,
  "spanLength": 30
}


Example integration:

fetch("http://YOUR-ESP32-IP/data")

  .then(response =>
    response.json()
  )

  .then(data => {

    const span =
      spans.find(
        item =>
          item.id === data.poleId
      );


    if (!span) return;


    span.sag =
      Number(data.sag);


    span.sensorDistance =
      Number(data.sensorDistance);


    span.spanLength =
      Number(data.spanLength);


    span.history = [

      ...span.history.slice(1),

      span.sag

    ];


    selected = span;


    updateCounters();

    render();

  });


====================================================

IMPORTANT:

If your GitHub Pages dashboard and ESP32 are
on different networks, direct browser-to-ESP32
requests can require CORS configuration and
network accessibility.

For an industry deployment, use:

ESP32
   ↓
Wi-Fi / GSM
   ↓
Cloud / API / MQTT Broker
   ↓
Dashboard

rather than exposing the ESP32 directly.

==================================================== */


/* ==================================================
   INITIALIZE
================================================== */

function init() {


  populateSelect();


  updateCounters();


  render();


  $("poleSelect")
    .addEventListener(
      "change",
      event => {

        selectSpan(
          event.target.value
        );

      }
    );


  $("refreshBtn")
    .addEventListener(
      "click",
      refreshData
    );


  $("simulateBtn")
    .addEventListener(
      "click",
      simulateReading
    );


  navigation();

}


/* ==================================================
   START
================================================== */

document.addEventListener(
  "DOMContentLoaded",
  init
);