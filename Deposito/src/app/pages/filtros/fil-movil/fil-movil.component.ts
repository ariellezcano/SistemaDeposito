import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehiculo } from 'src/app/modelo/index.models';
import { VehiculosService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-fil-movil',
  templateUrl: './fil-movil.component.html',
  styleUrls: ['./fil-movil.component.scss']
})
export class FilMovilComponent implements OnInit {

  @Output()
  resultado = new EventEmitter<Vehiculo>();

  @Input()
  item!: Vehiculo;
  criterio!: string;
  items!: Vehiculo[];

movil = '';
  @Input()
  set dibujar(id: number){
    //this.movil = item.identificacionPol + item.modelo.marca.nombre
   this.dibujarvehiculo(id); 
    //console.log("dibujar items", this.item)
   // this.items = [];
    //this.items.push(this.item);
  }

  constructor(private wsdl: VehiculosService) {
    this.items = [];
    //this.item;
   }

   async dibujarvehiculo(item: number) {
    const crit = 'c.id = ' + item + ' ';
    let data = await this.wsdl
      .doCriteria(crit, false, null, 'ORDER BY c.id ASC', 1, 100)
      .then();

    const result = JSON.parse(JSON.stringify(data));
    if (result.status === 200) {
      this.items = result.data;
      this.item=this.items[0];
    }
  }

  ngOnInit() {
  }

  seleccionar(event: Vehiculo) {
    this.resultado.emit(event);
  }

  compareFnVe(c1: Vehiculo, c2: Vehiculo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  async buscarvehiculo() {
    const crit = "(c.identificacionPol like '%" + this.criterio + "%' or c.dominio like '%" + this.criterio + "%') AND c.activo=true";
    let data = await this.wsdl.doCriteria(crit, false, null,'ORDER BY c.id ASC', 1, 100).then();

    const result = JSON.parse(JSON.stringify(data));
    console.log(result)
    // alert(JSON.stringify(data))
    if (result.status === 200) {
      this.items = result.data;
      if (this.items.length == 1){
        this.item = this.items[0];
        this.resultado.emit(this.item);
       } 

    } else if (result.status === 666) {
      // logout app o refresh token
      this.items = [];

    } else {
      //  this.persona = new Persona();
      this.items = [];
    }
    //this.resultado.emit(this.items);
  }
}
