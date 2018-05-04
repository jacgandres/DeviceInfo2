import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
 
import {ContactosPage,InicioPage,OtroPage} from '../pages/pages-export-module'
import { TabsPage } from '../pages/tabs/tabs';

///Pipes 
import { FotoPipe } from '../pipes/foto/foto';
import { UrlSeguroPipe } from '../pipes/url-seguro/url-seguro';

///plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts, Contact } from '@ionic-native/contacts'
import { Device } from '@ionic-native/device';

///Providers
import {BluetoothProvider,ContactProvider,DeviceProvider,GeolocationProvider,NetworkProvider} from '../providers/provider-exports'



@NgModule({
  declarations: [
    MyApp, 
    TabsPage,
    ContactosPage,InicioPage,OtroPage,
    FotoPipe,
    UrlSeguroPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    TabsPage,
    ContactosPage,InicioPage,OtroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceProvider,
    ContactProvider,
    NetworkProvider,
    BluetoothProvider,
    GeolocationProvider,
    //Plugins
    Contact,Contacts,
    Device
  ]
})
export class AppModule {}
