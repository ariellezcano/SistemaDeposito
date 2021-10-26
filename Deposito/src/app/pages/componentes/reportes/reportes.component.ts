import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntregaEquipoUnidades } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { VehiculosService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  id!: number;
  aclaracion = "";
  entity = 'principal/entregaEquipoUnidad';
  v = ""

  @ViewChild("form", { static: false })
  form!: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  /* declaracion de la variable tipo marca */

  @Input()
  item!: EntregaEquipoUnidades;
  router: any;



  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
*/
  constructor(private route: ActivatedRoute, private wsdl: EntregaEquipoUnidadService, private wsdlM: VehiculosService) {
    this.route.paramMap.subscribe((p: any) => {
      this.id = p.params.id;
      this.buscar(this.id);
    });
  }
  async buscar(id: any) {
    let data = await this.wsdl.doFind(id).then();
    console.log(data, this.id)
    const result = JSON.parse(JSON.stringify(data));
    // alert(JSON.stringify(data))
    if (result.status === 200) {
      this.item = result.data;
      if (this.item.movilPol != undefined){
       this.buscarvehiculo(this.item.movilPol)
      }


    } else if (result.status === 666) {
      // logout app o refresh token
      this.item = new EntregaEquipoUnidades();

    } else {
      //  this.persona = new Persona();
      this.item = new EntregaEquipoUnidades();
    }


  }

  /**
     * ngOnInit se ejecuta cuando se termina de dibujar la vista
     * y solicita los primeros 100 datos de la tabla de BD
     */
  ngOnInit() {

  }

  @Input()
  set select(item: EntregaEquipoUnidades) {


    if (item.id === undefined) {
      this.item = new EntregaEquipoUnidades();

    } else {

      this.item = new EntregaEquipoUnidades();
      this.item = item;
    }
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }
//impresion de pantalla
  imprimir(f: NgForm) {
    window.print();
  }

  devolver(valor: string){
    return UturuncoUtils.devolucionTE(valor);
  }

  //devuelve movil policial
async buscarvehiculo(item: number) {
    
  const crit = "c.id = " + item + " ";
  let data = await this.wsdlM.doCriteria(crit, false, null,'ORDER BY c.id ASC', 1, 100).then();

  const result = JSON.parse(JSON.stringify(data));
    if (result.status === 200) {
    
     this.v = " está instalado en "+ result.data[0].identificacionPol + " Dominio: "+ result.data[0].dominio;
  }
}



}
