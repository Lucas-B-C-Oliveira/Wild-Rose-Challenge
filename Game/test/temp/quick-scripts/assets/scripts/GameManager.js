(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7462271VdFN4J38ivhu1fP1', 'GameManager', __filename);
// scripts/GameManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.machine = null;
        _this.audioClick = null;
        _this.block = false;
        _this.result = null;
        _this.luck = 0;
        _this.randomLine0 = 0;
        _this.randomLine1 = 0;
        _this.randomLine2 = 0;
        return _this;
    }
    GameManager.prototype.start = function () {
        this.machine.getComponent('Machine').createMachine();
    };
    GameManager.prototype.update = function () {
        if (this.block && this.result != null) {
            this.informStop();
            this.result = null;
        }
    };
    GameManager.prototype.click = function () {
        cc.audioEngine.playEffect(this.audioClick, false);
        if (this.machine.getComponent('Machine').spinning === false) {
            this.block = false;
            this.machine.getComponent('Machine').spin();
            this.requestResult();
        }
        else if (!this.block) {
            this.block = true;
            this.machine.getComponent('Machine').lock();
        }
    };
    GameManager.prototype.requestResult = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.result = null;
                        _a = this;
                        return [4 /*yield*/, this.getAnswer()];
                    case 1:
                        _a.result = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameManager.prototype.getAnswer = function () {
        var _this = this;
        var slotResult = [];
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.luck = Math.floor(Math.random() * 100) + 1;
                var r = Math.floor(Math.random() * 30); // r is Random Tiles
                var a = Math.floor(Math.random() * 30); // a is Random Tiles
                var n = Math.floor(Math.random() * 30); // n is Random Tiles
                _this.randomLine0 = a;
                _this.randomLine1 = r;
                _this.randomLine2 = n;
                if (_this.luck > 93) {
                    // 7% of the time all lines should show equal tiles.
                    cc.log("7% of the time all lines should show equal tiles.");
                    slotResult = [
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5]
                    ];
                    for (var row = 0; row < 5; row += 1) { // Lines 
                        for (var column = 0; column < 5; column += 1) { // Columns
                            var auxRandom = Math.floor(Math.random() * 30);
                            var column1Check = (row == 0 && column == 1) || (row == 2 && column == 1) || (row == 4 && column == 1);
                            var column3Check = (row == 1 && column == 3) || (row == 3 && column == 3);
                            var column2Check = (row == 0 && column == 2) || (row == 2 && column == 2) || (row == 4 && column == 2);
                            var column4Check = (row == 1 && column == 4) || (row == 3 && column == 4);
                            var column0Check = (row == 0 && column == 0) || (row == 2 && column == 0) || (row == 4 && column == 0);
                            var column2nCheck = (row == 1 && column == 2) || (row == 3 && column == 2);
                            var allColsFalse = ((!column1Check && !column3Check) && (!column2Check && !column4Check) && (!column0Check && !column2nCheck));
                            if (column1Check) // Line 1 - Mid
                                slotResult[row][column] = r;
                            else if (column3Check) // Line 1 - Mid 
                                slotResult[row][column] = r;
                            else if (column2Check) // Line 2 - Bot
                                slotResult[row][column] = a;
                            else if (column4Check) // Line 2 - Bot
                                slotResult[row][column] = a;
                            else if (column0Check) // Line 0 - Top
                                slotResult[row][column] = n;
                            else if (column2nCheck) // Line 0 - Top
                                slotResult[row][column] = n;
                            else if ((allColsFalse && auxRandom == r) || (allColsFalse && auxRandom == a) || (allColsFalse && auxRandom == n)) {
                                while (auxRandom == r || auxRandom == a || auxRandom == n) {
                                    auxRandom = Math.floor(Math.random() * 30);
                                    if (auxRandom != r && auxRandom != a && auxRandom != n) {
                                        slotResult[row][column] = auxRandom;
                                        break;
                                    }
                                }
                            }
                            else if (allColsFalse && auxRandom != r && auxRandom != a && auxRandom != n)
                                slotResult[row][column] = auxRandom;
                        }
                    }
                }
                else if (_this.luck > 83 && _this.luck <= 93) {
                    // 10% of the time it should display two lines of equal tiles.
                    cc.log("10% of the time it should display two lines of equal tiles.");
                    _this.randomLine2 = 100;
                    slotResult = [
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5]
                    ];
                    for (var row = 0; row < 5; row += 1) { // Lines 
                        for (var column = 0; column < 5; column += 1) { // Columns
                            var auxRandom = Math.floor(Math.random() * 30);
                            var column1Check = (row == 0 && column == 1) || (row == 2 && column == 1) || (row == 4 && column == 1);
                            var column3Check = (row == 1 && column == 3) || (row == 3 && column == 3);
                            var column2Check = (row == 0 && column == 2) || (row == 2 && column == 2) || (row == 4 && column == 2);
                            var column4Check = (row == 1 && column == 4) || (row == 3 && column == 4);
                            var allColsFalse = ((!column1Check && !column3Check) && (!column2Check && !column4Check));
                            if (column1Check) // Line 1 - Mid
                                slotResult[row][column] = r;
                            else if (column3Check) // Line 1 - Mid
                                slotResult[row][column] = r;
                            else if (column2Check) // Line 2 - Bot
                                slotResult[row][column] = a;
                            else if (column4Check) // Line 2 - Bot
                                slotResult[row][column] = a;
                            else if ((allColsFalse && auxRandom == r) || (allColsFalse && auxRandom == a)) {
                                while (auxRandom == r || auxRandom == a) {
                                    auxRandom = Math.floor(Math.random() * 30);
                                    if (auxRandom != r && auxRandom != a) {
                                        slotResult[row][column] = auxRandom;
                                        break;
                                    }
                                }
                            }
                            else if (allColsFalse && auxRandom != r && auxRandom != a)
                                slotResult[row][column] = auxRandom;
                        }
                    }
                }
                else if (_this.luck > 50 && _this.luck <= 83) {
                    // 33% of the time it should display a single line of equal tiles.
                    cc.log("33% of the time it should display a single line of equal tiles.");
                    _this.randomLine0 = 100;
                    _this.randomLine2 = 100;
                    slotResult = [
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5],
                        [1, 2, 3, 4, 5]
                    ];
                    for (var row = 0; row < 5; row += 1) { // Lines 
                        for (var column = 0; column < 5; column += 1) { // Columns
                            var auxRandom = Math.floor(Math.random() * 30);
                            var column1Check = (row == 0 && column == 1) || (row == 2 && column == 1) || (row == 4 && column == 1);
                            var column3Check = (row == 1 && column == 3) || (row == 3 && column == 3);
                            if (column1Check)
                                slotResult[row][column] = r;
                            else if (column3Check)
                                slotResult[row][column] = r;
                            else if (!column1Check && !column3Check && auxRandom == r) {
                                while (auxRandom == r) {
                                    auxRandom = Math.floor(Math.random() * 30);
                                    if (auxRandom != r) {
                                        slotResult[row][column] = auxRandom;
                                        break;
                                    }
                                }
                            }
                            else if (!column1Check && !column3Check && auxRandom != r)
                                slotResult[row][column] = auxRandom;
                        }
                    }
                }
                else if (_this.luck <= 50) {
                    // 50% of the time it should return this random configuration of tiles.
                    cc.log("50% of the time it should return this random configuration of tiles.");
                    slotResult = [
                        [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]
                    ];
                    _this.randomLine0 = 100;
                    _this.randomLine1 = 100;
                    _this.randomLine2 = 100;
                }
                resolve(slotResult);
            }, 1000 + 500 * Math.random());
        });
    };
    GameManager.prototype.informStop = function () {
        var resultRelayed = this.result;
        this.machine.getComponent('Machine').stop(resultRelayed);
    };
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "machine", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "audioClick", void 0);
    GameManager = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameManager.js.map
        