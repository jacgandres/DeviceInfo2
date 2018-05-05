import { Injectable } from '@angular/core';
import { Platform, LoadingController, Refresher } from 'ionic-angular';
import { Contact, Contacts, ContactAddress, ContactField } from '@ionic-native/contacts';


@Injectable()
export class ContactProvider {
  Contactos: Contact[] = [];
  CantidadContactos: number;
  loading: any;
  seRefresco: Refresher;

  constructor(private _platForm: Platform,
    private loadingCtrl: LoadingController,
    private _contacts: Contacts
  ) {
  }

  consultarContactos(): Promise<Contact[]> {
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

        return this._contacts.find(fields, option)

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
      return null;
    }
  }

  organizarLista(obj1, obj2) {
    if (obj1.displayName > obj2.displayName) {
      return 1;
    }
    if (obj1.displayName < obj2.displayName) {
      return -1;
    }
    return 0;
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
  }

  terminarRefresh() {
    console.log(this.seRefresco);
    if (this.seRefresco != null)
      this.seRefresco.complete();
  }

  eliminarContacto(contacto: Contact): Promise<Contact> {
    console.log('Accion Eliminar');
    return contacto.remove();
  }

  combinarContacto(contacto: Contact) {
    let contactoNuevo = this.getContactoNuevo(contacto);
    console.log('combinarContacto');
    console.log(JSON.stringify(contactoNuevo));
  }

  private getContactoNuevo(contacto: Contact): Contact {
    let telefonos: any = [];
    let emails: any = [];
    let address: any = [];
    let uniqueTelefonos: any[] = [];
    let uniqueMails: any[] = [];
    let uniqueAddress: any[] = [];


    if (contacto.phoneNumbers == null)
      contacto.phoneNumbers = [];

    if (contacto.emails == null)
      contacto.emails = [];

    if (contacto.addresses == null)
      contacto.addresses = [];

    contacto.phoneNumbers.forEach(element => {
      telefonos.push(element.value.replace(/\r\n/, "").replace(" ", "").trim().toLocaleLowerCase());
    });
    contacto.emails.forEach(element => {
      emails.push(element.value.replace(/\r\n/, '').replace(" ", "").trim().toLocaleLowerCase());
    });
    contacto.addresses.forEach(element => {
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

    let contactoNuevo: Contact = new Contact();
    contactoNuevo.displayName = contacto.displayName;
    contactoNuevo.name = contacto.name;
    contactoNuevo.nickname = contacto.nickname;
    contactoNuevo.photos = contacto.photos;
    contactoNuevo.phoneNumbers = [];
    contactoNuevo.addresses = [];
    contactoNuevo.emails = [];

    if (uniqueTelefonos.length > 0) {
      uniqueTelefonos.forEach(element => {
        let field: ContactField = new ContactField();
        field.value = element;
        contactoNuevo.phoneNumbers.push(field);
      });
    }

    if (uniqueAddress.length > 0) {
      uniqueAddress.forEach(element => {
        let field: ContactAddress = new ContactAddress();
        field.streetAddress = element;
        contactoNuevo.addresses.push(field);
      });
    }

    if (uniqueMails.length > 0) {
      uniqueMails.forEach(element => {
        let field: ContactField = new ContactField();
        field.value = element;
        contactoNuevo.emails.push(field);
      });
    }

    return contactoNuevo;
  }




} 
