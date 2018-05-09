webpackJsonp([3],{

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/contactos/contactos.module": [
		289,
		2
	],
	"../pages/inicio/inicio.module": [
		290,
		1
	],
	"../pages/otro/otro.module": [
		291,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactProvider = /** @class */ (function () {
    function ContactProvider(_platForm, loadingCtrl, _contacts) {
        this._platForm = _platForm;
        this.loadingCtrl = loadingCtrl;
        this._contacts = _contacts;
        this.Contactos = [];
    }
    ContactProvider.prototype.consultarContactos = function () {
        console.log('Entrando al modulo de los contactos');
        if (this._platForm.is("android") || this._platForm.is("ios")) {
            try {
                console.log("Apunto de hacer consulta");
                var option = {
                    filter: "",
                    hasPhoneNumber: true,
                    multiple: true
                };
                var fields = ['displayName'];
                this.presentLoading();
                return this._contacts.find(fields, option);
            }
            catch (error) {
                console.log(JSON.stringify(error));
                this.loading.dismiss();
                this.terminarRefresh();
                throw error;
            }
        }
        else {
            console.log("No se esta ejecutando un dispositivo movil");
            this.terminarRefresh();
            return null;
        }
    };
    ContactProvider.prototype.organizarLista = function (obj1, obj2) {
        if (obj1.displayName > obj2.displayName) {
            return 1;
        }
        if (obj1.displayName < obj2.displayName) {
            return -1;
        }
        return 0;
    };
    ContactProvider.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: "Consultando...",
            duration: 15000
        });
        this.loading.present();
    };
    ContactProvider.prototype.RefrescarPagina = function (refresher) {
        this.seRefresco = refresher;
    };
    ContactProvider.prototype.terminarRefresh = function () {
        console.log(this.seRefresco);
        if (this.seRefresco != null)
            this.seRefresco.complete();
    };
    ContactProvider.prototype.eliminarContacto = function (contacto) {
        console.log('Accion Eliminar');
        return contacto.remove();
    };
    ContactProvider.prototype.combinarContacto = function (contacto) {
        var contactoNuevo = this.getContactoNuevo(contacto);
        this.eliminarContacto(contacto);
        return this.insertarNuevoContacto(contactoNuevo);
    };
    ContactProvider.prototype.insertarNuevoContacto = function (contactoNuevo) {
        console.log("Iniciar insercionContacto Nuevo");
        var contactoInsert = contactoNuevo;
        return contactoInsert.save();
    };
    ContactProvider.prototype.getContactoNuevo = function (contacto) {
        var tipos = ["mobile", "home", "work", "other"];
        var telefonos = [];
        var emails = [];
        var address = [];
        var uniqueTelefonos = [];
        var uniqueMails = [];
        var uniqueAddress = [];
        if (contacto.phoneNumbers == null)
            contacto.phoneNumbers = [];
        if (contacto.emails == null)
            contacto.emails = [];
        if (contacto.addresses == null)
            contacto.addresses = [];
        contacto.phoneNumbers.forEach(function (element) {
            telefonos.push(element.value.replace(/\r\n/, "").replace(" ", "").trim().toLocaleLowerCase());
        });
        contacto.emails.forEach(function (element) {
            emails.push(element.value.replace(/\r\n/, '').replace(" ", "").trim().toLocaleLowerCase());
        });
        contacto.addresses.forEach(function (element) {
            address.push(element.streetAddress.replace(/\r\n/, '').replace(" ", "").trim().toLocaleLowerCase());
        });
        if (uniqueTelefonos == null)
            contacto.phoneNumbers = [];
        if (uniqueMails == null)
            contacto.emails = [];
        if (uniqueAddress == null)
            contacto.addresses = [];
        uniqueTelefonos = telefonos.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        uniqueMails = emails.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        uniqueAddress = address.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        console.log("Iniciar Contacto Nuevo");
        //let contactoNuevo:any = {};
        //let contactoNuevo: Contact = contacto.clone();
        //let contactoNuevo = this._contacts.create();
        var contactoNuevo = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["a" /* Contact */]();
        contactoNuevo.displayName = contacto.displayName;
        contactoNuevo.name = contacto.name;
        contactoNuevo.nickname = contacto.nickname;
        contactoNuevo.photos = contacto.photos;
        contactoNuevo.birthday = contacto.birthday;
        contactoNuevo.categories = contacto.categories;
        contactoNuevo.ims = contacto.ims;
        contactoNuevo.note = contacto.note;
        contactoNuevo.organizations = contacto.organizations;
        contactoNuevo.urls = contacto.urls;
        contactoNuevo.phoneNumbers = [];
        contactoNuevo.addresses = [];
        contactoNuevo.emails = [];
        if (uniqueTelefonos.length > 0) {
            uniqueTelefonos.forEach(function (element, index) {
                var field = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["c" /* ContactField */]();
                field.value = element;
                if (index < tipos.length) {
                    field.type = tipos[index];
                }
                contactoNuevo.phoneNumbers.push(field);
            });
        }
        if (uniqueAddress.length > 0) {
            uniqueAddress.forEach(function (element, index) {
                var field = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["b" /* ContactAddress */]();
                field.streetAddress = element;
                if (index < tipos.length) {
                    field.type = tipos[index];
                }
                contactoNuevo.addresses.push(field);
            });
        }
        if (uniqueMails.length > 0) {
            uniqueMails.forEach(function (element, index) {
                var field = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["c" /* ContactField */]();
                field.value = element;
                if (index < tipos.length) {
                    field.type = tipos[index];
                }
                contactoNuevo.emails.push(field);
            });
        }
        console.log("Contacto Nuevo Iniciado");
        return contactoNuevo;
    };
    ContactProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_contacts__["d" /* Contacts */]])
    ], ContactProvider);
    return ContactProvider;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_export_module__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__pages_export_module__["b" /* InicioPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__pages_export_module__["a" /* ContactosPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__pages_export_module__["c" /* OtroPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contactos_contactos__ = __webpack_require__(202);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__contactos_contactos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inicio_inicio__ = __webpack_require__(203);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__inicio_inicio__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__otro_otro__ = __webpack_require__(204);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__otro_otro__["a"]; });



//# sourceMappingURL=pages-export-module.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_contacts__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_contact_contact__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactosPage = /** @class */ (function () {
    function ContactosPage(navCtrl, navParams, _platForm, _contacts, _alertCtrl, loadingCtrl, _menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._platForm = _platForm;
        this._contacts = _contacts;
        this._alertCtrl = _alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this._menuCtrl = _menuCtrl;
        this.Contactos = [];
        this.contactProvider = new __WEBPACK_IMPORTED_MODULE_3__providers_contact_contact__["a" /* ContactProvider */](this._platForm, this.loadingCtrl, this._contacts);
    }
    ContactosPage.prototype.ionViewDidLoad = function () {
        this.consultarContactos();
    };
    ContactosPage.prototype.consultarContactos = function () {
        var _this = this;
        var promise = this.contactProvider.consultarContactos();
        if (promise != null) {
            promise.then(function (result) {
                var ordenado = result.sort(function (obj1, obj2) {
                    return _this.contactProvider.organizarLista(obj1, obj2);
                });
                _this.Contactos = ordenado;
                _this.CantidadContactos = _this.Contactos.length;
                console.log("Se encontaron {" + _this.Contactos.length + "} contactos");
                _this.contactProvider.loading.dismiss();
                _this.contactProvider.terminarRefresh();
                console.log("finalizado usando nuevo gradle.");
            }, function (error) {
                console.log("Hubo un error consultando los contactos");
                console.log(JSON.stringify(error));
                _this.contactProvider.loading.dismiss();
                _this.contactProvider.terminarRefresh();
            });
        }
    };
    ContactosPage.prototype.RefrescarPagina = function (refresher) {
        this.contactProvider.RefrescarPagina(refresher);
        this.consultarContactos();
    };
    ContactosPage.prototype.EliminarContacto = function (contacto, slidingItem) {
        slidingItem.close();
        this.showConfirm("Contacto: " + contacto.displayName, "Esta seguro que desea eliminar el contacto?", this.AccionEliminar, contacto);
    };
    ContactosPage.prototype.CombinarContacto = function (contacto, slidingItem) {
        slidingItem.close();
        this.showConfirm("Contacto: " + contacto.displayName, "Esta seguro que desea Combinar el contacto?", this.AccionCombinar, contacto);
    };
    ContactosPage.prototype.MarcarContacto = function (contacto, slidingItem) {
        slidingItem.close();
    };
    ContactosPage.prototype.AccionEliminar = function (contacto, ctrll) {
        var promesa = ctrll.contactProvider.eliminarContacto(contacto);
        promesa.then(function (result) {
            console.log(JSON.stringify(result));
            ctrll.consultarContactos();
        });
    };
    ContactosPage.prototype.AccionCombinar = function (contacto, ctrll) {
        try {
            ctrll.contactProvider.combinarContacto(contacto).then(function (result) {
                console.log("Promesa de creacion de contacto");
                console.log(JSON.stringify(result));
                ctrll.consultarContactos();
            }, function (error) {
                console.log("Error en Promesa de creacion de contacto");
                console.log(JSON.stringify(error));
            });
        }
        catch (error) {
            console.log("Error en Promesa de creacion de contacto");
            console.log(JSON.stringify(error));
        }
    };
    ContactosPage.prototype.SeleccionarTodas = function () {
        console.log("Abrio Menu");
        this._menuCtrl.close();
    };
    ContactosPage.prototype.showConfirm = function (title, message, action, contacto) {
        var actualCtrll = this;
        var confirm = this._alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        console.log('Agree clicked');
                        action(contacto, actualCtrll);
                    }
                }
            ]
        });
        confirm.present();
    };
    ContactosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contactos',template:/*ion-inline-start:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\contactos\contactos.html"*/'<ion-menu [content]="contentMenu">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <ion-list>\n\n      <button ion-item (click)="SeleccionarTodas(homePage)" color="primary">\n\n        Seleccionar Todos los Contactos\n\n          <ion-icon name="ios-list-box-outline" side="left" ></ion-icon>\n\n      </button>  \n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n\n\n\n\n<ion-header >\n\n\n\n  <ion-navbar>\n\n    <ion-title>Contactos</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding #contentMenu> \n\n\n\n  <ion-refresher (ionRefresh)="RefrescarPagina($event)">\n\n    <ion-refresher-content>Se esta refrescando la pagina....</ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <h1>Listado de contactos\n\n    <small ng-if="CantidadContactos > 0">({{CantidadContactos}})</small>\n\n  </h1>\n\n  <ion-list>\n\n    <ion-item-sliding #item *ngFor="let contacto of Contactos">\n\n      <ion-item>\n\n        <ion-avatar item-start>\n\n          <img [src]="(contacto|FotoPipe)|urlSeguro:\'url\'" class="thumbmail">\n\n        </ion-avatar>\n\n        <div text-capitalize padding-top>\n\n          <h2 class="MarginTop5px" text-wrap>{{ contacto.displayName }}</h2>\n\n          <p *ngFor="let telefono of contacto.phoneNumbers">{{ telefono.value }} - {{ telefono.type }}</p>\n\n        </div>\n\n      </ion-item>\n\n      <ion-item-options side="left">\n\n        <button ion-button color="danger" (click)="EliminarContacto(contacto,item)">\n\n          Eliminar\n\n          <ion-icon name="trash"></ion-icon>\n\n        </button>\n\n      </ion-item-options>\n\n      <ion-item-options side="right">\n\n        <button ion-button color="default" (click)="CombinarContacto(contacto,item)">\n\n          Combinar\n\n          <ion-icon name="md-git-merge"></ion-icon>\n\n        </button>\n\n        <button ion-button color="secondary" (click)="MarcarContacto(contacto,item)">\n\n          Marcar\n\n          <ion-icon name="ios-checkbox-outline"></ion-icon>\n\n        </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\contactos\contactos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_contacts__["d" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* MenuController */]])
    ], ContactosPage);
    return ContactosPage;
}());

//# sourceMappingURL=contactos.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InicioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InicioPage = /** @class */ (function () {
    function InicioPage(navCtrl, navParams, _device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._device = _device;
        this.Dispositivo = {};
    }
    InicioPage.prototype.ionViewDidLoad = function () {
        this.obtnerInfoDelDispositivo();
    };
    InicioPage.prototype.obtnerInfoDelDispositivo = function () {
        console.log('Entrada Pagina de Inicio');
        console.log(JSON.stringify(this._device));
        console.log('Device UUID is: ' + this._device.uuid);
        console.log('Device manufacturer is: ' + this._device.manufacturer);
        console.log('Device cordova is: ' + this._device.cordova);
        console.log('Device model is: ' + this._device.model);
        console.log('Device version is: ' + this._device.version);
        console.log('Device isVirtual is: ' + this._device.isVirtual);
        console.log('Device serial is: ' + this._device.serial);
        this.Dispositivo = this._device;
        this.terminarRefresh();
    };
    InicioPage.prototype.RefrescarPagina = function (refresher) {
        this.seRefresco = refresher;
        this.obtnerInfoDelDispositivo();
    };
    InicioPage.prototype.terminarRefresh = function () {
        console.log(this.seRefresco);
        if (this.seRefresco != null)
            this.seRefresco.complete();
    };
    InicioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-inicio',template:/*ion-inline-start:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\inicio\inicio.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Inicio</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <ion-refresher (ionRefresh)="RefrescarPagina($event)">\n\n    <ion-refresher-content>Se esta refrescando la pagina....</ion-refresher-content>\n\n  </ion-refresher>\n\n  \n\n  <ion-card>\n\n    <ion-card-header>\n\n      Informacion del dispositivo\n\n    </ion-card-header>\n\n\n\n\n\n    <ion-list>\n\n      <button ion-item>\n\n        <ion-icon name="ios-phone-portrait-outline" item-start></ion-icon>\n\n          Marca de Celular: {{ Dispositivo.manufacturer }}\n\n      </button>\n\n      \n\n      <button ion-item>\n\n        <ion-icon name="md-barcode" item-start></ion-icon>\n\n          Modelo del Celular: {{ Dispositivo.model }}\n\n      </button>\n\n      \n\n      <button ion-item>\n\n        <ion-icon name="ios-body-outline" item-start></ion-icon>\n\n          Version de Cordova: {{ Dispositivo.cordova }}\n\n      </button>\n\n      \n\n      <button ion-item>\n\n        <ion-icon name="ios-create-outline" item-start></ion-icon>\n\n          Serial del Celular: {{ Dispositivo.serial }}\n\n      </button>\n\n       \n\n    </ion-list>\n\n  </ion-card>\n\n\n\n  <ion-card>\n\n    <ion-card-header>\n\n        Informacion de la Red\n\n    </ion-card-header>\n\n      <button ion-item>\n\n        <ion-icon name="md-git-network" item-start></ion-icon>\n\n          Serial del Celular: \n\n      </button>\n\n  </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\inicio\inicio.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__["a" /* Device */]])
    ], InicioPage);
    return InicioPage;
}());

//# sourceMappingURL=inicio.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the OtroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtroPage = /** @class */ (function () {
    function OtroPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    OtroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OtroPage');
    };
    OtroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-otro',template:/*ion-inline-start:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\otro\otro.html"*/'<!--\n\n  Generated template for the OtroPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Otro</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\pages\otro\otro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], OtroPage);
    return OtroPage;
}());

//# sourceMappingURL=otro.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(226);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_pages_export_module__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_foto_foto__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_url_seguro_url_seguro__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_contacts__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_provider_exports__ = __webpack_require__(279);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






///Pipes 


///plugins




///Providers

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_pages_export_module__["a" /* ContactosPage */], __WEBPACK_IMPORTED_MODULE_4__pages_pages_export_module__["b" /* InicioPage */], __WEBPACK_IMPORTED_MODULE_4__pages_pages_export_module__["c" /* OtroPage */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_foto_foto__["a" /* FotoPipe */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_url_seguro_url_seguro__["a" /* UrlSeguroPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/contactos/contactos.module#ContactosPageModule', name: 'ContactosPage', segment: 'contactos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inicio/inicio.module#InicioPageModule', name: 'InicioPage', segment: 'inicio', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/otro/otro.module#OtroPageModule', name: 'OtroPage', segment: 'otro', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_pages_export_module__["a" /* ContactosPage */], __WEBPACK_IMPORTED_MODULE_4__pages_pages_export_module__["b" /* InicioPage */], __WEBPACK_IMPORTED_MODULE_4__pages_pages_export_module__["c" /* OtroPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_provider_exports__["c" /* DeviceProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_provider_exports__["b" /* ContactProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_provider_exports__["e" /* NetworkProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_provider_exports__["a" /* BluetoothProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_provider_exports__["d" /* GeolocationProvider */],
                //Plugins
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_contacts__["a" /* Contact */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_contacts__["d" /* Contacts */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__["a" /* Device */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\Desarrollos\Angular\Angular2\CURSO\DeviceInfoIonic\DeviceInfo2\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FotoPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the FotoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var FotoPipe = /** @class */ (function () {
    function FotoPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    FotoPipe.prototype.transform = function (value) {
        if (value.photos != null) {
            return value.photos[0].value;
        }
        else {
            return "../assets/imgs/nofoto.PNG";
        }
    };
    FotoPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'FotoPipe',
        })
    ], FotoPipe);
    return FotoPipe;
}());

//# sourceMappingURL=foto.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UrlSeguroPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the UrlSeguroPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var UrlSeguroPipe = /** @class */ (function () {
    function UrlSeguroPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    UrlSeguroPipe.prototype.transform = function (value, type) {
        var result = {};
        switch (type) {
            case 'html':
                result = this.sanitizer.bypassSecurityTrustHtml(value);
                break;
            case 'style':
                result = this.sanitizer.bypassSecurityTrustStyle(value);
                break;
            case 'script':
                result = this.sanitizer.bypassSecurityTrustScript(value);
                break;
            case 'url':
                result = this.sanitizer.bypassSecurityTrustUrl(value);
                break;
            case 'resourceUrl':
                result = this.sanitizer.bypassSecurityTrustResourceUrl(value);
                break;
            default: throw new Error("Invalid safe type specified: " + type);
        }
        return result;
    };
    UrlSeguroPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'urlSeguro',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], UrlSeguroPipe);
    return UrlSeguroPipe;
}());

//# sourceMappingURL=url-seguro.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bluetooth_bluetooth__ = __webpack_require__(280);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__bluetooth_bluetooth__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__contact_contact__ = __webpack_require__(157);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__contact_contact__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__device_device__ = __webpack_require__(286);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__device_device__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geolocation_geolocation__ = __webpack_require__(287);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__geolocation_geolocation__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__network_network__ = __webpack_require__(288);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__network_network__["a"]; });





//# sourceMappingURL=provider-exports.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BluetoothProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the BluetoothProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var BluetoothProvider = /** @class */ (function () {
    function BluetoothProvider(http) {
        this.http = http;
        console.log('Hello BluetoothProvider Provider');
    }
    BluetoothProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], BluetoothProvider);
    return BluetoothProvider;
}());

//# sourceMappingURL=bluetooth.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DeviceProvider = /** @class */ (function () {
    function DeviceProvider() {
    }
    DeviceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], DeviceProvider);
    return DeviceProvider;
}());

//# sourceMappingURL=device.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeolocationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GeolocationProvider = /** @class */ (function () {
    function GeolocationProvider(http) {
        this.http = http;
        console.log('Hello GeolocationProvider Provider');
    }
    GeolocationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], GeolocationProvider);
    return GeolocationProvider;
}());

//# sourceMappingURL=geolocation.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NetworkProvider = /** @class */ (function () {
    function NetworkProvider(http) {
        this.http = http;
        console.log('Hello NetworkProvider Provider');
    }
    NetworkProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], NetworkProvider);
    return NetworkProvider;
}());

//# sourceMappingURL=network.js.map

/***/ })

},[205]);
//# sourceMappingURL=main.js.map