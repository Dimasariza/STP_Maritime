"use strict";
exports.id = 442;
exports.ids = [442];
exports.modules = {

/***/ 442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ radar_map)
});

// EXTERNAL MODULE: external "react-leaflet"
var external_react_leaflet_ = __webpack_require__(656);
// EXTERNAL MODULE: external "leaflet-defaulticon-compatibility"
var external_leaflet_defaulticon_compatibility_ = __webpack_require__(212);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "leaflet"
var external_leaflet_ = __webpack_require__(329);
var external_leaflet_default = /*#__PURE__*/__webpack_require__.n(external_leaflet_);
// EXTERNAL MODULE: ./helpers/store.js + 2 modules
var store = __webpack_require__(387);
// EXTERNAL MODULE: external "leaflet-drift-marker"
var external_leaflet_drift_marker_ = __webpack_require__(630);
var external_leaflet_drift_marker_default = /*#__PURE__*/__webpack_require__.n(external_leaflet_drift_marker_);
// EXTERNAL MODULE: ./components/red-map/red-map.jsx
var red_map = __webpack_require__(925);
// EXTERNAL MODULE: external "framer-motion"
var external_framer_motion_ = __webpack_require__(762);
// EXTERNAL MODULE: ./components/radar/map-helper.js
var map_helper = __webpack_require__(114);
// EXTERNAL MODULE: ./node_modules/react-icons/bi/index.esm.js
var index_esm = __webpack_require__(516);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(282);
;// CONCATENATED MODULE: ./components/radar/topRightIndicator.jsx







const TopRightIndicator = ({
  boatManager,
  serialControl
}) => {
  //console.log("==Live map re render")
  const [localCurPos, setCurPos] = external_react_default().useState({
    lat: 0,
    lng: 0
  });
  const [distance, setDistance] = external_react_default().useState(0);
  const [departure, setDeparture] = external_react_default().useState(0);
  const [arrival, setArrival] = external_react_default().useState(0);
  const [fontSize, setFontSize] = external_react_default().useState("text-sm");
  const toggleDrawwer = (0,external_react_.useRef)();
  let latLngMaxNumb = 10;
  (0,external_react_.useEffect)(() => {
    setBoatManagerTriggers();
    setSocketDataReceiver();
    toggleDrawwer.current.checked = true;

    if (boatManager.activateDataListener) {
      boatManager.requestSyncronize("TopRightIndicator");
    } else {
      boatManager.localSyncronize("TopRightIndicator");
    }

    if (boatManager.maximized) setFontSize("text-2xl");
  }, []);

  function setBoatManagerTriggers() {
    boatManager.on('updateTopRightIndicatorValues', data => {
      const {
        curPos,
        distance,
        departureTime,
        arrivalTime
      } = data;
      setCurPos(curPos);
      setDistance(distance);
      setDeparture(departureTime);
      setArrival(arrivalTime);
    });
  }

  const setSocketDataReceiver = () => {
    serialControl.on('data', data => {
      const {
        command
      } = data;
      if (command == null || !boatManager.activateDataListener) return;

      switch (command) {
        case "TopRightIndicator":
          const {
            distance,
            departureTime,
            arrivalTime
          } = data;
          if (distance == null || departure == null || arrivalTime == null) return;
          setDistance(distance);
          setDeparture(departureTime);
          setArrival(arrivalTime);
          break;

        case "move":
          const {
            curPos
          } = data;
          setCurPos(curPos);
          break;
      }
    });
  };

  function cutNumber(number, maxLength) {
    let str = number.toString();
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength);
  }

  const NumberIndicator = ({
    indicator,
    value,
    unit
  }) => /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
    className: `font-sans font-light text-center ${fontSize} text-white ...`,
    children: [indicator, " ", value, " ", unit]
  }, indicator);

  const IndicatorContainer = ({
    title,
    bars
  }) => /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "pb-0.5",
    children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
      className: `font-sans text-center font-bold ${fontSize} text-gray-200 ...`,
      children: title
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      children: bars.map(e => NumberIndicator(e))
    })]
  });

  function makeTimeReadable(time) {
    return new Date(time).toTimeString().split(' ')[0];
  }

  function timeSubtract(time1, time2) {
    let result = Math.abs(time1 - time2);
    let returnDate = new Date(result).toTimeString().split(' ')[0];
    let dateArray = Array.from(returnDate);
    let hours = parseInt(dateArray[0] + dateArray[1]) - 7;
    let hoursArray = Array.from(hours);

    if (hoursArray.length > 1) {
      dateArray[0] = hoursArray[0];
      dateArray[1] = hoursArray[1];
    } else {
      dateArray[0] = '0';
      dateArray[1] = hoursArray[0];
    }

    return dateArray.join("");
  }

  const ETA = () => IndicatorContainer({
    title: 'ETA',
    bars: [{
      indicator: null,
      value: makeTimeReadable(arrival),
      unit: null
    }]
  });

  const ETD = () => IndicatorContainer({
    title: 'ETD',
    bars: [{
      indicator: null,
      value: makeTimeReadable(departure),
      unit: null
    }]
  });

  const JarakRute = () => IndicatorContainer({
    title: 'Distance',
    bars: [{
      indicator: distance.toFixed(2) + "Km",
      value: "|",
      unit: timeSubtract(arrival, departure)
    }]
  });

  const Koodrinat = () => IndicatorContainer({
    title: 'Coordinate',
    bars: [{
      indicator: "Lat: ",
      value: cutNumber(localCurPos.lat, latLngMaxNumb),
      unit: null
    }, {
      indicator: "Lng: ",
      value: cutNumber(localCurPos.lng, latLngMaxNumb),
      unit: null
    }]
  });

  const infoItems = [/*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "p-1 w-full h-1/6",
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      style: {
        backgroundImage: "url('./Logo-STP Martitim - ITS.jpeg')",
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      },
      className: "w-full h-full bg-white"
    })
  }, "logo-stp"), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "flex flex-col flex-1 justify-center items-center",
    children: [/*#__PURE__*/jsx_runtime_.jsx(ETA, {}), /*#__PURE__*/jsx_runtime_.jsx(ETD, {}), /*#__PURE__*/jsx_runtime_.jsx(JarakRute, {}), /*#__PURE__*/jsx_runtime_.jsx(Koodrinat, {})]
  }, "indicator"), /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "p-1 w-full h-1/6",
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      style: {
        backgroundImage: "url('./Logo-NASDEC.jpeg')",
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      },
      className: "w-full h-full bg-white"
    })
  }, "logo-nasdec")];
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `drawer drawer-end absolute z-50 top-0 w-full h-full`,
      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
        ref: toggleDrawwer,
        id: "my-info",
        type: "checkbox",
        className: "drawer-toggle"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: `drawer-side overflow-hidden h-full`,
        children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
          htmlFor: "my-info",
          className: "drawer-overlay"
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "w-1/4 flex flex-col overflow-y-auto justify-center items-center bg-black opacity-80 text-base-content",
          children: infoItems
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("label", {
      className: `absolute z-50`,
      htmlFor: "my-info",
      className: "absolute z-50 bottom-0 right-0 btn btn-xs drawer-button",
      children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiInfoCircle */.Fs0, {})
    })]
  });
};

/* harmony default export */ const topRightIndicator = (TopRightIndicator);
;// CONCATENATED MODULE: ./components/radar/radar-map.jsx
const _excluded = ["serialControl", "boatManager", "animatedBoatManager"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
















let marker = null;

const RadarMap = _ref => {
  let {
    serialControl,
    boatManager,
    animatedBoatManager
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  //console.log("==Live map re render")
  const [localCurPos, setCurPos] = external_react_default().useState({
    lat: 0,
    lng: 0
  });
  const [boatAngle, setBoatAngle] = external_react_default().useState(0); // const [localNpcShipLoc, setNpcShipLoc] = React.useState({lat: 0, lng: 0})

  let shipsLayer = external_react_default().useRef();
  let animatedShipsLayer = external_react_default().useRef();
  let zoomPower = 14;
  const radarCanvas = external_react_default().useRef(null);
  const frame = external_react_default().useRef(null); // const [currentNpcShips, setCurrentNpcShips] = React.useState([])
  // const [currentMovingNpcShips, setCurrentMovingNpcShips] = React.useState([])

  const NPCBoatIcon = new (external_leaflet_default()).icon({
    iconUrl: "./markerIcons/otherBoat-icon.png",
    iconSize: new (external_leaflet_default()).Point(10, 20)
  });
  let mapRef = external_react_default().useRef();
  const [map, setMap] = external_react_default().useState(null);
  const [autoSize, setSize] = external_react_default().useState({
    height: '100%',
    width: '100%'
  });
  (0,external_react_.useEffect)(() => {
    // console.log("Run on radar use effect")
    setBoatManagerTriggers();
    addListenerMovingNPCBoat();
    addListenerNPCBoatMovement();
    addListenerMovingBoatShowHide();
    handleDataBoatMove();

    if (!boatManager.activateDataListener) {
      setCurPos(boatManager.curPos);
      setBoatAngle(0); // boatManager.localSyncronize("EngineIndicator")
    } else {
      boatManager.requestSyncronize("Radar");
    }
  }, []);

  const setMapReference = map => {
    mapRef.current = map;
    mapRef.current.addLayer(shipsLayer.current);
    mapRef.current.addLayer(animatedShipsLayer.current);
    setMap(map);
    animatedBoatManager.resetRadarMarker();
    instInitLoc(animatedBoatManager.autoNPCBoatRoute);
    boatManager.resetRadarObstacle();
    if (marker) return;
    map.setView([localCurPos.lat, localCurPos.lng]);
    map.eachLayer(l => console.log(l.options.pane));
  };

  const instInitLoc = data => {
    // console.log("Init radar animated marker")
    let markers = [];

    for (let i = 0; i < data.length; i++) {
      // console.log(i)
      let curPos = data[i][0]; // console.log(curPos)

      let tempMarker = new (external_leaflet_drift_marker_default())([curPos.lat, curPos.lng], {
        icon: NPCBoatIcon,
        draggable: false
      });
      animatedShipsLayer.current.addLayer(tempMarker);
      markers.push(tempMarker);
    }

    animatedBoatManager.setRadarMarker(markers);
  };

  function setBoatManagerTriggers() {
    boatManager.on('move', data => {
      moveBoat(data);
    });
    boatManager.on('addObstacle', data => {
      // console.log("Add obstacle from emit")
      addObstacle(data);
    });
    boatManager.on('removeObstacle', data => {
      removeObstacle(data);
    });
  }

  const addListenerMovingBoatShowHide = () => {
    animatedBoatManager.on('showHideAnimatedBoat', data => {
      handleMovingBoatShowHide(data);
    });
  };

  const addListenerNPCBoatMovement = () => {
    animatedBoatManager.on('moveNPCMarker', data => {
      if (boatManager.activateDataListener) return; // console.log("Emit from animatedboat")

      handleNPCBoatMovement(data);
    });
  };

  const addListenerMovingNPCBoat = () => {
    animatedBoatManager.on('addMovingShip', data => {// addMovingNPCBoat(data)
    });
  };

  const handleDataBoatMove = () => {
    serialControl.on('data', data => {
      const {
        command
      } = data;
      if (command == null || !boatManager.activateDataListener) return;

      switch (command) {
        case "move":
          moveBoat(data);
          break;

        case "addObstacle":
          addObstacle(data);
          break;

        case "removeObstacle":
          removeObstacle();
          break;

        case "showHideAnimatedBoat":
          handleMovingBoatShowHide(data);
          break;

        case "moveNPCMarker":
          // console.log("Emit from data")
          handleNPCBoatMovement(data);
          break;

        case "addMovingShip":
          // addMovingNPCBoat(data)
          break;

        case "syncObstacle":
          syncObstacle(data);
          break;
      }
    });
  };

  const moveBoat = data => {
    const {
      curPos,
      boatAngle
    } = data;

    if (mapRef.current) {
      mapRef.current.setView(curPos);
    }

    setBoatAngle(boatAngle);
  };

  const addObstacle = data => {
    const {
      npcShipLocations
    } = data;
    if (npcShipLocations == null || boatManager.radarStaticObstacle.length == npcShipLocations.length || shipsLayer.current == null) return;

    if (boatManager.radarStaticObstacle.length < npcShipLocations.length) {
      //Add one stuff
      let newPos = npcShipLocations[npcShipLocations.length - 1];
      let tempMarker = new (external_leaflet_drift_marker_default())([newPos.lat, newPos.lng], {
        icon: NPCBoatIcon,
        draggable: false
      });
      shipsLayer.current.addLayer(tempMarker);
      boatManager.addRadarObstacle(tempMarker);
    }
  };

  const syncObstacle = data => {
    // console.log("Sync obstacle called")
    const {
      npcShipLocations
    } = data;
    if (npcShipLocations == null || shipsLayer.current == null) return;

    for (let i = 0; i < npcShipLocations.length; i++) {
      let newPos = npcShipLocations[i];
      let tempMarker = new (external_leaflet_drift_marker_default())([newPos.lat, newPos.lng], {
        icon: NPCBoatIcon,
        draggable: false
      });
      shipsLayer.current.addLayer(tempMarker);
      boatManager.addRadarObstacle(tempMarker);
    }
  };

  const removeObstacle = () => {
    if (shipsLayer.current == null) return;

    for (let i = 0; i < boatManager.radarStaticObstacle.length; i++) {
      shipsLayer.current.removeLayer(boatManager.radarStaticObstacle[i]);
    }

    boatManager.resetRadarObstacle();
  };

  const handleMovingBoatShowHide = data => {
    const {
      show
    } = data;
    if (show == null || mapRef.current == null || animatedShipsLayer.current == null) return;

    if (show) {
      mapRef.current.addLayer(animatedShipsLayer.current);
    } else {
      mapRef.current.removeLayer(animatedShipsLayer.current);
    }
  };

  const handleNPCBoatMovement = data => {
    const {
      movingBoats
    } = data;
    if (movingBoats == null || movingBoats.length != 10) return;
    let markers = animatedBoatManager.RadarMarkers; // console.log(markers.length)

    if (markers.length != movingBoats.length) {
      initializeMovingNpcBoat(movingBoats);
    } else {
      setPosMovingNpcBoat(movingBoats);
    }
  };

  const initializeMovingNpcBoat = movingBoats => {
    let NPCMovingBoats = [];
    console.log("Init moving npc boat.");
    console.log(movingBoats);

    for (let i = 0; i < movingBoats.length; i++) {
      console.log("Loop " + (i + 1));
      const {
        curPos,
        angle
      } = movingBoats[i];
      let tempMarker = new (external_leaflet_drift_marker_default())([curPos.lat, curPos.lng], {
        icon: NPCBoatIcon,
        draggable: false
      });
      animatedShipsLayer.current.addLayer(tempMarker);
      if (angle != null) tempMarker.setRotationAngle(-angle);
      NPCMovingBoats.push(tempMarker);
    }

    console.log(NPCMovingBoats);
    animatedBoatManager.setRadarMarker(NPCMovingBoats);
  };

  const setPosMovingNpcBoat = movingBoats => {
    for (let i = 0; i < movingBoats.length; i++) {
      const {
        curPos,
        angle
      } = movingBoats[i];
      let markers = animatedBoatManager.RadarMarkers;
      let tempNPCShip = markers[i];
      tempNPCShip.slideTo([curPos.lat, curPos.lng], {
        duration: 1
      });
      if (angle != null) tempNPCShip.setRotationAngle(-angle);
    }
  };

  const addMovingNPCBoat = data => {
    console.log("Add moving boat run");
    const {
      index,
      curPos
    } = data;
    if (index == null || curPos == null || animatedShipsLayer.current == null || animatedBoatManager.RadarMarkers.length > 10) return;
    console.log(index);
    let tempCurrentMovingShips = animatedBoatManager.RadarMarkers;
    let tempMarker = new (external_leaflet_drift_marker_default())([curPos.lat, curPos.lng], {
      icon: NPCBoatIcon,
      draggable: false
    });
    animatedShipsLayer.current.addLayer(tempMarker);
    tempCurrentMovingShips.push(tempMarker);
    animatedBoatManager.setRadarMarker(tempCurrentMovingShips);
  };

  (0,external_react_.useEffect)(() => {
    const ctx = radarCanvas.current.getContext('2d'); // draw radar indicator

    const frameHeight = frame.current.clientHeight;
    const frameWidth = frame.current.clientWidth;
    setSize({
      height: frameHeight,
      width: frameWidth
    });
    const imageData = ctx.getImageData(0, 0, frameWidth, frameHeight);
    ctx.clearRect(0, 0, frameWidth, frameHeight);
    (0,map_helper/* drawRadar */.WA)(ctx, imageData);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'purple';
    ctx.arc(imageData.width / 2, imageData.height / 2, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.moveTo(imageData.width / 2, imageData.height / 2);
    ctx.lineTo(imageData.width / 2, -imageData.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'purple';
    ctx.moveTo(imageData.width / 2, imageData.height / 2);
    ctx.lineTo(imageData.width / 2, imageData.height / 2 - imageData.height / 4);
    ctx.stroke();
  }, [radarCanvas.current]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    ref: frame,
    className: "w-full h-full relative",
    children: [/*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
      className: "absolute",
      style: {
        transform: `rotate(0deg)`,
        width: '300%',
        height: '300%',
        top: '-100%',
        left: '-100%'
      },
      animate: {
        transform: `rotate(${boatAngle}deg)`
      },
      transition: {
        duration: 0.001
      },
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_leaflet_.MapContainer, {
        zoomControl: false,
        attributionControl: false,
        whenCreated: setMapReference,
        renderer: external_leaflet_default().canvas(),
        preferCanvas: true,
        dragging: false,
        center: localCurPos,
        zoom: zoomPower,
        scrollWheelZoom: false,
        style: {
          height: "100%",
          width: "100%"
        },
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl, {
          position: "topright",
          children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.BaseLayer, {
            checked: true,
            name: "Base Map",
            children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.TileLayer // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            , {
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            })
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.Overlay, {
          name: "Ships",
          children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayerGroup, {
            ref: shipsLayer
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.Overlay, {
          name: "AnimatedShips",
          children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayerGroup, {
            ref: animatedShipsLayer
          })
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("canvas", _objectSpread(_objectSpread({
      ref: radarCanvas
    }, autoSize), {}, {
      className: "absolute z-40"
    })), /*#__PURE__*/jsx_runtime_.jsx(topRightIndicator, {
      boatManager: boatManager,
      serialControl: serialControl
    })]
  });
};

/* harmony default export */ const radar_map = (RadarMap);

/***/ })

};
;