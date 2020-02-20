/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "a5d54d6d0431b2331577";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/sweetalert/dist/sweetalert.min.js":
/*!********************************************************!*\
  !*** ./node_modules/sweetalert/dist/sweetalert.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="swal-button";e.CLASS_NAMES={MODAL:"swal-modal",OVERLAY:"swal-overlay",SHOW_MODAL:"swal-overlay--show-modal",MODAL_TITLE:"swal-title",MODAL_TEXT:"swal-text",ICON:"swal-icon",ICON_CUSTOM:"swal-icon--custom",CONTENT:"swal-content",FOOTER:"swal-footer",BUTTON_CONTAINER:"swal-button-container",BUTTON:o,CONFIRM_BUTTON:o+"--confirm",CANCEL_BUTTON:o+"--cancel",DANGER_BUTTON:o+"--danger",BUTTON_LOADING:o+"--loading",BUTTON_LOADER:o+"__loader"},e.default=e.CLASS_NAMES},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getNode=function(t){var e="."+t;return document.querySelector(e)},e.stringToNode=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.insertAfter=function(t,e){var n=e.nextSibling;e.parentNode.insertBefore(t,n)},e.removeNode=function(t){t.parentElement.removeChild(t)},e.throwErr=function(t){throw t=t.replace(/ +(?= )/g,""),"SweetAlert: "+(t=t.trim())},e.isPlainObject=function(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype},e.ordinalSuffixOf=function(t){var e=t%10,n=t%100;return 1===e&&11!==n?t+"st":2===e&&12!==n?t+"nd":3===e&&13!==n?t+"rd":t+"th"}},function(t,e,n){"use strict";function o(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),o(n(25));var r=n(26);e.overlayMarkup=r.default,o(n(27)),o(n(28)),o(n(29));var i=n(0),a=i.default.MODAL_TITLE,s=i.default.MODAL_TEXT,c=i.default.ICON,l=i.default.FOOTER;e.iconMarkup='\n  <div class="'+c+'"></div>',e.titleMarkup='\n  <div class="'+a+'"></div>\n',e.textMarkup='\n  <div class="'+s+'"></div>',e.footerMarkup='\n  <div class="'+l+'"></div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.CONFIRM_KEY="confirm",e.CANCEL_KEY="cancel";var r={visible:!0,text:null,value:null,className:"",closeModal:!0},i=Object.assign({},r,{visible:!1,text:"Cancel",value:null}),a=Object.assign({},r,{text:"OK",value:!0});e.defaultButtonList={cancel:i,confirm:a};var s=function(t){switch(t){case e.CONFIRM_KEY:return a;case e.CANCEL_KEY:return i;default:var n=t.charAt(0).toUpperCase()+t.slice(1);return Object.assign({},r,{text:n,value:t})}},c=function(t,e){var n=s(t);return!0===e?Object.assign({},n,{visible:!0}):"string"==typeof e?Object.assign({},n,{visible:!0,text:e}):o.isPlainObject(e)?Object.assign({visible:!0},n,e):Object.assign({},n,{visible:!1})},l=function(t){for(var e={},n=0,o=Object.keys(t);n<o.length;n++){var r=o[n],a=t[r],s=c(r,a);e[r]=s}return e.cancel||(e.cancel=i),e},u=function(t){var n={};switch(t.length){case 1:n[e.CANCEL_KEY]=Object.assign({},i,{visible:!1});break;case 2:n[e.CANCEL_KEY]=c(e.CANCEL_KEY,t[0]),n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t[1]);break;default:o.throwErr("Invalid number of 'buttons' in array ("+t.length+").\n      If you want more than 2 buttons, you need to use an object!")}return n};e.getButtonListOpts=function(t){var n=e.defaultButtonList;return"string"==typeof t?n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t):Array.isArray(t)?n=u(t):o.isPlainObject(t)?n=l(t):!0===t?n=u([!0,!0]):!1===t?n=u([!1,!1]):void 0===t&&(n=e.defaultButtonList),n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=n(0),a=i.default.MODAL,s=i.default.OVERLAY,c=n(30),l=n(31),u=n(32),f=n(33);e.injectElIntoModal=function(t){var e=o.getNode(a),n=o.stringToNode(t);return e.appendChild(n),n};var d=function(t){t.className=a,t.textContent=""},p=function(t,e){d(t);var n=e.className;n&&t.classList.add(n)};e.initModalContent=function(t){var e=o.getNode(a);p(e,t),c.default(t.icon),l.initTitle(t.title),l.initText(t.text),f.default(t.content),u.default(t.buttons,t.dangerMode)};var m=function(){var t=o.getNode(s),e=o.stringToNode(r.modalMarkup);t.appendChild(e)};e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r={isOpen:!1,promise:null,actions:{},timer:null},i=Object.assign({},r);e.resetState=function(){i=Object.assign({},r)},e.setActionValue=function(t){if("string"==typeof t)return a(o.CONFIRM_KEY,t);for(var e in t)a(e,t[e])};var a=function(t,e){i.actions[t]||(i.actions[t]={}),Object.assign(i.actions[t],{value:e})};e.setActionOptionsFor=function(t,e){var n=(void 0===e?{}:e).closeModal,o=void 0===n||n;Object.assign(i.actions[t],{closeModal:o})},e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(0),a=i.default.OVERLAY,s=i.default.SHOW_MODAL,c=i.default.BUTTON,l=i.default.BUTTON_LOADING,u=n(5);e.openModal=function(){o.getNode(a).classList.add(s),u.default.isOpen=!0};var f=function(){o.getNode(a).classList.remove(s),u.default.isOpen=!1};e.onAction=function(t){void 0===t&&(t=r.CANCEL_KEY);var e=u.default.actions[t],n=e.value;if(!1===e.closeModal){var i=c+"--"+t;o.getNode(i).classList.add(l)}else f();u.default.promise.resolve(n)},e.getState=function(){var t=Object.assign({},u.default);return delete t.promise,delete t.timer,t},e.stopLoading=function(){for(var t=document.querySelectorAll("."+c),e=0;e<t.length;e++){t[e].classList.remove(l)}}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){t.exports=e.sweetAlert=n(9)}).call(e,n(7))},function(t,e,n){(function(e){t.exports=e.swal=n(10)}).call(e,n(7))},function(t,e,n){"undefined"!=typeof window&&n(11),n(16);var o=n(23).default;t.exports=o},function(t,e,n){var o=n(12);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insertAt:"top"};r.transform=void 0;n(14)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=m[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(u(o.parts[i],e));m[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=w[w.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=h++;n=g||(g=s(e)),o=f.bind(null,n,l,!1),r=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),o=d.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=y(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,h=0,w=[],y=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],c=m[s.id];c.refs--,i.push(c)}if(t){o(r(t,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var o=n(17);"undefined"==typeof window||window.Promise||(window.Promise=o),n(21),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var r=0|e,i=Math.max(r>=0?r:o-Math.abs(r),0);i<o;){if(function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}(n[i],t))return!0;i++}return!1}}),"undefined"!=typeof window&&function(t){t.forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})})}([Element.prototype,CharacterData.prototype,DocumentType.prototype])},function(t,e,n){(function(e){!function(n){function o(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(t,this)}function a(t,e){for(;3===t._state;)t=t._value;if(0===t._state)return void t._deferreds.push(e);t._handled=!0,i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:c)(e.promise,t._value);var o;try{o=n(t._value)}catch(t){return void c(e.promise,t)}s(e.promise,o)})}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(r(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)a(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function f(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(o);return a(this,new u(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(t){o(i,t)},n)}e[i]=a,0==--r&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var r=e.length,i=0;i<e.length;i++)o(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},void 0!==t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(18).setImmediate)},function(t,e,n){function o(t,e){this._id=t,this._clearFn=e}var r=Function.prototype.apply;e.setTimeout=function(){return new o(r.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(19),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){(function(t,e){!function(t,n){"use strict";function o(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return l[c]=o,s(c),c++}function r(t){delete l[t]}function i(t){var e=t.callback,o=t.args;switch(o.length){case 0:e();break;case 1:e(o[0]);break;case 2:e(o[0],o[1]);break;case 3:e(o[0],o[1],o[2]);break;default:e.apply(n,o)}}function a(t){if(u)setTimeout(a,0,t);else{var e=l[t];if(e){u=!0;try{i(e)}finally{r(t),u=!1}}}}if(!t.setImmediate){var s,c=1,l={},u=!1,f=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,"[object process]"==={}.toString.call(t.process)?function(){s=function(t){e.nextTick(function(){a(t)})}}():function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),s=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){a(t.data)},s=function(e){t.port2.postMessage(e)}}():f&&"onreadystatechange"in f.createElement("script")?function(){var t=f.documentElement;s=function(e){var n=f.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():function(){s=function(t){setTimeout(a,0,t)}}(),d.setImmediate=o,d.clearImmediate=r}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(7),n(20))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){b&&p&&(b=!1,p.length?m=p.concat(m):v=-1,m.length&&s())}function s(){if(!b){var t=r(a);b=!0;for(var e=m.length;e;){for(p=m,m=[];++v<e;)p&&p[v].run();v=-1,e=m.length}p=null,b=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var u,f,d=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var p,m=[],b=!1,v=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];m.push(new c(t,e)),1!==m.length||b||r(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";n(22).polyfill()},function(t,e,n){"use strict";function o(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,s=i.length;a<s;a++){var c=i[a],l=Object.getOwnPropertyDescriptor(r,c);void 0!==l&&l.enumerable&&(n[c]=r[c])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:o})}t.exports={assign:o,polyfill:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),r=n(6),i=n(5),a=n(36),s=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("undefined"!=typeof window){var n=a.getOpts.apply(void 0,t);return new Promise(function(t,e){i.default.promise={resolve:t,reject:e},o.default(n),setTimeout(function(){r.openModal()})})}};s.close=r.onAction,s.getState=r.getState,s.setActionValue=i.setActionValue,s.stopLoading=r.stopLoading,s.setDefaults=a.setDefaults,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(0),i=r.default.MODAL,a=n(4),s=n(34),c=n(35),l=n(1);e.init=function(t){o.getNode(i)||(document.body||l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"),s.default(),a.default()),a.initModalContent(t),c.default(t)},e.default=e.init},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.MODAL;e.modalMarkup='\n  <div class="'+r+'" role="dialog" aria-modal="true"></div>',e.default=e.modalMarkup},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.OVERLAY,i='<div \n    class="'+r+'"\n    tabIndex="-1">\n  </div>';e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.ICON;e.errorIconMarkup=function(){var t=r+"--error",e=t+"__line";return'\n    <div class="'+t+'__x-mark">\n      <span class="'+e+" "+e+'--left"></span>\n      <span class="'+e+" "+e+'--right"></span>\n    </div>\n  '},e.warningIconMarkup=function(){var t=r+"--warning";return'\n    <span class="'+t+'__body">\n      <span class="'+t+'__dot"></span>\n    </span>\n  '},e.successIconMarkup=function(){var t=r+"--success";return'\n    <span class="'+t+"__line "+t+'__line--long"></span>\n    <span class="'+t+"__line "+t+'__line--tip"></span>\n\n    <div class="'+t+'__ring"></div>\n    <div class="'+t+'__hide-corners"></div>\n  '}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.CONTENT;e.contentMarkup='\n  <div class="'+r+'">\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.BUTTON_CONTAINER,i=o.default.BUTTON,a=o.default.BUTTON_LOADER;e.buttonMarkup='\n  <div class="'+r+'">\n\n    <button\n      class="'+i+'"\n    ></button>\n\n    <div class="'+a+'">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(2),i=n(0),a=i.default.ICON,s=i.default.ICON_CUSTOM,c=["error","warning","success","info"],l={error:r.errorIconMarkup(),warning:r.warningIconMarkup(),success:r.successIconMarkup()},u=function(t,e){var n=a+"--"+t;e.classList.add(n);var o=l[t];o&&(e.innerHTML=o)},f=function(t,e){e.classList.add(s);var n=document.createElement("img");n.src=t,e.appendChild(n)},d=function(t){if(t){var e=o.injectElIntoModal(r.iconMarkup);c.includes(t)?u(t,e):f(t,e)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=n(4),i=function(t){navigator.userAgent.includes("AppleWebKit")&&(t.style.display="none",t.offsetHeight,t.style.display="")};e.initTitle=function(t){if(t){var e=r.injectElIntoModal(o.titleMarkup);e.textContent=t,i(e)}},e.initText=function(t){if(t){var e=document.createDocumentFragment();t.split("\n").forEach(function(t,n,o){e.appendChild(document.createTextNode(t)),n<o.length-1&&e.appendChild(document.createElement("br"))});var n=r.injectElIntoModal(o.textMarkup);n.appendChild(e),i(n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(4),i=n(0),a=i.default.BUTTON,s=i.default.DANGER_BUTTON,c=n(3),l=n(2),u=n(6),f=n(5),d=function(t,e,n){var r=e.text,i=e.value,d=e.className,p=e.closeModal,m=o.stringToNode(l.buttonMarkup),b=m.querySelector("."+a),v=a+"--"+t;if(b.classList.add(v),d){(Array.isArray(d)?d:d.split(" ")).filter(function(t){return t.length>0}).forEach(function(t){b.classList.add(t)})}n&&t===c.CONFIRM_KEY&&b.classList.add(s),b.textContent=r;var g={};return g[t]=i,f.setActionValue(g),f.setActionOptionsFor(t,{closeModal:p}),b.addEventListener("click",function(){return u.onAction(t)}),m},p=function(t,e){var n=r.injectElIntoModal(l.footerMarkup);for(var o in t){var i=t[o],a=d(o,i,e);i.visible&&n.appendChild(a)}0===n.children.length&&n.remove()};e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n(4),i=n(2),a=n(5),s=n(6),c=n(0),l=c.default.CONTENT,u=function(t){t.addEventListener("input",function(t){var e=t.target,n=e.value;a.setActionValue(n)}),t.addEventListener("keyup",function(t){if("Enter"===t.key)return s.onAction(o.CONFIRM_KEY)}),setTimeout(function(){t.focus(),a.setActionValue("")},0)},f=function(t,e,n){var o=document.createElement(e),r=l+"__"+e;o.classList.add(r);for(var i in n){var a=n[i];o[i]=a}"input"===e&&u(o),t.appendChild(o)},d=function(t){if(t){var e=r.injectElIntoModal(i.contentMarkup),n=t.element,o=t.attributes;"string"==typeof n?f(e,n,o):e.appendChild(n)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=function(){var t=o.stringToNode(r.overlayMarkup);document.body.appendChild(t)};e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(6),i=n(1),a=n(3),s=n(0),c=s.default.MODAL,l=s.default.BUTTON,u=s.default.OVERLAY,f=function(t){t.preventDefault(),v()},d=function(t){t.preventDefault(),g()},p=function(t){if(o.default.isOpen)switch(t.key){case"Escape":return r.onAction(a.CANCEL_KEY)}},m=function(t){if(o.default.isOpen)switch(t.key){case"Tab":return f(t)}},b=function(t){if(o.default.isOpen)return"Tab"===t.key&&t.shiftKey?d(t):void 0},v=function(){var t=i.getNode(l);t&&(t.tabIndex=0,t.focus())},g=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l),n=e.length-1,o=e[n];o&&o.focus()},h=function(t){t[t.length-1].addEventListener("keydown",m)},w=function(t){t[0].addEventListener("keydown",b)},y=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l);e.length&&(h(e),w(e))},x=function(t){if(i.getNode(u)===t.target)return r.onAction(a.CANCEL_KEY)},_=function(t){var e=i.getNode(u);e.removeEventListener("click",x),t&&e.addEventListener("click",x)},k=function(t){o.default.timer&&clearTimeout(o.default.timer),t&&(o.default.timer=window.setTimeout(function(){return r.onAction(a.CANCEL_KEY)},t))},O=function(t){t.closeOnEsc?document.addEventListener("keyup",p):document.removeEventListener("keyup",p),t.dangerMode?v():g(),y(),_(t.closeOnClickOutside),k(t.timer)};e.default=O},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(37),a=n(38),s={title:null,text:null,icon:null,buttons:r.defaultButtonList,content:null,className:null,closeOnClickOutside:!0,closeOnEsc:!0,dangerMode:!1,timer:null},c=Object.assign({},s);e.setDefaults=function(t){c=Object.assign({},s,t)};var l=function(t){var e=t&&t.button,n=t&&t.buttons;return void 0!==e&&void 0!==n&&o.throwErr("Cannot set both 'button' and 'buttons' options!"),void 0!==e?{confirm:e}:n},u=function(t){return o.ordinalSuffixOf(t+1)},f=function(t,e){o.throwErr(u(e)+" argument ('"+t+"') is invalid")},d=function(t,e){var n=t+1,r=e[n];o.isPlainObject(r)||void 0===r||o.throwErr("Expected "+u(n)+" argument ('"+r+"') to be a plain object")},p=function(t,e){var n=t+1,r=e[n];void 0!==r&&o.throwErr("Unexpected "+u(n)+" argument ("+r+")")},m=function(t,e,n,r){var i=typeof e,a="string"===i,s=e instanceof Element;if(a){if(0===n)return{text:e};if(1===n)return{text:e,title:r[0]};if(2===n)return d(n,r),{icon:e};f(e,n)}else{if(s&&0===n)return d(n,r),{content:e};if(o.isPlainObject(e))return p(n,r),e;f(e,n)}};e.getOpts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={};t.forEach(function(e,o){var r=m(0,e,o,t);Object.assign(n,r)});var o=l(n);n.buttons=r.getButtonListOpts(o),delete n.button,n.content=i.getContentOpts(n.content);var u=Object.assign({},s,c,n);return Object.keys(u).forEach(function(t){a.DEPRECATED_OPTS[t]&&a.logDeprecation(t)}),u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r={element:"input",attributes:{placeholder:""}};e.getContentOpts=function(t){var e={};return o.isPlainObject(t)?Object.assign(e,t):t instanceof Element?{element:t}:"input"===t?r:null}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.logDeprecation=function(t){var n=e.DEPRECATED_OPTS[t],o=n.onlyRename,r=n.replacement,i=n.subOption,a=n.link,s=o?"renamed":"deprecated",c='SweetAlert warning: "'+t+'" option has been '+s+".";if(r){c+=" Please use"+(i?' "'+i+'" in ':" ")+'"'+r+'" instead.'}var l="https://sweetalert.js.org";c+=a?" More details: "+l+a:" More details: "+l+"/guides/#upgrading-from-1x",console.warn(c)},e.DEPRECATED_OPTS={type:{replacement:"icon",link:"/docs/#icon"},imageUrl:{replacement:"icon",link:"/docs/#icon"},customClass:{replacement:"className",onlyRename:!0,link:"/docs/#classname"},imageSize:{},showCancelButton:{replacement:"buttons",link:"/docs/#buttons"},showConfirmButton:{replacement:"button",link:"/docs/#button"},confirmButtonText:{replacement:"button",link:"/docs/#button"},confirmButtonColor:{},cancelButtonText:{replacement:"buttons",link:"/docs/#buttons"},closeOnConfirm:{replacement:"button",subOption:"closeModal",link:"/docs/#button"},closeOnCancel:{replacement:"buttons",subOption:"closeModal",link:"/docs/#buttons"},showLoaderOnConfirm:{replacement:"buttons"},animation:{},inputType:{replacement:"content",link:"/docs/#content"},inputValue:{replacement:"content",link:"/docs/#content"},inputPlaceholder:{replacement:"content",link:"/docs/#content"},html:{replacement:"content",link:"/docs/#content"},allowEscapeKey:{replacement:"closeOnEsc",onlyRename:!0,link:"/docs/#closeonesc"},allowClickOutside:{replacement:"closeOnClickOutside",onlyRename:!0,link:"/docs/#closeonclickoutside"}}}])});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").clearImmediate))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/assets/css/main.css":
/*!*********************************!*\
  !*** ./src/assets/css/main.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/assets/js/Locale.js":
/*!*********************************!*\
  !*** ./src/assets/js/Locale.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locales_en_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../locales/en.json */ "./src/locales/en.json");
var _locales_en_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../locales/en.json */ "./src/locales/en.json", 1);
/* harmony import */ var _locales_es_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../locales/es.json */ "./src/locales/es.json");
var _locales_es_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../locales/es.json */ "./src/locales/es.json", 1);
/* harmony import */ var _locales_eu_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../locales/eu.json */ "./src/locales/eu.json");
var _locales_eu_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../locales/eu.json */ "./src/locales/eu.json", 1);




const langs = {
    en: _locales_en_json__WEBPACK_IMPORTED_MODULE_0__,
    es: _locales_es_json__WEBPACK_IMPORTED_MODULE_1__,
    eu: _locales_eu_json__WEBPACK_IMPORTED_MODULE_2__
}

class Locale {
    static get availableLocales() {
        return [
            "en",
            "es",
            "eu",
        ];
    }

    static get defaultLocale() {
        return "en";
    }

    static get userLocales() {
        let userLocales = navigator.languages;
        let locales = [];

        for (let i in navigator.languages) {
            if (userLocales[i].length == 2) {
                locales.push(userLocales[i]);
            }
        }

        return locales;
    }

    static get firstMatchLocale() {
        let locales = this.userLocales;

        for (let i in locales) {
            if (this.availableLocales.indexOf(locales[i]) > -1) {
                return locales[i];
            }
        }

        return this.defaultLocale;
    }

    constructor(localeCode) {
        this.changeLocale(localeCode);
    }

    changeLocale(localeCode) {
        if (!localeCode) {
            throw new Error("Locale code must be specified");

        } else if (localeCode.length != 2) {
            throw new Error("Locale code must meet ISO 3166");
        }

        this.code = localeCode;

        this.getTerms()
        .then(status => {
            if (status) {
                this.updateTexts();
            } else {
                // ko
            }
        })
    }

    getTerms() {
        return new Promise((resolve) => {
            this.terms = langs[this.code];
            resolve(true);
            return;
            console.log(langs[this.code]);
            fetch("./locales/" + this.code + ".json")
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else {
                    let error = new Error();
                    error.name = "httpError";
                    error.status = response.status;
                    error.statusText = response.statusText;
                    throw error;
                }
            })
            .then(text => {
                this.terms = JSON.parse(text);
                resolve(true);
            })
            .catch(e => {
                if (e.name == "httpError") {
                    swal({
                        "title": "Error getting the locales",
                        "text": "The server responded with a " + e.status + ", " + e.statusText + ".",
                        "icon": "error"
                    });
                }

                resolve(false);
            });
        });
    }

    updateTexts() {
        let items = document.querySelectorAll("[data-locale-value]");

        items.forEach(item => {
            let value = item.getAttribute("data-locale-value");
            let position = item.getAttribute("data-locale-position").toLowerCase();

            if (position == "text") {
                item.innerText = this.get(value);

            } else {
                item.setAttribute(position, this.get(value));
            }
        });
    }

    get(name, variables) {
        let term = this.terms["terms"];
        let nameParts = name.split(".");

        if (name == "code") {
            return this.code;

        } else if (name == "language") {
            return this.language;
        }

        try {
            for(let i = 0; i < nameParts.length; i++) {
                term = term[nameParts[i]];
            }

            if (variables && typeof variables === "object") {
                for (let name in variables) {
                    term = term.replace("%" + name + "%", variables[name])
                }
            }

        } catch (e) {
            term = name
        }

        return term;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (new Locale(Locale.firstMatchLocale));


/***/ }),

/***/ "./src/assets/js/iTunesAPI.js":
/*!************************************!*\
  !*** ./src/assets/js/iTunesAPI.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return iTunesAPI; });
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "./node_modules/sweetalert/dist/sweetalert.min.js");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Locale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Locale */ "./src/assets/js/Locale.js");




class iTunesAPI {

    static get apiUrl() {
        return "https://itunes.apple.com/search";
    }

    static get loader() {
        let loader = document.createElement("div");
        loader.id = "loader";

        for (let i = 0; i < 4; i++) {
            loader.appendChild(document.createElement("span"));
        }

        return loader;
    }

    static get isOnline() {
        return navigator.onLine;
    }

    static noNetwork() {
        sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
            title: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.no-network.title"),
            text: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.no-network.text"),
            icon: "error"
        });
    }

    static noTerm() {
        sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
            title: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.no-term.title"),
            text: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.no-term.text")
        }).then(function () {
            document.getElementsByName("term")[0].focus();
        });
    }

    static notFound() {
        sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
            title: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.not-found.title"),
            text: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.not-found.text"),
            info: "info"
        }).then(function () {
            document.getElementsByName("term")[0].focus();
        });
    }

    static removeLoader() {
        if (document.getElementById("loader")) {
            document.getElementById("loader").remove();
        }
    }

    constructor(target) {
        this.target = target;
    }

    search(formData) {
        this.target.innerHTML = null;

        if (!iTunesAPI.isOnline) {
            iTunesAPI.noNetwork();

        } else if (!formData.get("term")) {
            iTunesAPI.noTerm();

        } else {
            this.target.appendChild(iTunesAPI.loader);
            this.fetch(formData)
            .then(json => this.showCollection(json))
            .catch(error => iTunesAPI.prototype.manageApiError(error));
        }
    }

    manageApiError(error) {
        iTunesAPI.removeLoader();

        switch(error.type) {
            case "exception":
                sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                    title: "Error",
                    text: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.exception", {
                        "exceptionMsg": error.exception.message
                    }),
                    icon: "error",
                });
                break;

            case "httpError":
                sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                    title: "Error " + error.httpStatus,
                    text: _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.errors.httpError",{
                        "httpStatus": error.httpStatus,
                        "httpResponse": error.httpResponse
                    }),
                    icon: "error"
                });
                break;

            default:
                console.error(error);
                break;
        }

    }

    fetch(formData) {
        return new Promise(function (resolve, reject) {
            let URI = `${iTunesAPI.apiUrl}?term=${formData.get("term")}&country=${formData.get("country")}&media=${formData.get("media")}&entity=${formData.get("entity")}&limit=${formData.get("limit")}`;

            fetch(URI)
            .then(response => {
                if (response.ok) {
                    response.text()
                    .then(body => {
                        resolve(JSON.parse(body));
                    });

                } else {
                    reject({
                        type: "httpError",
                        httpStatus: response.status,
                        httpResponse: response.statusText
                    });
                }

            }).catch(exception => {
                reject({
                    type: "exception",
                    exception: exception
                });
            });
        });
    }

    showCollection(collection) {
        iTunesAPI.removeLoader();

        if (collection.resultCount == 0) {
            iTunesAPI.notFound();

        } else {
            collection.results.forEach(collectionElement => {
                this.displayResult(collectionElement);
            });
        }
    }

    displayResult(collectionElement) {
        let element = document.createElement("div");
        element.classList.add("collectionElement");

        let name = document.createElement("p");
        name.classList.add("collection-name")
        name.innerText = collectionElement.collectionName;

        let downloadLinks = document.createElement("div");
        downloadLinks.classList.add("albumart-download-links")

        let mediumDownloadLink = document.createElement("a");
        mediumDownloadLink.classList.add("albumart-download-link");
        mediumDownloadLink.href = collectionElement.artworkUrl60.replace("60x60", "500x500");
        mediumDownloadLink.target = "_blank";
        mediumDownloadLink.setAttribute("download", "medium.jpg");
        mediumDownloadLink.setAttribute("data-locale-position", "text");
        mediumDownloadLink.setAttribute("data-locale-value", "iTunes-search.download-image.standard-resolution");
        mediumDownloadLink.innerText = _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.download-image.standard-resolution");

        let largeDownloadLink = document.createElement("a");
        largeDownloadLink.classList.add("albumart-download-link");
        largeDownloadLink.href = collectionElement.artworkUrl60.replace("60x60", "5000x5000");
        largeDownloadLink.target = "_blank";
        largeDownloadLink.setAttribute("download", "large.jpg");
        largeDownloadLink.setAttribute("data-locale-position", "text");
        largeDownloadLink.setAttribute("data-locale-value", "iTunes-search.download-image.hight-resolution");
        largeDownloadLink.innerText = _Locale__WEBPACK_IMPORTED_MODULE_1__["default"].get("iTunes-search.download-image.hight-resolution");

        let albumArt = document.createElement("img");
        albumArt.classList.add("albumart");
        albumArt.src = collectionElement.artworkUrl60.replace("60x60", "500x500");

        element.appendChild(name);
        element.appendChild(downloadLinks);
        element.appendChild(albumArt);

        downloadLinks.appendChild(mediumDownloadLink);
        downloadLinks.appendChild(largeDownloadLink);

        this.target.appendChild(element);
    }
}


/***/ }),

/***/ "./src/assets/js/main.js":
/*!*******************************!*\
  !*** ./src/assets/js/main.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Locale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Locale */ "./src/assets/js/Locale.js");
/* harmony import */ var _iTunesAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iTunesAPI */ "./src/assets/js/iTunesAPI.js");



document.addEventListener("DOMContentLoaded", init);

let api,
    form;

function init() {
    if (!isSupported()) {
        swal({
            title: "Unsupported browser",
            text: "You browser does not support some of the functions, please consider upgrading it or changing to a more modern one",
            icon: "error"
        });

        return;
    }

    console.info("Selected \"%s\" locale.", _Locale__WEBPACK_IMPORTED_MODULE_0__["default"].constructor.firstMatchLocale);

    api = new _iTunesAPI__WEBPACK_IMPORTED_MODULE_1__["default"](document.getElementById("response"));

    form = document.getElementById("search-iTunes");
    form.addEventListener("submit", function (e) {
        let formData = new FormData(this);
        formData.set("media", document.querySelector("#search-iTunes [name=entity]").selectedOptions[0].parentNode.getAttribute("label").toLowerCase());

        e.preventDefault();

        api.search(formData);

        history.pushState({
            "term": formData.get("term"),
            "country": formData.get("country"),
            "media": formData.get("media"),
            "entity": formData.get("entity"),
            "limit": isNaN(formData.get("limit")) ? 50 : Math.max(Math.min(formData.get("limit"), 200), 1)
        }, document.title, `?q=${formData.get("term")}&country=${formData.get("country")}&entity=${formData.get("entity")}&limit=${formData.get("limit")}`);
    });

    window.addEventListener("popstate", function (event) {
        let data = event.state;
        let formData = new FormData();

        for (let input in data) {
            let value = data[input];
            formData.set(input, value);
            document.getElementsByName(input)[0].value = value;
        }

        api.search(formData);

    });

    if (location.search) {
        let params = location.search.substr(1).split("&");

        let formElement = document.getElementById("search-iTunes");
        let formData = new FormData();
        formData.set("country", "es");
        formData.set("entity", "album");
        formData.set("limit", 50);

        for (let param of params) {
            let data = param.split("=");

            if (data.length == 2) {
                switch (data[0]) {
                    case "q":
                        formData.set("term", data[1]);
                        formElement.querySelector("[name=term]").value = unescape(data[1]);
                        break;
                    case "media":
                        formData.set("media", data[1]);
                        break;
                    case "entity":
                        formData.set("entity", data[1]);
                        formElement.querySelector("[name=entity]").value = data[1];
                        break;
                    case "country":
                        formData.set("country", data[1]);
                        formElement.querySelector("[name=country]").value = data[1];
                        break;
                    case "limit":
                        let limit = isNaN(data[1]) ? 50 : Math.max(Math.min(data[1], 200), 1);
                        formData.set("limit", limit);
                        formElement.querySelector("[name=limit]").value = limit;
                        break;
                }
            }
        }

        if (formData.get("term"))

        api.search(formData);
    }

    initScrollTop();
    createChangeLang();
}

function initScrollTop() {
    let scrollTop = document.getElementById("scrollTop");
    scrollTop.addEventListener("click", function () {
        document.getElementById("title").scrollIntoView({behavior: "smooth"});
    });

    document.addEventListener("scroll", function () {
        if (form.getBoundingClientRect().bottom <= 0) {
            scrollTop.classList.remove("hidden");

        } else {
            scrollTop.classList.add("hidden");
        }
    });
}

function createChangeLang() {
    let list = document.createElement("select");
    list.id = "changeLocale";
    let locales = _Locale__WEBPACK_IMPORTED_MODULE_0__["default"].constructor.availableLocales.sort();

    locales.forEach(loc => {
        let option = document.createElement("option");
        option.value = loc;
        option.innerText = loc;

        if (loc == _Locale__WEBPACK_IMPORTED_MODULE_0__["default"].code) {
            option.selected = "selected";
        }

        list.appendChild(option);
    });

    document.body.appendChild(list);
    list.addEventListener("change", function () {
        _Locale__WEBPACK_IMPORTED_MODULE_0__["default"].changeLocale(this.value);
    })
}

function isSupported() {
    try {
        let requires = [
            FormData,
            new FormData(document.getElementById("search-iTunes")).get("term"),
            Promise,
            fetch,
        ];

        for (let i = 0; i < requires.length; i++) {
            if (typeof requires[i] === "undefined") {
                return false;
            }
        }
        return true;

    } catch (e) {
        return false;
    }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_js_main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/js/main.js */ "./src/assets/js/main.js");



/***/ }),

/***/ "./src/locales/en.json":
/*!*****************************!*\
  !*** ./src/locales/en.json ***!
  \*****************************/
/*! exports provided: code, language, terms, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"code\":\"en\",\"language\":\"english\",\"terms\":{\"title\":\"iTunes API\",\"search-iTunes-form\":{\"term-placeholder\":\"Write here what you want to search for\",\"country-code\":\"us\",\"result-limit\":\"Max results\",\"submit-text\":\"Search\"},\"iTunes-search\":{\"errors\":{\"exception\":\"There was an error making the request: %exceptionMsg%\",\"httpError\":\"The server responded with a %httpStatus% status (%httpResponse%), try again later\",\"no-network\":{\"title\":\"No network detected\",\"text\":\"Seems you have no internet access, connect and try again\"},\"no-term\":{\"title\":\"Term no specified\",\"text\":\"You must write something to search for\"},\"not-found\":{\"title\":\"No results found\",\"text\":\"We coulnd't find anything with the terms you used, revise for misspellings or try writing it with similar words\"}},\"download-image\":{\"standard-resolution\":\"Standard resolution\",\"hight-resolution\":\"Hight resolution\"}}}}");

/***/ }),

/***/ "./src/locales/es.json":
/*!*****************************!*\
  !*** ./src/locales/es.json ***!
  \*****************************/
/*! exports provided: code, language, terms, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"code\":\"es\",\"language\":\"spanish\",\"terms\":{\"title\":\"API de iTunes\",\"search-iTunes-form\":{\"term-placeholder\":\"Inserta aquí el término a buscar\",\"country-code\":\"es\",\"result-limit\":\"Max resultados\",\"submit-text\":\"Buscar\"},\"iTunes-search\":{\"errors\":{\"exception\":\"Ocurrió un error al realizar la búsqueda: %exceptionMsg%\",\"httpError\":\"El servidor respondió con un el estado %httpStatus% (%httpResponse%), vuelve a intentarlo más tarde\",\"no-network\":{\"title\":\"Conexión de red no detectada\",\"text\":\"Parece que no estás conectado a internet, por favor conectate y vuelve a intentarlo\"},\"no-term\":{\"title\":\"Término no especificado\",\"text\":\"Has de indicar algo para realizar la búsqueda\"},\"not-found\":{\"title\":\"Sin resultados\",\"text\":\"No se han encontrado resultados con el termino indicado, revisa la ortografía o prueba con otras palabras\"}},\"download-image\":{\"standard-resolution\":\"Resolución Estandar\",\"hight-resolution\":\"Alta Resolución\"}}}}");

/***/ }),

/***/ "./src/locales/eu.json":
/*!*****************************!*\
  !*** ./src/locales/eu.json ***!
  \*****************************/
/*! exports provided: code, language, terms, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"code\":\"eu\",\"language\":\"basque\",\"terms\":{\"title\":\"iTunesko APIa\",\"search-iTunes-form\":{\"term-placeholder\":\"Jarri hemen bilatu nahiko terminoa\",\"country-code\":\"es\",\"result-limit\":\"Gehiengo emaitzak\",\"submit-text\":\"Bilatu\"},\"iTunes-search\":{\"errors\":{\"exception\":\"Errore bat gertaratu da bilaketa egiterakoan: %exceptionMsg%\",\"httpError\":\"Zerbitzariak %httpStatus% (%httpResponse%) estatuarekin erantzun du, saia zaitez geroago\",\"no-network\":{\"title\":\"Sare konexioa ez aurkitua\",\"text\":\"Internetera ez zaudela konektatuta dirudi, konekta zaitez eta saia zaitez geroago\"},\"no-term\":{\"title\":\"Termino hutsa\",\"text\":\"Zeozer jarri behar duzu gu bilatzeko\"},\"not-found\":{\"title\":\"Emaitza gabe\",\"text\":\"Ez dugu ezer aurkitu idatziko terminoarekin, berrikusi ondo idatzia dagon eta bestela froga ezazu beste hitzekin\"}},\"download-image\":{\"standard-resolution\":\"Bereizmen estandarra\",\"hight-resolution\":\"Bereizmen handia\"}}}}");

/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi ./src/index.js ./src/assets/css/main.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/index.js */"./src/index.js");
module.exports = __webpack_require__(/*! ./src/assets/css/main.css */"./src/assets/css/main.css");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydC9kaXN0L3N3ZWV0YWxlcnQubWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9jc3MvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9Mb2NhbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9pVHVuZXNBUEkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEdBQUc7O1FBRUg7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0I7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxrQkFBa0IsOEJBQThCO1FBQ2hEO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxvQkFBb0IsMkJBQTJCO1FBQy9DO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLG1CQUFtQixjQUFjO1FBQ2pDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsS0FBSztRQUNyQjtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixZQUFZO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0EsY0FBYyw0QkFBNEI7UUFDMUM7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJOztRQUVKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHVDQUF1QztRQUN4RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsc0JBQXNCO1FBQ3ZDO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxVQUFVO1FBQ1Y7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsY0FBYyx3Q0FBd0M7UUFDdEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsU0FBUztRQUNUO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsUUFBUTtRQUNSO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZUFBZTtRQUNmO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0Esc0NBQXNDLHVCQUF1Qjs7O1FBRzdEO1FBQ0E7Ozs7Ozs7Ozs7OztBQ3Z4QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6TEQsbUZBQWUsS0FBaUQsb0JBQW9CLFNBQXVHLENBQUMsaUJBQWlCLG1CQUFtQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxpQkFBaUIsa0JBQWtCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxvQkFBb0IsZUFBZSwwWkFBMFoseUJBQXlCLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLHdCQUF3QixZQUFZLGlDQUFpQyw0QkFBNEIsb0NBQW9DLHlDQUF5Qyw2QkFBNkIsb0JBQW9CLCtCQUErQiwwQkFBMEIsK0JBQStCLHdCQUF3Qiw2REFBNkQsNkJBQTZCLGtFQUFrRSwrQkFBK0Isc0NBQXNDLCtCQUErQixtQkFBbUIsOEVBQThFLGlCQUFpQixhQUFhLGNBQWMsZ0RBQWdELHNDQUFzQyxTQUFTLFdBQVcsWUFBWSxxREFBcUQsOEZBQThGLDJMQUEyTCxpQkFBaUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLFdBQVcsOENBQThDLE9BQU8sMkRBQTJELG1CQUFtQixJQUFJLG9DQUFvQyxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBRSxxQkFBcUIsb0JBQW9CLGtCQUFrQixVQUFVLDRCQUE0QiwyQkFBMkIsbURBQW1ELHVCQUF1QixJQUFJLGVBQWUsR0FBRyxpQkFBaUIsV0FBVyw2QkFBNkIsSUFBSSxXQUFXLHFDQUFxQyxJQUFJLGtCQUFrQixvQ0FBb0MsV0FBVyxzQkFBc0IsSUFBSSxXQUFXLEVBQUUsZUFBZSxZQUFZLHNCQUFzQixXQUFXLEtBQUssMkJBQTJCLE9BQU8sZ0NBQWdDLGVBQWUsU0FBUyxpQkFBaUIsdUNBQXVDLElBQUksV0FBVyxFQUFFLE1BQU0sbUZBQW1GLE1BQU0sOElBQThJLFVBQVUsZ0NBQWdDLDBCQUEwQiw4TEFBOEwsaUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSwrRkFBK0YsZ0NBQWdDLHVDQUF1QywyQkFBMkIsa0JBQWtCLCtCQUErQixpQkFBaUIsS0FBSyxrQkFBa0IsdUJBQXVCLCtCQUErQixtQkFBbUIseUhBQXlILGlCQUFpQixtREFBbUQsa0JBQWtCLFlBQVksaUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxjQUFjLGlDQUFpQyxZQUFZLG1CQUFtQixJQUFJLHdCQUF3QixrQkFBa0IsSUFBSSw4QkFBOEIsZ0RBQWdELDBCQUEwQixvQkFBb0IsOEJBQThCLDhCQUE4QixRQUFRLEdBQUcsb0NBQW9DLG9CQUFvQiwrQkFBK0IsNEJBQTRCLGFBQWEsRUFBRSxhQUFhLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUseUhBQXlILHVCQUF1QixtREFBbUQsaUJBQWlCLHNEQUFzRCx1QkFBdUIsNkJBQTZCLHFDQUFxQyxzQkFBc0IsZUFBZSw4QkFBOEIsU0FBUyw2QkFBNkIsdUJBQXVCLHNCQUFzQixZQUFZLHlDQUF5QywwQkFBMEIsK0NBQStDLFdBQVcsS0FBSywyQkFBMkIsZUFBZSxNQUFNLGFBQWEsWUFBWSxHQUFHLElBQUksaURBQWlELFNBQVMsb0NBQW9DLFlBQVksaUJBQWlCLGFBQWEsNEJBQTRCLGVBQWUsaUJBQWlCLGFBQWEsdUJBQXVCLGVBQWUsaUJBQWlCLHdDQUF3QyxvQkFBb0IsWUFBWSxpQkFBaUIsWUFBWSxxQ0FBcUMsT0FBTyxnQkFBZ0IsbUJBQW1CLFdBQVcsK0JBQStCLGlCQUFpQix5REFBeUQscUJBQXFCLHVDQUF1QywrQkFBK0IsMEJBQTBCLGtCQUFrQixjQUFjLG1DQUFtQywyQkFBMkIsd0JBQXdCLGtCQUFrQixXQUFXLFdBQVcseUJBQXlCLGNBQWMsU0FBUyxrQkFBa0IsOEJBQThCLGdDQUFnQyx3QkFBd0IsVUFBVSwrQkFBK0IsaUNBQWlDLHlCQUF5QixXQUFXLG9DQUFvQyxHQUFHLGtDQUFrQywwQkFBMEIsVUFBVSxHQUFHLGdDQUFnQyx3QkFBd0IsV0FBVyw0QkFBNEIsR0FBRyxrQ0FBa0MsMEJBQTBCLFVBQVUsR0FBRyxnQ0FBZ0Msd0JBQXdCLFdBQVcsZ0NBQWdDLEdBQUcsNEJBQTRCLG9CQUFvQixnQkFBZ0IsVUFBVSxJQUFJLDRCQUE0QixvQkFBb0IsZ0JBQWdCLFVBQVUsSUFBSSw4QkFBOEIsc0JBQXNCLGdCQUFnQixHQUFHLDJCQUEyQixtQkFBbUIsYUFBYSxXQUFXLHdCQUF3QixHQUFHLDRCQUE0QixvQkFBb0IsZ0JBQWdCLFVBQVUsSUFBSSw0QkFBNEIsb0JBQW9CLGdCQUFnQixVQUFVLElBQUksOEJBQThCLHNCQUFzQixnQkFBZ0IsR0FBRywyQkFBMkIsbUJBQW1CLGFBQWEsV0FBVyxvQkFBb0IscUJBQXFCLHVEQUF1RCwrQ0FBK0MsMEJBQTBCLFVBQVUsWUFBWSxTQUFTLGtCQUFrQixpQkFBaUIsbURBQW1ELGtCQUFrQixTQUFTLHlCQUF5Qix5QkFBeUIsVUFBVSxXQUFXLGtCQUFrQixpQkFBaUIsYUFBYSxnQ0FBZ0MsR0FBRyxxQkFBcUIsR0FBRyxzQkFBc0Isd0JBQXdCLEdBQUcscUJBQXFCLEdBQUcsc0JBQXNCLG9CQUFvQixxQkFBcUIscURBQXFELFdBQVcsa0JBQWtCLGtCQUFrQixXQUFXLGFBQWEsZ0JBQWdCLGdDQUFnQyx3QkFBd0IsMkJBQTJCLDhCQUE4QixTQUFTLFdBQVcsaUNBQWlDLHlCQUF5QixtQ0FBbUMsMkJBQTJCLDBCQUEwQiw4QkFBOEIsVUFBVSxVQUFVLGlDQUFpQyx5QkFBeUIsZ0NBQWdDLHdCQUF3QixrREFBa0QsMENBQTBDLDBCQUEwQixXQUFXLFlBQVkscUNBQXFDLGtCQUFrQix1QkFBdUIsa0JBQWtCLFVBQVUsU0FBUyxVQUFVLGtDQUFrQyxVQUFVLFlBQVksc0JBQXNCLFlBQVksa0JBQWtCLFVBQVUsUUFBUSxVQUFVLGlDQUFpQyx5QkFBeUIsMEJBQTBCLFdBQVcseUJBQXlCLGNBQWMsa0JBQWtCLGtCQUFrQixVQUFVLCtCQUErQixXQUFXLFVBQVUsU0FBUyxnQ0FBZ0Msd0JBQXdCLHlDQUF5QyxpQ0FBaUMsZ0NBQWdDLFdBQVcsVUFBVSxTQUFTLGlDQUFpQyx5QkFBeUIsMENBQTBDLGtDQUFrQyxxQ0FBcUMsR0FBRyxpQ0FBaUMseUJBQXlCLEdBQUcsaUNBQWlDLHlCQUF5QixJQUFJLGtDQUFrQywwQkFBMEIsR0FBRyxrQ0FBa0MsMkJBQTJCLDZCQUE2QixHQUFHLGlDQUFpQyx5QkFBeUIsR0FBRyxpQ0FBaUMseUJBQXlCLElBQUksa0NBQWtDLDBCQUEwQixHQUFHLGtDQUFrQywyQkFBMkIscUNBQXFDLEdBQUcsUUFBUSxTQUFTLFNBQVMsSUFBSSxRQUFRLFNBQVMsU0FBUyxJQUFJLFdBQVcsVUFBVSxTQUFTLElBQUksV0FBVyxVQUFVLFNBQVMsR0FBRyxXQUFXLFVBQVUsVUFBVSw2QkFBNkIsR0FBRyxRQUFRLFNBQVMsU0FBUyxJQUFJLFFBQVEsU0FBUyxTQUFTLElBQUksV0FBVyxVQUFVLFNBQVMsSUFBSSxXQUFXLFVBQVUsU0FBUyxHQUFHLFdBQVcsVUFBVSxVQUFVLHNDQUFzQyxHQUFHLFFBQVEsV0FBVyxTQUFTLElBQUksUUFBUSxXQUFXLFNBQVMsSUFBSSxXQUFXLFFBQVEsU0FBUyxHQUFHLFdBQVcsVUFBVSxVQUFVLDhCQUE4QixHQUFHLFFBQVEsV0FBVyxTQUFTLElBQUksUUFBUSxXQUFXLFNBQVMsSUFBSSxXQUFXLFFBQVEsU0FBUyxHQUFHLFdBQVcsVUFBVSxVQUFVLGlCQUFpQixxQkFBcUIsd0JBQXdCLFVBQVUsWUFBWSxZQUFZLGtCQUFrQixpQkFBaUIsK0NBQStDLFdBQVcsa0JBQWtCLFNBQVMseUJBQXlCLHVCQUF1QixVQUFVLFdBQVcsa0JBQWtCLGlCQUFpQixTQUFTLFdBQVcsV0FBVyxZQUFZLGlCQUFpQixtQkFBbUIsa0JBQWtCLFVBQVUsa0JBQWtCLHVCQUF1QixpQkFBaUIsdUJBQXVCLGdCQUFnQixtQkFBbUIsV0FBVyxZQUFZLGVBQWUsWUFBWSxnQkFBZ0IsZUFBZSxlQUFlLGdCQUFnQixZQUFZLHNCQUFzQixnQkFBZ0Isb0JBQW9CLGtCQUFrQixjQUFjLGtCQUFrQixlQUFlLG1CQUFtQixrQkFBa0IsZ0JBQWdCLHdCQUF3QixnQkFBZ0IsOEJBQThCLGlCQUFpQiw2QkFBNkIsbUJBQW1CLFdBQVcsZUFBZSxrQkFBa0IsV0FBVyxtQkFBbUIsbUJBQW1CLGdCQUFnQixxQkFBcUIsU0FBUyxlQUFlLGdCQUFnQixzQkFBc0IsNEJBQTRCLHlCQUF5QixzQkFBc0IsdUJBQXVCLGdCQUFnQixzQkFBc0IsbUJBQW1CLGFBQWEsaUJBQWlCLGlCQUFpQixnQkFBZ0Isa0JBQWtCLHNCQUFzQix5QkFBeUIsMEJBQTBCLHVCQUF1QixXQUFXLHFCQUFxQixrQkFBa0IsYUFBYSx5QkFBeUIsV0FBVyxZQUFZLGdCQUFnQixrQkFBa0IsZ0JBQWdCLGVBQWUsa0JBQWtCLFNBQVMsZUFBZSxtQ0FBbUMseUJBQXlCLG9CQUFvQix5QkFBeUIsbUJBQW1CLGFBQWEseURBQXlELHVCQUF1QixXQUFXLGVBQWUsK0JBQStCLFNBQVMscUJBQXFCLFdBQVcseUJBQXlCLDJDQUEyQyx5QkFBeUIsNEJBQTRCLHlCQUF5QiwyQkFBMkIsMERBQTBELHFCQUFxQix5QkFBeUIsMkNBQTJDLHlCQUF5Qiw0QkFBNEIseUJBQXlCLDJCQUEyQix3REFBd0QsY0FBYyxlQUFlLGdCQUFnQixpQkFBaUIseUJBQXlCLG1CQUFtQiw2Q0FBNkMsd0JBQXdCLHNCQUFzQixZQUFZLGVBQWUsY0FBYyxzQkFBc0IsV0FBVyxpQ0FBaUMsa0JBQWtCLGtCQUFrQiw0QkFBNEIseURBQXlELGFBQWEscUJBQXFCLHdCQUF3QixnQkFBZ0Isc0JBQXNCLGtCQUFrQiwyQ0FBMkMsVUFBVSxxQkFBcUIsa0JBQWtCLFlBQVksV0FBVyxVQUFVLFNBQVMsUUFBUSxvREFBb0QsNENBQTRDLGtCQUFrQixvQkFBb0IsVUFBVSx5QkFBeUIscUJBQXFCLFdBQVcsd0JBQXdCLFVBQVUsV0FBVyxVQUFVLFlBQVksV0FBVyxXQUFXLGtCQUFrQixvQ0FBb0MsMEJBQTBCLGdEQUFnRCx3Q0FBd0MseUNBQXlDLDZCQUE2QixxQkFBcUIseUNBQXlDLDRCQUE0QixvQkFBb0IscUNBQXFDLEdBQUcsV0FBVyxJQUFJLFdBQVcsSUFBSSxVQUFVLEdBQUcsWUFBWSw2QkFBNkIsR0FBRyxXQUFXLElBQUksV0FBVyxJQUFJLFVBQVUsR0FBRyxZQUFZLGNBQWMsZUFBZSxNQUFNLFNBQVMsT0FBTyxRQUFRLGtCQUFrQixZQUFZLGdCQUFnQixnQ0FBZ0MsY0FBYyxvQkFBb0IsVUFBVSx1QkFBdUIscUJBQXFCLFlBQVkscUJBQXFCLHNCQUFzQixZQUFZLDBCQUEwQixVQUFVLG9CQUFvQixzQ0FBc0MsVUFBVSxvQkFBb0Isc0JBQXNCLHFDQUFxQyw2QkFBNkIsc0JBQXNCLFlBQVksWUFBWSxVQUFVLG9CQUFvQixzQkFBc0Isa0JBQWtCLGtCQUFrQixnQkFBZ0IsaUJBQWlCLHFCQUFxQixzQkFBc0IsMkJBQTJCLG1CQUFtQixpQ0FBaUMseUJBQXlCLGNBQWMsNkNBQTZDLHFDQUFxQywyREFBMkQseUJBQXlCLFlBQVkseUJBQXlCLGtDQUFrQyxHQUFHLDJCQUEyQixtQkFBbUIsR0FBRyw0QkFBNEIsb0JBQW9CLElBQUksOEJBQThCLHNCQUFzQixJQUFJLDZCQUE2QixxQkFBcUIsR0FBRywyQkFBMkIsb0JBQW9CLDBCQUEwQixHQUFHLDJCQUEyQixtQkFBbUIsR0FBRyw0QkFBNEIsb0JBQW9CLElBQUksOEJBQThCLHNCQUFzQixJQUFJLDZCQUE2QixxQkFBcUIsR0FBRywyQkFBMkIsb0JBQW9CLE9BQU8sZUFBZSxnQkFBZ0Isc0JBQXNCLGVBQWUsK0JBQStCLFdBQVcsMkNBQTJDLDRDQUE0QywwQkFBMEIscUJBQXFCLGNBQWMsa0RBQWtELGNBQWMscUVBQXFFLHNCQUFzQixTQUFTLDZCQUE2Qiw0QkFBNEIsYUFBYSw2QkFBNkIsTUFBTSxJQUFJLFdBQVcsbUJBQW1CLHNDQUFzQyxZQUFZLEtBQUssY0FBYyxLQUFLLGlCQUFpQiw4QkFBOEIsUUFBUSxXQUFXLEtBQUssV0FBVyxnR0FBZ0csSUFBSSxpQkFBaUIsZ0JBQWdCLFlBQVksV0FBVyxLQUFLLHFCQUFxQixNQUFNLFNBQVMsWUFBWSxpQkFBaUIsMkJBQTJCLEtBQUssaUJBQWlCLGtDQUFrQyxLQUFLLGlCQUFpQixpQkFBaUIsNEJBQTRCLFNBQVMsMEJBQTBCLGdCQUFnQixpQkFBaUIsS0FBSyxXQUFXLEtBQUssNkRBQTZELDJCQUEyQixxQ0FBcUMsZUFBZSxFQUFFLFNBQVMsZ0JBQWdCLHNCQUFzQixxSUFBcUksb0JBQW9CLGdJQUFnSSxLQUFLLCtHQUErRyxrQkFBa0IsY0FBYyxnQ0FBZ0MsNEJBQTRCLG1CQUFtQixvQkFBb0IsY0FBYyxzQ0FBc0MscURBQXFELGNBQWMscUNBQXFDLDhFQUE4RSxnQkFBZ0IsbUNBQW1DLHVCQUF1QixFQUFFLGdCQUFnQixZQUFZLHVCQUF1QiwrQ0FBK0MsUUFBUSxnQkFBZ0IsVUFBVSwwREFBMEQsbU5BQW1OLHlDQUF5Qyx3Q0FBd0MsS0FBSyxFQUFFLHdCQUF3QixNQUFNLHNFQUFzRSxPQUFPLFVBQVUsb0JBQW9CLGlCQUFpQiw0Q0FBNEMsS0FBSyxnREFBZ0QsNEVBQTRFLGdCQUFnQixzQkFBc0Isb0VBQW9FLEtBQUssS0FBSyxhQUFhLDZCQUE2QiwyQ0FBMkMsa0JBQWtCLGdFQUFnRSw0RkFBNEYsc0VBQXNFLG9CQUFvQixnQkFBZ0IsV0FBVyx3REFBd0QsUUFBUSxlQUFlLE1BQU0sa0JBQWtCLGtEQUFrRCxZQUFZLG9EQUFvRCxnQkFBZ0IsU0FBUyxtQkFBbUIsa0RBQWtELGFBQWEsaUNBQWlDLDBCQUEwQix3QkFBd0IsK0lBQStJLE9BQU8sNENBQTRDLHNHQUFzRyxhQUFhLDBCQUEwQixpQkFBaUIsV0FBVyxLQUFLLHFCQUFxQixtQkFBbUIsTUFBTSxZQUFZLFlBQVksV0FBVyxLQUFLLFdBQVcsZUFBZSxZQUFZLGlCQUFpQixpQkFBaUIsbUJBQW1CLGlCQUFpQixTQUFTLHFCQUFxQiw0Q0FBNEMsR0FBRyxlQUFlLHNCQUFzQixrREFBa0QsMERBQTBELG1DQUFtQyxxRUFBcUUscUZBQXFGLGdEQUFnRCxTQUFTLG1DQUFtQyxTQUFTLEVBQUUsbUVBQW1FLE1BQU0sMkdBQTJHLEdBQUcsaUJBQWlCLFlBQVkseUlBQXlJLGFBQWEsa0ZBQWtGLDhFQUE4RSxvQkFBb0IsbUVBQW1FLGtDQUFrQyxrQkFBa0IsaURBQWlELElBQUksRUFBRSxpQkFBaUIseUVBQXlFLGtCQUFrQixJQUFJLFVBQVUsMENBQTBDLHNCQUFzQiw4REFBOEQsMkRBQTJELG1DQUFtQyxFQUFFLEVBQUUscUVBQXFFLGlCQUFpQixhQUFhLGFBQWEsY0FBYyxnQkFBZ0Isa0JBQWtCLHNCQUFzQixjQUFjLHFGQUFxRiw4REFBOEQsK0VBQStFLGdCQUFnQixLQUFLLGFBQWEsWUFBWSxpREFBaUQsd0NBQXdDLDhDQUE4Qyw4REFBOEQsTUFBTSxJQUFJLGNBQWMsU0FBUywyQkFBMkIsZUFBZSxFQUFFLGdCQUFnQixJQUFJLDBFQUEwRSxrREFBa0QsYUFBYSx5REFBeUQsZ0RBQWdELDJCQUEyQixTQUFTLFFBQVEsZ0JBQWdCLDJCQUEyQixjQUFjLGlFQUFpRSw4Q0FBOEMsRUFBRSxrQ0FBa0MsSUFBSSx5QkFBeUIsa0JBQWtCLGtCQUFrQix3R0FBd0csZ0JBQWdCLFNBQVMsSUFBSSxjQUFjLGlCQUFpQixhQUFhLGlCQUFpQixFQUFFLFNBQVMsWUFBWSxhQUFhLGlCQUFpQiw4QkFBOEIseUJBQXlCLGdDQUFnQyw4QkFBOEIsOEJBQThCLG1CQUFtQixvQ0FBb0MsMkJBQTJCLGdCQUFnQixJQUFJLGtEQUFrRCxhQUFhLHlEQUF5RCxPQUFPLElBQUksb0JBQW9CLFNBQVMsTUFBTSw2QkFBNkIsdUJBQXVCLFdBQVcsY0FBYyxFQUFFLHVCQUF1QixvRUFBb0UsS0FBSyxFQUFFLHNCQUFzQiwyQkFBMkIsS0FBSyxFQUFFLG9CQUFvQiwyQkFBMkIsdUJBQXVCLElBQUksbUJBQW1CLEVBQUUsa0RBQWtELEtBQUssY0FBYyxPQUFPLHFDQUFxQyw4RkFBOEYsK0JBQStCLGlCQUFpQix3Q0FBd0MsMEJBQTBCLDREQUE0RCxPQUFPLDZCQUE2QixpQkFBaUIsZ0JBQWdCLDJCQUEyQiwrQkFBK0Isd0JBQXdCLCtEQUErRCwwQkFBMEIsaUVBQWlFLDRDQUE0QyxhQUFhLCtDQUErQyw4QkFBOEIsb0NBQW9DLHdCQUF3QixnREFBZ0Qsd0JBQXdCLGlEQUFpRCxxQ0FBcUMsK0JBQStCLHFCQUFxQiw4Q0FBOEMsNkJBQTZCLEtBQUssbUVBQW1FLGlCQUFpQixlQUFlLGVBQWUsYUFBYSxjQUFjLDZDQUE2Qyw0Q0FBNEMsV0FBVyx3QkFBd0IsT0FBTyxtQkFBbUIsdUJBQXVCLGNBQWMsWUFBWSxjQUFjLDBCQUEwQixpQkFBaUIsV0FBVyxNQUFNLGVBQWUsTUFBTSxvQkFBb0IsTUFBTSx5QkFBeUIsTUFBTSxzQkFBc0IsY0FBYyx1QkFBdUIsS0FBSyxXQUFXLE1BQU0sS0FBSyxJQUFJLEtBQUssUUFBUSxhQUFhLG9CQUFvQixjQUFjLHFFQUFxRSw2Q0FBNkMscUNBQXFDLGNBQWMsc0JBQXNCLEtBQUssR0FBRyxjQUFjLG9DQUFvQyx1QkFBdUIsOEJBQThCLEtBQUssd0NBQXdDLGNBQWMsc0RBQXNELDBGQUEwRixpR0FBaUcsd0JBQXdCLCtCQUErQix5QkFBeUIsOEJBQThCLFVBQVUsZUFBZSx3QkFBd0Isa0VBQWtFLHdCQUF3QixjQUFjLGdDQUFnQyxnQ0FBZ0MsdURBQXVELG1CQUFtQixjQUFjLGNBQWMsbUJBQW1CLHdDQUF3QyxrREFBa0QscUJBQXFCLGVBQWUsYUFBYSxtREFBbUQsYUFBYSxxREFBcUQsY0FBYyx5Q0FBeUMsK0RBQStELElBQUksY0FBYyxTQUFTLElBQUksd0JBQXdCLFNBQVMsMEJBQTBCLGNBQWMsMkNBQTJDLG1FQUFtRSxJQUFJLFlBQVksU0FBUyxJQUFJLHNCQUFzQixTQUFTLHdCQUF3QixhQUFhLHVEQUF1RCxhQUFhLE9BQU8sV0FBVyxLQUFLLG1CQUFtQixFQUFFLEVBQUUsYUFBYSxNQUFNLGVBQWUsZ0JBQWdCLGtCQUFrQixnQkFBZ0Isd0JBQXdCLGNBQWMsdUJBQXVCLFlBQVksSUFBSSw2Q0FBNkMsU0FBUyxJQUFJLElBQUksaURBQWlELFNBQVMsS0FBSyxHQUFHLHFCQUFxQix1QkFBdUIsb0NBQW9DLGtDQUFrQyxtQkFBbUIsd0JBQXdCLHlDQUF5Qyw0QkFBNEIsZ0NBQWdDLHdDQUF3QyxxQ0FBcUMsZ0tBQWdLLFNBQVMsdUJBQXVCLG9EQUFvRCxrQkFBa0IsVUFBVSxxQkFBcUIsa0RBQWtELG9CQUFvQixVQUFVLGlCQUFpQixhQUFhLGlCQUFpQixpQkFBaUIsYUFBYSxnQkFBZ0IsdUZBQXVGLHdCQUF3QixtQkFBbUIsS0FBSyxtQkFBbUIsd0VBQXdFLElBQUksS0FBSyxrREFBa0QsdUNBQXVDLFNBQVMsYUFBYSxzREFBc0Qsa0RBQWtELEVBQUUsV0FBVyxxQkFBcUIsaUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSwrQ0FBK0MsaUJBQWlCLG1CQUFtQixzQkFBc0IsK0JBQStCLGdDQUFnQyxpQ0FBaUMsbUJBQW1CLG1CQUFtQixvQ0FBb0MsY0FBYyxFQUFFLElBQUksK0lBQStJLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsa0VBQWtFLG1CQUFtQiw4SkFBOEosa0JBQWtCLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsNkJBQTZCLHNHQUFzRyxpQkFBaUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLDBGQUEwRixZQUFZLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsNEJBQTRCLDZCQUE2QiwrQkFBK0IseUpBQXlKLGdDQUFnQyxvQkFBb0Isa0dBQWtHLGdDQUFnQyxvQkFBb0IsbU5BQW1OLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsK0JBQStCLHdEQUF3RCxpQkFBaUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLHFGQUFxRiwyTUFBMk0saUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSw0R0FBNEcsc0ZBQXNGLGlCQUFpQixlQUFlLG1CQUFtQixXQUFXLG1CQUFtQixpQkFBaUIsbUJBQW1CLG9DQUFvQyx5QkFBeUIsZUFBZSxNQUFNLHdDQUF3Qyw4QkFBOEIsWUFBWSxpQkFBaUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLGdDQUFnQyx5R0FBeUcsd0JBQXdCLE1BQU0seUNBQXlDLHNCQUFzQix3QkFBd0IsTUFBTSx3Q0FBd0Msc0NBQXNDLG9HQUFvRyxFQUFFLHdDQUF3Qyx3QkFBd0IsaUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxvSEFBb0gseUhBQXlILHlCQUF5QixxREFBcUQsa0JBQWtCLHNCQUFzQixtQkFBbUIsRUFBRSx5REFBeUQsU0FBUywyREFBMkQsYUFBYSx3Q0FBd0MscUJBQXFCLElBQUksaUJBQWlCLDBDQUEwQyxnQkFBZ0Isc0JBQXNCLDRCQUE0QixtQ0FBbUMsWUFBWSxpQkFBaUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLGdGQUFnRix1Q0FBdUMseUJBQXlCLG9CQUFvQix5Q0FBeUMsb0RBQW9ELHdCQUF3QiwrQkFBK0IsSUFBSSxtQkFBbUIsMkNBQTJDLG1CQUFtQixnQkFBZ0IsV0FBVyxPQUFPLG1DQUFtQyxlQUFlLE1BQU0sc0VBQXNFLCtDQUErQyxZQUFZLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsK0JBQStCLHNDQUFzQyw4QkFBOEIsWUFBWSxpQkFBaUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLDhHQUE4Ryx1QkFBdUIsZUFBZSx1QkFBdUIsZUFBZSxrQ0FBa0MsOENBQThDLGVBQWUsa0NBQWtDLHVCQUF1QixlQUFlLGdFQUFnRSxjQUFjLG1CQUFtQiw0QkFBNEIsY0FBYyxtRUFBbUUsYUFBYSxlQUFlLDRDQUE0QyxlQUFlLG1DQUFtQyxjQUFjLCtDQUErQyxzQkFBc0IsZUFBZSwyREFBMkQsZUFBZSxtQkFBbUIsa0VBQWtFLGVBQWUsZ0dBQWdHLGdDQUFnQyxLQUFLLGVBQWUsd0pBQXdKLFlBQVksaUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxxQ0FBcUMscUpBQXFKLG1CQUFtQixJQUFJLDBCQUEwQixrQkFBa0IsT0FBTyxrQkFBa0IsaUNBQWlDLHlHQUF5RyxVQUFVLEdBQUcsZUFBZSw4QkFBOEIsaUJBQWlCLGtEQUFrRCxpQkFBaUIsaUJBQWlCLHdHQUF3RyxpQkFBaUIsaUJBQWlCLCtEQUErRCxxQkFBcUIscURBQXFELE1BQU0sZ0JBQWdCLFFBQVEsZ0JBQWdCLG1CQUFtQix3QkFBd0IsUUFBUSxPQUFPLEtBQUssMkJBQTJCLFdBQVcsc0NBQXNDLFNBQVMscUJBQXFCLGlCQUFpQixtQkFBbUIsc0JBQXNCLFNBQVMsd0JBQXdCLGlCQUFpQixtQkFBbUIsRUFBRSxXQUFXLHVGQUF1RixzQkFBc0IsUUFBUSwwQ0FBMEMsMENBQTBDLEtBQUssaUJBQWlCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxjQUFjLDRCQUE0QixpQkFBaUIsNkJBQTZCLFNBQVMsbUVBQW1FLFVBQVUscUJBQXFCLGlCQUFpQixhQUFhLHNDQUFzQyxTQUFTLCtCQUErQixtS0FBbUssTUFBTSwyREFBMkQsa0NBQWtDLDRGQUE0RixvQkFBb0IsTUFBTSxzQ0FBc0MsV0FBVyxzQ0FBc0MsY0FBYyw4REFBOEQsYUFBYSxtQkFBbUIsNENBQTRDLG9CQUFvQiwwQ0FBMEMsb0JBQW9CLDBDQUEwQyxzQkFBc0IsbUJBQW1CLDRDQUE0QyxpQkFBaUIsaUVBQWlFLGdCQUFnQixtRUFBbUUsc0JBQXNCLHNCQUFzQixhQUFhLFlBQVksNENBQTRDLGFBQWEsNENBQTRDLG1CQUFtQiw0Q0FBNEMsT0FBTyw0Q0FBNEMsaUJBQWlCLGdFQUFnRSxvQkFBb0Isb0ZBQW9GLEdBQUcsRTs7Ozs7Ozs7Ozs7O0FDQXQydkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLG1CQUFPLENBQUMsaUVBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBLHVDOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1QztBQUNBO0FBQ0E7O0FBRXZDO0FBQ0EsUUFBUSw2Q0FBRTtBQUNWLFFBQVEsNkNBQUU7QUFDVixRQUFRLDZDQUFFO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtB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QVM7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsd0JBQXdCLHFCQUFxQixXQUFXLHdCQUF3QixVQUFVLHVCQUF1QixTQUFTLHNCQUFzQjtBQUN6SixLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseURBQXlELG1CQUFtQjtBQUM1RSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsK0NBQU07O0FBRXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQiwrQ0FBTTtBQUN6QjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsUUFBUSwrQ0FBTTtBQUNkLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEtBO0FBQUE7QUFBNkIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiYTVkNTRkNmQwNDMxYjIzMzE1NzdcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwibWFpblwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLnN3YWw9ZSgpOnQuc3dhbD1lKCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShvKXtpZihuW29dKXJldHVybiBuW29dLmV4cG9ydHM7dmFyIHI9bltvXT17aTpvLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIHRbb10uY2FsbChyLmV4cG9ydHMscixyLmV4cG9ydHMsZSksci5sPSEwLHIuZXhwb3J0c312YXIgbj17fTtyZXR1cm4gZS5tPXQsZS5jPW4sZS5kPWZ1bmN0aW9uKHQsbixvKXtlLm8odCxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Om99KX0sZS5uPWZ1bmN0aW9uKHQpe3ZhciBuPXQmJnQuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiB0LmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIHR9O3JldHVybiBlLmQobixcImFcIixuKSxufSxlLm89ZnVuY3Rpb24odCxlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9LGUucD1cIlwiLGUoZS5zPTgpfShbZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPVwic3dhbC1idXR0b25cIjtlLkNMQVNTX05BTUVTPXtNT0RBTDpcInN3YWwtbW9kYWxcIixPVkVSTEFZOlwic3dhbC1vdmVybGF5XCIsU0hPV19NT0RBTDpcInN3YWwtb3ZlcmxheS0tc2hvdy1tb2RhbFwiLE1PREFMX1RJVExFOlwic3dhbC10aXRsZVwiLE1PREFMX1RFWFQ6XCJzd2FsLXRleHRcIixJQ09OOlwic3dhbC1pY29uXCIsSUNPTl9DVVNUT006XCJzd2FsLWljb24tLWN1c3RvbVwiLENPTlRFTlQ6XCJzd2FsLWNvbnRlbnRcIixGT09URVI6XCJzd2FsLWZvb3RlclwiLEJVVFRPTl9DT05UQUlORVI6XCJzd2FsLWJ1dHRvbi1jb250YWluZXJcIixCVVRUT046byxDT05GSVJNX0JVVFRPTjpvK1wiLS1jb25maXJtXCIsQ0FOQ0VMX0JVVFRPTjpvK1wiLS1jYW5jZWxcIixEQU5HRVJfQlVUVE9OOm8rXCItLWRhbmdlclwiLEJVVFRPTl9MT0FESU5HOm8rXCItLWxvYWRpbmdcIixCVVRUT05fTE9BREVSOm8rXCJfX2xvYWRlclwifSxlLmRlZmF1bHQ9ZS5DTEFTU19OQU1FU30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUuZ2V0Tm9kZT1mdW5jdGlvbih0KXt2YXIgZT1cIi5cIit0O3JldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpfSxlLnN0cmluZ1RvTm9kZT1mdW5jdGlvbih0KXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBlLmlubmVySFRNTD10LnRyaW0oKSxlLmZpcnN0Q2hpbGR9LGUuaW5zZXJ0QWZ0ZXI9ZnVuY3Rpb24odCxlKXt2YXIgbj1lLm5leHRTaWJsaW5nO2UucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodCxuKX0sZS5yZW1vdmVOb2RlPWZ1bmN0aW9uKHQpe3QucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0KX0sZS50aHJvd0Vycj1mdW5jdGlvbih0KXt0aHJvdyB0PXQucmVwbGFjZSgvICsoPz0gKS9nLFwiXCIpLFwiU3dlZXRBbGVydDogXCIrKHQ9dC50cmltKCkpfSxlLmlzUGxhaW5PYmplY3Q9ZnVuY3Rpb24odCl7aWYoXCJbb2JqZWN0IE9iamVjdF1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSlyZXR1cm4hMTt2YXIgZT1PYmplY3QuZ2V0UHJvdG90eXBlT2YodCk7cmV0dXJuIG51bGw9PT1lfHxlPT09T2JqZWN0LnByb3RvdHlwZX0sZS5vcmRpbmFsU3VmZml4T2Y9ZnVuY3Rpb24odCl7dmFyIGU9dCUxMCxuPXQlMTAwO3JldHVybiAxPT09ZSYmMTEhPT1uP3QrXCJzdFwiOjI9PT1lJiYxMiE9PW4/dCtcIm5kXCI6Mz09PWUmJjEzIT09bj90K1wicmRcIjp0K1widGhcIn19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBvKHQpe2Zvcih2YXIgbiBpbiB0KWUuaGFzT3duUHJvcGVydHkobil8fChlW25dPXRbbl0pfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLG8obigyNSkpO3ZhciByPW4oMjYpO2Uub3ZlcmxheU1hcmt1cD1yLmRlZmF1bHQsbyhuKDI3KSksbyhuKDI4KSksbyhuKDI5KSk7dmFyIGk9bigwKSxhPWkuZGVmYXVsdC5NT0RBTF9USVRMRSxzPWkuZGVmYXVsdC5NT0RBTF9URVhULGM9aS5kZWZhdWx0LklDT04sbD1pLmRlZmF1bHQuRk9PVEVSO2UuaWNvbk1hcmt1cD0nXFxuICA8ZGl2IGNsYXNzPVwiJytjKydcIj48L2Rpdj4nLGUudGl0bGVNYXJrdXA9J1xcbiAgPGRpdiBjbGFzcz1cIicrYSsnXCI+PC9kaXY+XFxuJyxlLnRleHRNYXJrdXA9J1xcbiAgPGRpdiBjbGFzcz1cIicrcysnXCI+PC9kaXY+JyxlLmZvb3Rlck1hcmt1cD0nXFxuICA8ZGl2IGNsYXNzPVwiJytsKydcIj48L2Rpdj5cXG4nfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigxKTtlLkNPTkZJUk1fS0VZPVwiY29uZmlybVwiLGUuQ0FOQ0VMX0tFWT1cImNhbmNlbFwiO3ZhciByPXt2aXNpYmxlOiEwLHRleHQ6bnVsbCx2YWx1ZTpudWxsLGNsYXNzTmFtZTpcIlwiLGNsb3NlTW9kYWw6ITB9LGk9T2JqZWN0LmFzc2lnbih7fSxyLHt2aXNpYmxlOiExLHRleHQ6XCJDYW5jZWxcIix2YWx1ZTpudWxsfSksYT1PYmplY3QuYXNzaWduKHt9LHIse3RleHQ6XCJPS1wiLHZhbHVlOiEwfSk7ZS5kZWZhdWx0QnV0dG9uTGlzdD17Y2FuY2VsOmksY29uZmlybTphfTt2YXIgcz1mdW5jdGlvbih0KXtzd2l0Y2godCl7Y2FzZSBlLkNPTkZJUk1fS0VZOnJldHVybiBhO2Nhc2UgZS5DQU5DRUxfS0VZOnJldHVybiBpO2RlZmF1bHQ6dmFyIG49dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0LnNsaWNlKDEpO3JldHVybiBPYmplY3QuYXNzaWduKHt9LHIse3RleHQ6bix2YWx1ZTp0fSl9fSxjPWZ1bmN0aW9uKHQsZSl7dmFyIG49cyh0KTtyZXR1cm4hMD09PWU/T2JqZWN0LmFzc2lnbih7fSxuLHt2aXNpYmxlOiEwfSk6XCJzdHJpbmdcIj09dHlwZW9mIGU/T2JqZWN0LmFzc2lnbih7fSxuLHt2aXNpYmxlOiEwLHRleHQ6ZX0pOm8uaXNQbGFpbk9iamVjdChlKT9PYmplY3QuYXNzaWduKHt2aXNpYmxlOiEwfSxuLGUpOk9iamVjdC5hc3NpZ24oe30sbix7dmlzaWJsZTohMX0pfSxsPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT17fSxuPTAsbz1PYmplY3Qua2V5cyh0KTtuPG8ubGVuZ3RoO24rKyl7dmFyIHI9b1tuXSxhPXRbcl0scz1jKHIsYSk7ZVtyXT1zfXJldHVybiBlLmNhbmNlbHx8KGUuY2FuY2VsPWkpLGV9LHU9ZnVuY3Rpb24odCl7dmFyIG49e307c3dpdGNoKHQubGVuZ3RoKXtjYXNlIDE6bltlLkNBTkNFTF9LRVldPU9iamVjdC5hc3NpZ24oe30saSx7dmlzaWJsZTohMX0pO2JyZWFrO2Nhc2UgMjpuW2UuQ0FOQ0VMX0tFWV09YyhlLkNBTkNFTF9LRVksdFswXSksbltlLkNPTkZJUk1fS0VZXT1jKGUuQ09ORklSTV9LRVksdFsxXSk7YnJlYWs7ZGVmYXVsdDpvLnRocm93RXJyKFwiSW52YWxpZCBudW1iZXIgb2YgJ2J1dHRvbnMnIGluIGFycmF5IChcIit0Lmxlbmd0aCtcIikuXFxuICAgICAgSWYgeW91IHdhbnQgbW9yZSB0aGFuIDIgYnV0dG9ucywgeW91IG5lZWQgdG8gdXNlIGFuIG9iamVjdCFcIil9cmV0dXJuIG59O2UuZ2V0QnV0dG9uTGlzdE9wdHM9ZnVuY3Rpb24odCl7dmFyIG49ZS5kZWZhdWx0QnV0dG9uTGlzdDtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdD9uW2UuQ09ORklSTV9LRVldPWMoZS5DT05GSVJNX0tFWSx0KTpBcnJheS5pc0FycmF5KHQpP249dSh0KTpvLmlzUGxhaW5PYmplY3QodCk/bj1sKHQpOiEwPT09dD9uPXUoWyEwLCEwXSk6ITE9PT10P249dShbITEsITFdKTp2b2lkIDA9PT10JiYobj1lLmRlZmF1bHRCdXR0b25MaXN0KSxufX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMSkscj1uKDIpLGk9bigwKSxhPWkuZGVmYXVsdC5NT0RBTCxzPWkuZGVmYXVsdC5PVkVSTEFZLGM9bigzMCksbD1uKDMxKSx1PW4oMzIpLGY9bigzMyk7ZS5pbmplY3RFbEludG9Nb2RhbD1mdW5jdGlvbih0KXt2YXIgZT1vLmdldE5vZGUoYSksbj1vLnN0cmluZ1RvTm9kZSh0KTtyZXR1cm4gZS5hcHBlbmRDaGlsZChuKSxufTt2YXIgZD1mdW5jdGlvbih0KXt0LmNsYXNzTmFtZT1hLHQudGV4dENvbnRlbnQ9XCJcIn0scD1mdW5jdGlvbih0LGUpe2QodCk7dmFyIG49ZS5jbGFzc05hbWU7biYmdC5jbGFzc0xpc3QuYWRkKG4pfTtlLmluaXRNb2RhbENvbnRlbnQ9ZnVuY3Rpb24odCl7dmFyIGU9by5nZXROb2RlKGEpO3AoZSx0KSxjLmRlZmF1bHQodC5pY29uKSxsLmluaXRUaXRsZSh0LnRpdGxlKSxsLmluaXRUZXh0KHQudGV4dCksZi5kZWZhdWx0KHQuY29udGVudCksdS5kZWZhdWx0KHQuYnV0dG9ucyx0LmRhbmdlck1vZGUpfTt2YXIgbT1mdW5jdGlvbigpe3ZhciB0PW8uZ2V0Tm9kZShzKSxlPW8uc3RyaW5nVG9Ob2RlKHIubW9kYWxNYXJrdXApO3QuYXBwZW5kQ2hpbGQoZSl9O2UuZGVmYXVsdD1tfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigzKSxyPXtpc09wZW46ITEscHJvbWlzZTpudWxsLGFjdGlvbnM6e30sdGltZXI6bnVsbH0saT1PYmplY3QuYXNzaWduKHt9LHIpO2UucmVzZXRTdGF0ZT1mdW5jdGlvbigpe2k9T2JqZWN0LmFzc2lnbih7fSxyKX0sZS5zZXRBY3Rpb25WYWx1ZT1mdW5jdGlvbih0KXtpZihcInN0cmluZ1wiPT10eXBlb2YgdClyZXR1cm4gYShvLkNPTkZJUk1fS0VZLHQpO2Zvcih2YXIgZSBpbiB0KWEoZSx0W2VdKX07dmFyIGE9ZnVuY3Rpb24odCxlKXtpLmFjdGlvbnNbdF18fChpLmFjdGlvbnNbdF09e30pLE9iamVjdC5hc3NpZ24oaS5hY3Rpb25zW3RdLHt2YWx1ZTplfSl9O2Uuc2V0QWN0aW9uT3B0aW9uc0Zvcj1mdW5jdGlvbih0LGUpe3ZhciBuPSh2b2lkIDA9PT1lP3t9OmUpLmNsb3NlTW9kYWwsbz12b2lkIDA9PT1ufHxuO09iamVjdC5hc3NpZ24oaS5hY3Rpb25zW3RdLHtjbG9zZU1vZGFsOm99KX0sZS5kZWZhdWx0PWl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDEpLHI9bigzKSxpPW4oMCksYT1pLmRlZmF1bHQuT1ZFUkxBWSxzPWkuZGVmYXVsdC5TSE9XX01PREFMLGM9aS5kZWZhdWx0LkJVVFRPTixsPWkuZGVmYXVsdC5CVVRUT05fTE9BRElORyx1PW4oNSk7ZS5vcGVuTW9kYWw9ZnVuY3Rpb24oKXtvLmdldE5vZGUoYSkuY2xhc3NMaXN0LmFkZChzKSx1LmRlZmF1bHQuaXNPcGVuPSEwfTt2YXIgZj1mdW5jdGlvbigpe28uZ2V0Tm9kZShhKS5jbGFzc0xpc3QucmVtb3ZlKHMpLHUuZGVmYXVsdC5pc09wZW49ITF9O2Uub25BY3Rpb249ZnVuY3Rpb24odCl7dm9pZCAwPT09dCYmKHQ9ci5DQU5DRUxfS0VZKTt2YXIgZT11LmRlZmF1bHQuYWN0aW9uc1t0XSxuPWUudmFsdWU7aWYoITE9PT1lLmNsb3NlTW9kYWwpe3ZhciBpPWMrXCItLVwiK3Q7by5nZXROb2RlKGkpLmNsYXNzTGlzdC5hZGQobCl9ZWxzZSBmKCk7dS5kZWZhdWx0LnByb21pc2UucmVzb2x2ZShuKX0sZS5nZXRTdGF0ZT1mdW5jdGlvbigpe3ZhciB0PU9iamVjdC5hc3NpZ24oe30sdS5kZWZhdWx0KTtyZXR1cm4gZGVsZXRlIHQucHJvbWlzZSxkZWxldGUgdC50aW1lcix0fSxlLnN0b3BMb2FkaW5nPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrYyksZT0wO2U8dC5sZW5ndGg7ZSsrKXt0W2VdLmNsYXNzTGlzdC5yZW1vdmUobCl9fX0sZnVuY3Rpb24odCxlKXt2YXIgbjtuPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KCk7dHJ5e249bnx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpfHwoMCxldmFsKShcInRoaXNcIil9Y2F0Y2godCl7XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdyYmKG49d2luZG93KX10LmV4cG9ydHM9bn0sZnVuY3Rpb24odCxlLG4peyhmdW5jdGlvbihlKXt0LmV4cG9ydHM9ZS5zd2VldEFsZXJ0PW4oOSl9KS5jYWxsKGUsbig3KSl9LGZ1bmN0aW9uKHQsZSxuKXsoZnVuY3Rpb24oZSl7dC5leHBvcnRzPWUuc3dhbD1uKDEwKX0pLmNhbGwoZSxuKDcpKX0sZnVuY3Rpb24odCxlLG4pe1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJm4oMTEpLG4oMTYpO3ZhciBvPW4oMjMpLmRlZmF1bHQ7dC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsZSxuKXt2YXIgbz1uKDEyKTtcInN0cmluZ1wiPT10eXBlb2YgbyYmKG89W1t0LmksbyxcIlwiXV0pO3ZhciByPXtpbnNlcnRBdDpcInRvcFwifTtyLnRyYW5zZm9ybT12b2lkIDA7bigxNCkobyxyKTtvLmxvY2FscyYmKHQuZXhwb3J0cz1vLmxvY2Fscyl9LGZ1bmN0aW9uKHQsZSxuKXtlPXQuZXhwb3J0cz1uKDEzKSh2b2lkIDApLGUucHVzaChbdC5pLCcuc3dhbC1pY29uLS1lcnJvcntib3JkZXItY29sb3I6I2YyNzQ3NDstd2Via2l0LWFuaW1hdGlvbjphbmltYXRlRXJyb3JJY29uIC41czthbmltYXRpb246YW5pbWF0ZUVycm9ySWNvbiAuNXN9LnN3YWwtaWNvbi0tZXJyb3JfX3gtbWFya3twb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOmFuaW1hdGVYTWFyayAuNXM7YW5pbWF0aW9uOmFuaW1hdGVYTWFyayAuNXN9LnN3YWwtaWNvbi0tZXJyb3JfX2xpbmV7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjVweDt3aWR0aDo0N3B4O2JhY2tncm91bmQtY29sb3I6I2YyNzQ3NDtkaXNwbGF5OmJsb2NrO3RvcDozN3B4O2JvcmRlci1yYWRpdXM6MnB4fS5zd2FsLWljb24tLWVycm9yX19saW5lLS1sZWZ0ey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7bGVmdDoxN3B4fS5zd2FsLWljb24tLWVycm9yX19saW5lLS1yaWdodHstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7cmlnaHQ6MTZweH1ALXdlYmtpdC1rZXlmcmFtZXMgYW5pbWF0ZUVycm9ySWNvbnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGVYKDEwMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZVgoMTAwZGVnKTtvcGFjaXR5OjB9dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlWCgwZGVnKTt0cmFuc2Zvcm06cm90YXRlWCgwZGVnKTtvcGFjaXR5OjF9fUBrZXlmcmFtZXMgYW5pbWF0ZUVycm9ySWNvbnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGVYKDEwMGRlZyk7dHJhbnNmb3JtOnJvdGF0ZVgoMTAwZGVnKTtvcGFjaXR5OjB9dG97LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlWCgwZGVnKTt0cmFuc2Zvcm06cm90YXRlWCgwZGVnKTtvcGFjaXR5OjF9fUAtd2Via2l0LWtleWZyYW1lcyBhbmltYXRlWE1hcmt7MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjQpO3RyYW5zZm9ybTpzY2FsZSguNCk7bWFyZ2luLXRvcDoyNnB4O29wYWNpdHk6MH01MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjQpO3RyYW5zZm9ybTpzY2FsZSguNCk7bWFyZ2luLXRvcDoyNnB4O29wYWNpdHk6MH04MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4xNSk7dHJhbnNmb3JtOnNjYWxlKDEuMTUpO21hcmdpbi10b3A6LTZweH10b3std2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSk7bWFyZ2luLXRvcDowO29wYWNpdHk6MX19QGtleWZyYW1lcyBhbmltYXRlWE1hcmt7MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjQpO3RyYW5zZm9ybTpzY2FsZSguNCk7bWFyZ2luLXRvcDoyNnB4O29wYWNpdHk6MH01MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjQpO3RyYW5zZm9ybTpzY2FsZSguNCk7bWFyZ2luLXRvcDoyNnB4O29wYWNpdHk6MH04MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4xNSk7dHJhbnNmb3JtOnNjYWxlKDEuMTUpO21hcmdpbi10b3A6LTZweH10b3std2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSk7bWFyZ2luLXRvcDowO29wYWNpdHk6MX19LnN3YWwtaWNvbi0td2FybmluZ3tib3JkZXItY29sb3I6I2Y4YmI4Njstd2Via2l0LWFuaW1hdGlvbjpwdWxzZVdhcm5pbmcgLjc1cyBpbmZpbml0ZSBhbHRlcm5hdGU7YW5pbWF0aW9uOnB1bHNlV2FybmluZyAuNzVzIGluZmluaXRlIGFsdGVybmF0ZX0uc3dhbC1pY29uLS13YXJuaW5nX19ib2R5e3dpZHRoOjVweDtoZWlnaHQ6NDdweDt0b3A6MTBweDtib3JkZXItcmFkaXVzOjJweDttYXJnaW4tbGVmdDotMnB4fS5zd2FsLWljb24tLXdhcm5pbmdfX2JvZHksLnN3YWwtaWNvbi0td2FybmluZ19fZG90e3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO2JhY2tncm91bmQtY29sb3I6I2Y4YmI4Nn0uc3dhbC1pY29uLS13YXJuaW5nX19kb3R7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czo1MCU7bWFyZ2luLWxlZnQ6LTRweDtib3R0b206LTExcHh9QC13ZWJraXQta2V5ZnJhbWVzIHB1bHNlV2FybmluZ3swJXtib3JkZXItY29sb3I6I2Y4ZDQ4Nn10b3tib3JkZXItY29sb3I6I2Y4YmI4Nn19QGtleWZyYW1lcyBwdWxzZVdhcm5pbmd7MCV7Ym9yZGVyLWNvbG9yOiNmOGQ0ODZ9dG97Ym9yZGVyLWNvbG9yOiNmOGJiODZ9fS5zd2FsLWljb24tLXN1Y2Nlc3N7Ym9yZGVyLWNvbG9yOiNhNWRjODZ9LnN3YWwtaWNvbi0tc3VjY2VzczphZnRlciwuc3dhbC1pY29uLS1zdWNjZXNzOmJlZm9yZXtjb250ZW50OlwiXCI7Ym9yZGVyLXJhZGl1czo1MCU7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6NjBweDtoZWlnaHQ6MTIwcHg7YmFja2dyb3VuZDojZmZmOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyl9LnN3YWwtaWNvbi0tc3VjY2VzczpiZWZvcmV7Ym9yZGVyLXJhZGl1czoxMjBweCAwIDAgMTIwcHg7dG9wOi03cHg7bGVmdDotMzNweDstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjYwcHggNjBweDt0cmFuc2Zvcm0tb3JpZ2luOjYwcHggNjBweH0uc3dhbC1pY29uLS1zdWNjZXNzOmFmdGVye2JvcmRlci1yYWRpdXM6MCAxMjBweCAxMjBweCAwO3RvcDotMTFweDtsZWZ0OjMwcHg7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjowIDYwcHg7dHJhbnNmb3JtLW9yaWdpbjowIDYwcHg7LXdlYmtpdC1hbmltYXRpb246cm90YXRlUGxhY2Vob2xkZXIgNC4yNXMgZWFzZS1pbjthbmltYXRpb246cm90YXRlUGxhY2Vob2xkZXIgNC4yNXMgZWFzZS1pbn0uc3dhbC1pY29uLS1zdWNjZXNzX19yaW5ne3dpZHRoOjgwcHg7aGVpZ2h0OjgwcHg7Ym9yZGVyOjRweCBzb2xpZCBoc2xhKDk4LDU1JSw2OSUsLjIpO2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaXppbmc6Y29udGVudC1ib3g7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotNHB4O3RvcDotNHB4O3otaW5kZXg6Mn0uc3dhbC1pY29uLS1zdWNjZXNzX19oaWRlLWNvcm5lcnN7d2lkdGg6NXB4O2hlaWdodDo5MHB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjFweDtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjI4cHg7dG9wOjhweDt6LWluZGV4OjE7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfS5zd2FsLWljb24tLXN1Y2Nlc3NfX2xpbmV7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOiNhNWRjODY7ZGlzcGxheTpibG9jaztib3JkZXItcmFkaXVzOjJweDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjJ9LnN3YWwtaWNvbi0tc3VjY2Vzc19fbGluZS0tdGlwe3dpZHRoOjI1cHg7bGVmdDoxNHB4O3RvcDo0NnB4Oy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7LXdlYmtpdC1hbmltYXRpb246YW5pbWF0ZVN1Y2Nlc3NUaXAgLjc1czthbmltYXRpb246YW5pbWF0ZVN1Y2Nlc3NUaXAgLjc1c30uc3dhbC1pY29uLS1zdWNjZXNzX19saW5lLS1sb25ne3dpZHRoOjQ3cHg7cmlnaHQ6OHB4O3RvcDozOHB4Oy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTstd2Via2l0LWFuaW1hdGlvbjphbmltYXRlU3VjY2Vzc0xvbmcgLjc1czthbmltYXRpb246YW5pbWF0ZVN1Y2Nlc3NMb25nIC43NXN9QC13ZWJraXQta2V5ZnJhbWVzIHJvdGF0ZVBsYWNlaG9sZGVyezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKX01JXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9MTIley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00MDVkZWcpfXRvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00MDVkZWcpfX1Aa2V5ZnJhbWVzIHJvdGF0ZVBsYWNlaG9sZGVyezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKX01JXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZyl9MTIley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00MDVkZWcpfXRvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDA1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKC00MDVkZWcpfX1ALXdlYmtpdC1rZXlmcmFtZXMgYW5pbWF0ZVN1Y2Nlc3NUaXB7MCV7d2lkdGg6MDtsZWZ0OjFweDt0b3A6MTlweH01NCV7d2lkdGg6MDtsZWZ0OjFweDt0b3A6MTlweH03MCV7d2lkdGg6NTBweDtsZWZ0Oi04cHg7dG9wOjM3cHh9ODQle3dpZHRoOjE3cHg7bGVmdDoyMXB4O3RvcDo0OHB4fXRve3dpZHRoOjI1cHg7bGVmdDoxNHB4O3RvcDo0NXB4fX1Aa2V5ZnJhbWVzIGFuaW1hdGVTdWNjZXNzVGlwezAle3dpZHRoOjA7bGVmdDoxcHg7dG9wOjE5cHh9NTQle3dpZHRoOjA7bGVmdDoxcHg7dG9wOjE5cHh9NzAle3dpZHRoOjUwcHg7bGVmdDotOHB4O3RvcDozN3B4fTg0JXt3aWR0aDoxN3B4O2xlZnQ6MjFweDt0b3A6NDhweH10b3t3aWR0aDoyNXB4O2xlZnQ6MTRweDt0b3A6NDVweH19QC13ZWJraXQta2V5ZnJhbWVzIGFuaW1hdGVTdWNjZXNzTG9uZ3swJXt3aWR0aDowO3JpZ2h0OjQ2cHg7dG9wOjU0cHh9NjUle3dpZHRoOjA7cmlnaHQ6NDZweDt0b3A6NTRweH04NCV7d2lkdGg6NTVweDtyaWdodDowO3RvcDozNXB4fXRve3dpZHRoOjQ3cHg7cmlnaHQ6OHB4O3RvcDozOHB4fX1Aa2V5ZnJhbWVzIGFuaW1hdGVTdWNjZXNzTG9uZ3swJXt3aWR0aDowO3JpZ2h0OjQ2cHg7dG9wOjU0cHh9NjUle3dpZHRoOjA7cmlnaHQ6NDZweDt0b3A6NTRweH04NCV7d2lkdGg6NTVweDtyaWdodDowO3RvcDozNXB4fXRve3dpZHRoOjQ3cHg7cmlnaHQ6OHB4O3RvcDozOHB4fX0uc3dhbC1pY29uLS1pbmZve2JvcmRlci1jb2xvcjojYzlkYWUxfS5zd2FsLWljb24tLWluZm86YmVmb3Jle3dpZHRoOjVweDtoZWlnaHQ6MjlweDtib3R0b206MTdweDtib3JkZXItcmFkaXVzOjJweDttYXJnaW4tbGVmdDotMnB4fS5zd2FsLWljb24tLWluZm86YWZ0ZXIsLnN3YWwtaWNvbi0taW5mbzpiZWZvcmV7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6NTAlO2JhY2tncm91bmQtY29sb3I6I2M5ZGFlMX0uc3dhbC1pY29uLS1pbmZvOmFmdGVye3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6NTAlO21hcmdpbi1sZWZ0Oi0zcHg7dG9wOjE5cHh9LnN3YWwtaWNvbnt3aWR0aDo4MHB4O2hlaWdodDo4MHB4O2JvcmRlci13aWR0aDo0cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1yYWRpdXM6NTAlO3BhZGRpbmc6MDtwb3NpdGlvbjpyZWxhdGl2ZTtib3gtc2l6aW5nOmNvbnRlbnQtYm94O21hcmdpbjoyMHB4IGF1dG99LnN3YWwtaWNvbjpmaXJzdC1jaGlsZHttYXJnaW4tdG9wOjMycHh9LnN3YWwtaWNvbi0tY3VzdG9te3dpZHRoOmF1dG87aGVpZ2h0OmF1dG87bWF4LXdpZHRoOjEwMCU7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czowfS5zd2FsLWljb24gaW1ne21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0uc3dhbC10aXRsZXtjb2xvcjpyZ2JhKDAsMCwwLC42NSk7Zm9udC13ZWlnaHQ6NjAwO3RleHQtdHJhbnNmb3JtOm5vbmU7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztwYWRkaW5nOjEzcHggMTZweDtmb250LXNpemU6MjdweDtsaW5lLWhlaWdodDpub3JtYWw7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLWJvdHRvbTowfS5zd2FsLXRpdGxlOmZpcnN0LWNoaWxke21hcmdpbi10b3A6MjZweH0uc3dhbC10aXRsZTpub3QoOmZpcnN0LWNoaWxkKXtwYWRkaW5nLWJvdHRvbTowfS5zd2FsLXRpdGxlOm5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLWJvdHRvbToxM3B4fS5zd2FsLXRleHR7Zm9udC1zaXplOjE2cHg7cG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bm9uZTtsaW5lLWhlaWdodDpub3JtYWw7dmVydGljYWwtYWxpZ246dG9wO3RleHQtYWxpZ246bGVmdDtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MDtwYWRkaW5nOjAgMTBweDtmb250LXdlaWdodDo0MDA7Y29sb3I6cmdiYSgwLDAsMCwuNjQpO21heC13aWR0aDpjYWxjKDEwMCUgLSAyMHB4KTtvdmVyZmxvdy13cmFwOmJyZWFrLXdvcmQ7Ym94LXNpemluZzpib3JkZXItYm94fS5zd2FsLXRleHQ6Zmlyc3QtY2hpbGR7bWFyZ2luLXRvcDo0NXB4fS5zd2FsLXRleHQ6bGFzdC1jaGlsZHttYXJnaW4tYm90dG9tOjQ1cHh9LnN3YWwtZm9vdGVye3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZy10b3A6MTNweDttYXJnaW4tdG9wOjEzcHg7cGFkZGluZzoxM3B4IDE2cHg7Ym9yZGVyLXJhZGl1czppbmhlcml0O2JvcmRlci10b3AtbGVmdC1yYWRpdXM6MDtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czowfS5zd2FsLWJ1dHRvbi1jb250YWluZXJ7bWFyZ2luOjVweDtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZX0uc3dhbC1idXR0b257YmFja2dyb3VuZC1jb2xvcjojN2NkMWY5O2NvbG9yOiNmZmY7Ym9yZGVyOm5vbmU7Ym94LXNoYWRvdzpub25lO2JvcmRlci1yYWRpdXM6NXB4O2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTRweDtwYWRkaW5nOjEwcHggMjRweDttYXJnaW46MDtjdXJzb3I6cG9pbnRlcn0uc3dhbC1idXR0b246bm90KFtkaXNhYmxlZF0pOmhvdmVye2JhY2tncm91bmQtY29sb3I6Izc4Y2JmMn0uc3dhbC1idXR0b246YWN0aXZle2JhY2tncm91bmQtY29sb3I6IzcwYmNlMH0uc3dhbC1idXR0b246Zm9jdXN7b3V0bGluZTpub25lO2JveC1zaGFkb3c6MCAwIDAgMXB4ICNmZmYsMCAwIDAgM3B4IHJnYmEoNDMsMTE0LDE2NSwuMjkpfS5zd2FsLWJ1dHRvbltkaXNhYmxlZF17b3BhY2l0eTouNTtjdXJzb3I6ZGVmYXVsdH0uc3dhbC1idXR0b246Oi1tb3otZm9jdXMtaW5uZXJ7Ym9yZGVyOjB9LnN3YWwtYnV0dG9uLS1jYW5jZWx7Y29sb3I6IzU1NTtiYWNrZ3JvdW5kLWNvbG9yOiNlZmVmZWZ9LnN3YWwtYnV0dG9uLS1jYW5jZWw6bm90KFtkaXNhYmxlZF0pOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2U4ZThlOH0uc3dhbC1idXR0b24tLWNhbmNlbDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZDdkN2Q3fS5zd2FsLWJ1dHRvbi0tY2FuY2VsOmZvY3Vze2JveC1zaGFkb3c6MCAwIDAgMXB4ICNmZmYsMCAwIDAgM3B4IHJnYmEoMTE2LDEzNiwxNTAsLjI5KX0uc3dhbC1idXR0b24tLWRhbmdlcntiYWNrZ3JvdW5kLWNvbG9yOiNlNjQ5NDJ9LnN3YWwtYnV0dG9uLS1kYW5nZXI6bm90KFtkaXNhYmxlZF0pOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2RmNDc0MH0uc3dhbC1idXR0b24tLWRhbmdlcjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojY2Y0MjNifS5zd2FsLWJ1dHRvbi0tZGFuZ2VyOmZvY3Vze2JveC1zaGFkb3c6MCAwIDAgMXB4ICNmZmYsMCAwIDAgM3B4IHJnYmEoMTY1LDQzLDQzLC4yOSl9LnN3YWwtY29udGVudHtwYWRkaW5nOjAgMjBweDttYXJnaW4tdG9wOjIwcHg7Zm9udC1zaXplOm1lZGl1bX0uc3dhbC1jb250ZW50Omxhc3QtY2hpbGR7bWFyZ2luLWJvdHRvbToyMHB4fS5zd2FsLWNvbnRlbnRfX2lucHV0LC5zd2FsLWNvbnRlbnRfX3RleHRhcmVhey13ZWJraXQtYXBwZWFyYW5jZTpub25lO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6bm9uZTtmb250LXNpemU6MTRweDtkaXNwbGF5OmJsb2NrO2JveC1zaXppbmc6Ym9yZGVyLWJveDt3aWR0aDoxMDAlO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMTQpO3BhZGRpbmc6MTBweCAxM3B4O2JvcmRlci1yYWRpdXM6MnB4O3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4yc30uc3dhbC1jb250ZW50X19pbnB1dDpmb2N1cywuc3dhbC1jb250ZW50X190ZXh0YXJlYTpmb2N1c3tvdXRsaW5lOm5vbmU7Ym9yZGVyLWNvbG9yOiM2ZGI4ZmZ9LnN3YWwtY29udGVudF9fdGV4dGFyZWF7cmVzaXplOnZlcnRpY2FsfS5zd2FsLWJ1dHRvbi0tbG9hZGluZ3tjb2xvcjp0cmFuc3BhcmVudH0uc3dhbC1idXR0b24tLWxvYWRpbmd+LnN3YWwtYnV0dG9uX19sb2FkZXJ7b3BhY2l0eToxfS5zd2FsLWJ1dHRvbl9fbG9hZGVye3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDphdXRvO3dpZHRoOjQzcHg7ei1pbmRleDoyO2xlZnQ6NTAlO3RvcDo1MCU7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7dGV4dC1hbGlnbjpjZW50ZXI7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5OjB9LnN3YWwtYnV0dG9uX19sb2FkZXIgZGl2e2Rpc3BsYXk6aW5saW5lLWJsb2NrO2Zsb2F0Om5vbmU7dmVydGljYWwtYWxpZ246YmFzZWxpbmU7d2lkdGg6OXB4O2hlaWdodDo5cHg7cGFkZGluZzowO2JvcmRlcjpub25lO21hcmdpbjoycHg7b3BhY2l0eTouNDtib3JkZXItcmFkaXVzOjdweDtiYWNrZ3JvdW5kLWNvbG9yOmhzbGEoMCwwJSwxMDAlLC45KTt0cmFuc2l0aW9uOmJhY2tncm91bmQgLjJzOy13ZWJraXQtYW5pbWF0aW9uOnN3YWwtbG9hZGluZy1hbmltIDFzIGluZmluaXRlO2FuaW1hdGlvbjpzd2FsLWxvYWRpbmctYW5pbSAxcyBpbmZpbml0ZX0uc3dhbC1idXR0b25fX2xvYWRlciBkaXY6bnRoLWNoaWxkKDNuKzIpey13ZWJraXQtYW5pbWF0aW9uLWRlbGF5Oi4xNXM7YW5pbWF0aW9uLWRlbGF5Oi4xNXN9LnN3YWwtYnV0dG9uX19sb2FkZXIgZGl2Om50aC1jaGlsZCgzbiszKXstd2Via2l0LWFuaW1hdGlvbi1kZWxheTouM3M7YW5pbWF0aW9uLWRlbGF5Oi4zc31ALXdlYmtpdC1rZXlmcmFtZXMgc3dhbC1sb2FkaW5nLWFuaW17MCV7b3BhY2l0eTouNH0yMCV7b3BhY2l0eTouNH01MCV7b3BhY2l0eToxfXRve29wYWNpdHk6LjR9fUBrZXlmcmFtZXMgc3dhbC1sb2FkaW5nLWFuaW17MCV7b3BhY2l0eTouNH0yMCV7b3BhY2l0eTouNH01MCV7b3BhY2l0eToxfXRve29wYWNpdHk6LjR9fS5zd2FsLW92ZXJsYXl7cG9zaXRpb246Zml4ZWQ7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zaXplOjA7b3ZlcmZsb3cteTphdXRvO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNCk7ei1pbmRleDoxMDAwMDtwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzfS5zd2FsLW92ZXJsYXk6YmVmb3Jle2NvbnRlbnQ6XCIgXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlO2hlaWdodDoxMDAlfS5zd2FsLW92ZXJsYXktLXNob3ctbW9kYWx7b3BhY2l0eToxO3BvaW50ZXItZXZlbnRzOmF1dG99LnN3YWwtb3ZlcmxheS0tc2hvdy1tb2RhbCAuc3dhbC1tb2RhbHtvcGFjaXR5OjE7cG9pbnRlci1ldmVudHM6YXV0bztib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1hbmltYXRpb246c2hvd1N3ZWV0QWxlcnQgLjNzO2FuaW1hdGlvbjpzaG93U3dlZXRBbGVydCAuM3M7d2lsbC1jaGFuZ2U6dHJhbnNmb3JtfS5zd2FsLW1vZGFse3dpZHRoOjQ3OHB4O29wYWNpdHk6MDtwb2ludGVyLWV2ZW50czpub25lO2JhY2tncm91bmQtY29sb3I6I2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItcmFkaXVzOjVweDtwb3NpdGlvbjpzdGF0aWM7bWFyZ2luOjIwcHggYXV0bztkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjo1MCUgNTAlO3RyYW5zZm9ybS1vcmlnaW46NTAlIDUwJTt6LWluZGV4OjEwMDAxO3RyYW5zaXRpb246b3BhY2l0eSAuMnMsLXdlYmtpdC10cmFuc2Zvcm0gLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcyxvcGFjaXR5IC4yczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3Msb3BhY2l0eSAuMnMsLXdlYmtpdC10cmFuc2Zvcm0gLjNzfUBtZWRpYSAobWF4LXdpZHRoOjUwMHB4KXsuc3dhbC1tb2RhbHt3aWR0aDpjYWxjKDEwMCUgLSAyMHB4KX19QC13ZWJraXQta2V5ZnJhbWVzIHNob3dTd2VldEFsZXJ0ezAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX0xJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguNSk7dHJhbnNmb3JtOnNjYWxlKC41KX00NSV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4wNSk7dHJhbnNmb3JtOnNjYWxlKDEuMDUpfTgwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSguOTUpO3RyYW5zZm9ybTpzY2FsZSguOTUpfXRvey13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEpO3RyYW5zZm9ybTpzY2FsZSgxKX19QGtleWZyYW1lcyBzaG93U3dlZXRBbGVydHswJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9MSV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjUpO3RyYW5zZm9ybTpzY2FsZSguNSl9NDUley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMDUpO3RyYW5zZm9ybTpzY2FsZSgxLjA1KX04MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjk1KTt0cmFuc2Zvcm06c2NhbGUoLjk1KX10b3std2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fScsXCJcIl0pfSxmdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG4odCxlKXt2YXIgbj10WzFdfHxcIlwiLHI9dFszXTtpZighcilyZXR1cm4gbjtpZihlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBidG9hKXt2YXIgaT1vKHIpO3JldHVybltuXS5jb25jYXQoci5zb3VyY2VzLm1hcChmdW5jdGlvbih0KXtyZXR1cm5cIi8qIyBzb3VyY2VVUkw9XCIrci5zb3VyY2VSb290K3QrXCIgKi9cIn0pKS5jb25jYXQoW2ldKS5qb2luKFwiXFxuXCIpfXJldHVybltuXS5qb2luKFwiXFxuXCIpfWZ1bmN0aW9uIG8odCl7cmV0dXJuXCIvKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIrYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodCkpKSkrXCIgKi9cIn10LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9W107cmV0dXJuIGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oZSl7dmFyIG89bihlLHQpO3JldHVybiBlWzJdP1wiQG1lZGlhIFwiK2VbMl0rXCJ7XCIrbytcIn1cIjpvfSkuam9pbihcIlwiKX0sZS5pPWZ1bmN0aW9uKHQsbil7XCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PVtbbnVsbCx0LFwiXCJdXSk7Zm9yKHZhciBvPXt9LHI9MDtyPHRoaXMubGVuZ3RoO3IrKyl7dmFyIGk9dGhpc1tyXVswXTtcIm51bWJlclwiPT10eXBlb2YgaSYmKG9baV09ITApfWZvcihyPTA7cjx0Lmxlbmd0aDtyKyspe3ZhciBhPXRbcl07XCJudW1iZXJcIj09dHlwZW9mIGFbMF0mJm9bYVswXV18fChuJiYhYVsyXT9hWzJdPW46biYmKGFbMl09XCIoXCIrYVsyXStcIikgYW5kIChcIituK1wiKVwiKSxlLnB1c2goYSkpfX0sZX19LGZ1bmN0aW9uKHQsZSxuKXtmdW5jdGlvbiBvKHQsZSl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBvPXRbbl0scj1tW28uaWRdO2lmKHIpe3IucmVmcysrO2Zvcih2YXIgaT0wO2k8ci5wYXJ0cy5sZW5ndGg7aSsrKXIucGFydHNbaV0oby5wYXJ0c1tpXSk7Zm9yKDtpPG8ucGFydHMubGVuZ3RoO2krKylyLnBhcnRzLnB1c2godShvLnBhcnRzW2ldLGUpKX1lbHNle2Zvcih2YXIgYT1bXSxpPTA7aTxvLnBhcnRzLmxlbmd0aDtpKyspYS5wdXNoKHUoby5wYXJ0c1tpXSxlKSk7bVtvLmlkXT17aWQ6by5pZCxyZWZzOjEscGFydHM6YX19fX1mdW5jdGlvbiByKHQsZSl7Zm9yKHZhciBuPVtdLG89e30scj0wO3I8dC5sZW5ndGg7cisrKXt2YXIgaT10W3JdLGE9ZS5iYXNlP2lbMF0rZS5iYXNlOmlbMF0scz1pWzFdLGM9aVsyXSxsPWlbM10sdT17Y3NzOnMsbWVkaWE6Yyxzb3VyY2VNYXA6bH07b1thXT9vW2FdLnBhcnRzLnB1c2godSk6bi5wdXNoKG9bYV09e2lkOmEscGFydHM6W3VdfSl9cmV0dXJuIG59ZnVuY3Rpb24gaSh0LGUpe3ZhciBuPXYodC5pbnNlcnRJbnRvKTtpZighbil0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTt2YXIgbz13W3cubGVuZ3RoLTFdO2lmKFwidG9wXCI9PT10Lmluc2VydEF0KW8/by5uZXh0U2libGluZz9uLmluc2VydEJlZm9yZShlLG8ubmV4dFNpYmxpbmcpOm4uYXBwZW5kQ2hpbGQoZSk6bi5pbnNlcnRCZWZvcmUoZSxuLmZpcnN0Q2hpbGQpLHcucHVzaChlKTtlbHNle2lmKFwiYm90dG9tXCIhPT10Lmluc2VydEF0KXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtuLmFwcGVuZENoaWxkKGUpfX1mdW5jdGlvbiBhKHQpe2lmKG51bGw9PT10LnBhcmVudE5vZGUpcmV0dXJuITE7dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHQpO3ZhciBlPXcuaW5kZXhPZih0KTtlPj0wJiZ3LnNwbGljZShlLDEpfWZ1bmN0aW9uIHModCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO3JldHVybiB0LmF0dHJzLnR5cGU9XCJ0ZXh0L2Nzc1wiLGwoZSx0LmF0dHJzKSxpKHQsZSksZX1mdW5jdGlvbiBjKHQpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO3JldHVybiB0LmF0dHJzLnR5cGU9XCJ0ZXh0L2Nzc1wiLHQuYXR0cnMucmVsPVwic3R5bGVzaGVldFwiLGwoZSx0LmF0dHJzKSxpKHQsZSksZX1mdW5jdGlvbiBsKHQsZSl7T2JqZWN0LmtleXMoZSkuZm9yRWFjaChmdW5jdGlvbihuKXt0LnNldEF0dHJpYnV0ZShuLGVbbl0pfSl9ZnVuY3Rpb24gdSh0LGUpe3ZhciBuLG8scixpO2lmKGUudHJhbnNmb3JtJiZ0LmNzcyl7aWYoIShpPWUudHJhbnNmb3JtKHQuY3NzKSkpcmV0dXJuIGZ1bmN0aW9uKCl7fTt0LmNzcz1pfWlmKGUuc2luZ2xldG9uKXt2YXIgbD1oKys7bj1nfHwoZz1zKGUpKSxvPWYuYmluZChudWxsLG4sbCwhMSkscj1mLmJpbmQobnVsbCxuLGwsITApfWVsc2UgdC5zb3VyY2VNYXAmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFVSTCYmXCJmdW5jdGlvblwiPT10eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCYmXCJmdW5jdGlvblwiPT10eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCYmXCJmdW5jdGlvblwiPT10eXBlb2YgQmxvYiYmXCJmdW5jdGlvblwiPT10eXBlb2YgYnRvYT8obj1jKGUpLG89cC5iaW5kKG51bGwsbixlKSxyPWZ1bmN0aW9uKCl7YShuKSxuLmhyZWYmJlVSTC5yZXZva2VPYmplY3RVUkwobi5ocmVmKX0pOihuPXMoZSksbz1kLmJpbmQobnVsbCxuKSxyPWZ1bmN0aW9uKCl7YShuKX0pO3JldHVybiBvKHQpLGZ1bmN0aW9uKGUpe2lmKGUpe2lmKGUuY3NzPT09dC5jc3MmJmUubWVkaWE9PT10Lm1lZGlhJiZlLnNvdXJjZU1hcD09PXQuc291cmNlTWFwKXJldHVybjtvKHQ9ZSl9ZWxzZSByKCl9fWZ1bmN0aW9uIGYodCxlLG4sbyl7dmFyIHI9bj9cIlwiOm8uY3NzO2lmKHQuc3R5bGVTaGVldCl0LnN0eWxlU2hlZXQuY3NzVGV4dD14KGUscik7ZWxzZXt2YXIgaT1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShyKSxhPXQuY2hpbGROb2RlczthW2VdJiZ0LnJlbW92ZUNoaWxkKGFbZV0pLGEubGVuZ3RoP3QuaW5zZXJ0QmVmb3JlKGksYVtlXSk6dC5hcHBlbmRDaGlsZChpKX19ZnVuY3Rpb24gZCh0LGUpe3ZhciBuPWUuY3NzLG89ZS5tZWRpYTtpZihvJiZ0LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsbyksdC5zdHlsZVNoZWV0KXQuc3R5bGVTaGVldC5jc3NUZXh0PW47ZWxzZXtmb3IoO3QuZmlyc3RDaGlsZDspdC5yZW1vdmVDaGlsZCh0LmZpcnN0Q2hpbGQpO3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobikpfX1mdW5jdGlvbiBwKHQsZSxuKXt2YXIgbz1uLmNzcyxyPW4uc291cmNlTWFwLGk9dm9pZCAwPT09ZS5jb252ZXJ0VG9BYnNvbHV0ZVVybHMmJnI7KGUuY29udmVydFRvQWJzb2x1dGVVcmxzfHxpKSYmKG89eShvKSksciYmKG8rPVwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIitidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShyKSkpKStcIiAqL1wiKTt2YXIgYT1uZXcgQmxvYihbb10se3R5cGU6XCJ0ZXh0L2Nzc1wifSkscz10LmhyZWY7dC5ocmVmPVVSTC5jcmVhdGVPYmplY3RVUkwoYSkscyYmVVJMLnJldm9rZU9iamVjdFVSTChzKX12YXIgbT17fSxiPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBmdW5jdGlvbigpe3JldHVybiB2b2lkIDA9PT1lJiYoZT10LmFwcGx5KHRoaXMsYXJndW1lbnRzKSksZX19KGZ1bmN0aW9uKCl7cmV0dXJuIHdpbmRvdyYmZG9jdW1lbnQmJmRvY3VtZW50LmFsbCYmIXdpbmRvdy5hdG9ifSksdj1mdW5jdGlvbih0KXt2YXIgZT17fTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PWVbbl0mJihlW25dPXQuY2FsbCh0aGlzLG4pKSxlW25dfX0oZnVuY3Rpb24odCl7cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodCl9KSxnPW51bGwsaD0wLHc9W10seT1uKDE1KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgREVCVUcmJkRFQlVHJiZcIm9iamVjdFwiIT10eXBlb2YgZG9jdW1lbnQpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO2U9ZXx8e30sZS5hdHRycz1cIm9iamVjdFwiPT10eXBlb2YgZS5hdHRycz9lLmF0dHJzOnt9LGUuc2luZ2xldG9ufHwoZS5zaW5nbGV0b249YigpKSxlLmluc2VydEludG98fChlLmluc2VydEludG89XCJoZWFkXCIpLGUuaW5zZXJ0QXR8fChlLmluc2VydEF0PVwiYm90dG9tXCIpO3ZhciBuPXIodCxlKTtyZXR1cm4gbyhuLGUpLGZ1bmN0aW9uKHQpe2Zvcih2YXIgaT1bXSxhPTA7YTxuLmxlbmd0aDthKyspe3ZhciBzPW5bYV0sYz1tW3MuaWRdO2MucmVmcy0tLGkucHVzaChjKX1pZih0KXtvKHIodCxlKSxlKX1mb3IodmFyIGE9MDthPGkubGVuZ3RoO2ErKyl7dmFyIGM9aVthXTtpZigwPT09Yy5yZWZzKXtmb3IodmFyIGw9MDtsPGMucGFydHMubGVuZ3RoO2wrKyljLnBhcnRzW2xdKCk7ZGVsZXRlIG1bYy5pZF19fX19O3ZhciB4PWZ1bmN0aW9uKCl7dmFyIHQ9W107cmV0dXJuIGZ1bmN0aW9uKGUsbil7cmV0dXJuIHRbZV09bix0LmZpbHRlcihCb29sZWFuKS5qb2luKFwiXFxuXCIpfX0oKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LmxvY2F0aW9uO2lmKCFlKXRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO2lmKCF0fHxcInN0cmluZ1wiIT10eXBlb2YgdClyZXR1cm4gdDt2YXIgbj1lLnByb3RvY29sK1wiLy9cIitlLmhvc3Qsbz1uK2UucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLFwiL1wiKTtyZXR1cm4gdC5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSxmdW5jdGlvbih0LGUpe3ZhciByPWUudHJpbSgpLnJlcGxhY2UoL15cIiguKilcIiQvLGZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV9KS5yZXBsYWNlKC9eJyguKiknJC8sZnVuY3Rpb24odCxlKXtyZXR1cm4gZX0pO2lmKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QocikpcmV0dXJuIHQ7dmFyIGk7cmV0dXJuIGk9MD09PXIuaW5kZXhPZihcIi8vXCIpP3I6MD09PXIuaW5kZXhPZihcIi9cIik/bityOm8rci5yZXBsYWNlKC9eXFwuXFwvLyxcIlwiKSxcInVybChcIitKU09OLnN0cmluZ2lmeShpKStcIilcIn0pfX0sZnVuY3Rpb24odCxlLG4pe3ZhciBvPW4oMTcpO1widW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3d8fHdpbmRvdy5Qcm9taXNlfHwod2luZG93LlByb21pc2U9byksbigyMSksU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc3x8KFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXM9ZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgZSYmKGU9MCksIShlK3QubGVuZ3RoPnRoaXMubGVuZ3RoKSYmLTEhPT10aGlzLmluZGV4T2YodCxlKX0pLEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc3x8T2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSxcImluY2x1ZGVzXCIse3ZhbHVlOmZ1bmN0aW9uKHQsZSl7aWYobnVsbD09dGhpcyl0aHJvdyBuZXcgVHlwZUVycm9yKCdcInRoaXNcIiBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7dmFyIG49T2JqZWN0KHRoaXMpLG89bi5sZW5ndGg+Pj4wO2lmKDA9PT1vKXJldHVybiExO2Zvcih2YXIgcj0wfGUsaT1NYXRoLm1heChyPj0wP3I6by1NYXRoLmFicyhyKSwwKTtpPG87KXtpZihmdW5jdGlvbih0LGUpe3JldHVybiB0PT09ZXx8XCJudW1iZXJcIj09dHlwZW9mIHQmJlwibnVtYmVyXCI9PXR5cGVvZiBlJiZpc05hTih0KSYmaXNOYU4oZSl9KG5baV0sdCkpcmV0dXJuITA7aSsrfXJldHVybiExfX0pLFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJmZ1bmN0aW9uKHQpe3QuZm9yRWFjaChmdW5jdGlvbih0KXt0Lmhhc093blByb3BlcnR5KFwicmVtb3ZlXCIpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcInJlbW92ZVwiLHtjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpmdW5jdGlvbigpe3RoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKX19KX0pfShbRWxlbWVudC5wcm90b3R5cGUsQ2hhcmFjdGVyRGF0YS5wcm90b3R5cGUsRG9jdW1lbnRUeXBlLnByb3RvdHlwZV0pfSxmdW5jdGlvbih0LGUsbil7KGZ1bmN0aW9uKGUpeyFmdW5jdGlvbihuKXtmdW5jdGlvbiBvKCl7fWZ1bmN0aW9uIHIodCxlKXtyZXR1cm4gZnVuY3Rpb24oKXt0LmFwcGx5KGUsYXJndW1lbnRzKX19ZnVuY3Rpb24gaSh0KXtpZihcIm9iamVjdFwiIT10eXBlb2YgdGhpcyl0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3XCIpO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vdCBhIGZ1bmN0aW9uXCIpO3RoaXMuX3N0YXRlPTAsdGhpcy5faGFuZGxlZD0hMSx0aGlzLl92YWx1ZT12b2lkIDAsdGhpcy5fZGVmZXJyZWRzPVtdLGYodCx0aGlzKX1mdW5jdGlvbiBhKHQsZSl7Zm9yKDszPT09dC5fc3RhdGU7KXQ9dC5fdmFsdWU7aWYoMD09PXQuX3N0YXRlKXJldHVybiB2b2lkIHQuX2RlZmVycmVkcy5wdXNoKGUpO3QuX2hhbmRsZWQ9ITAsaS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKXt2YXIgbj0xPT09dC5fc3RhdGU/ZS5vbkZ1bGZpbGxlZDplLm9uUmVqZWN0ZWQ7aWYobnVsbD09PW4pcmV0dXJuIHZvaWQoMT09PXQuX3N0YXRlP3M6YykoZS5wcm9taXNlLHQuX3ZhbHVlKTt2YXIgbzt0cnl7bz1uKHQuX3ZhbHVlKX1jYXRjaCh0KXtyZXR1cm4gdm9pZCBjKGUucHJvbWlzZSx0KX1zKGUucHJvbWlzZSxvKX0pfWZ1bmN0aW9uIHModCxlKXt0cnl7aWYoZT09PXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkEgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuXCIpO2lmKGUmJihcIm9iamVjdFwiPT10eXBlb2YgZXx8XCJmdW5jdGlvblwiPT10eXBlb2YgZSkpe3ZhciBuPWUudGhlbjtpZihlIGluc3RhbmNlb2YgaSlyZXR1cm4gdC5fc3RhdGU9Myx0Ll92YWx1ZT1lLHZvaWQgbCh0KTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXJldHVybiB2b2lkIGYocihuLGUpLHQpfXQuX3N0YXRlPTEsdC5fdmFsdWU9ZSxsKHQpfWNhdGNoKGUpe2ModCxlKX19ZnVuY3Rpb24gYyh0LGUpe3QuX3N0YXRlPTIsdC5fdmFsdWU9ZSxsKHQpfWZ1bmN0aW9uIGwodCl7Mj09PXQuX3N0YXRlJiYwPT09dC5fZGVmZXJyZWRzLmxlbmd0aCYmaS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKXt0Ll9oYW5kbGVkfHxpLl91bmhhbmRsZWRSZWplY3Rpb25Gbih0Ll92YWx1ZSl9KTtmb3IodmFyIGU9MCxuPXQuX2RlZmVycmVkcy5sZW5ndGg7ZTxuO2UrKylhKHQsdC5fZGVmZXJyZWRzW2VdKTt0Ll9kZWZlcnJlZHM9bnVsbH1mdW5jdGlvbiB1KHQsZSxuKXt0aGlzLm9uRnVsZmlsbGVkPVwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dDpudWxsLHRoaXMub25SZWplY3RlZD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2U6bnVsbCx0aGlzLnByb21pc2U9bn1mdW5jdGlvbiBmKHQsZSl7dmFyIG49ITE7dHJ5e3QoZnVuY3Rpb24odCl7bnx8KG49ITAscyhlLHQpKX0sZnVuY3Rpb24odCl7bnx8KG49ITAsYyhlLHQpKX0pfWNhdGNoKHQpe2lmKG4pcmV0dXJuO249ITAsYyhlLHQpfX12YXIgZD1zZXRUaW1lb3V0O2kucHJvdG90eXBlLmNhdGNoPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnRoZW4obnVsbCx0KX0saS5wcm90b3R5cGUudGhlbj1mdW5jdGlvbih0LGUpe3ZhciBuPW5ldyB0aGlzLmNvbnN0cnVjdG9yKG8pO3JldHVybiBhKHRoaXMsbmV3IHUodCxlLG4pKSxufSxpLmFsbD1mdW5jdGlvbih0KXt2YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0KTtyZXR1cm4gbmV3IGkoZnVuY3Rpb24odCxuKXtmdW5jdGlvbiBvKGksYSl7dHJ5e2lmKGEmJihcIm9iamVjdFwiPT10eXBlb2YgYXx8XCJmdW5jdGlvblwiPT10eXBlb2YgYSkpe3ZhciBzPWEudGhlbjtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBzKXJldHVybiB2b2lkIHMuY2FsbChhLGZ1bmN0aW9uKHQpe28oaSx0KX0sbil9ZVtpXT1hLDA9PS0tciYmdChlKX1jYXRjaCh0KXtuKHQpfX1pZigwPT09ZS5sZW5ndGgpcmV0dXJuIHQoW10pO2Zvcih2YXIgcj1lLmxlbmd0aCxpPTA7aTxlLmxlbmd0aDtpKyspbyhpLGVbaV0pfSl9LGkucmVzb2x2ZT1mdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJvYmplY3RcIj09dHlwZW9mIHQmJnQuY29uc3RydWN0b3I9PT1pP3Q6bmV3IGkoZnVuY3Rpb24oZSl7ZSh0KX0pfSxpLnJlamVjdD1mdW5jdGlvbih0KXtyZXR1cm4gbmV3IGkoZnVuY3Rpb24oZSxuKXtuKHQpfSl9LGkucmFjZT1mdW5jdGlvbih0KXtyZXR1cm4gbmV3IGkoZnVuY3Rpb24oZSxuKXtmb3IodmFyIG89MCxyPXQubGVuZ3RoO288cjtvKyspdFtvXS50aGVuKGUsbil9KX0saS5faW1tZWRpYXRlRm49XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmZnVuY3Rpb24odCl7ZSh0KX18fGZ1bmN0aW9uKHQpe2QodCwwKX0saS5fdW5oYW5kbGVkUmVqZWN0aW9uRm49ZnVuY3Rpb24odCl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGNvbnNvbGUmJmNvbnNvbGUmJmNvbnNvbGUud2FybihcIlBvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjpcIix0KX0saS5fc2V0SW1tZWRpYXRlRm49ZnVuY3Rpb24odCl7aS5faW1tZWRpYXRlRm49dH0saS5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm49ZnVuY3Rpb24odCl7aS5fdW5oYW5kbGVkUmVqZWN0aW9uRm49dH0sdm9pZCAwIT09dCYmdC5leHBvcnRzP3QuZXhwb3J0cz1pOm4uUHJvbWlzZXx8KG4uUHJvbWlzZT1pKX0odGhpcyl9KS5jYWxsKGUsbigxOCkuc2V0SW1tZWRpYXRlKX0sZnVuY3Rpb24odCxlLG4pe2Z1bmN0aW9uIG8odCxlKXt0aGlzLl9pZD10LHRoaXMuX2NsZWFyRm49ZX12YXIgcj1GdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7ZS5zZXRUaW1lb3V0PWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBvKHIuY2FsbChzZXRUaW1lb3V0LHdpbmRvdyxhcmd1bWVudHMpLGNsZWFyVGltZW91dCl9LGUuc2V0SW50ZXJ2YWw9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG8oci5jYWxsKHNldEludGVydmFsLHdpbmRvdyxhcmd1bWVudHMpLGNsZWFySW50ZXJ2YWwpfSxlLmNsZWFyVGltZW91dD1lLmNsZWFySW50ZXJ2YWw9ZnVuY3Rpb24odCl7dCYmdC5jbG9zZSgpfSxvLnByb3RvdHlwZS51bnJlZj1vLnByb3RvdHlwZS5yZWY9ZnVuY3Rpb24oKXt9LG8ucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7dGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdyx0aGlzLl9pZCl9LGUuZW5yb2xsPWZ1bmN0aW9uKHQsZSl7Y2xlYXJUaW1lb3V0KHQuX2lkbGVUaW1lb3V0SWQpLHQuX2lkbGVUaW1lb3V0PWV9LGUudW5lbnJvbGw9ZnVuY3Rpb24odCl7Y2xlYXJUaW1lb3V0KHQuX2lkbGVUaW1lb3V0SWQpLHQuX2lkbGVUaW1lb3V0PS0xfSxlLl91bnJlZkFjdGl2ZT1lLmFjdGl2ZT1mdW5jdGlvbih0KXtjbGVhclRpbWVvdXQodC5faWRsZVRpbWVvdXRJZCk7dmFyIGU9dC5faWRsZVRpbWVvdXQ7ZT49MCYmKHQuX2lkbGVUaW1lb3V0SWQ9c2V0VGltZW91dChmdW5jdGlvbigpe3QuX29uVGltZW91dCYmdC5fb25UaW1lb3V0KCl9LGUpKX0sbigxOSksZS5zZXRJbW1lZGlhdGU9c2V0SW1tZWRpYXRlLGUuY2xlYXJJbW1lZGlhdGU9Y2xlYXJJbW1lZGlhdGV9LGZ1bmN0aW9uKHQsZSxuKXsoZnVuY3Rpb24odCxlKXshZnVuY3Rpb24odCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBvKHQpe1wiZnVuY3Rpb25cIiE9dHlwZW9mIHQmJih0PW5ldyBGdW5jdGlvbihcIlwiK3QpKTtmb3IodmFyIGU9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSksbj0wO248ZS5sZW5ndGg7bisrKWVbbl09YXJndW1lbnRzW24rMV07dmFyIG89e2NhbGxiYWNrOnQsYXJnczplfTtyZXR1cm4gbFtjXT1vLHMoYyksYysrfWZ1bmN0aW9uIHIodCl7ZGVsZXRlIGxbdF19ZnVuY3Rpb24gaSh0KXt2YXIgZT10LmNhbGxiYWNrLG89dC5hcmdzO3N3aXRjaChvLmxlbmd0aCl7Y2FzZSAwOmUoKTticmVhaztjYXNlIDE6ZShvWzBdKTticmVhaztjYXNlIDI6ZShvWzBdLG9bMV0pO2JyZWFrO2Nhc2UgMzplKG9bMF0sb1sxXSxvWzJdKTticmVhaztkZWZhdWx0OmUuYXBwbHkobixvKX19ZnVuY3Rpb24gYSh0KXtpZih1KXNldFRpbWVvdXQoYSwwLHQpO2Vsc2V7dmFyIGU9bFt0XTtpZihlKXt1PSEwO3RyeXtpKGUpfWZpbmFsbHl7cih0KSx1PSExfX19fWlmKCF0LnNldEltbWVkaWF0ZSl7dmFyIHMsYz0xLGw9e30sdT0hMSxmPXQuZG9jdW1lbnQsZD1PYmplY3QuZ2V0UHJvdG90eXBlT2YmJk9iamVjdC5nZXRQcm90b3R5cGVPZih0KTtkPWQmJmQuc2V0VGltZW91dD9kOnQsXCJbb2JqZWN0IHByb2Nlc3NdXCI9PT17fS50b1N0cmluZy5jYWxsKHQucHJvY2Vzcyk/ZnVuY3Rpb24oKXtzPWZ1bmN0aW9uKHQpe2UubmV4dFRpY2soZnVuY3Rpb24oKXthKHQpfSl9fSgpOmZ1bmN0aW9uKCl7aWYodC5wb3N0TWVzc2FnZSYmIXQuaW1wb3J0U2NyaXB0cyl7dmFyIGU9ITAsbj10Lm9ubWVzc2FnZTtyZXR1cm4gdC5vbm1lc3NhZ2U9ZnVuY3Rpb24oKXtlPSExfSx0LnBvc3RNZXNzYWdlKFwiXCIsXCIqXCIpLHQub25tZXNzYWdlPW4sZX19KCk/ZnVuY3Rpb24oKXt2YXIgZT1cInNldEltbWVkaWF0ZSRcIitNYXRoLnJhbmRvbSgpK1wiJFwiLG49ZnVuY3Rpb24obil7bi5zb3VyY2U9PT10JiZcInN0cmluZ1wiPT10eXBlb2Ygbi5kYXRhJiYwPT09bi5kYXRhLmluZGV4T2YoZSkmJmEoK24uZGF0YS5zbGljZShlLmxlbmd0aCkpfTt0LmFkZEV2ZW50TGlzdGVuZXI/dC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLG4sITEpOnQuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIixuKSxzPWZ1bmN0aW9uKG4pe3QucG9zdE1lc3NhZ2UoZStuLFwiKlwiKX19KCk6dC5NZXNzYWdlQ2hhbm5lbD9mdW5jdGlvbigpe3ZhciB0PW5ldyBNZXNzYWdlQ2hhbm5lbDt0LnBvcnQxLm9ubWVzc2FnZT1mdW5jdGlvbih0KXthKHQuZGF0YSl9LHM9ZnVuY3Rpb24oZSl7dC5wb3J0Mi5wb3N0TWVzc2FnZShlKX19KCk6ZiYmXCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIGYuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKT9mdW5jdGlvbigpe3ZhciB0PWYuZG9jdW1lbnRFbGVtZW50O3M9ZnVuY3Rpb24oZSl7dmFyIG49Zi5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO24ub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YShlKSxuLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLHQucmVtb3ZlQ2hpbGQobiksbj1udWxsfSx0LmFwcGVuZENoaWxkKG4pfX0oKTpmdW5jdGlvbigpe3M9ZnVuY3Rpb24odCl7c2V0VGltZW91dChhLDAsdCl9fSgpLGQuc2V0SW1tZWRpYXRlPW8sZC5jbGVhckltbWVkaWF0ZT1yfX0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHNlbGY/dm9pZCAwPT09dD90aGlzOnQ6c2VsZil9KS5jYWxsKGUsbig3KSxuKDIwKSl9LGZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gbigpe3Rocm93IG5ldyBFcnJvcihcInNldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWRcIil9ZnVuY3Rpb24gbygpe3Rocm93IG5ldyBFcnJvcihcImNsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZFwiKX1mdW5jdGlvbiByKHQpe2lmKHU9PT1zZXRUaW1lb3V0KXJldHVybiBzZXRUaW1lb3V0KHQsMCk7aWYoKHU9PT1ufHwhdSkmJnNldFRpbWVvdXQpcmV0dXJuIHU9c2V0VGltZW91dCxzZXRUaW1lb3V0KHQsMCk7dHJ5e3JldHVybiB1KHQsMCl9Y2F0Y2goZSl7dHJ5e3JldHVybiB1LmNhbGwobnVsbCx0LDApfWNhdGNoKGUpe3JldHVybiB1LmNhbGwodGhpcyx0LDApfX19ZnVuY3Rpb24gaSh0KXtpZihmPT09Y2xlYXJUaW1lb3V0KXJldHVybiBjbGVhclRpbWVvdXQodCk7aWYoKGY9PT1vfHwhZikmJmNsZWFyVGltZW91dClyZXR1cm4gZj1jbGVhclRpbWVvdXQsY2xlYXJUaW1lb3V0KHQpO3RyeXtyZXR1cm4gZih0KX1jYXRjaChlKXt0cnl7cmV0dXJuIGYuY2FsbChudWxsLHQpfWNhdGNoKGUpe3JldHVybiBmLmNhbGwodGhpcyx0KX19fWZ1bmN0aW9uIGEoKXtiJiZwJiYoYj0hMSxwLmxlbmd0aD9tPXAuY29uY2F0KG0pOnY9LTEsbS5sZW5ndGgmJnMoKSl9ZnVuY3Rpb24gcygpe2lmKCFiKXt2YXIgdD1yKGEpO2I9ITA7Zm9yKHZhciBlPW0ubGVuZ3RoO2U7KXtmb3IocD1tLG09W107Kyt2PGU7KXAmJnBbdl0ucnVuKCk7dj0tMSxlPW0ubGVuZ3RofXA9bnVsbCxiPSExLGkodCl9fWZ1bmN0aW9uIGModCxlKXt0aGlzLmZ1bj10LHRoaXMuYXJyYXk9ZX1mdW5jdGlvbiBsKCl7fXZhciB1LGYsZD10LmV4cG9ydHM9e307IWZ1bmN0aW9uKCl7dHJ5e3U9XCJmdW5jdGlvblwiPT10eXBlb2Ygc2V0VGltZW91dD9zZXRUaW1lb3V0Om59Y2F0Y2godCl7dT1ufXRyeXtmPVwiZnVuY3Rpb25cIj09dHlwZW9mIGNsZWFyVGltZW91dD9jbGVhclRpbWVvdXQ6b31jYXRjaCh0KXtmPW99fSgpO3ZhciBwLG09W10sYj0hMSx2PS0xO2QubmV4dFRpY2s9ZnVuY3Rpb24odCl7dmFyIGU9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSk7aWYoYXJndW1lbnRzLmxlbmd0aD4xKWZvcih2YXIgbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspZVtuLTFdPWFyZ3VtZW50c1tuXTttLnB1c2gobmV3IGModCxlKSksMSE9PW0ubGVuZ3RofHxifHxyKHMpfSxjLnByb3RvdHlwZS5ydW49ZnVuY3Rpb24oKXt0aGlzLmZ1bi5hcHBseShudWxsLHRoaXMuYXJyYXkpfSxkLnRpdGxlPVwiYnJvd3NlclwiLGQuYnJvd3Nlcj0hMCxkLmVudj17fSxkLmFyZ3Y9W10sZC52ZXJzaW9uPVwiXCIsZC52ZXJzaW9ucz17fSxkLm9uPWwsZC5hZGRMaXN0ZW5lcj1sLGQub25jZT1sLGQub2ZmPWwsZC5yZW1vdmVMaXN0ZW5lcj1sLGQucmVtb3ZlQWxsTGlzdGVuZXJzPWwsZC5lbWl0PWwsZC5wcmVwZW5kTGlzdGVuZXI9bCxkLnByZXBlbmRPbmNlTGlzdGVuZXI9bCxkLmxpc3RlbmVycz1mdW5jdGlvbih0KXtyZXR1cm5bXX0sZC5iaW5kaW5nPWZ1bmN0aW9uKHQpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpfSxkLmN3ZD1mdW5jdGlvbigpe3JldHVyblwiL1wifSxkLmNoZGlyPWZ1bmN0aW9uKHQpe3Rocm93IG5ldyBFcnJvcihcInByb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZFwiKX0sZC51bWFzaz1mdW5jdGlvbigpe3JldHVybiAwfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO24oMjIpLnBvbHlmaWxsKCl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBvKHQsZSl7aWYodm9pZCAwPT09dHx8bnVsbD09PXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdFwiKTtmb3IodmFyIG49T2JqZWN0KHQpLG89MTtvPGFyZ3VtZW50cy5sZW5ndGg7bysrKXt2YXIgcj1hcmd1bWVudHNbb107aWYodm9pZCAwIT09ciYmbnVsbCE9PXIpZm9yKHZhciBpPU9iamVjdC5rZXlzKE9iamVjdChyKSksYT0wLHM9aS5sZW5ndGg7YTxzO2ErKyl7dmFyIGM9aVthXSxsPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocixjKTt2b2lkIDAhPT1sJiZsLmVudW1lcmFibGUmJihuW2NdPXJbY10pfX1yZXR1cm4gbn1mdW5jdGlvbiByKCl7T2JqZWN0LmFzc2lnbnx8T2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCxcImFzc2lnblwiLHtlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpvfSl9dC5leHBvcnRzPXthc3NpZ246byxwb2x5ZmlsbDpyfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMjQpLHI9big2KSxpPW4oNSksYT1uKDM2KSxzPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PVtdLGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXRbZV09YXJndW1lbnRzW2VdO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpe3ZhciBuPWEuZ2V0T3B0cy5hcHBseSh2b2lkIDAsdCk7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHQsZSl7aS5kZWZhdWx0LnByb21pc2U9e3Jlc29sdmU6dCxyZWplY3Q6ZX0sby5kZWZhdWx0KG4pLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyLm9wZW5Nb2RhbCgpfSl9KX19O3MuY2xvc2U9ci5vbkFjdGlvbixzLmdldFN0YXRlPXIuZ2V0U3RhdGUscy5zZXRBY3Rpb25WYWx1ZT1pLnNldEFjdGlvblZhbHVlLHMuc3RvcExvYWRpbmc9ci5zdG9wTG9hZGluZyxzLnNldERlZmF1bHRzPWEuc2V0RGVmYXVsdHMsZS5kZWZhdWx0PXN9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDEpLHI9bigwKSxpPXIuZGVmYXVsdC5NT0RBTCxhPW4oNCkscz1uKDM0KSxjPW4oMzUpLGw9bigxKTtlLmluaXQ9ZnVuY3Rpb24odCl7by5nZXROb2RlKGkpfHwoZG9jdW1lbnQuYm9keXx8bC50aHJvd0VycihcIllvdSBjYW4gb25seSB1c2UgU3dlZXRBbGVydCBBRlRFUiB0aGUgRE9NIGhhcyBsb2FkZWQhXCIpLHMuZGVmYXVsdCgpLGEuZGVmYXVsdCgpKSxhLmluaXRNb2RhbENvbnRlbnQodCksYy5kZWZhdWx0KHQpfSxlLmRlZmF1bHQ9ZS5pbml0fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigwKSxyPW8uZGVmYXVsdC5NT0RBTDtlLm1vZGFsTWFya3VwPSdcXG4gIDxkaXYgY2xhc3M9XCInK3IrJ1wiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiPjwvZGl2PicsZS5kZWZhdWx0PWUubW9kYWxNYXJrdXB9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDApLHI9by5kZWZhdWx0Lk9WRVJMQVksaT0nPGRpdiBcXG4gICAgY2xhc3M9XCInK3IrJ1wiXFxuICAgIHRhYkluZGV4PVwiLTFcIj5cXG4gIDwvZGl2Pic7ZS5kZWZhdWx0PWl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDApLHI9by5kZWZhdWx0LklDT047ZS5lcnJvckljb25NYXJrdXA9ZnVuY3Rpb24oKXt2YXIgdD1yK1wiLS1lcnJvclwiLGU9dCtcIl9fbGluZVwiO3JldHVybidcXG4gICAgPGRpdiBjbGFzcz1cIicrdCsnX194LW1hcmtcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIicrZStcIiBcIitlKyctLWxlZnRcIj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCInK2UrXCIgXCIrZSsnLS1yaWdodFwiPjwvc3Bhbj5cXG4gICAgPC9kaXY+XFxuICAnfSxlLndhcm5pbmdJY29uTWFya3VwPWZ1bmN0aW9uKCl7dmFyIHQ9citcIi0td2FybmluZ1wiO3JldHVybidcXG4gICAgPHNwYW4gY2xhc3M9XCInK3QrJ19fYm9keVwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiJyt0KydfX2RvdFwiPjwvc3Bhbj5cXG4gICAgPC9zcGFuPlxcbiAgJ30sZS5zdWNjZXNzSWNvbk1hcmt1cD1mdW5jdGlvbigpe3ZhciB0PXIrXCItLXN1Y2Nlc3NcIjtyZXR1cm4nXFxuICAgIDxzcGFuIGNsYXNzPVwiJyt0K1wiX19saW5lIFwiK3QrJ19fbGluZS0tbG9uZ1wiPjwvc3Bhbj5cXG4gICAgPHNwYW4gY2xhc3M9XCInK3QrXCJfX2xpbmUgXCIrdCsnX19saW5lLS10aXBcIj48L3NwYW4+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCInK3QrJ19fcmluZ1wiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiJyt0KydfX2hpZGUtY29ybmVyc1wiPjwvZGl2PlxcbiAgJ319LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDApLHI9by5kZWZhdWx0LkNPTlRFTlQ7ZS5jb250ZW50TWFya3VwPSdcXG4gIDxkaXYgY2xhc3M9XCInK3IrJ1wiPlxcblxcbiAgPC9kaXY+XFxuJ30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMCkscj1vLmRlZmF1bHQuQlVUVE9OX0NPTlRBSU5FUixpPW8uZGVmYXVsdC5CVVRUT04sYT1vLmRlZmF1bHQuQlVUVE9OX0xPQURFUjtlLmJ1dHRvbk1hcmt1cD0nXFxuICA8ZGl2IGNsYXNzPVwiJytyKydcIj5cXG5cXG4gICAgPGJ1dHRvblxcbiAgICAgIGNsYXNzPVwiJytpKydcIlxcbiAgICA+PC9idXR0b24+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCInK2ErJ1wiPlxcbiAgICAgIDxkaXY+PC9kaXY+XFxuICAgICAgPGRpdj48L2Rpdj5cXG4gICAgICA8ZGl2PjwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gIDwvZGl2Plxcbid9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDQpLHI9bigyKSxpPW4oMCksYT1pLmRlZmF1bHQuSUNPTixzPWkuZGVmYXVsdC5JQ09OX0NVU1RPTSxjPVtcImVycm9yXCIsXCJ3YXJuaW5nXCIsXCJzdWNjZXNzXCIsXCJpbmZvXCJdLGw9e2Vycm9yOnIuZXJyb3JJY29uTWFya3VwKCksd2FybmluZzpyLndhcm5pbmdJY29uTWFya3VwKCksc3VjY2VzczpyLnN1Y2Nlc3NJY29uTWFya3VwKCl9LHU9ZnVuY3Rpb24odCxlKXt2YXIgbj1hK1wiLS1cIit0O2UuY2xhc3NMaXN0LmFkZChuKTt2YXIgbz1sW3RdO28mJihlLmlubmVySFRNTD1vKX0sZj1mdW5jdGlvbih0LGUpe2UuY2xhc3NMaXN0LmFkZChzKTt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO24uc3JjPXQsZS5hcHBlbmRDaGlsZChuKX0sZD1mdW5jdGlvbih0KXtpZih0KXt2YXIgZT1vLmluamVjdEVsSW50b01vZGFsKHIuaWNvbk1hcmt1cCk7Yy5pbmNsdWRlcyh0KT91KHQsZSk6Zih0LGUpfX07ZS5kZWZhdWx0PWR9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDIpLHI9big0KSxpPWZ1bmN0aW9uKHQpe25hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJBcHBsZVdlYktpdFwiKSYmKHQuc3R5bGUuZGlzcGxheT1cIm5vbmVcIix0Lm9mZnNldEhlaWdodCx0LnN0eWxlLmRpc3BsYXk9XCJcIil9O2UuaW5pdFRpdGxlPWZ1bmN0aW9uKHQpe2lmKHQpe3ZhciBlPXIuaW5qZWN0RWxJbnRvTW9kYWwoby50aXRsZU1hcmt1cCk7ZS50ZXh0Q29udGVudD10LGkoZSl9fSxlLmluaXRUZXh0PWZ1bmN0aW9uKHQpe2lmKHQpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTt0LnNwbGl0KFwiXFxuXCIpLmZvckVhY2goZnVuY3Rpb24odCxuLG8pe2UuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodCkpLG48by5sZW5ndGgtMSYmZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpfSk7dmFyIG49ci5pbmplY3RFbEludG9Nb2RhbChvLnRleHRNYXJrdXApO24uYXBwZW5kQ2hpbGQoZSksaShuKX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigxKSxyPW4oNCksaT1uKDApLGE9aS5kZWZhdWx0LkJVVFRPTixzPWkuZGVmYXVsdC5EQU5HRVJfQlVUVE9OLGM9bigzKSxsPW4oMiksdT1uKDYpLGY9big1KSxkPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1lLnRleHQsaT1lLnZhbHVlLGQ9ZS5jbGFzc05hbWUscD1lLmNsb3NlTW9kYWwsbT1vLnN0cmluZ1RvTm9kZShsLmJ1dHRvbk1hcmt1cCksYj1tLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrYSksdj1hK1wiLS1cIit0O2lmKGIuY2xhc3NMaXN0LmFkZCh2KSxkKXsoQXJyYXkuaXNBcnJheShkKT9kOmQuc3BsaXQoXCIgXCIpKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQubGVuZ3RoPjB9KS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2IuY2xhc3NMaXN0LmFkZCh0KX0pfW4mJnQ9PT1jLkNPTkZJUk1fS0VZJiZiLmNsYXNzTGlzdC5hZGQocyksYi50ZXh0Q29udGVudD1yO3ZhciBnPXt9O3JldHVybiBnW3RdPWksZi5zZXRBY3Rpb25WYWx1ZShnKSxmLnNldEFjdGlvbk9wdGlvbnNGb3IodCx7Y2xvc2VNb2RhbDpwfSksYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe3JldHVybiB1Lm9uQWN0aW9uKHQpfSksbX0scD1mdW5jdGlvbih0LGUpe3ZhciBuPXIuaW5qZWN0RWxJbnRvTW9kYWwobC5mb290ZXJNYXJrdXApO2Zvcih2YXIgbyBpbiB0KXt2YXIgaT10W29dLGE9ZChvLGksZSk7aS52aXNpYmxlJiZuLmFwcGVuZENoaWxkKGEpfTA9PT1uLmNoaWxkcmVuLmxlbmd0aCYmbi5yZW1vdmUoKX07ZS5kZWZhdWx0PXB9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDMpLHI9big0KSxpPW4oMiksYT1uKDUpLHM9big2KSxjPW4oMCksbD1jLmRlZmF1bHQuQ09OVEVOVCx1PWZ1bmN0aW9uKHQpe3QuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24odCl7dmFyIGU9dC50YXJnZXQsbj1lLnZhbHVlO2Euc2V0QWN0aW9uVmFsdWUobil9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLGZ1bmN0aW9uKHQpe2lmKFwiRW50ZXJcIj09PXQua2V5KXJldHVybiBzLm9uQWN0aW9uKG8uQ09ORklSTV9LRVkpfSksc2V0VGltZW91dChmdW5jdGlvbigpe3QuZm9jdXMoKSxhLnNldEFjdGlvblZhbHVlKFwiXCIpfSwwKX0sZj1mdW5jdGlvbih0LGUsbil7dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlKSxyPWwrXCJfX1wiK2U7by5jbGFzc0xpc3QuYWRkKHIpO2Zvcih2YXIgaSBpbiBuKXt2YXIgYT1uW2ldO29baV09YX1cImlucHV0XCI9PT1lJiZ1KG8pLHQuYXBwZW5kQ2hpbGQobyl9LGQ9ZnVuY3Rpb24odCl7aWYodCl7dmFyIGU9ci5pbmplY3RFbEludG9Nb2RhbChpLmNvbnRlbnRNYXJrdXApLG49dC5lbGVtZW50LG89dC5hdHRyaWJ1dGVzO1wic3RyaW5nXCI9PXR5cGVvZiBuP2YoZSxuLG8pOmUuYXBwZW5kQ2hpbGQobil9fTtlLmRlZmF1bHQ9ZH0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMSkscj1uKDIpLGk9ZnVuY3Rpb24oKXt2YXIgdD1vLnN0cmluZ1RvTm9kZShyLm92ZXJsYXlNYXJrdXApO2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodCl9O2UuZGVmYXVsdD1pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89big1KSxyPW4oNiksaT1uKDEpLGE9bigzKSxzPW4oMCksYz1zLmRlZmF1bHQuTU9EQUwsbD1zLmRlZmF1bHQuQlVUVE9OLHU9cy5kZWZhdWx0Lk9WRVJMQVksZj1mdW5jdGlvbih0KXt0LnByZXZlbnREZWZhdWx0KCksdigpfSxkPWZ1bmN0aW9uKHQpe3QucHJldmVudERlZmF1bHQoKSxnKCl9LHA9ZnVuY3Rpb24odCl7aWYoby5kZWZhdWx0LmlzT3Blbilzd2l0Y2godC5rZXkpe2Nhc2VcIkVzY2FwZVwiOnJldHVybiByLm9uQWN0aW9uKGEuQ0FOQ0VMX0tFWSl9fSxtPWZ1bmN0aW9uKHQpe2lmKG8uZGVmYXVsdC5pc09wZW4pc3dpdGNoKHQua2V5KXtjYXNlXCJUYWJcIjpyZXR1cm4gZih0KX19LGI9ZnVuY3Rpb24odCl7aWYoby5kZWZhdWx0LmlzT3BlbilyZXR1cm5cIlRhYlwiPT09dC5rZXkmJnQuc2hpZnRLZXk/ZCh0KTp2b2lkIDB9LHY9ZnVuY3Rpb24oKXt2YXIgdD1pLmdldE5vZGUobCk7dCYmKHQudGFiSW5kZXg9MCx0LmZvY3VzKCkpfSxnPWZ1bmN0aW9uKCl7dmFyIHQ9aS5nZXROb2RlKGMpLGU9dC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK2wpLG49ZS5sZW5ndGgtMSxvPWVbbl07byYmby5mb2N1cygpfSxoPWZ1bmN0aW9uKHQpe3RbdC5sZW5ndGgtMV0uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixtKX0sdz1mdW5jdGlvbih0KXt0WzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsYil9LHk9ZnVuY3Rpb24oKXt2YXIgdD1pLmdldE5vZGUoYyksZT10LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrbCk7ZS5sZW5ndGgmJihoKGUpLHcoZSkpfSx4PWZ1bmN0aW9uKHQpe2lmKGkuZ2V0Tm9kZSh1KT09PXQudGFyZ2V0KXJldHVybiByLm9uQWN0aW9uKGEuQ0FOQ0VMX0tFWSl9LF89ZnVuY3Rpb24odCl7dmFyIGU9aS5nZXROb2RlKHUpO2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIseCksdCYmZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix4KX0saz1mdW5jdGlvbih0KXtvLmRlZmF1bHQudGltZXImJmNsZWFyVGltZW91dChvLmRlZmF1bHQudGltZXIpLHQmJihvLmRlZmF1bHQudGltZXI9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gci5vbkFjdGlvbihhLkNBTkNFTF9LRVkpfSx0KSl9LE89ZnVuY3Rpb24odCl7dC5jbG9zZU9uRXNjP2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLHApOmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLHApLHQuZGFuZ2VyTW9kZT92KCk6ZygpLHkoKSxfKHQuY2xvc2VPbkNsaWNrT3V0c2lkZSksayh0LnRpbWVyKX07ZS5kZWZhdWx0PU99LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDEpLHI9bigzKSxpPW4oMzcpLGE9bigzOCkscz17dGl0bGU6bnVsbCx0ZXh0Om51bGwsaWNvbjpudWxsLGJ1dHRvbnM6ci5kZWZhdWx0QnV0dG9uTGlzdCxjb250ZW50Om51bGwsY2xhc3NOYW1lOm51bGwsY2xvc2VPbkNsaWNrT3V0c2lkZTohMCxjbG9zZU9uRXNjOiEwLGRhbmdlck1vZGU6ITEsdGltZXI6bnVsbH0sYz1PYmplY3QuYXNzaWduKHt9LHMpO2Uuc2V0RGVmYXVsdHM9ZnVuY3Rpb24odCl7Yz1PYmplY3QuYXNzaWduKHt9LHMsdCl9O3ZhciBsPWZ1bmN0aW9uKHQpe3ZhciBlPXQmJnQuYnV0dG9uLG49dCYmdC5idXR0b25zO3JldHVybiB2b2lkIDAhPT1lJiZ2b2lkIDAhPT1uJiZvLnRocm93RXJyKFwiQ2Fubm90IHNldCBib3RoICdidXR0b24nIGFuZCAnYnV0dG9ucycgb3B0aW9ucyFcIiksdm9pZCAwIT09ZT97Y29uZmlybTplfTpufSx1PWZ1bmN0aW9uKHQpe3JldHVybiBvLm9yZGluYWxTdWZmaXhPZih0KzEpfSxmPWZ1bmN0aW9uKHQsZSl7by50aHJvd0Vycih1KGUpK1wiIGFyZ3VtZW50ICgnXCIrdCtcIicpIGlzIGludmFsaWRcIil9LGQ9ZnVuY3Rpb24odCxlKXt2YXIgbj10KzEscj1lW25dO28uaXNQbGFpbk9iamVjdChyKXx8dm9pZCAwPT09cnx8by50aHJvd0VycihcIkV4cGVjdGVkIFwiK3UobikrXCIgYXJndW1lbnQgKCdcIityK1wiJykgdG8gYmUgYSBwbGFpbiBvYmplY3RcIil9LHA9ZnVuY3Rpb24odCxlKXt2YXIgbj10KzEscj1lW25dO3ZvaWQgMCE9PXImJm8udGhyb3dFcnIoXCJVbmV4cGVjdGVkIFwiK3UobikrXCIgYXJndW1lbnQgKFwiK3IrXCIpXCIpfSxtPWZ1bmN0aW9uKHQsZSxuLHIpe3ZhciBpPXR5cGVvZiBlLGE9XCJzdHJpbmdcIj09PWkscz1lIGluc3RhbmNlb2YgRWxlbWVudDtpZihhKXtpZigwPT09bilyZXR1cm57dGV4dDplfTtpZigxPT09bilyZXR1cm57dGV4dDplLHRpdGxlOnJbMF19O2lmKDI9PT1uKXJldHVybiBkKG4scikse2ljb246ZX07ZihlLG4pfWVsc2V7aWYocyYmMD09PW4pcmV0dXJuIGQobixyKSx7Y29udGVudDplfTtpZihvLmlzUGxhaW5PYmplY3QoZSkpcmV0dXJuIHAobixyKSxlO2YoZSxuKX19O2UuZ2V0T3B0cz1mdW5jdGlvbigpe2Zvcih2YXIgdD1bXSxlPTA7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl0W2VdPWFyZ3VtZW50c1tlXTt2YXIgbj17fTt0LmZvckVhY2goZnVuY3Rpb24oZSxvKXt2YXIgcj1tKDAsZSxvLHQpO09iamVjdC5hc3NpZ24obixyKX0pO3ZhciBvPWwobik7bi5idXR0b25zPXIuZ2V0QnV0dG9uTGlzdE9wdHMobyksZGVsZXRlIG4uYnV0dG9uLG4uY29udGVudD1pLmdldENvbnRlbnRPcHRzKG4uY29udGVudCk7dmFyIHU9T2JqZWN0LmFzc2lnbih7fSxzLGMsbik7cmV0dXJuIE9iamVjdC5rZXlzKHUpLmZvckVhY2goZnVuY3Rpb24odCl7YS5ERVBSRUNBVEVEX09QVFNbdF0mJmEubG9nRGVwcmVjYXRpb24odCl9KSx1fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMSkscj17ZWxlbWVudDpcImlucHV0XCIsYXR0cmlidXRlczp7cGxhY2Vob2xkZXI6XCJcIn19O2UuZ2V0Q29udGVudE9wdHM9ZnVuY3Rpb24odCl7dmFyIGU9e307cmV0dXJuIG8uaXNQbGFpbk9iamVjdCh0KT9PYmplY3QuYXNzaWduKGUsdCk6dCBpbnN0YW5jZW9mIEVsZW1lbnQ/e2VsZW1lbnQ6dH06XCJpbnB1dFwiPT09dD9yOm51bGx9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5sb2dEZXByZWNhdGlvbj1mdW5jdGlvbih0KXt2YXIgbj1lLkRFUFJFQ0FURURfT1BUU1t0XSxvPW4ub25seVJlbmFtZSxyPW4ucmVwbGFjZW1lbnQsaT1uLnN1Yk9wdGlvbixhPW4ubGluayxzPW8/XCJyZW5hbWVkXCI6XCJkZXByZWNhdGVkXCIsYz0nU3dlZXRBbGVydCB3YXJuaW5nOiBcIicrdCsnXCIgb3B0aW9uIGhhcyBiZWVuICcrcytcIi5cIjtpZihyKXtjKz1cIiBQbGVhc2UgdXNlXCIrKGk/JyBcIicraSsnXCIgaW4gJzpcIiBcIikrJ1wiJytyKydcIiBpbnN0ZWFkLid9dmFyIGw9XCJodHRwczovL3N3ZWV0YWxlcnQuanMub3JnXCI7Yys9YT9cIiBNb3JlIGRldGFpbHM6IFwiK2wrYTpcIiBNb3JlIGRldGFpbHM6IFwiK2wrXCIvZ3VpZGVzLyN1cGdyYWRpbmctZnJvbS0xeFwiLGNvbnNvbGUud2FybihjKX0sZS5ERVBSRUNBVEVEX09QVFM9e3R5cGU6e3JlcGxhY2VtZW50OlwiaWNvblwiLGxpbms6XCIvZG9jcy8jaWNvblwifSxpbWFnZVVybDp7cmVwbGFjZW1lbnQ6XCJpY29uXCIsbGluazpcIi9kb2NzLyNpY29uXCJ9LGN1c3RvbUNsYXNzOntyZXBsYWNlbWVudDpcImNsYXNzTmFtZVwiLG9ubHlSZW5hbWU6ITAsbGluazpcIi9kb2NzLyNjbGFzc25hbWVcIn0saW1hZ2VTaXplOnt9LHNob3dDYW5jZWxCdXR0b246e3JlcGxhY2VtZW50OlwiYnV0dG9uc1wiLGxpbms6XCIvZG9jcy8jYnV0dG9uc1wifSxzaG93Q29uZmlybUJ1dHRvbjp7cmVwbGFjZW1lbnQ6XCJidXR0b25cIixsaW5rOlwiL2RvY3MvI2J1dHRvblwifSxjb25maXJtQnV0dG9uVGV4dDp7cmVwbGFjZW1lbnQ6XCJidXR0b25cIixsaW5rOlwiL2RvY3MvI2J1dHRvblwifSxjb25maXJtQnV0dG9uQ29sb3I6e30sY2FuY2VsQnV0dG9uVGV4dDp7cmVwbGFjZW1lbnQ6XCJidXR0b25zXCIsbGluazpcIi9kb2NzLyNidXR0b25zXCJ9LGNsb3NlT25Db25maXJtOntyZXBsYWNlbWVudDpcImJ1dHRvblwiLHN1Yk9wdGlvbjpcImNsb3NlTW9kYWxcIixsaW5rOlwiL2RvY3MvI2J1dHRvblwifSxjbG9zZU9uQ2FuY2VsOntyZXBsYWNlbWVudDpcImJ1dHRvbnNcIixzdWJPcHRpb246XCJjbG9zZU1vZGFsXCIsbGluazpcIi9kb2NzLyNidXR0b25zXCJ9LHNob3dMb2FkZXJPbkNvbmZpcm06e3JlcGxhY2VtZW50OlwiYnV0dG9uc1wifSxhbmltYXRpb246e30saW5wdXRUeXBlOntyZXBsYWNlbWVudDpcImNvbnRlbnRcIixsaW5rOlwiL2RvY3MvI2NvbnRlbnRcIn0saW5wdXRWYWx1ZTp7cmVwbGFjZW1lbnQ6XCJjb250ZW50XCIsbGluazpcIi9kb2NzLyNjb250ZW50XCJ9LGlucHV0UGxhY2Vob2xkZXI6e3JlcGxhY2VtZW50OlwiY29udGVudFwiLGxpbms6XCIvZG9jcy8jY29udGVudFwifSxodG1sOntyZXBsYWNlbWVudDpcImNvbnRlbnRcIixsaW5rOlwiL2RvY3MvI2NvbnRlbnRcIn0sYWxsb3dFc2NhcGVLZXk6e3JlcGxhY2VtZW50OlwiY2xvc2VPbkVzY1wiLG9ubHlSZW5hbWU6ITAsbGluazpcIi9kb2NzLyNjbG9zZW9uZXNjXCJ9LGFsbG93Q2xpY2tPdXRzaWRlOntyZXBsYWNlbWVudDpcImNsb3NlT25DbGlja091dHNpZGVcIixvbmx5UmVuYW1lOiEwLGxpbms6XCIvZG9jcy8jY2xvc2VvbmNsaWNrb3V0c2lkZVwifX19XSl9KTsiLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBlbiBmcm9tIFwiLi4vLi4vbG9jYWxlcy9lbi5qc29uXCI7XHJcbmltcG9ydCBlcyBmcm9tIFwiLi4vLi4vbG9jYWxlcy9lcy5qc29uXCI7XHJcbmltcG9ydCBldSBmcm9tIFwiLi4vLi4vbG9jYWxlcy9ldS5qc29uXCI7XHJcblxyXG5jb25zdCBsYW5ncyA9IHtcclxuICAgIGVuOiBlbixcclxuICAgIGVzOiBlcyxcclxuICAgIGV1OiBldVxyXG59XHJcblxyXG5jbGFzcyBMb2NhbGUge1xyXG4gICAgc3RhdGljIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiZW5cIixcclxuICAgICAgICAgICAgXCJlc1wiLFxyXG4gICAgICAgICAgICBcImV1XCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRMb2NhbGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiZW5cIjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IHVzZXJMb2NhbGVzKCkge1xyXG4gICAgICAgIGxldCB1c2VyTG9jYWxlcyA9IG5hdmlnYXRvci5sYW5ndWFnZXM7XHJcbiAgICAgICAgbGV0IGxvY2FsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBuYXZpZ2F0b3IubGFuZ3VhZ2VzKSB7XHJcbiAgICAgICAgICAgIGlmICh1c2VyTG9jYWxlc1tpXS5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxlcy5wdXNoKHVzZXJMb2NhbGVzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBmaXJzdE1hdGNoTG9jYWxlKCkge1xyXG4gICAgICAgIGxldCBsb2NhbGVzID0gdGhpcy51c2VyTG9jYWxlcztcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBsb2NhbGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUxvY2FsZXMuaW5kZXhPZihsb2NhbGVzW2ldKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdExvY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2NhbGVDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VMb2NhbGUobG9jYWxlQ29kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTG9jYWxlKGxvY2FsZUNvZGUpIHtcclxuICAgICAgICBpZiAoIWxvY2FsZUNvZGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9jYWxlIGNvZGUgbXVzdCBiZSBzcGVjaWZpZWRcIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobG9jYWxlQ29kZS5sZW5ndGggIT0gMikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhbGUgY29kZSBtdXN0IG1lZXQgSVNPIDMxNjZcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvZGUgPSBsb2NhbGVDb2RlO1xyXG5cclxuICAgICAgICB0aGlzLmdldFRlcm1zKClcclxuICAgICAgICAudGhlbihzdGF0dXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHRzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBrb1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXJtcygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50ZXJtcyA9IGxhbmdzW3RoaXMuY29kZV07XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobGFuZ3NbdGhpcy5jb2RlXSk7XHJcbiAgICAgICAgICAgIGZldGNoKFwiLi9sb2NhbGVzL1wiICsgdGhpcy5jb2RlICsgXCIuanNvblwiKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLm5hbWUgPSBcImh0dHBFcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4odGV4dCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlcm1zID0gSlNPTi5wYXJzZSh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLm5hbWUgPT0gXCJodHRwRXJyb3JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiRXJyb3IgZ2V0dGluZyB0aGUgbG9jYWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIjogXCJUaGUgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGEgXCIgKyBlLnN0YXR1cyArIFwiLCBcIiArIGUuc3RhdHVzVGV4dCArIFwiLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImljb25cIjogXCJlcnJvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRleHRzKCkge1xyXG4gICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1sb2NhbGUtdmFsdWVdXCIpO1xyXG5cclxuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBpdGVtLmdldEF0dHJpYnV0ZShcImRhdGEtbG9jYWxlLXZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBpdGVtLmdldEF0dHJpYnV0ZShcImRhdGEtbG9jYWxlLXBvc2l0aW9uXCIpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gXCJ0ZXh0XCIpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gdGhpcy5nZXQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKHBvc2l0aW9uLCB0aGlzLmdldCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KG5hbWUsIHZhcmlhYmxlcykge1xyXG4gICAgICAgIGxldCB0ZXJtID0gdGhpcy50ZXJtc1tcInRlcm1zXCJdO1xyXG4gICAgICAgIGxldCBuYW1lUGFydHMgPSBuYW1lLnNwbGl0KFwiLlwiKTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJjb2RlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29kZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09IFwibGFuZ3VhZ2VcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuYW1lUGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRlcm0gPSB0ZXJtW25hbWVQYXJ0c1tpXV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2YXJpYWJsZXMgJiYgdHlwZW9mIHZhcmlhYmxlcyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBpbiB2YXJpYWJsZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXJtID0gdGVybS5yZXBsYWNlKFwiJVwiICsgbmFtZSArIFwiJVwiLCB2YXJpYWJsZXNbbmFtZV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0ZXJtID0gbmFtZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRlcm07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBMb2NhbGUoTG9jYWxlLmZpcnN0TWF0Y2hMb2NhbGUpO1xyXG4iLCJpbXBvcnQgc3dhbCBmcm9tIFwic3dlZXRhbGVydFwiO1xyXG5cclxuaW1wb3J0IGxvY2FsZSBmcm9tIFwiLi9Mb2NhbGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGlUdW5lc0FQSSB7XHJcblxyXG4gICAgc3RhdGljIGdldCBhcGlVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cHM6Ly9pdHVuZXMuYXBwbGUuY29tL3NlYXJjaFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgbG9hZGVyKCkge1xyXG4gICAgICAgIGxldCBsb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxvYWRlci5pZCA9IFwibG9hZGVyXCI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxvYWRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbG9hZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgaXNPbmxpbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5vbkxpbmU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG5vTmV0d29yaygpIHtcclxuICAgICAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6IGxvY2FsZS5nZXQoXCJpVHVuZXMtc2VhcmNoLmVycm9ycy5uby1uZXR3b3JrLnRpdGxlXCIpLFxyXG4gICAgICAgICAgICB0ZXh0OiBsb2NhbGUuZ2V0KFwiaVR1bmVzLXNlYXJjaC5lcnJvcnMubm8tbmV0d29yay50ZXh0XCIpLFxyXG4gICAgICAgICAgICBpY29uOiBcImVycm9yXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbm9UZXJtKCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogbG9jYWxlLmdldChcImlUdW5lcy1zZWFyY2guZXJyb3JzLm5vLXRlcm0udGl0bGVcIiksXHJcbiAgICAgICAgICAgIHRleHQ6IGxvY2FsZS5nZXQoXCJpVHVuZXMtc2VhcmNoLmVycm9ycy5uby10ZXJtLnRleHRcIilcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJ0ZXJtXCIpWzBdLmZvY3VzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG5vdEZvdW5kKCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogbG9jYWxlLmdldChcImlUdW5lcy1zZWFyY2guZXJyb3JzLm5vdC1mb3VuZC50aXRsZVwiKSxcclxuICAgICAgICAgICAgdGV4dDogbG9jYWxlLmdldChcImlUdW5lcy1zZWFyY2guZXJyb3JzLm5vdC1mb3VuZC50ZXh0XCIpLFxyXG4gICAgICAgICAgICBpbmZvOiBcImluZm9cIlxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInRlcm1cIilbMF0uZm9jdXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVtb3ZlTG9hZGVyKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRlclwiKSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRlclwiKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoKGZvcm1EYXRhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuaW5uZXJIVE1MID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCFpVHVuZXNBUEkuaXNPbmxpbmUpIHtcclxuICAgICAgICAgICAgaVR1bmVzQVBJLm5vTmV0d29yaygpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCFmb3JtRGF0YS5nZXQoXCJ0ZXJtXCIpKSB7XHJcbiAgICAgICAgICAgIGlUdW5lc0FQSS5ub1Rlcm0oKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuYXBwZW5kQ2hpbGQoaVR1bmVzQVBJLmxvYWRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZmV0Y2goZm9ybURhdGEpXHJcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4gdGhpcy5zaG93Q29sbGVjdGlvbihqc29uKSlcclxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGlUdW5lc0FQSS5wcm90b3R5cGUubWFuYWdlQXBpRXJyb3IoZXJyb3IpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFuYWdlQXBpRXJyb3IoZXJyb3IpIHtcclxuICAgICAgICBpVHVuZXNBUEkucmVtb3ZlTG9hZGVyKCk7XHJcblxyXG4gICAgICAgIHN3aXRjaChlcnJvci50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJleGNlcHRpb25cIjpcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogbG9jYWxlLmdldChcImlUdW5lcy1zZWFyY2guZXJyb3JzLmV4Y2VwdGlvblwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXhjZXB0aW9uTXNnXCI6IGVycm9yLmV4Y2VwdGlvbi5tZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJodHRwRXJyb3JcIjpcclxuICAgICAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yIFwiICsgZXJyb3IuaHR0cFN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBsb2NhbGUuZ2V0KFwiaVR1bmVzLXNlYXJjaC5lcnJvcnMuaHR0cEVycm9yXCIse1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImh0dHBTdGF0dXNcIjogZXJyb3IuaHR0cFN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwUmVzcG9uc2VcIjogZXJyb3IuaHR0cFJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJlcnJvclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmZXRjaChmb3JtRGF0YSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGxldCBVUkkgPSBgJHtpVHVuZXNBUEkuYXBpVXJsfT90ZXJtPSR7Zm9ybURhdGEuZ2V0KFwidGVybVwiKX0mY291bnRyeT0ke2Zvcm1EYXRhLmdldChcImNvdW50cnlcIil9Jm1lZGlhPSR7Zm9ybURhdGEuZ2V0KFwibWVkaWFcIil9JmVudGl0eT0ke2Zvcm1EYXRhLmdldChcImVudGl0eVwiKX0mbGltaXQ9JHtmb3JtRGF0YS5nZXQoXCJsaW1pdFwiKX1gO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goVVJJKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS50ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihib2R5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGJvZHkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaHR0cEVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHR0cFJlc3BvbnNlOiByZXNwb25zZS5zdGF0dXNUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KS5jYXRjaChleGNlcHRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImV4Y2VwdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbjogZXhjZXB0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NvbGxlY3Rpb24oY29sbGVjdGlvbikge1xyXG4gICAgICAgIGlUdW5lc0FQSS5yZW1vdmVMb2FkZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24ucmVzdWx0Q291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICBpVHVuZXNBUEkubm90Rm91bmQoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29sbGVjdGlvbi5yZXN1bHRzLmZvckVhY2goY29sbGVjdGlvbkVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5UmVzdWx0KGNvbGxlY3Rpb25FbGVtZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlSZXN1bHQoY29sbGVjdGlvbkVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29sbGVjdGlvbkVsZW1lbnRcIik7XHJcblxyXG4gICAgICAgIGxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgbmFtZS5jbGFzc0xpc3QuYWRkKFwiY29sbGVjdGlvbi1uYW1lXCIpXHJcbiAgICAgICAgbmFtZS5pbm5lclRleHQgPSBjb2xsZWN0aW9uRWxlbWVudC5jb2xsZWN0aW9uTmFtZTtcclxuXHJcbiAgICAgICAgbGV0IGRvd25sb2FkTGlua3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGRvd25sb2FkTGlua3MuY2xhc3NMaXN0LmFkZChcImFsYnVtYXJ0LWRvd25sb2FkLWxpbmtzXCIpXHJcblxyXG4gICAgICAgIGxldCBtZWRpdW1Eb3dubG9hZExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBtZWRpdW1Eb3dubG9hZExpbmsuY2xhc3NMaXN0LmFkZChcImFsYnVtYXJ0LWRvd25sb2FkLWxpbmtcIik7XHJcbiAgICAgICAgbWVkaXVtRG93bmxvYWRMaW5rLmhyZWYgPSBjb2xsZWN0aW9uRWxlbWVudC5hcnR3b3JrVXJsNjAucmVwbGFjZShcIjYweDYwXCIsIFwiNTAweDUwMFwiKTtcclxuICAgICAgICBtZWRpdW1Eb3dubG9hZExpbmsudGFyZ2V0ID0gXCJfYmxhbmtcIjtcclxuICAgICAgICBtZWRpdW1Eb3dubG9hZExpbmsuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgXCJtZWRpdW0uanBnXCIpO1xyXG4gICAgICAgIG1lZGl1bURvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJkYXRhLWxvY2FsZS1wb3NpdGlvblwiLCBcInRleHRcIik7XHJcbiAgICAgICAgbWVkaXVtRG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImRhdGEtbG9jYWxlLXZhbHVlXCIsIFwiaVR1bmVzLXNlYXJjaC5kb3dubG9hZC1pbWFnZS5zdGFuZGFyZC1yZXNvbHV0aW9uXCIpO1xyXG4gICAgICAgIG1lZGl1bURvd25sb2FkTGluay5pbm5lclRleHQgPSBsb2NhbGUuZ2V0KFwiaVR1bmVzLXNlYXJjaC5kb3dubG9hZC1pbWFnZS5zdGFuZGFyZC1yZXNvbHV0aW9uXCIpO1xyXG5cclxuICAgICAgICBsZXQgbGFyZ2VEb3dubG9hZExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBsYXJnZURvd25sb2FkTGluay5jbGFzc0xpc3QuYWRkKFwiYWxidW1hcnQtZG93bmxvYWQtbGlua1wiKTtcclxuICAgICAgICBsYXJnZURvd25sb2FkTGluay5ocmVmID0gY29sbGVjdGlvbkVsZW1lbnQuYXJ0d29ya1VybDYwLnJlcGxhY2UoXCI2MHg2MFwiLCBcIjUwMDB4NTAwMFwiKTtcclxuICAgICAgICBsYXJnZURvd25sb2FkTGluay50YXJnZXQgPSBcIl9ibGFua1wiO1xyXG4gICAgICAgIGxhcmdlRG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIFwibGFyZ2UuanBnXCIpO1xyXG4gICAgICAgIGxhcmdlRG93bmxvYWRMaW5rLnNldEF0dHJpYnV0ZShcImRhdGEtbG9jYWxlLXBvc2l0aW9uXCIsIFwidGV4dFwiKTtcclxuICAgICAgICBsYXJnZURvd25sb2FkTGluay5zZXRBdHRyaWJ1dGUoXCJkYXRhLWxvY2FsZS12YWx1ZVwiLCBcImlUdW5lcy1zZWFyY2guZG93bmxvYWQtaW1hZ2UuaGlnaHQtcmVzb2x1dGlvblwiKTtcclxuICAgICAgICBsYXJnZURvd25sb2FkTGluay5pbm5lclRleHQgPSBsb2NhbGUuZ2V0KFwiaVR1bmVzLXNlYXJjaC5kb3dubG9hZC1pbWFnZS5oaWdodC1yZXNvbHV0aW9uXCIpO1xyXG5cclxuICAgICAgICBsZXQgYWxidW1BcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgIGFsYnVtQXJ0LmNsYXNzTGlzdC5hZGQoXCJhbGJ1bWFydFwiKTtcclxuICAgICAgICBhbGJ1bUFydC5zcmMgPSBjb2xsZWN0aW9uRWxlbWVudC5hcnR3b3JrVXJsNjAucmVwbGFjZShcIjYweDYwXCIsIFwiNTAweDUwMFwiKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRvd25sb2FkTGlua3MpO1xyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoYWxidW1BcnQpO1xyXG5cclxuICAgICAgICBkb3dubG9hZExpbmtzLmFwcGVuZENoaWxkKG1lZGl1bURvd25sb2FkTGluayk7XHJcbiAgICAgICAgZG93bmxvYWRMaW5rcy5hcHBlbmRDaGlsZChsYXJnZURvd25sb2FkTGluayk7XHJcblxyXG4gICAgICAgIHRoaXMudGFyZ2V0LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBsb2NhbGUgZnJvbSBcIi4vTG9jYWxlXCI7XHJcbmltcG9ydCBpVHVuZXNBUEkgZnJvbSBcIi4vaVR1bmVzQVBJXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcclxuXHJcbmxldCBhcGksXHJcbiAgICBmb3JtO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGlmICghaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJVbnN1cHBvcnRlZCBicm93c2VyXCIsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiWW91IGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBzb21lIG9mIHRoZSBmdW5jdGlvbnMsIHBsZWFzZSBjb25zaWRlciB1cGdyYWRpbmcgaXQgb3IgY2hhbmdpbmcgdG8gYSBtb3JlIG1vZGVybiBvbmVcIixcclxuICAgICAgICAgICAgaWNvbjogXCJlcnJvclwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmluZm8oXCJTZWxlY3RlZCBcXFwiJXNcXFwiIGxvY2FsZS5cIiwgbG9jYWxlLmNvbnN0cnVjdG9yLmZpcnN0TWF0Y2hMb2NhbGUpO1xyXG5cclxuICAgIGFwaSA9IG5ldyBpVHVuZXNBUEkoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNwb25zZVwiKSk7XHJcblxyXG4gICAgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWlUdW5lc1wiKTtcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzKTtcclxuICAgICAgICBmb3JtRGF0YS5zZXQoXCJtZWRpYVwiLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1pVHVuZXMgW25hbWU9ZW50aXR5XVwiKS5zZWxlY3RlZE9wdGlvbnNbMF0ucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJsYWJlbFwiKS50b0xvd2VyQ2FzZSgpKTtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBhcGkuc2VhcmNoKGZvcm1EYXRhKTtcclxuXHJcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe1xyXG4gICAgICAgICAgICBcInRlcm1cIjogZm9ybURhdGEuZ2V0KFwidGVybVwiKSxcclxuICAgICAgICAgICAgXCJjb3VudHJ5XCI6IGZvcm1EYXRhLmdldChcImNvdW50cnlcIiksXHJcbiAgICAgICAgICAgIFwibWVkaWFcIjogZm9ybURhdGEuZ2V0KFwibWVkaWFcIiksXHJcbiAgICAgICAgICAgIFwiZW50aXR5XCI6IGZvcm1EYXRhLmdldChcImVudGl0eVwiKSxcclxuICAgICAgICAgICAgXCJsaW1pdFwiOiBpc05hTihmb3JtRGF0YS5nZXQoXCJsaW1pdFwiKSkgPyA1MCA6IE1hdGgubWF4KE1hdGgubWluKGZvcm1EYXRhLmdldChcImxpbWl0XCIpLCAyMDApLCAxKVxyXG4gICAgICAgIH0sIGRvY3VtZW50LnRpdGxlLCBgP3E9JHtmb3JtRGF0YS5nZXQoXCJ0ZXJtXCIpfSZjb3VudHJ5PSR7Zm9ybURhdGEuZ2V0KFwiY291bnRyeVwiKX0mZW50aXR5PSR7Zm9ybURhdGEuZ2V0KFwiZW50aXR5XCIpfSZsaW1pdD0ke2Zvcm1EYXRhLmdldChcImxpbWl0XCIpfWApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGV2ZW50LnN0YXRlO1xyXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbnB1dCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGFbaW5wdXRdO1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5zZXQoaW5wdXQsIHZhbHVlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoaW5wdXQpWzBdLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcGkuc2VhcmNoKGZvcm1EYXRhKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobG9jYXRpb24uc2VhcmNoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoXCImXCIpO1xyXG5cclxuICAgICAgICBsZXQgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1pVHVuZXNcIik7XHJcbiAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZm9ybURhdGEuc2V0KFwiY291bnRyeVwiLCBcImVzXCIpO1xyXG4gICAgICAgIGZvcm1EYXRhLnNldChcImVudGl0eVwiLCBcImFsYnVtXCIpO1xyXG4gICAgICAgIGZvcm1EYXRhLnNldChcImxpbWl0XCIsIDUwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcGFyYW0gb2YgcGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcGFyYW0uc3BsaXQoXCI9XCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJxXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnNldChcInRlcm1cIiwgZGF0YVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT10ZXJtXVwiKS52YWx1ZSA9IHVuZXNjYXBlKGRhdGFbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibWVkaWFcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuc2V0KFwibWVkaWFcIiwgZGF0YVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbnRpdHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuc2V0KFwiZW50aXR5XCIsIGRhdGFbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW25hbWU9ZW50aXR5XVwiKS52YWx1ZSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3VudHJ5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnNldChcImNvdW50cnlcIiwgZGF0YVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT1jb3VudHJ5XVwiKS52YWx1ZSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsaW1pdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGltaXQgPSBpc05hTihkYXRhWzFdKSA/IDUwIDogTWF0aC5tYXgoTWF0aC5taW4oZGF0YVsxXSwgMjAwKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLnNldChcImxpbWl0XCIsIGxpbWl0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPWxpbWl0XVwiKS52YWx1ZSA9IGxpbWl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZvcm1EYXRhLmdldChcInRlcm1cIikpXHJcblxyXG4gICAgICAgIGFwaS5zZWFyY2goZm9ybURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRTY3JvbGxUb3AoKTtcclxuICAgIGNyZWF0ZUNoYW5nZUxhbmcoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNjcm9sbFRvcCgpIHtcclxuICAgIGxldCBzY3JvbGxUb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcm9sbFRvcFwiKTtcclxuICAgIHNjcm9sbFRvcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiBcInNtb290aFwifSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZm9ybS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPD0gMCkge1xyXG4gICAgICAgICAgICBzY3JvbGxUb3AuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNoYW5nZUxhbmcoKSB7XHJcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBsaXN0LmlkID0gXCJjaGFuZ2VMb2NhbGVcIjtcclxuICAgIGxldCBsb2NhbGVzID0gbG9jYWxlLmNvbnN0cnVjdG9yLmF2YWlsYWJsZUxvY2FsZXMuc29ydCgpO1xyXG5cclxuICAgIGxvY2FsZXMuZm9yRWFjaChsb2MgPT4ge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGxvYztcclxuICAgICAgICBvcHRpb24uaW5uZXJUZXh0ID0gbG9jO1xyXG5cclxuICAgICAgICBpZiAobG9jID09IGxvY2FsZS5jb2RlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IFwic2VsZWN0ZWRcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGlzdCk7XHJcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxvY2FsZS5jaGFuZ2VMb2NhbGUodGhpcy52YWx1ZSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHJlcXVpcmVzID0gW1xyXG4gICAgICAgICAgICBGb3JtRGF0YSxcclxuICAgICAgICAgICAgbmV3IEZvcm1EYXRhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWlUdW5lc1wiKSkuZ2V0KFwidGVybVwiKSxcclxuICAgICAgICAgICAgUHJvbWlzZSxcclxuICAgICAgICAgICAgZmV0Y2gsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXF1aXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcXVpcmVzW2ldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgXCIuL2Fzc2V0cy9qcy9tYWluLmpzXCI7XG4iXSwic291cmNlUm9vdCI6IiJ9