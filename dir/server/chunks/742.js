"use strict";
exports.id = 742;
exports.ids = [742];
exports.modules = {

/***/ 742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(804);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(387);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(762);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);








const EngineIndicator = ({
  boatManager,
  serialControl
}) => {
  const [engineSpeed, setEngineSpeed] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(0);
  const [engineFuel, setEngineFuel] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(100);
  const [engineLubOil, setEngineLubOil] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(100);
  const [engineOilPressure, setEngineOilPressure] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
    previous: [0, 0],
    current: [0, 0]
  });
  const [engineTrim, setEngineTrim] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
    previous: [0, 0],
    current: [0, 0]
  });
  const [engineRPM, setEngineRPM] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
    previous: [0, 0],
    current: [0, 0]
  });
  const [engineTemperature, setEngineTemperature] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
    previous: [0, 0],
    current: [0, 0]
  });
  const [engineTitleFontSize, setEngineTitleFontSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("text-sm"); //text-sm

  const [indicatorTitleFontSize, setIndicatorTitleFontSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("text-xs"); //xs

  const [indicatorMetersFontSize, setIndicatorMetersFontSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("text-xs"); //xs

  const [voltageFontSize, setVoltageFontSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("text-xs"); //xs

  const [roundIndicatorTitleFontSize, setRoundIndicatorTitleFontSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("text-xs"); //xs

  const [roundPercentageFontSize, setRoundPercentageFontSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("text-2xs"); //xs

  const [lowerTitleFontSize, setLowerTitleFontSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("text-xs"); //xs

  let triggerSpeedChange = (0,_helpers_store__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)(state => state.currentBoatspeed);
  const [visibility, setVisibility] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(true);

  function checkInvisible() {
    if (visibility) {
      return `visible`;
    } else {
      return `invisible`;
    }
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    boatManager.on('changeIndicator', data => {
      const {
        rpm,
        oilPressure,
        trim,
        temperature,
        speed,
        fuel,
        oil
      } = data;
      if (rpm == null || oilPressure == null || trim == null || temperature == null || speed == null || fuel == null || oil == null) return; // console.log("Indicator change from boat manager")

      setEngineRPM(rpm);
      setEngineOilPressure(oilPressure);
      setEngineTrim(trim);
      setEngineTemperature(temperature);
      setEngineSpeed(speed);
      setEngineFuel(fuel);
      setEngineLubOil(oil);
    });
    serialControl.on('data', data => {
      const {
        command,
        rpm,
        oilPressure,
        trim,
        temperature,
        speed,
        fuel,
        oil
      } = data;
      if (command != "changeIndicator" || !boatManager.activateDataListener) return;
      if (speed == null) return;
      setEngineRPM(rpm);
      setEngineOilPressure(oilPressure);
      setEngineTrim(trim);
      setEngineTemperature(temperature);
      setEngineSpeed(speed);
      setEngineFuel(fuel);
      setEngineLubOil(oil);
    });
    boatManager.on('refuel', () => {
      setEngineFuel(100); // refuel to 100%
    });

    if (boatManager.activateDataListener) {
      boatManager.requestSyncronize("EngineIndicator");
    } else {
      boatManager.localSyncronize("EngineIndicator");
    }

    if (boatManager.maximized) {
      setEngineTitleFontSize("text-lg");
      setIndicatorTitleFontSize("text-sm");
      setIndicatorMetersFontSize("text-base");
      setVoltageFontSize("text-lg");
      setRoundIndicatorTitleFontSize("text-base");
      setRoundPercentageFontSize("text-base");
      setLowerTitleFontSize("text-base");
    }

    return () => {
      boatManager.cleanup();
    };
  }, []);

  const YCoordinate = (max, interval, reverse) => {
    const el = value => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `flex items-center justify-end ${reverse ? 'flex-row-reverse' : ''}`,
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
        className: `block ${indicatorMetersFontSize} text-right`,
        children: value
      }), "\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
        className: "flex-1",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("hr", {})
      })]
    }, value);

    const strLength = max.toString().length;
    const render = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.range)(0, max + interval, interval).reverse().map(e => {
      const indexY = e.toString().length < strLength ? (0,lodash__WEBPACK_IMPORTED_MODULE_0__.range)(0, strLength - e.toString().length).map(() => '_').join('') + e.toString() : e.toString();
      return el(indexY);
    });
    return [...render];
  };

  function barTemplate({
    percentage
  }) {
    return `${percentage}%`;
  }

  const BarIndicator = ({
    startPercentage,
    percentage,
    index,
    color
  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "flex flex-col justify-end items-center h-full w-1/2 px-2.5",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "bar relative h-full w-full",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
        transformTemplate: barTemplate,
        initial: {
          height: startPercentage + '%'
        },
        style: {
          height: startPercentage + '%'
        },
        transition: {
          duration: 0
        },
        animate: {
          height: percentage + '%'
        },
        className: `absolute bottom-0 ${color} mr-1 w-full`
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: "bg-gray-800 mr-1 w-full h-full"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
      children: index
    })]
  }, index);

  const ContainerBarIndicator = ({
    title,
    unit,
    max,
    interval,
    bars,
    reverse = false
  }) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
    className: "px-1",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "flex flex-col container rounded-md bg-gray-600 h-full",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "flex justify-between font-bold p-2",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: indicatorTitleFontSize,
          children: title
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: indicatorTitleFontSize,
          children: unit
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: "overflow-hidden flex flex-col items-end h-full border border-black rounded-md relative bg-gradient-to-b from-gray-500 to-gray-600",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "flex-1 p-2 flex flex-col w-full justify-between relative",
          children: [YCoordinate(max, interval, reverse), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
            className: `absolute flex z-40 bottom-0 h-full w-full ${reverse ? 'pr-8 pl-3' : 'pr-3 pl-4'} pt-2.5`,
            children: bars.map(e => BarIndicator(e))
          })]
        })
      })]
    })
  });

  const RPM = () => ContainerBarIndicator({
    title: 'RPM',
    unit: '(1x100)',
    max: 60,
    interval: 20,
    bars: [{
      startPercentage: engineRPM.previous[0],
      percentage: engineRPM.current[0],
      index: 1,
      color: 'bg-blue-500'
    }, {
      startPercentage: engineRPM.previous[1],
      percentage: engineRPM.current[1],
      index: 2,
      color: 'bg-red-500'
    }]
  });

  const OilPressure = () => ContainerBarIndicator({
    title: 'Oil Pressure',
    unit: '(kPa)',
    max: 600,
    interval: 100,
    bars: [{
      startPercentage: engineOilPressure.previous[0],
      percentage: engineOilPressure.current[0],
      index: 1,
      color: 'bg-blue-500'
    }, {
      startPercentage: engineOilPressure.previous[1],
      percentage: engineOilPressure.current[1],
      index: 2,
      color: 'bg-blue-500'
    }]
  });

  const Trim = () => ContainerBarIndicator({
    title: 'Trim',
    unit: '',
    max: 100,
    interval: 20,
    reverse: true,
    bars: [{
      startPercentage: engineTrim.previous[0],
      percentage: engineTrim.current[0],
      index: 1,
      color: 'bg-blue-500'
    }, {
      startPercentage: engineTrim.previous[1],
      percentage: engineTrim.current[1],
      index: 2,
      color: 'bg-blue-500'
    }]
  });

  const EngTemp = () => ContainerBarIndicator({
    title: 'Eng Temp',
    unit: '(°C)',
    max: 90,
    interval: 30,
    reverse: true,
    bars: [{
      startPercentage: engineTemperature.previous[0],
      percentage: engineTemperature.current[0],
      index: 1,
      color: 'bg-blue-500'
    }, {
      startPercentage: engineTemperature.previous[1],
      percentage: engineTemperature.current[1],
      index: 2,
      color: 'bg-blue-500'
    }]
  });

  const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
  };

  const speedNeedleAngleConverter = () => engineSpeed * 4.6;

  const fuelNeedleAngleConverter = () => 45 + 1.84 * clamp(engineFuel, 0, 100);

  const oilNeedleAngleConverter = () => 45 + 1.84 * clamp(engineLubOil, 0, 100);

  function needleTemplate({
    rotate
  }) {
    return `rotate(${rotate})`;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    style: {
      backgroundImage: 'url(./bg_engine.png)',
      backgroundRepeat: 'repeat'
    },
    className: `grid grid-cols-4 gap-1 text-white text-xs bg-gray-900 h-full ${checkInvisible()}`,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: "",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        style: {
          backgroundImage: "url('./Logo Nasdec-STP-ITS.svg')",
          backgroundPositionY: 'center',
          backgroundPositionX: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        },
        className: "rounded bg-white w-full h-full "
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: "col-span-2 text-center align-middle m-auto font-bold",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
        className: engineTitleFontSize,
        children: "ENGINE"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "flex flex-col justify-center container rounded-md bg-gray-600 text-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
        className: `font-bold ${voltageFontSize}`,
        children: "Voltage"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
        className: "flex",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: `flex-1 ${voltageFontSize}`,
          children: "12.5V"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
          className: `flex-1 ${voltageFontSize}`,
          children: "12.5V"
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(OilPressure, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: "col-span-2 row-span-2 text-center text-xs align-middle font-bold",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "grid grid-cols-4 gap-1 h-full",
        children: [(0,lodash__WEBPACK_IMPORTED_MODULE_0__.range)(0, 2).map(e => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "col-span-2",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            style: {
              backgroundImage: "url('./speedmeter.svg')",
              backgroundPositionX: 'center',
              backgroundPositionY: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            },
            className: "relative flex items-center",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
              className: "absolute w-full top-1/3",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
                className: `block ${roundIndicatorTitleFontSize}`,
                children: "AVG SPEED"
              })
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
              className: "absolute w-full bottom-1/5 mb-",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
                className: `block ${roundPercentageFontSize}`,
                children: engineSpeed.toFixed(0)
              })
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.img, {
              transformTemplate: needleTemplate,
              transition: {
                duration: 0
              },
              style: {
                rotate: 0
              },
              animate: {
                rotate: speedNeedleAngleConverter()
              },
              className: "z-30",
              src: "./needle.svg",
              alt: "needle"
            })]
          })
        }, e)), (0,lodash__WEBPACK_IMPORTED_MODULE_0__.range)(0, 4).map((e, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          style: {
            backgroundImage: "url('./fuelmeter.svg')",
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
          },
          className: "relative flex items-center",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
            className: "absolute w-full top-1/4",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
              className: `block ${roundIndicatorTitleFontSize}`,
              children: i % 2 === 0 ? 'FUEL' : 'LUB-OIL'
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
            className: "absolute w-full bottom-1/5 mb-",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
              className: `block ${roundPercentageFontSize}`,
              children: [e % 2 == 0 ? clamp(engineFuel, 0, 100).toFixed(0) : clamp(engineLubOil, 0, 100).toFixed(0), "%"]
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.img, {
            transformTemplate: needleTemplate,
            transition: {
              duration: 0
            },
            style: {
              rotate: 0
            },
            animate: {
              rotate: e % 2 == 0 ? fuelNeedleAngleConverter() : oilNeedleAngleConverter()
            },
            className: "z-30",
            src: "./needle.svg",
            alt: "needle"
          })]
        }, e)), (0,lodash__WEBPACK_IMPORTED_MODULE_0__.range)(0, 2).map((e, i) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "col-span-2 m-auto",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
              className: lowerTitleFontSize,
              children: ["ENGINE ", i + 1]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
              className: lowerTitleFontSize,
              children: ['00', ".", '00', "h"]
            })]
          })
        }, e))]
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(Trim, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(RPM, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(EngTemp, {})]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EngineIndicator);

/***/ })

};
;