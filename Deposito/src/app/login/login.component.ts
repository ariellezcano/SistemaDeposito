import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/index.models';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
item:Usuario;

  constructor() {
    this.item=new Usuario();
    
   }

  ngOnInit(): void {
  }
Captura (){
  console.log (this.item)
}
}
