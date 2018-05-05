import { Injectable } from '@angular/core';
import { Contact, Contacts } from '@ionic-native/contacts';
import { Refresher, Platform, LoadingController } from 'ionic-angular';

 
@Injectable()
export class ContactProvider {
  Contactos:Contact[] = []; 
  CantidadContactos:number; 
  loading:any; 
  seRefresco:Refresher; 

  constructor(private _platForm:Platform, 
              private loadingCtrl:LoadingController, 
              private _contacts:Contacts ) { 
  }

} 
