import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Refresher } from 'ionic-angular';
import { Contacts, Contact } from '@ionic-native/contacts';



@IonicPage()
@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class ContactosPage {
  Contactos: Contact[] = [];
  CantidadContactos: number;
  loading: any;
  seRefresco: Refresher;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _platForm: Platform,
    private _contacts: Contacts,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.consultarContactos();
  }

  consultarContactos() {
    console.log('Entrando al modulo de los contactos');

    if (this._platForm.is("android") || this._platForm.is("ios")) {

      try {

        console.log("Apunto de hacer consulta");
        let option: any = {
          filter: "",
          hasPhoneNumber: true,
          multiple: true
        };

        let fields: any[] = ['displayName'];

        this.presentLoading();

        this._contacts.find(fields, option).then((result) => {

          let ordenado: Contact[] = result.sort((obj1, obj2) => {
            if (obj1.displayName > obj2.displayName) {
              return 1;
            }

            if (obj1.displayName < obj2.displayName) {
              return -1;
            }

            return 0;
          });

          this.Contactos = ordenado;
          this.CantidadContactos = this.Contactos.length;
          console.log("Se encontaron {" + this.Contactos.length + "} contactos");

          this.loading.dismiss();
          this.terminarRefresh();

        }, (error: any) => {
          console.log("Hubo un error consultando los contactos");
          console.log(JSON.stringify(error));
          this.loading.dismiss();
          this.terminarRefresh();
        });

      } catch (error) {
        console.log(JSON.stringify(error));
        this.loading.dismiss();
        this.terminarRefresh();
        throw error;
      }

    }
    else {
      console.log("No se esta ejecutando un dispositivo movil");
      this.terminarRefresh();
    }
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Consultando...",
      duration: 15000
    });
    this.loading.present();
  }

  RefrescarPagina(refresher: Refresher) {
    this.seRefresco = refresher;
    this.consultarContactos();
  }

  terminarRefresh() {
    console.log(this.seRefresco);
    if (this.seRefresco != null)
      this.seRefresco.complete();
  }
}
