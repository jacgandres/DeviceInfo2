import {Component }from '@angular/core'; 
import {IonicPage, NavController, NavParams, Platform, LoadingController, Refresher }from 'ionic-angular'; 
import {Contacts, Contact }from '@ionic-native/contacts'; 
import {ContactProvider }from '../../providers/contact/contact'; 



@IonicPage()
@Component( {
  selector:'page-contactos', 
  templateUrl:'contactos.html', 
})
export class ContactosPage {
  Contactos:Contact[] = []; 
  CantidadContactos:number; 
  contactProvider:ContactProvider; 

  constructor(public navCtrl:NavController, 
    public navParams:NavParams, 
    private _platForm:Platform, 
    private _contacts:Contacts, 
    private loadingCtrl:LoadingController) {
      this.contactProvider = new ContactProvider(this._platForm, this.loadingCtrl, this._contacts); 
  }

  ionViewDidLoad() {
    this.consultarContactos(); 
  }
 
  consultarContactos() {
    let promise= this.contactProvider.consultarContactos(); 
    if(promise != null)
    {
       promise.then((result) =>  { 
        let ordenado:Contact[] = result.sort((obj1, obj2) =>  {
          return this.contactProvider.organizarLista(obj1, obj2); 
        }); 

        this.Contactos = ordenado; 
        this.CantidadContactos = this.Contactos.length; 
        console.log("Se encontaron {" + this.Contactos.length + "} contactos"); 

        this.contactProvider.loading.dismiss(); 
        this.contactProvider.terminarRefresh(); 

        console.log("finalizado usando nuevo gradle.")
      }, (error:any) =>  {
        console.log("Hubo un error consultando los contactos"); 
        console.log(JSON.stringify(error)); 
        this.contactProvider.loading.dismiss(); 
        this.contactProvider.terminarRefresh(); 
      });
    }
  }
  
  RefrescarPagina(refresher:Refresher) {
    this.contactProvider.RefrescarPagina(refresher); 
  }
 
}
