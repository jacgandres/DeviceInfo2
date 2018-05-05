import {Component }from '@angular/core'; 
import {IonicPage, NavController, NavParams, Platform, LoadingController, Refresher }from 'ionic-angular'; 
import {Contacts, Contact }from '@ionic-native/contacts'; 
import {DeviceProvider }from '../../providers/device/device'; 



@IonicPage()
@Component( {
  selector:'page-contactos', 
  templateUrl:'contactos.html', 
})
export class ContactosPage {
  Contactos:Contact[] = []; 
  CantidadContactos:number; 
  deviceProvider:DeviceProvider; 

  constructor(public navCtrl:NavController, 
    public navParams:NavParams, 
    private _platForm:Platform, 
    private _contacts:Contacts, 
    private loadingCtrl:LoadingController) {
      this.deviceProvider = new DeviceProvider(this._platForm, this.loadingCtrl, this._contacts); 
  }

  ionViewDidLoad() {
    this.consultarContactos(); 
  }
 
  consultarContactos() {
    let promise= this.deviceProvider.consultarContactos(); 
    if(promise != null)
    {
       promise.then((result) =>  { 
        let ordenado:Contact[] = result.sort((obj1, obj2) =>  {
          return this.deviceProvider.organizarLista(obj1, obj2); 
        }); 

        this.Contactos = ordenado; 
        this.CantidadContactos = this.Contactos.length; 
        console.log("Se encontaron {" + this.Contactos.length + "} contactos"); 

        this.deviceProvider.loading.dismiss(); 
        this.deviceProvider.terminarRefresh(); 

        console.log("finalizado usando nuevo gradle.")
      }, (error:any) =>  {
        console.log("Hubo un error consultando los contactos"); 
        console.log(JSON.stringify(error)); 
        this.deviceProvider.loading.dismiss(); 
        this.deviceProvider.terminarRefresh(); 
      });
    }
  }
  
  RefrescarPagina(refresher:Refresher) {
    this.deviceProvider.RefrescarPagina(refresher); 
  }
 
}
