"use strict";
exports.id = 925;
exports.ids = [925];
exports.modules = {

/***/ 114:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wl": () => (/* binding */ coordinateToPixel),
/* harmony export */   "WA": () => (/* binding */ drawRadar),
/* harmony export */   "p7": () => (/* binding */ pathToCoordinate),
/* harmony export */   "Bc": () => (/* binding */ generatePathData)
/* harmony export */ });
/* unused harmony exports longLatToPixel, drawTiles, drawPath, drawCircle, pixelToLongLat, getMoveVector, trimRoute, drawRadarIndicator, turnRedMap */
/* harmony import */ var _services_cv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(178);

const longLatToPixel = ({
  lat,
  lng
}, imageData, {
  northEast,
  southWest
}) => {
  let pixel = {
    y: 0,
    x: 0
  };
  pixel.y = (lat - northEast.lat) / (southWest.lat - northEast.lat) * imageData.height;
  pixel.x = (lng - southWest.lng) / (northEast.lng - southWest.lng) * imageData.width;
  return pixel;
};
const coordinateToPixel = (from, to, imageData, boundaries) => {
  return {
    from: longLatToPixel(from, imageData, boundaries),
    to: longLatToPixel(to, imageData, boundaries)
  };
};
const drawTiles = (ctx, imageData, tileSize, Tiles) => {
  let iIdx = 0;

  for (let i = 0; i < imageData.width; i += tileSize) {
    let jIdx = 0;

    for (let j = 0; j < imageData.height; j += tileSize) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "white";
      ctx.rect(i, j, tileSize, tileSize);
      ctx.stroke();
      ctx.font = "5px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      let iWeight = Tiles[iIdx][jIdx].weight; // console.log(iWeight)

      ctx.fillText(iWeight, i + tileSize / 2 - 1, j + tileSize / 2 - 1);
      jIdx++;
    }

    iIdx++;
  }
};
const drawPath = (ctx, paths, tileSize) => paths.forEach(p => {
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokeStyle = "blue";
  ctx.rect(p.index.x * tileSize, p.index.y * tileSize, tileSize, tileSize);
  ctx.stroke();
});
const drawRadar = (ctx, image) => {
  drawCircle(ctx, image, "gray", 1, 0.5);
  drawCircle(ctx, image, "white", 3, 1);
  drawCircle(ctx, image, "gray", 1, 1.5);
};
const drawCircle = (ctx, {
  width,
  height
}, color, circleWidth, radiusMultiplier) => {
  ctx.beginPath();
  ctx.lineWidth = circleWidth.toString();
  ctx.strokeStyle = color;
  ctx.arc(width / 2, height / 2, (height / 2 - circleWidth) * radiusMultiplier, 0, 2 * Math.PI);
  ctx.stroke();
};
const pixelToLongLat = ({
  x,
  y
}, image, tileSize, {
  southWest,
  northEast
}) => {
  let tilePos = {
    y: y * tileSize + tileSize / 2,
    x: x * tileSize + tileSize / 2
  };
  const realPos = {
    lat: 0,
    lng: 0
  };
  realPos.lat = tilePos.y / image.height * (southWest.lat - northEast.lat) + northEast.lat;
  realPos.lng = tilePos.x / image.width * (northEast.lng - southWest.lng) + southWest.lng;
  return realPos;
};
const getMoveVector = (pos1, pos2) => {
  return {
    x: pos1.x - pos2.x,
    y: pos1.y - pos2.y
  };
};
const trimRoute = path => {
  if (path[0] == null || path[path.length - 1] == null) return path;
  let newPath = [path[0]];

  for (let i = 1; i < path.length - 1; i++) {
    let checkPrev = getMoveVector(path[i - 1], path[i]);
    let checkNext = getMoveVector(path[i + 1], path[i]);
    if (checkPrev.x != 0) checkPrev.x *= -1;
    if (checkPrev.y != 0) checkPrev.y *= -1;

    if (!(checkPrev.x == checkNext.x && checkPrev.y == checkNext.y)) {
      newPath.push(path[i]);
    }
  }

  newPath.push(path[path.length - 1]);
  return newPath;
};
const pathToCoordinate = (path, image, tileSize, boundaries) => {
  let trimmedPath = trimRoute(path);
  let savedPath = trimmedPath.map(p => pixelToLongLat(p, image, tileSize, boundaries));
  return savedPath;
};
const drawRadarIndicator = (ctx, start, end, tileSize, {
  forward,
  left,
  right
}) => {
  let rectSize = tileSize;
  let rectOffset = rectSize / 2;
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.fillStyle = "red";
  ctx.fillRect(start.x + tileSize * forward.x, start.y + tileSize * forward.y, rectSize, rectSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.fillStyle = "yellow";
  ctx.fillRect(start.x + tileSize * left.x, start.y + tileSize * left.y, rectSize, rectSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.fillStyle = "brown";
  ctx.fillRect(start.x + tileSize * right.x, start.y + tileSize * right.y, rectSize, rectSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.fillStyle = "blue";
  ctx.fillRect(start.x, start.y, rectSize, rectSize);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.fillStyle = "green";
  ctx.fillRect(end.x, end.y, rectSize, rectSize);
  ctx.stroke();
};
const turnRedMap = async (ctx, imageData) => {
  await cv.load();
  const {
    data: {
      payload
    }
  } = await cv.turnRed(imageData); //, TileSize, mapStartPos, mapDestPos])

  console.log(payload);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(payload, 0, 0);
};
const generatePathData = async (startPos, destPos, tileSize, map, imageData) => {
  const northEast = map.getBounds()._northEast;

  const southWest = map.getBounds()._southWest;

  const boundaries = {
    northEast: northEast,
    southWest: southWest
  };
  const {
    from,
    to
  } = coordinateToPixel(startPos, destPos, imageData, boundaries); //Make image red and calculate weight
  // console.log({map: imageData, from: from, to: to, tileSize: TileSize})

  await _services_cv__WEBPACK_IMPORTED_MODULE_0__/* .default.load */ .Z.load();
  const {
    data: {
      payload: {
        result,
        tilePath,
        tiles
      }
    }
  } = await _services_cv__WEBPACK_IMPORTED_MODULE_0__/* .default.imageProcessing */ .Z.imageProcessing({
    map: imageData,
    from: from,
    to: to,
    tileSize: tileSize
  }); //, TileSize, mapStartPos, mapDestPos])

  const pixelPath = tilePath.map(tile => tile.index);
  const longlatPath = pathToCoordinate(pixelPath, result, tileSize, boundaries);
  return {
    imageData: result,
    path: longlatPath,
    tiles: tiles,
    boundaries: boundaries
  };
};

/***/ }),

/***/ 925:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var leaflet_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(941);
/* harmony import */ var leaflet_image__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet_image__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radar_map_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(114);
/* harmony import */ var _services_cv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(178);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(762);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(893);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
const _excluded = ["map", "layers", "onResult", "onStatus", "triggerRender", "realTimeBy", "boatManager"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }











const Status = {
  start: {
    text: 'Processing Map',
    index: 0
  },
  inProcess: {
    text: 'Generate Autonomus Path',
    index: 1
  },
  finish: {
    text: 'Finished Render',
    index: 2
  }
};

const RedMap = _ref => {
  let {
    map,
    layers,
    onResult,
    onStatus,
    triggerRender,
    realTimeBy,
    boatManager
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const mapRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef();
  const [autoSize, setSize] = react__WEBPACK_IMPORTED_MODULE_1___default().useState({
    height: '100%',
    width: '100%'
  });
  const [_status, setStatus] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(Status.start);
  const [_tiles, setTiles] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([]);
  const [mapImageData, setMapImage] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
  const [activateRecalulate, setActivateRecalulate] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
  const [activateReturnPath, setActivateReturnPath] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);

  const removeLayers = async () => layers.map(l => map.removeLayer(l));

  const addLayers = async () => layers.map(l => map.addLayer(l));

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setBoatManagerTriggers();
  }, []);

  function setBoatManagerTriggers() {
    boatManager.on('recalculate', () => {
      // console.log("Recalculate by recaluclate emit")
      setActivateRecalulate(prefix => !prefix);
    });
    boatManager.on('move', () => {
      // console.log("Recalculate by move emit")
      // setActivateRecalulate(prefix => !prefix)
      if (boatManager.autoDrive) {
        setActivateReturnPath(prefix => !prefix);
      } else {
        setActivateRecalulate(prefix => !prefix);
      }
    });
  }

  function replaceStartAndEndTile(path) {
    let curPos = boatManager.curPos;
    let destPos = boatManager.destPos;
    path[0] = destPos;
    path[path.length - 1] = curPos;
    return path;
  }

  const generatePath = async imageData => {
    const startPos = boatManager.curPos;
    const destPos = boatManager.destPos;
    const TileSize = boatManager._tileSize;
    let result = await (0,_radar_map_helper__WEBPACK_IMPORTED_MODULE_2__/* .generatePathData */ .Bc)(startPos, destPos, TileSize, map, imageData);
    result.path = replaceStartAndEndTile(result.path);
    return result;
  };

  const recalculatePath = async imageData => {
    let processedImage = imageData; // if (_status.index != 2) return// 2 means map should be finisih rendered

    const startPos = boatManager.curPos;
    const destPos = boatManager.destPos;
    const TileSize = boatManager._tileSize;
    const savedBoundaries = boatManager._boundaries;
    const {
      from,
      to
    } = (0,_radar_map_helper__WEBPACK_IMPORTED_MODULE_2__/* .coordinateToPixel */ .Wl)(startPos, destPos, processedImage, savedBoundaries);
    const {
      data: {
        payload: {
          aPath
        }
      }
    } = await _services_cv__WEBPACK_IMPORTED_MODULE_3__/* .default.recalculatePath */ .Z.recalculatePath({
      tiles: _tiles,
      from: from,
      to: to,
      tileSize: TileSize,
      imageData: processedImage
    });
    const pixelPath = aPath.map(tile => tile.index); // console.log(savedBoundaries)

    let longlatPath = (0,_radar_map_helper__WEBPACK_IMPORTED_MODULE_2__/* .pathToCoordinate */ .p7)(pixelPath, processedImage, TileSize, savedBoundaries);
    longlatPath = replaceStartAndEndTile(longlatPath);
    return {
      path: longlatPath,
      tiles: _tiles,
      boundaries: savedBoundaries,
      imageData: processedImage
    }; //console.log("XXXUPDATE aPath pixelBoatPosition")
  };

  const mapToCanvas = map => {
    leaflet_image__WEBPACK_IMPORTED_MODULE_0___default()(map, async (err, canvas) => {
      var ctx = mapRef.current.getContext('2d');
      var dimensions = map.getSize();
      setSize({
        height: dimensions.y,
        width: dimensions.x
      }); // get map in canvas 2d from leaflet image

      var _canvasMap = canvas.getContext('2d');

      var imageData = _canvasMap.getImageData(0, 0, dimensions.x, dimensions.y);

      boatManager._processedImage = imageData;
      setMapImage(imageData); // await turnRedMap(ctx, imageData)

      if (onResult) {
        setStatus(Status.inProcess);
        const result = await generatePath(imageData); // save tiles

        setTiles(result.tiles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(result.imageData, 0, 0);
        onResult(result);
        setStatus(Status.finish);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
        setStatus(Status.finish);
      }
    });
  };

  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(() => {
    if (map && layers.length > 0) {
      // hide for render red map
      removeLayers();
      mapToCanvas(map); // console.log(map)
      // show layers map

      addLayers();
    }
  }, [map, layers]);
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(() => {
    if (map) {
      setStatus(Status.start);
      mapToCanvas(map); // console.log(map)
    }
  }, [triggerRender]);
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(async () => {
    var ctx = mapRef.current.getContext('2d');

    if (map && boatManager._boundaries != null) {
      const result = await recalculatePath(mapImageData);
      onResult(result);
    }
  }, [activateRecalulate]);
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(async () => {
    var ctx = mapRef.current.getContext('2d');

    if (map) {
      let currentPath = replaceStartAndEndTile(boatManager._aPath);
      let result = {
        path: currentPath
      };
      onResult(result);
    }
  }, [activateReturnPath]);
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(() => {
    onStatus(_status);
  }, [_status]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "w-full h-full absolute",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
      style: {
        top: -50
      },
      className: "absolute z-50 shadow-xl rounded-br left-0 bg-white flex p-2 items-center",
      animate: _status == Status.finish ? {
        top: -50
      } : {
        top: 0
      },
      transition: {
        duration: 0.5
      },
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_6__/* .FiSettings */ .nbt, {
        className: "mr-3 animate-spin"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("span", {
        className: "text-sm",
        children: _status.text
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx("canvas", _objectSpread({
      className: "pointer-events-none absolute z-0",
      ref: mapRef
    }, autoSize))]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RedMap);

/***/ }),

/***/ 178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CV {
  /**
   * We will use this method privately to communicate with the worker and
   * return a promise with the result of the event. This way we can call
   * the worker asynchronously.
   */
  _dispatch(event) {
    const {
      msg
    } = event;
    this._status[msg] = ['loading'];
    this.worker.postMessage(event);
    return new Promise((res, rej) => {
      let interval = setInterval(() => {
        const status = this._status[msg];

        if ((status === null || status === void 0 ? void 0 : status.length) > 0) {
          if (status[0] === 'done') res(status[1]);
          if (status[0] === 'error') rej(status[1]);

          if (status[0] !== 'loading') {
            delete this._status[msg];
            clearInterval(interval);
          }
        } else {
          console.error('cannot find msg event name !!!');
        }
      }, 50);
    });
  }
  /**
   * First, we will load the worker and capture the onmessage
   * and onerror events to always know the status of the event
   * we have triggered.
   *
   * Then, we are going to call the 'load' event, as we've just
   * implemented it so that the worker can capture it.
   */


  load() {
    this._status = {};
    this.worker = new Worker(`./js/cv.worker.js`); // load worker
    // Capture events and save [status, event] inside the _status object

    this.worker.onmessage = e => this._status[e.data.msg] = ['done', e];

    this.worker.onerror = e => this._status[e.message] = ['error', e];

    return this._dispatch({
      msg: 'load'
    });
  }
  /**
  * We are going to use the _dispatch event we created before to
  * call the postMessage with the msg and the image as payload.
  *
  * Thanks to what we've implemented in the _dispatch, this will
  * return a promise with the processed image.
  */


  turnRed(payload) {
    return this._dispatch({
      msg: 'turnRed',
      payload
    });
  }

  imageProcessing(payload) {
    return this._dispatch({
      msg: 'imageProcessing',
      payload
    });
  }

  recalculatePath(payload) {
    return this._dispatch({
      msg: 'recalculatePath',
      payload
    });
  }

  singleAStar(payload) {
    return this._dispatch({
      msg: 'singleAStar',
      payload
    });
  }

  simpleReddenMap(payload) {
    return this._dispatch({
      msg: 'simpleReddenMap',
      payload
    });
  }

} // Export the same instant everywhere


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new CV());

/***/ })

};
;