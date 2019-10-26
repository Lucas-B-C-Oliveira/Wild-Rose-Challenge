"use strict";
cc._RF.push(module, '7462271VdFN4J38ivhu1fP1', 'GameManager');
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
        _this.animLine0 = null;
        _this.animLine1 = null;
        _this.animLine2 = null;
        _this.block = false;
        _this.result = null;
        _this.luck = 0;
        return _this;
    }
    GameManager.prototype.start = function () {
        this.machine.getComponent('Machine').createMachine();
        this.checkLinesAnim();
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
            this.checkLinesAnim();
            this.block = false;
            this.machine.getComponent('Machine').spin();
            this.requestResult();
        }
        else if (!this.block) {
            this.block = true;
            this.machine.getComponent('Machine').lock();
        }
    };
    GameManager.prototype.checkLinesAnim = function () {
        if (!this.animLine0 && !this.animLine1 && !this.animLine2) {
            this.animLine0 = this.node.getChildByName("Line0");
            this.animLine1 = this.node.getChildByName("Line1");
            this.animLine2 = this.node.getChildByName("Line2");
        }
        this.animLine0.active = false;
        this.animLine1.active = false;
        this.animLine2.active = false;
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
                _this.luck = Math.random() * 100;
                var r = Math.floor(Math.random() * 30); // r is Random Tiles
                var a = Math.floor(Math.random() * 30); // r is Random Tiles
                var n = Math.floor(Math.random() * 30); // r is Random Tiles
                if (_this.luck > 93) {
                    // 7% of the time all lines should show equal tiles.
                    cc.log("7% of the time all lines should show equal tiles.");
                    slotResult = [
                        [n, r, a, n, n],
                        [n, r, n, r, a],
                        [n, r, a, n, n],
                        [n, r, n, r, a],
                        [n, r, a, n, n]
                    ];
                }
                else if (_this.luck > 83 && _this.luck <= 93) {
                    // 10% of the time it should display two lines of equal tiles.
                    cc.log("10% of the time it should display two lines of equal tiles.");
                    slotResult = [
                        [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), r, a, r, a],
                        [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), r, a, r, a],
                        [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]
                    ];
                }
                else if (_this.luck > 50 && _this.luck <= 83) {
                    // 33% of the time it should display a single line of equal tiles.
                    cc.log("33% of the time it should display a single line of equal tiles.");
                    slotResult = [
                        [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30)],
                        [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]
                    ];
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
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "animLine0", void 0);
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "animLine1", void 0);
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "animLine2", void 0);
    GameManager = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

cc._RF.pop();