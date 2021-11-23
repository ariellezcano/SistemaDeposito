import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EntregaEquipoUnidades } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { VehiculosService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-acta-entrega',
  templateUrl: './acta-entrega.component.html',
  styleUrls: ['./acta-entrega.component.scss'],
})
export class ActaEntregaComponent implements OnInit {
  id!: number;
  aclaracion = '';
  entity = 'principal/entregaEquipoUnidad';
  v = '';

  @ViewChild('form', { static: false })
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
  constructor(
    private route: ActivatedRoute,
    private wsdl: EntregaEquipoUnidadService,
    private wsdlM: VehiculosService
  ) {
    this.route.paramMap.subscribe((p: any) => {
      this.id = p.params.id;
      this.buscar(this.id);
    });
  }
  async buscar(id: any) {
    let data = await this.wsdl.doFind(id).then();
    console.log(data, this.id);
    const result = JSON.parse(JSON.stringify(data));
    // alert(JSON.stringify(data))
    if (result.status === 200) {
      this.item = result.data;
      if (this.item.movilPol != undefined) {
        this.buscarvehiculo(this.item.movilPol);
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
  ngOnInit() {}

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
  imprimir() {
    window.print();
  }

  devolver(valor: string) {
    return UturuncoUtils.devolucionTE(valor);
  }

  //devuelve movil policial
  async buscarvehiculo(item: number) {
    const crit = 'c.id = ' + item + ' ';
    let data = await this.wsdlM
      .doCriteria(crit, false, null, 'ORDER BY c.id ASC', 1, 100)
      .then();

    const result = JSON.parse(JSON.stringify(data));
    if (result.status === 200) {
      this.v =
        ', instalado en el móvil ' +
        result.data[0].identificacionPol +
        ' Dominio: ' +
        result.data[0].dominio;
    }
  }

  fecha(fecha: Date) {
    // console.log(fecha);
    // var meses = [
    //   'Enero',
    //   'Febrero',
    //   'Marzo',
    //   'Abril',
    //   'Mayo',
    //   'Junio',
    //   'Julio',
    //   'Agosto',
    //   'Septiembre',
    //   'Octubre',
    //   'Noviembre',
    //   'Diciembre',
    // ];
    // // var horas = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
    // var minutos = [
    //   '00',
    //   '01',
    //   '02',
    //   '03',
    //   '04',
    //   '05',
    //   '06',
    //   '07',
    //   '08',
    //   '09',
    //   '10',
    //   '11',
    //   '12',
    //   '13',
    //   '14',
    //   '15',
    //   '16',
    //   '17',
    //   '18',
    //   '19',
    //   '20',
    //   '21',
    //   '22',
    //   '23',
    //   '24',
    //   '25',
    //   '26',
    //   '27',
    //   '28',
    //   '29',
    //   '30',
    //   '31',
    //   '32',
    //   '33',
    //   '34',
    //   '35',
    //   '36',
    //   '37',
    //   '38',
    //   '39',
    //   '40',
    //   '41',
    //   '42',
    //   '43',
    //   '44',
    //   '45',
    //   '46',
    //   '47',
    //   '48',
    //   '49',
    //   '50',
    //   '51',
    //   '52',
    //   '53',
    //   '54',
    //   '55',
    //   '56',
    //   '57',
    //   '58',
    //   '59',
    // ];

    // if (fecha != undefined) {
    //   var date = new Date(fecha);
    //   var dia = date.getDate();
    //   var mes = date.getMonth();
    //   var yyyy = date.getFullYear();

    //   var hym = new Date();
    //   var hora = hym.getHours();
    //   var minuto = hym.getMinutes();
    //   var fecha_formateada =
    //     dia +
    //     ' días del mes de ' +
    //     meses[mes] +
    //     ' del año ' +
    //     yyyy +
    //     ' siendo horas ' +
    //     hora +
    //     ':' +
    //     minutos[minuto];
    // } else {
    //   var fecha_formateada =
    //     +'____' +
    //     ' días del mes de ' +
    //     '___________' +
    //     ' del año ' +
    //     '________' +
    //     ' siendo horas ' +
    //     '___' +
    //     ':' +
    //     '___';
    // }

    var fecha_formateada = moment(moment(fecha).toDate())
      .locale('es')
      .format('DD [días del mes de] MMMM [del año] YYYY  [siendo horas] HH:mm');
    return fecha_formateada;
  }

  instrumento(value: any) {
    let valor = '';
    switch (value) {
      case 'PC':
        valor = 'PROVISION CON CARGO';
        break;
      case 'PP':
        valor = 'PRESTAMO PROVISORIO';
        break;
      default:
        valor = 'SIN INSTRUMENTO';
        break;
    }
    return valor;
  }
}
