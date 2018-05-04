import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';

import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  Dispositivo: any = {};
  seRefresco: Refresher;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _device: Device) {
  }

  ionViewDidLoad() {
    this.obtnerInfoDelDispositivo();
  }

  obtnerInfoDelDispositivo(){
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
  }

  RefrescarPagina(refresher: Refresher) {
    this.seRefresco = refresher;
    this.obtnerInfoDelDispositivo();
  }

  terminarRefresh() {
    console.log(this.seRefresco);
    if (this.seRefresco != null)
      this.seRefresco.complete();
  }

}
