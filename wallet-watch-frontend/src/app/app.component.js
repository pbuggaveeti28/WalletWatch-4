"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const icon_1 = require("@angular/material/icon");
const menu_1 = require("@angular/material/menu");
const toolbar_1 = require("@angular/material/toolbar");
const tooltip_1 = require("@angular/material/tooltip"); // Import MatTooltipModule
const router_1 = require("@angular/router");
const footer_component_1 = require("./footer/footer.component");
const rxjs_1 = require("rxjs");
const environment_1 = require("../../../environments/environment");
require("chart.js");
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            standalone: true,
            imports: [
                common_1.CommonModule,
                menu_1.MatMenuModule,
                router_1.RouterModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                tooltip_1.MatTooltipModule, // Add MatTooltipModule here
                footer_component_1.FooterComponent
            ],
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
        constructor(authService, router, cdr) {
            this.authService = authService;
            this.router = router;
            this.cdr = cdr;
            this.title = 'Wallet Watch';
            //googleAuthUrl = 'http://localhost:8080/auth/google';
            this.googleAuthUrl = environment_1.environment.hostUrl + '/auth/google'; /****Changing this as a part of Azure config*****/
            this.welcomepage = '/welcome';
            this.isLoggedIn = false;
            this.username = '';
        }
        ngOnInit() {
            this.router.events
                .pipe((0, rxjs_1.filter)(this.isNavigationEnd))
                .subscribe(() => {
                this.authService.updateLoginState();
            });
        }
        isNavigationEnd(event) {
            return event instanceof router_1.NavigationEnd;
        }
        isActive(route) {
            return this.router.url === route;
        }
        login() {
            this.authService.login();
            window.location.href = this.googleAuthUrl;
            this.cdr.detectChanges();
        }
        logout() {
            this.authService.logout();
            //window.location.href = this.welcomepage;
            this.cdr.detectChanges();
        }
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.AppComponent = AppComponent;
