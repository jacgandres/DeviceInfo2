import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  LoadingController,
  Refresher,
  ItemSliding,
  AlertController
} from 'ionic-angular';

import { Contacts, Contact } from '@ionic-native/contacts';
import { ContactProvider } from '../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class ContactosPage {
  Contactos: Contact[] = [];
  CantidadContactos: number;
  contactProvider: ContactProvider;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _platForm: Platform,
    private _contacts: Contacts,
    private _alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.contactProvider = new ContactProvider(this._platForm, this.loadingCtrl, this._contacts);
  }

  ionViewDidLoad() {
    this.consultarContactos();
  }

  consultarContactos() {
    let promise = this.contactProvider.consultarContactos();
    if (promise != null) {
      promise.then((result) => {
        let ordenado: Contact[] = result.sort((obj1, obj2) => {
          return this.contactProvider.organizarLista(obj1, obj2);
        });

        this.Contactos = ordenado;
        this.CantidadContactos = this.Contactos.length;
        console.log("Se encontaron {" + this.Contactos.length + "} contactos");

        this.contactProvider.loading.dismiss();
        this.contactProvider.terminarRefresh();

        console.log("finalizado usando nuevo gradle.")
      }, (error: any) => {
        console.log("Hubo un error consultando los contactos");
        console.log(JSON.stringify(error));
        this.contactProvider.loading.dismiss();
        this.contactProvider.terminarRefresh();
      });
    }
  }

  RefrescarPagina(refresher: Refresher) {
    this.contactProvider.RefrescarPagina(refresher);
    this.consultarContactos();
  }

  EliminarContacto(contacto, slidingItem: ItemSliding) {
    slidingItem.close();
    this.showConfirm("Contacto: " + contacto.displayName, 
      "Esta seguro que desea eliminar el contacto?",
      this.AccionEliminar, contacto);
  }

  LimpiarContacto(contacto, slidingItem: ItemSliding) {
    slidingItem.close();
    this.showConfirm("Contacto: " + contacto.displayName,
      "Esta seguro que desea Combinar el contacto?", this.AccionCombinar, contacto);
  }

  MarcarContacto(contacto, slidingItem: ItemSliding) {
    slidingItem.close();
  }

  AccionEliminar(contacto, ctrll) {
    let promesa = ctrll.contactProvider.eliminarContacto(contacto);
    promesa.then((result) => {
      console.log(JSON.stringify(result));
      ctrll.consultarContactos();
    });
  }

  AccionCombinar() {
    console.log('Accion Combinar');
  }

  showConfirm(title, message, action, contacto) {
    let actualCtrll = this;
    let confirm = this._alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            action(contacto, actualCtrll);

          }
        }
      ]
    });
    confirm.present();
  }

}
