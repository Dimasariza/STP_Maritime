"use strict";
exports.id = 652;
exports.ids = [652];
exports.modules = {

/***/ 652:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ map)
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
// EXTERNAL MODULE: external "leaflet-drift-marker"
var external_leaflet_drift_marker_ = __webpack_require__(630);
var external_leaflet_drift_marker_default = /*#__PURE__*/__webpack_require__.n(external_leaflet_drift_marker_);
// EXTERNAL MODULE: external "leaflet-rotatedmarker"
var external_leaflet_rotatedmarker_ = __webpack_require__(607);
// EXTERNAL MODULE: ./components/red-map/red-map.jsx
var red_map = __webpack_require__(925);
// EXTERNAL MODULE: ./helpers/store.js + 2 modules
var store = __webpack_require__(387);
;// CONCATENATED MODULE: ./components/engine/boatSpecHelper.js
let indicatorValues = [[0, 0, 0, 0, 0], [300, 1, 21, 5, 4.5], [600, 3, 42, 10, 9], [900, 4, 63, 15, 13.5], [1200, 5, 84, 20, 18], [1500, 6, 105, 25, 22.5], [1800, 8, 126, 30, 27], [2100, 9, 147, 35, 31.5], [2400, 10, 168, 40, 36], [2700, 11, 189, 45, 40.5], [3000, 13, 210, 50, 45], [3300, 14, 231, 55, 49.5], [3600, 15, 252, 60, 54], [3900, 16, 273, 65, 58.5], [4200, 18, 294, 70, 63], [4500, 19, 315, 75, 67.5], [4800, 20, 336, 80, 72], [5100, 21, 357, 85, 76.5], [5400, 23, 378, 90, 90], [5700, 24, 399, 95, 85.5], [6000, 25, 420, 100, 90]];
const getIndicatorValues = index => {
  return indicatorValues[index];
};
const getIndicatorMaxValues = () => {
  return indicatorValues[indicatorValues.length - 1];
};
const searchIndicatorValues = GPS_Speed => {
  for (let i = 0; i < indicatorValues.length; i++) {
    if (indicatorValues[i][1] >= GPS_Speed.toFixed(0)) {
      return i;
    }
  }

  return 0;
};

function returnSpeedBasedOnTrim(trim) {
  for (let i = 0; i < indicatorValues.length; i++) {
    if (indicatorValues[i][3] >= trim) {
      return indicatorValues[i][1];
    }
  }
}

const checkSpeedCode = currentSpeed => {
  if (currentSpeed == 0) return 'STP';

  if (currentSpeed >= returnSpeedBasedOnTrim(100)) {
    return 'FLH';
  } else if (currentSpeed >= returnSpeedBasedOnTrim(75)) {
    return 'HLH';
  } else if (currentSpeed >= returnSpeedBasedOnTrim(50)) {
    return 'SLH';
  } else {
    return 'DSH';
  }
};
// EXTERNAL MODULE: ./components/engine/mathHelper.js
var mathHelper = __webpack_require__(334);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(282);
;// CONCATENATED MODULE: ./components/boat-control/boat-control.jsx
const _excluded = ["serialControl", "play", "autoDrive", "targetBoatSpeed", "boatManager", "engineControl"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }











let timeFrame = 60 / 100; //second
// 67340/84584

let timeMultiplier = 3600;
let latDivider = 110574;
let lngDivider = 111320;
let knotToKmph = 1.852;

const BoatControl = _ref => {
  let {
    serialControl,
    play,
    autoDrive,
    targetBoatSpeed,
    boatManager,
    engineControl
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  //console.log("==Boat control re render")
  let boatSpeedVector = (0,store/* default */.Z)(state => state.boatSpeed);
  let boatMarkerAngle = (0,store/* default */.Z)(state => state.boatAngle); // let autoDrive = useStore(state => state.autoDrive)

  let curPos = (0,store/* default */.Z)(state => state.currentPosition);
  let aPath = (0,store/* default */.Z)(state => state.aPath);
  const {
    0: perSecMove,
    1: setPerSecMove
  } = (0,external_react_.useState)({
    lat: 0.0,
    lng: 0.0
  });
  const {
    0: angleMove,
    1: setAngleMove
  } = (0,external_react_.useState)({
    x: 0.0,
    y: 0.0
  });
  const {
    0: inpAngle,
    1: setInputAngle
  } = (0,external_react_.useState)(-45);
  const {
    0: inpTimeMultiplier,
    1: setInputMultiplier
  } = (0,external_react_.useState)(1);
  const {
    0: inpAutoDrive,
    1: setInputAutoDrive
  } = (0,external_react_.useState)(false);
  const {
    0: clickInteractMode,
    1: setClickInteractMode
  } = (0,external_react_.useState)(null);
  let {
    0: path,
    1: setPath
  } = (0,external_react_.useState)([]);
  const {
    0: onRender,
    1: setOnRender
  } = (0,external_react_.useState)(true);
  let previousAccelerationDelta = Date.now();
  const {
    0: acceleration,
    1: setAcceleration
  } = (0,external_react_.useState)(0);
  const {
    0: inpSpeed,
    1: setInputSpeed
  } = (0,external_react_.useState)(25);
  const {
    0: currentBoatspeed,
    1: setCurrentBoatSpeed
  } = (0,external_react_.useState)(0); // const [targetBoatSpeed, setTargetBoatSpeed] = useState(0);

  const {
    0: currentBoatAngle,
    1: setCurrentBoatAngle
  } = (0,external_react_.useState)(0);
  let accelTimer = external_react_default().useRef();

  const calcSpeed = kmphSpeed => {
    let travelDist = knotToKmph * kmphSpeed * timeFrame; // travel distance during time frame in km/sec 

    let tempPersec = {
      lat: travelDist / latDivider,
      lng: travelDist / lngDivider
    };
    setPerSecMove(tempPersec);
  };

  const calcAngle = angle => {
    let originalPosition = {
      x: 0,
      y: 1
    }; //Set original angle to north

    let TempAngleMove = {
      x: Math.cos(angle * Math.PI / 180) * originalPosition.x - Math.sin(angle * Math.PI / 180) * originalPosition.y,
      y: Math.sin(angle * Math.PI / 180) * originalPosition.x + Math.cos(angle * Math.PI / 180) * originalPosition.y
    };
    setAngleMove(TempAngleMove);
  };

  const calculateAutoDrive = () => {
    let aPath = store/* default.getState */.Z.getState().aPath;
    console.log(aPath);

    if (aPath.length > 1) {
      const nextPos = aPath.length - 2;
      if (aPath.length < 3) stopNavigation();
      let selectedNode = {
        lat: aPath[nextPos].lat,
        lng: aPath[nextPos].lng
      };
      if (!selectedNode) return;
      var angleDeg = Math.atan2(selectedNode.lng - curPos.lng, selectedNode.lat - curPos.lat) * 180 / Math.PI * -1;
      console.log("Cur pos is  = " + curPos.lat + " X " + curPos.lng);
      calcAngle(angleDeg);
    } else {
      stopNavigation();
    }
  };

  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
  };

  (0,external_react_.useEffect)(() => {
    calculateSideAngle();
  }, [curPos]);

  function getSurroundingAverageWeight(boatPixelPos, Tiles, range) {
    let startX = boatPixelPos.x >= range ? boatPixelPos.x - range : 0;
    let startY = boatPixelPos.y >= range ? boatPixelPos.y - range : 0;
    let endX = boatPixelPos.x + range >= Tiles.length - 1 ? Tiles.length - 1 : boatPixelPos.x + range;
    let endY = boatPixelPos.y + range >= Tiles[0].length - 1 ? Tiles[0].length - 1 : boatPixelPos.y + range;
    let totalWeight = 0;
    let totalTiles = (endX - startX) * (endY - startY);

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        totalWeight += Tiles[i][j].weight;
      }
    }

    return totalWeight / totalTiles;
  }

  const calculateSideAngle = () => {
    let Tiles = store/* default.getState */.Z.getState().Tiles;
    let boatPixelPos = store/* default.getState */.Z.getState().pixelBoatPosition;
    if (!Tiles || !boatPixelPos) return;
    let fowardPos = {
      x: clamp(Math.round(angleMove.x), -1, 1),
      y: clamp(Math.round(angleMove.y) * -1, -1, 1)
    };
    let rightPos = {
      x: fowardPos.y * -1,
      y: fowardPos.x
    };
    let leftPos = {
      x: fowardPos.y,
      y: fowardPos.x * -1
    };
    let weightLeft = Tiles[boatPixelPos.x + leftPos.x][boatPixelPos.y + leftPos.y].weight;
    let weightRight = Tiles[boatPixelPos.x + rightPos.x][boatPixelPos.y + rightPos.y].weight;
    let surroundingAverage = getSurroundingAverageWeight(boatPixelPos, Tiles, 3);
    store/* default.setState */.Z.setState({
      forwardDirection: fowardPos,
      rightDirection: rightPos,
      leftDirection: leftPos,
      shipLeftWeight: weightLeft,
      shipRightWeight: weightRight,
      shipAverageWeight: surroundingAverage
    }); // console.log({weightLeft: weightLeft, weightRight: weightRight})
  };

  const applyNavigation = () => {
    console.log("Apply navigation called");
    accelDeccel(currentBoatspeed, targetBoatSpeed, 10);

    if (inpAutoDrive) {
      setPath(store/* default.getState */.Z.getState().aPath);
      calculateAutoDrive();
      boatMarkerAngle = getAngleFromVectorDirection(angleMove);
    } else {
      calcAngle(inpAngle);
      boatMarkerAngle = -inpAngle;
    }

    store/* default.setState */.Z.setState({
      allowMovement: true,
      boatAngle: boatMarkerAngle,
      departureTime: Date.now()
    });
  };

  const stopNavigation = () => {
    console.log("Stop navigation called");
    serialControl.sendCode('INIT');
    accelDeccel(currentBoatspeed, 0, 10);
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km

    var dLat = deg2rad(lat2 - lat1); // deg2rad below

    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getVectorFromLatLng(lat1, lng1, lat2, lng2) {
    let dLon = lng2 - lng1;
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return {
      x: x,
      y: y
    };
  }

  (0,external_react_.useEffect)(() => {
    // console.log("Auto path trigger")
    let currentPath = store/* default.getState */.Z.getState().aPath; // console.log(currentPath)

    if (inpAutoDrive && currentPath.length > 0) {
      let tresholdDistance = 0.02;
      let nextPos = currentPath.length - 2;
      let selectNode = {
        lat: 0,
        lng: 0
      };

      if (currentPath.length >= 3) {
        nextPos = currentPath.length - 2;
        selectNode = {
          lat: currentPath[nextPos].lat,
          lng: currentPath[nextPos].lng
        };
      } else if (currentPath.length == 2) {
        nextPos = 0;
        selectNode = {
          lat: currentPath[nextPos].lat,
          lng: currentPath[nextPos].lng
        };
      } else if (currentPath.length == 1) {
        let lastDest = store/* default.getState */.Z.getState().destinationPosition;
        selectNode = {
          lat: lastDest.lat,
          lng: lastDest.lng
        };
      } else {
        stopNavigation();
        return;
      }

      calcSpeed(currentBoatspeed);
      let tempAngle = {
        x: 0,
        y: 0
      };
      tempAngle.x = selectNode.lng - curPos.lng;
      tempAngle.y = selectNode.lat - curPos.lat;

      while (Math.abs(tempAngle.x) < 0.09 && Math.abs(tempAngle.y) < 0.09) {
        tempAngle.x = tempAngle.x * 10;
        tempAngle.y = tempAngle.y * 10;
      }

      while (Math.abs(tempAngle.x) < 0.5 && Math.abs(tempAngle.y) < 0.5) {
        tempAngle.x = tempAngle.x * 2;
        tempAngle.y = tempAngle.y * 2;
      }

      boatMarkerAngle = getAngleFromVectorDirection(tempAngle);
      console.log(store/* default.getState */.Z.getState().boatAngle.toString());
      getAngleDiffrence(store/* default.getState */.Z.getState().boatAngle, boatMarkerAngle);
      setAngleMove(tempAngle);
      currentPath[currentPath.length - 1] = curPos;
      let distanceInKm = getDistanceFromLatLonInKm(curPos.lat, curPos.lng, selectNode.lat, selectNode.lng);

      if (distanceInKm <= tresholdDistance) {
        if (currentPath.length == 1) {
          stopNavigation();
          return;
        } else {
          currentPath.splice(nextPos, 1);
        }
      }

      setPath(currentPath);
      store/* default.setState */.Z.setState({
        boatAngle: boatMarkerAngle
      }); // console.log(distanceInKm)
    }
  }, [curPos]);

  function getAngleDiffrence(boatAngleRN, targetAngle) {
    if (store/* default.getState */.Z.getState().allowMovement) {
      let adjustedBoatAngle = (0,mathHelper/* convertToPositiveAngle */.QI)(boatAngleRN);
      let adjustedTargetAngle = (0,mathHelper/* convertToPositiveAngle */.QI)(targetAngle);
      let diff = adjustedTargetAngle - adjustedBoatAngle;
      console.log("Angel Diffrence is " + diff);

      if (Math.abs(diff) <= 10) {
        console.log("Go Straight");
        serialControl.sendCode('ZR');
        return;
      }

      if (diff > 180 || diff < 0) {
        console.log("Turn Left");
        let roundedDiff = clamp(Math.round(diff / 10) * 10, 10, 80) / 2;
        serialControl.sendCode('P' + roundedDiff);
      } else {
        console.log("Turn Right");
        let roundedDiff = clamp(Math.round(makeBetween180(diff) / 10) * 10, 10, 80) / 2;
        serialControl.sendCode('S' + roundedDiff);
      }
    }
  }

  function makeBetween180(diff) {
    if (diff > 180) {
      diff = 360 - 180;
    } else if (diff < 0) {
      diff = Math.abs(diff);
    }

    return diff;
  }

  (0,external_react_.useEffect)(() => {
    // console.log("Boat speed vector updated")
    calculateSideAngle();
    boatSpeedVector.lat = perSecMove.lat * angleMove.y * inpTimeMultiplier;
    boatSpeedVector.lng = perSecMove.lng * angleMove.x * inpTimeMultiplier;
    store/* default.setState */.Z.setState({
      boatSpeed: boatSpeedVector
    });
  }, [perSecMove, angleMove]);
  (0,external_react_.useEffect)(() => {
    // console.log("Speed is now = " + currentBoatspeed);
    let speedCode = checkSpeedCode(currentBoatspeed);
    calcSpeed(currentBoatspeed);
    store/* default.setState */.Z.setState({
      currentBoatspeed: currentBoatspeed
    });
  }, [currentBoatspeed]);
  (0,external_react_.useEffect)(() => {
    if (accelTimer.current != null) clearTimeout(accelTimer.current);
    accelLoop();
  }, [acceleration]);

  function accelDeccel(startSpeed, duration) {
    // setTargetBoatSpeed(targetSpeed)
    setAcceleration((targetBoatSpeed - startSpeed) / duration);
  }

  function accelLoop() {
    let accelerationDelta = Date.now() - previousAccelerationDelta;
    let predictedSpeed = store/* default.getState */.Z.getState().currentBoatspeed + accelerationDelta / 1000 * acceleration; // console.log("Accel is = " + acceleration + ", currentBoatSpeed = " + predictedSpeed+", End speed = " + endSpeed)

    if (acceleration > 0 && predictedSpeed >= targetBoatSpeed || acceleration < 0 && predictedSpeed <= targetBoatSpeed) {
      setCurrentBoatSpeed(targetBoatSpeed);
      return;
    }

    accelTimer.current = setTimeout(() => {
      setCurrentBoatSpeed(preState => preState + accelerationDelta / 1000 * acceleration);
      accelLoop(targetBoatSpeed);
      return () => {
        clearTimeout(accelTimer.current);
      };
    }, 500);
    previousAccelerationDelta = Date.now();
  }

  function getAngleFromVectorDirection(angle) {
    var angle = Math.atan2(angle.x, angle.y) * 180 / Math.PI;
    return angle;
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "h-full overflow-auto",
    children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: " Autoboat control panel "
    }), /*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: " Speed (Knot) "
    }), /*#__PURE__*/jsx_runtime_.jsx("input", {
      type: "number",
      value: inpSpeed,
      onChange: e => setInputSpeed(e.target.value)
    }), /*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: " Forward Angle (Counter Clockwise)"
    }), /*#__PURE__*/jsx_runtime_.jsx("input", {
      type: "number",
      value: inpAngle,
      onChange: e => setInputAngle(e.target.value)
    }), /*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: " Time multiplier (Default = 1)"
    }), /*#__PURE__*/jsx_runtime_.jsx("input", {
      type: "number",
      value: inpTimeMultiplier,
      onChange: e => setInputMultiplier(e.target.value)
    }), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("input", {
      type: "checkbox",
      name: "autoDrive",
      value: inpAutoDrive,
      onChange: e => setInputAutoDrive(e.target.value)
    }), /*#__PURE__*/jsx_runtime_.jsx("label", {
      children: "Auto Drive"
    }), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
        type: "radio",
        name: "clickMode",
        value: "Boat",
        onChange: e => {
          store/* default.setState */.Z.setState({
            clickControl: "Boat"
          });
        }
      }), " Add Marker (Click to add) ", /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("input", {
        type: "radio",
        name: "clickMode",
        value: "Start",
        onChange: e => {
          store/* default.setState */.Z.setState({
            clickControl: "Start"
          });
        }
      }), " Move Start Marker ", /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("input", {
        type: "radio",
        name: "clickMode",
        value: "End",
        onChange: e => {
          store/* default.setState */.Z.setState({
            clickControl: "End"
          });
        }
      }), " Move End Marker ", /*#__PURE__*/jsx_runtime_.jsx("br", {})]
    }), /*#__PURE__*/jsx_runtime_.jsx("button", {
      onClick: () => applyNavigation(),
      children: " Apply changes "
    }), /*#__PURE__*/jsx_runtime_.jsx("br", {}), /*#__PURE__*/jsx_runtime_.jsx("button", {
      onClick: () => stopNavigation(),
      children: " Stop Boat "
    }), /*#__PURE__*/jsx_runtime_.jsx("br", {})]
  });
};

/* harmony default export */ const boat_control = (BoatControl);
// EXTERNAL MODULE: ./node_modules/react-icons/bi/index.esm.js
var index_esm = __webpack_require__(516);
// EXTERNAL MODULE: ./node_modules/react-icons/md/index.esm.js
var md_index_esm = __webpack_require__(434);
// EXTERNAL MODULE: ./node_modules/react-icons/ri/index.esm.js
var ri_index_esm = __webpack_require__(352);
;// CONCATENATED MODULE: ./components/live-map/toolbars.jsx
const toolbars_excluded = ["enabled", "triggerAlert", "onChange", "boatManager"];

function toolbars_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = toolbars_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function toolbars_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









const Toolbars = _ref => {
  let {
    enabled,
    triggerAlert,
    onChange,
    boatManager
  } = _ref,
      props = toolbars_objectWithoutProperties(_ref, toolbars_excluded);

  const maximumSpeed = 25;
  const {
    0: mapShow,
    1: setMapShow
  } = (0,external_react_.useState)(true);
  const {
    0: animBoatShow,
    1: setAnimBoatShow
  } = (0,external_react_.useState)(true);
  const {
    0: show,
    1: setShow
  } = (0,external_react_.useState)('');
  const {
    0: play,
    1: setPlay
  } = (0,external_react_.useState)(false);
  const {
    0: autoDrive,
    1: setAutoDrive
  } = (0,external_react_.useState)(false);
  const {
    0: triggerRender,
    1: setTriggerRender
  } = (0,external_react_.useState)(0);
  const {
    0: showDrawer,
    1: setShowDrawer
  } = (0,external_react_.useState)(false);
  const speedInp = (0,external_react_.useRef)();
  const toggleDrawer = (0,external_react_.useRef)();
  const {
    0: data,
    1: setData
  } = (0,external_react_.useState)({
    mapClass: 'absolute z-0 opacity-100'
  });
  (0,external_react_.useEffect)(() => {
    const mapClass = mapShow ? 'absolute z-0 opacity-100' : 'absolute z-0 opacity-0';
    setData({
      mapClass: mapClass,
      play: play,
      autoDrive: autoDrive,
      triggerRenderCount: triggerRender,
      speed: speedInp.current.value,
      animBoatShow: animBoatShow
    });
  }, [mapShow, animBoatShow, play, autoDrive, triggerRender]);
  (0,external_react_.useEffect)(() => {
    onChange(data);
  }, [data]);
  (0,external_react_.useEffect)(() => {
    speedInp.current.value = 25;
  }, []);

  const reRendering = () => {
    toggleDrawer.current.checked = false;
    setShowDrawer(toggleDrawer.current.checked);
    setTriggerRender(triggerRender + 1);
  };

  const tools = /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "flex flex-col",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "tools",
      children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
        htmlFor: "tools",
        className: "label text-sm",
        children: "Tools"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "px-4 flex flex-wrap w-full",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": play ? 'Stop' : 'Play',
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: `btn btn-xs hover:opacity-100 opacity-50`,
            onClick: () => {
              setPlay(prefix => !prefix);
            },
            children: play ? /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiStop */.tAB, {}) : /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiPlay */.PHf, {})
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": "Auto Drive",
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: `btn btn-xs hover:opacity-100 ${autoDrive ? 'opacity-100' : 'opacity-50'}`,
            onClick: () => {
              setAutoDrive(prefix => !prefix);
            },
            children: /*#__PURE__*/jsx_runtime_.jsx(ri_index_esm/* RiSteeringFill */.yCE, {})
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": "Generate Path",
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "btn btn-xs opacity-50 hover:opacity-100",
            onClick: reRendering,
            children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiRefresh */.t5J, {})
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": (mapShow ? "Hide" : "Show") + ' Map',
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "btn btn-xs opacity-50 hover:opacity-100",
            onClick: () => setMapShow(prefix => !prefix),
            children: mapShow ? /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiHide */.nJ9, {}) : /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiShow */.A7v, {})
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": "Departure",
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: `btn btn-xs hover:opacity-100 ${show == 'Start' ? 'opacity-100' : 'opacity-50'}`,
            onClick: () => {
              setShow('Start');
              boatManager.clickControl = 'Start';
            },
            children: /*#__PURE__*/jsx_runtime_.jsx(md_index_esm/* MdDirectionsBoatFilled */.JDL, {})
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": "Destination",
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: `btn btn-xs hover:opacity-100 ${show == 'End' ? 'opacity-100' : 'opacity-50'}`,
            onClick: () => {
              setShow('End');
              boatManager.clickControl = 'End';
            },
            children: /*#__PURE__*/jsx_runtime_.jsx(md_index_esm/* MdLocationOn */.$0r, {})
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": "Obstacle",
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: `btn btn-xs hover:opacity-100 ${show == 'Boat' ? 'opacity-100' : 'opacity-50'}`,
            onClick: () => {
              setShow('Boat');
              boatManager.clickControl = 'Boat';
            },
            children: /*#__PURE__*/jsx_runtime_.jsx(md_index_esm/* MdDirectionsBoatFilled */.JDL, {
              className: "text-yellow-400"
            })
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": (animBoatShow ? "Hide" : "Show") + ' Animated Boats',
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: "btn btn-xs opacity-50 hover:opacity-100",
            onClick: () => setAnimBoatShow(prefix => !prefix),
            children: animBoatShow ? /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiHide */.nJ9, {
              className: "text-yellow-400"
            }) : /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiShow */.A7v, {
              className: "text-yellow-400"
            })
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          "data-tip": "Clear Selection",
          className: "tooltip",
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: `btn btn-xs hover:opacity-100 ${show == 'Boat' ? 'opacity-100' : 'opacity-50'}`,
            onClick: () => {
              setShow('');
              boatManager.clickControl = '';
              boatManager.clearObstacles();
            },
            children: /*#__PURE__*/jsx_runtime_.jsx(md_index_esm/* MdClear */.lUB, {})
          })
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "form-control",
      children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
        htmlFor: "speed",
        className: "label",
        children: /*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "text-sm",
          children: "Speed (kt)"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("input", {
        ref: speedInp,
        onKeyUp: e => {
          const value = e.target.value;

          if (value > maximumSpeed) {
            triggerAlert({
              description: 'Boat reach the maximum speed',
              icon: /*#__PURE__*/jsx_runtime_.jsx(md_index_esm/* MdWarning */.YTL, {}),
              apply: null
            });
            setTimeout(() => {
              speedInp.current.value = maximumSpeed;
            }, 2000);
          }
        },
        id: "speed",
        type: "number",
        min: "0",
        max: "25",
        className: "input input-bordered input-xs"
      })]
    })]
  });

  const handleDrawer = drawer => {
    if (enabled) setShowDrawer(drawer.target.checked);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: `absolute z-50 top-0 w-full h-full ${showDrawer ? '' : 'pointer-events-none'}`,
      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
        onChange: handleDrawer,
        ref: toggleDrawer,
        id: "my-drawer",
        type: "checkbox",
        className: "drawer-toggle"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: `drawer-side h-full ${showDrawer ? '' : 'pointer-events-none'}`,
        children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
          htmlFor: "my-drawer",
          className: "drawer-overlay"
        }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
          className: "menu w-1/4 p-4 overflow-y-auto bg-black opacity-90 text-base-content",
          children: /*#__PURE__*/jsx_runtime_.jsx("li", {
            children: tools
          })
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("label", {
      className: `absolute z-50`,
      htmlFor: enabled ? 'my-drawer' : '',
      className: "absolute z-50 bottom-0 btn btn-xs drawer-button",
      children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* BiCog */.MBj, {})
    })]
  });
};

/* harmony default export */ const toolbars = (Toolbars);
;// CONCATENATED MODULE: ./events/alert/alert.jsx
const alert_excluded = ["id", "callback"];



function alert_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = alert_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function alert_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Alert = _ref => {
  let {
    id,
    callback
  } = _ref,
      props = alert_objectWithoutProperties(_ref, alert_excluded);

  const handleCallback = status => {
    callback({
      id: id,
      status
    });
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "alert",
    children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
      className: "text-3xl text-red-700",
      children: props.icon
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "flex-1",
      children: /*#__PURE__*/jsx_runtime_.jsx("label", {
        className: "mx-3 text-white text-sm",
        children: props.description
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "flex-none",
      children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
        className: "btn btn-sm btn-ghost mr-2 text-red-700 font-bold",
        onClick: () => handleCallback('cancel'),
        children: "Cancel"
      }), props.apply && /*#__PURE__*/jsx_runtime_.jsx("button", {
        className: "btn btn-sm btn-success",
        onClick: () => handleCallback('ok'),
        children: props.apply ? props.apply : 'Apply'
      })]
    })]
  });
};

/* harmony default export */ const alert_alert = (Alert);
// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(614);
;// CONCATENATED MODULE: ./events/alert/alert-manager.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class AlertManager extends external_events_.EventEmitter {
  constructor() {
    super();

    _defineProperty(this, "callback", data => {
      const {
        id,
        status
      } = data;

      const index = this._alert.findIndex(a => a.props.id == id);

      console.log('index remove: ' + index);

      this._alert.splice(index, 1);

      this.emit("change", _objectSpread(_objectSpread({}, data), {}, {
        remain: this._alert
      }));
    });

    _defineProperty(this, "generateAlert", alertData => /*#__PURE__*/jsx_runtime_.jsx(alert_alert, _objectSpread(_objectSpread({}, alertData), {}, {
      callback: this._callback
    }), alertData.id));

    _defineProperty(this, "create", alertData => {
      const alert = this.generateAlert(alertData);

      this._alert.push(alert);

      console.log(this._alert);
      return alert;
    });

    _defineProperty(this, "show", () => this._alert);

    _defineProperty(this, "cleanup", () => {
      this._alert.length = 0;
    });

    this._alert = []; // this._callback = listener

    this._callback = this.callback.bind(this);
  }

}
;// CONCATENATED MODULE: ./components/live-map/map.jsx
const map_excluded = ["serialControl", "boatManager", "animatedBoatManager"];

function map_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function map_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { map_ownKeys(Object(source), true).forEach(function (key) { map_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { map_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function map_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function map_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = map_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function map_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

















const speed = 30; //Kmph

const direction = 0;
let focusOnBoat = false;
const alertManager = new AlertManager();

const LiveMap = _ref => {
  let {
    serialControl,
    boatManager,
    animatedBoatManager
  } = _ref,
      props = map_objectWithoutProperties(_ref, map_excluded);

  //console.log("==Live map re render")
  let curPos = boatManager.curPos;
  let destPos = boatManager.destPos; // console.log([curPos, destPos])

  let centerPoint = {
    lat: (curPos.lat + destPos.lat) / 2,
    lng: (curPos.lng + destPos.lng) / 2
  };
  let zoomPower = 12;
  let mapRef = external_react_default().useRef();
  let iconsLayer = external_react_default().useRef();
  let routeLayer = external_react_default().useRef();
  let shipsLayer = external_react_default().useRef();
  let animatedShipsLayer = external_react_default().useRef();
  const routeOptions = {
    color: 'red'
  };
  let boatRotation = 0;
  const {
    0: map,
    1: setMap
  } = (0,external_react_.useState)(null);
  const {
    0: layers,
    1: setLayers
  } = (0,external_react_.useState)([]);
  const {
    0: aPath,
    1: setAPath
  } = (0,external_react_.useState)([]);
  const {
    0: animatedObstacleBoats,
    1: setAnimatedObstacleBoats
  } = (0,external_react_.useState)([]);
  const {
    0: pointMarkers,
    1: setMarkers
  } = (0,external_react_.useState)({
    boat: null,
    dest: null
  });
  const playerBoatIcon = new (external_leaflet_default()).icon({
    iconUrl: "./markerIcons/marker-icon.png",
    iconSize: new (external_leaflet_default()).Point(10, 20)
  });
  const NPCBoatIcon = new (external_leaflet_default()).icon({
    iconUrl: "./markerIcons/otherBoat-icon.png",
    iconSize: new (external_leaflet_default()).Point(10, 20)
  });

  const setMapReference = map => {
    console.log("Run on map created"); //if(boatMarker) return

    serialControl.sendCode('INIT');
    mapRef.current = map;
    mapRef.current.addLayer(iconsLayer.current);
    mapRef.current.addLayer(routeLayer.current);
    mapRef.current.addLayer(shipsLayer.current);
    mapRef.current.addLayer(animatedShipsLayer.current);
    const boatMarker = new (external_leaflet_drift_marker_default())([curPos.lat, curPos.lng], {
      icon: playerBoatIcon,
      rotationAngle: boatRotation,
      rotationOrigin: "center"
    });
    const destMarker = new (external_leaflet_drift_marker_default())([destPos.lat, destPos.lng], {
      draggable: false
    });
    iconsLayer.current.addLayer(boatMarker);
    iconsLayer.current.addLayer(destMarker);
    if (boatManager.boatAngle != null) boatMarker.setRotationAngle(-boatManager.boatAngle);
    setMarkers({
      boat: boatMarker,
      dest: destMarker
    });
    setMap(map);
    setLayers([iconsLayer.current, routeLayer.current, animatedShipsLayer.current]);
    boatManager.cancelDataListener(); // listenig boat movement

    handleBoatMovement(boatMarker, destMarker);
    handleObstacleRemoval();
    handleNPCBoatMovement();
    handleAnimatedBoatShowHide();
    handleManualSteeringControl();
    setupStartingNPCBoats(animatedBoatManager.autoNPCBoatRoute);
    boatManager.resetMapObstacle();
  };

  const setupStartingNPCBoats = routes => {
    for (let i = 0; i < routes.length; i++) {
      addNewNPCMovingShip(i, routes[i]);
    } // console.log(animatedObstacleBoats)


    animatedBoatManager.start();
  };

  const handleObstacleRemoval = () => {
    boatManager.on('removeObstacle', () => {
      if (mapRef.current == null) return;

      for (let i = 0; i < boatManager.mapStaticObstacle.length; i++) {
        mapRef.current.removeLayer(boatManager.mapStaticObstacle[i]);
      }

      boatManager.resetMapObstacle();
    });
  };

  const handleNPCBoatMovement = () => {
    animatedBoatManager.on('moveNPCMarker', data => {
      const {
        movingBoats
      } = data;
      if (movingBoats == null || movingBoats.length != 10) return;

      for (let i = 0; i < movingBoats.length; i++) {
        const {
          curPos,
          angle
        } = movingBoats[i];
        let tempNPCShip = animatedObstacleBoats[i];

        if (tempNPCShip == null) {
          console.log("Ship " + i + " not found in map.");
          return;
        }

        tempNPCShip.slideTo([curPos.lat, curPos.lng], {
          duration: 1
        });
        if (angle != null) tempNPCShip.setRotationAngle(-angle);
      }
    });
  };

  const handleAnimatedBoatShowHide = () => {
    animatedBoatManager.on('showHideAnimatedBoat', data => {
      const {
        show
      } = data;
      if (show == null) return;

      if (show) {
        mapRef.current.addLayer(animatedShipsLayer.current);
      } else {
        mapRef.current.removeLayer(animatedShipsLayer.current);
      }
    });
  };

  const handleManualSteeringControl = () => {
    serialControl.socket.on('message', data => {
      // console.log("Status = " + boatManager.autoDrive)
      if (!boatManager.autoDrive) {
        let splitCommand = data.split(",");
        let steer = splitCommand[0].split("$");
        manualBoatSteer(steer[1], splitCommand[1]);
      }
    });
  };

  const manualBoatSteer = (turnAngle, throttle) => {
    // console.log("Steer = " + turnAngle +", Throttle = " + throttle)
    if (throttle.length > 3) {
      throttle = throttle.substring(0, 3);
    } // console.log("Steer = " + turnAngle +", Throttle = " + throttle)


    boatManager.manualSteer(turnAngle, throttle);
  };

  function ClickMovements() {
    let position = null;
    const mapEvnt = (0,external_react_leaflet_.useMapEvents)({
      click(e) {
        console.log("Trigger click at ");
        let conds = boatManager.clickControl.split("-");
        let coord = e.latlng;
        console.log(coord);
        let idx = conds.length > 1 ? parseInt(conds[1]) : null;

        switch (conds[0]) {
          case "Boat":
            // console.log("Obstacle ship")
            let tempMarker = new (external_leaflet_drift_marker_default())([coord.lat, coord.lng], {
              icon: NPCBoatIcon,
              draggable: false
            });
            mapRef.current.addLayer(tempMarker);
            boatManager.addMapObstacle(tempMarker);
            boatManager.setAddShipChange(coord);
            reRendering(trigger + 1);
            break;

          case "Start":
            // console.log("Start Move")
            pointMarkers.boat.setLatLng([coord.lat, coord.lng]);
            position = {
              lat: coord.lat,
              lng: coord.lng
            };
            boatManager.setBoatPosChange(position);
            break;

          case "End":
            // console.log("End Move")
            pointMarkers.dest.setLatLng([coord.lat, coord.lng]);
            position = {
              lat: coord.lat,
              lng: coord.lng
            };
            boatManager.setDestPosChange(position);
            break;
        }
      }

    });
    return position === null ? null : /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.Marker, {
      position: position,
      children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.Popup, {
        children: "You are here"
      })
    });
  }

  function addNewNPCMovingShip(idx, coord) {
    let targetCoord = coord;

    if (Array.isArray(coord)) {
      targetCoord = coord[0];
    }

    let movingMarker = new (external_leaflet_drift_marker_default())([targetCoord.lat, targetCoord.lng], {
      icon: NPCBoatIcon,
      draggable: false
    });
    animatedShipsLayer.current.addLayer(movingMarker);
    let tempMovingShips = animatedObstacleBoats;
    tempMovingShips.push(movingMarker);
    setAnimatedObstacleBoats(tempMovingShips);
    animatedBoatManager.addMovingNPCShip(idx, targetCoord, coord);
  }

  function getFinalRoute() {
    return [destPos, curPos];
  }

  const handleRedMapResult = result => {
    mapRef.current.addLayer(iconsLayer.current);
    mapRef.current.addLayer(routeLayer.current);

    if (animatedBoatManager.show) {
      mapRef.current.addLayer(animatedShipsLayer.current);
    }

    let selectedRoute = result.path.length == 1 ? getFinalRoute() : result.path;
    let convertedRoute = objectToArray(selectedRoute);
    setAPath(convertedRoute); // console.log(boatManager.curPos)
    // console.log(aPath)
    // console.log(result.tiles)

    boatManager.initialize({
      boundaries: result.boundaries != null ? result.boundaries : null,
      imageData: result.imageData != null ? result.imageData : null,
      aPath: result.path != null ? selectedRoute : null,
      tiles: result.tiles != null ? result.tiles : null
    });
  };

  const objectToArray = path => {
    let result = [];

    for (let i = 0; i < path.length; i++) {
      let arr = [path[i].lat, path[i].lng];
      result.push(arr);
    }

    return result;
  };

  const handleBoatMovement = (boatMarker, destMarker) => {
    boatManager.on('move', data => {
      const {
        boatAngle,
        curPos
      } = data;
      boatMarker.setRotationAngle(-boatAngle);
      boatMarker.slideTo([curPos.lat, curPos.lng], {
        duration: 1
      });
    });
  };

  const {
    0: mapClass,
    1: setMapclass
  } = (0,external_react_.useState)('absolute z-0 opacity-100');
  const {
    0: boatControl,
    1: setBoatControl
  } = (0,external_react_.useState)({
    play: false,
    autoDrive: false,
    targetBoatSpeed: 0
  });
  const {
    0: trigger,
    1: setTrigger
  } = (0,external_react_.useState)(0);

  const handleToolbarChange = toolbarData => {
    // console.log(toolbarData)
    // set map class
    setMapclass(toolbarData.mapClass); // set boat control props

    setBoatControl({
      play: toolbarData.play,
      autoDrive: toolbarData.autoDrive
    }); // handle re rendering process

    if (trigger != toolbarData.triggerRenderCount && map) reRendering(toolbarData.triggerRenderCount); // handle change speed when stop

    if (toolbarData.play) {
      var _toolbarData$speed;

      const speed = parseInt((_toolbarData$speed = toolbarData.speed) !== null && _toolbarData$speed !== void 0 ? _toolbarData$speed : 0);
      setBoatControl({
        targetBoatSpeed: speed
      }); // broadcast to use new speed

      boatManager.start(parseInt(speed), toolbarData.autoDrive);
    } else if (!toolbarData.play) {
      boatManager.stop();
    }

    if (toolbarData.animBoatShow != null && toolbarData.animBoatShow != animatedBoatManager.show) {
      animatedBoatManager.showHideAnimatedBoat(toolbarData.animBoatShow);
    }

    if (boatManager.autoDrive != toolbarData.autoDrive) boatManager.setBoatAutoDrive(toolbarData.autoDrive);
  };

  const reRendering = count => {
    map.removeLayer(iconsLayer.current);
    map.removeLayer(routeLayer.current);
    map.removeLayer(animatedShipsLayer.current);
    setTrigger(count);
  };

  const {
    0: alerts,
    1: setAlert
  } = (0,external_react_.useState)([]);
  (0,external_react_.useEffect)(() => {
    // handle alert manager listener
    alertManager.on("change", data => {
      const {
        id,
        status,
        remain
      } = data;
      setAlert([...remain]);

      if (status === 'ok') {
        boatManager.refuel(); // handle status ok on alert id 
      } else if (status === 'cancel') {// handle status cancel on alert id
      }
    });
    boatManager.on('fuel', data => {
      const {
        fuel,
        msg
      } = data; // showing alert fuel not enough/empty

      const alert = alertManager.create({
        id: alerts.length,
        description: msg,
        icon: /*#__PURE__*/jsx_runtime_.jsx(md_index_esm/* MdLocalGasStation */.Cwk, {}),
        apply: 'refuel'
      });
      setAlert([...alerts, alert]);
    });
    serialControl.on('data', data => {
      const {
        command
      } = data;
      if (command != "syncronizeScreen") return;
      boatManager.emitSynchronizeData("All");
    }); // clean event after close

    return () => {
      alertManager.cleanup();
      boatManager.cleanup();
      animatedBoatManager.cleanup();
      boatManager.setupDataListener();
    };
  }, []);
  const {
    0: enabled,
    1: setEnabled
  } = (0,external_react_.useState)(false);

  const statusChange = status => {
    // this state used for enable click setting drawer
    if (status.index === 2) setEnabled(true);else setEnabled(false);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "w-full h-full relative",
    children: [/*#__PURE__*/jsx_runtime_.jsx(red_map/* default */.Z, {
      className: "absolute z-20",
      map: map,
      onStatus: statusChange,
      layers: layers,
      triggerRender: trigger,
      onResult: handleRedMapResult,
      realTimeBy: [curPos, destPos],
      boatManager: boatManager
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: `w-full h-full top-0 left-0 ${mapClass}`,
      children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.MapContainer, {
        attributionControl: false,
        whenCreated: setMapReference,
        renderer: external_leaflet_default().canvas(),
        preferCanvas: true,
        dragging: true,
        center: centerPoint,
        zoom: zoomPower,
        scrollWheelZoom: false,
        style: {
          height: "100%",
          width: "100%"
        },
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_react_leaflet_.LayersControl, {
          position: "topright",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.BaseLayer, {
            checked: true,
            name: "Base Map",
            children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.TileLayer // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            , {
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.Overlay, {
            name: "Marker with popup",
            children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayerGroup, {
              ref: iconsLayer
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.Overlay, {
            name: "Moving Boats",
            children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayerGroup, {
              ref: animatedShipsLayer
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.Overlay, {
            name: "Route",
            children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayerGroup, {
              ref: routeLayer,
              children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.Polyline, {
                pathOptions: routeOptions,
                positions: aPath
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayersControl.Overlay, {
            name: "Static Boats",
            children: /*#__PURE__*/jsx_runtime_.jsx(external_react_leaflet_.LayerGroup, {
              ref: shipsLayer,
              children: /*#__PURE__*/jsx_runtime_.jsx(ClickMovements, {})
            })
          })]
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(toolbars, {
      enabled: enabled,
      triggerAlert: alertData => {
        const alert = alertManager.create(map_objectSpread({
          id: alerts.length
        }, alertData));
        setAlert([...alerts, alert]);
      },
      onChange: handleToolbarChange,
      boatManager: boatManager
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "absolute z-0 opacity-0 left-full",
      children: /*#__PURE__*/jsx_runtime_.jsx(boat_control, map_objectSpread(map_objectSpread({
        serialControl: serialControl
      }, boatControl), {}, {
        boatManager: boatManager
      }))
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "absolute flex flex-col z-50 top-0 w-full",
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "flex flex-col",
        children: alerts
      })
    })]
  });
};

/* harmony default export */ const map = (LiveMap);

/***/ })

};
;