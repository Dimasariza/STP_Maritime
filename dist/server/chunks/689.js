"use strict";
exports.id = 689;
exports.ids = [689];
exports.modules = {

/***/ 689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(762);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(804);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(387);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);







const EcoSounder = ({
  boatManager,
  serialControl
}) => {
  let leftRange = {
    min: 60,
    max: 100
  };
  let rightRange = {
    min: 60,
    max: 100
  }; // let heightRange = {min: -60, max: 60} if range 0 - 100

  let heightRange = {
    min: 30,
    max: 60
  };
  const [weightLeft, setWeightLeft] = react__WEBPACK_IMPORTED_MODULE_3___default().useState(leftRange.max);
  const [weightRight, setWeightRight] = react__WEBPACK_IMPORTED_MODULE_3___default().useState(rightRange.max);
  const [heightMeter, setHeightMeter] = react__WEBPACK_IMPORTED_MODULE_3___default().useState(0);
  const [depth, setDepth] = react__WEBPACK_IMPORTED_MODULE_3___default().useState(17);
  const [minDepth, setMinDepth] = react__WEBPACK_IMPORTED_MODULE_3___default().useState(3);
  const [maxDepth, setMaxDepth] = react__WEBPACK_IMPORTED_MODULE_3___default().useState(17);
  const [depthNumberFontSize, setDepthNumberFontSize] = react__WEBPACK_IMPORTED_MODULE_3___default().useState("text-11xl");
  const [depthFontSize, setDepthFontSize] = react__WEBPACK_IMPORTED_MODULE_3___default().useState("text-8xl");
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setBoatManagerTriggers();

    if (boatManager.activateDataListener) {
      boatManager.requestSyncronize("EchoSounder");
    }

    if (boatManager.maximized) {
      setDepthNumberFontSize("text-12xl");
      setDepthFontSize("text-9xl");
    }
  }, []);

  function setBoatManagerTriggers() {
    boatManager.on('move', data => {
      const {
        shipLeftWeight,
        shipRightWeight,
        shipAverageWeight
      } = data; // console.log("Echo sounder Ship left weight = " + shipLeftWeight + "Ship right weight = " + shipRightWeight + "Ship average weight = " + shipAverageWeight)

      calculateEcho(shipLeftWeight, shipRightWeight);
      calculateDepth(shipAverageWeight);
    });
    serialControl.on('data', data => {
      const {
        command,
        shipLeftWeight,
        shipRightWeight,
        shipAverageWeight
      } = data;
      if (command != "echoSounder" || !boatManager.activateDataListener) return;
      if (shipAverageWeight == null) return; // console.log("Echo sounder Ship left weight = " + shipLeftWeight + "Ship right weight = " + shipRightWeight + "Ship average weight = " + shipAverageWeight)

      calculateEcho(shipLeftWeight, shipRightWeight);
      calculateDepth(shipAverageWeight);
    });
  }

  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
  };

  function calculateEcho(triggerLeftChange, triggerRightChange) {
    let TileSize = boatManager._tileSize;
    let maxWeight = Math.pow(TileSize, 2); // let maxWeight = 32

    let multiplier = 1;
    let currentLeft = leftRange.max - triggerRightChange * multiplier / maxWeight * (leftRange.max - leftRange.min);
    let currentRight = rightRange.max - triggerLeftChange * multiplier / maxWeight * (rightRange.max - rightRange.min);
    setWeightLeft(currentLeft);
    setWeightRight(currentRight);
    let highestOfTwo = triggerLeftChange > triggerRightChange ? triggerLeftChange : triggerRightChange; // console.log("Echo level = " + highestOfTwo + " / " + maxWeight + " = " + highestOfTwo/maxWeight)

    let meterLevel = Math.min(highestOfTwo, maxWeight) / maxWeight * (heightRange.max - heightRange.min) + heightRange.min; // console.log(meterLevel)

    setHeightMeter(meterLevel);
  }

  function calculateDepth(shipAverageWeight) {
    let TileSize = boatManager._tileSize;
    let maxWeight = Math.pow(TileSize, 2); // console.log("Depth level " + shipAverageWeight + " / " + maxWeight + " = " + (maxWeight - shipAverageWeight)/maxWeight)

    let calcDepth = (maxWeight - shipAverageWeight) / maxWeight * maxDepth;
    setDepth(clamp(calcDepth, 0, 17));
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "w-full h-full overflow-auto",
    style: {
      backgroundColor: '#2c3d96'
    },
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_0__.motion.div, {
      className: "absolute w-full bottom-0",
      transition: {
        duration: 0.5
      },
      style: {
        left: leftRange.max + '%'
      },
      animate: {
        left: clamp(weightLeft, leftRange.min, leftRange.max) + '%'
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("img", {
        className: "h-full",
        src: "./eco_r.svg",
        alt: "eco sounder right"
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_0__.motion.div, {
      className: "absolute w-full bottom-0",
      transition: {
        duration: 0.5
      },
      style: {
        right: rightRange.max + '%'
      },
      animate: {
        right: clamp(weightRight, rightRange.min, rightRange.max) + '%'
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("img", {
        className: "h-full",
        src: "./eco_l.svg",
        alt: "eco sounder left"
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_0__.motion.div, {
      className: "text-white h-full absolute right-0 flex flex-col",
      transition: {
        duration: 0.5
      },
      style: {
        top: 0 + '%'
      },
      animate: {
        top: heightMeter + '%'
      },
      children: (0,lodash__WEBPACK_IMPORTED_MODULE_1__.range)(0, 150, 50).map(l => {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: "pb-36 text-right font-bold",
          children: l
        }, l);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "text-white font-bold absolute left-0 top-0 flex flex-col",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
        className: `${depthNumberFontSize} p-0 m-0`,
        children: [depth.toFixed(0), "m"]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
        className: `${depthFontSize} p-0 m-0`,
        children: "Depth"
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EcoSounder);

/***/ })

};
;