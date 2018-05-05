import {Injectable }from '@angular/core'; 
import {Platform, LoadingController, Refresher }from 'ionic-angular'; 
import {Contact, Contacts }from '@ionic-native/contacts'; 


@Injectable()
export class DeviceProvider {
  Contactos:Contact[] = []; 
  CantidadContactos:number; 
  loading:any; 
  seRefresco:Refresher; 

  constructor(private _platForm:Platform, 
              private loadingCtrl:LoadingController, 
              private _contacts:Contacts
              ) { 
  }

  consultarContactos():Promise<Contact[]> { 
    console.log('Entrando al modulo de los contactos'); 

    if (this._platForm.is("android") || this._platForm.is("ios")) {

      try {

        console.log("Apunto de hacer consulta"); 
        let option:any =  {
          filter:"", 
          hasPhoneNumber:true, 
          multiple:true
        }; 

        let fields:any[] = ['displayName']; 

        this.presentLoading(); 

        return this._contacts.find(fields, option) 

      }catch (error) {
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
  }
  
  organizarLista(obj1, obj2) {
    if (obj1.displayName > obj2.displayName) {
      return 1; 
    } 
    if (obj1.displayName < obj2.displayName) {
      return-1; 
    }
    return 0; 
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create( {
      content:"Consultando...", 
      duration:15000
    }); 
    this.loading.present(); 
  }

  RefrescarPagina(refresher:Refresher) {
    this.seRefresco = refresher; 
    this.consultarContactos(); 
  }

  terminarRefresh() {
    console.log(this.seRefresco); 
    if (this.seRefresco != null)
      this.seRefresco.complete(); 
  }
}
 