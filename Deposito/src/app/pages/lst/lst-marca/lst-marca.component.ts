import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lst-marca',
  templateUrl: './lst-marca.component.html',
  styleUrls: ['./lst-marca.component.scss']
})
export class LstMarcaComponent implements OnInit {
entity = "Listado de marcas";
id = 1;
marca = "HP";
  constructor() { }

  ngOnInit(): void {
  }

}
