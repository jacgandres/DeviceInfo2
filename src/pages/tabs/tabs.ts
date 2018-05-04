import { Component } from '@angular/core';

import {ContactosPage,InicioPage,OtroPage} from '../pages-export-module'

 
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InicioPage;
  tab3Root = ContactosPage;
  tab2Root = OtroPage;

  constructor() {

  }
}
