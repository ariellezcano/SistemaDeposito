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
import { DetalleCompra, OrdenCompra } from 'src/app/modelo/index.models';
import {
  DetalleCompraService,
  OrdenCompraService,
} from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-reporte-faltante',
  templateUrl: './reporte-faltante.component.html',
  styleUrls: ['./reporte-faltante.component.scss'],
})
export class ReporteFaltanteComponent implements OnInit {
  id!: number;
  aclaracion = '';
  entity = 'principal/entregaEquipoUnidad';

  @ViewChild('form', { static: false })
  form!: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  /* declaracion de la variable tipo marca */

  @Input()
  items: DetalleCompra[];
  item: DetalleCompra;

  compra!: OrdenCompra;
  router: any;

  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
   */
  constructor(
    private route: ActivatedRoute,
    private wsdlD: DetalleCompraService,
    private wsdlc: OrdenCompraService
  ) {
    this.compra = new OrdenCompra();
    this.item = new DetalleCompra();
    this.items = [];
    this.id = this.route.snapshot.params.id;
    //this.buscar(this.id);
    this.findID();
  }

  async findID() {
    try {
      if (this.id > 0) {
        let data = await this.wsdlD.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.status == 200) {
          this.item = res.data;
          console.log('findID', this.item);
        }
      } else {
        this.item = new DetalleCompra();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }
  retornarPersona(item: DetalleCompra) {
    this.item = item;
    let valor = '';
    if (item.personalRecibe != undefined) {
      return item.personalRecibe.apellido + ', ' + item.personalRecibe.nombre;
    } else {
      return (valor = '__________________________________________');
    }
  }

  // async buscar(id: any) {
  //   let data = await this.wsdlD.doFind(id).then();
  //   const result = JSON.parse(JSON.stringify(data));
  //   // alert(JSON.stringify(data))
  //   if (result.status === 200) {
  //     this.item = result.data;
  //     //alert;
  //     // if (this.item.movilPol != undefined) {
  //     //   this.buscarvehiculo(this.item.movilPol);
  //     // }
  //   } else if (result.status === 666) {
  //     // logout app o refresh token
  //     this.item = new DetalleCompra();
  //   } else {
  //     //  this.persona = new Persona();
  //     this.item = new DetalleCompra();
  //   }
  // }

  /**
   * ngOnInit se ejecuta cuando se termina de dibujar la vista
   * y solicita los primeros 100 datos de la tabla de BD
   */
  ngOnInit() {
    //this.findID();
  }

  // @Input()
  // set select(item: DetalleCompra) {
  //   if (item.id === undefined) {
  //     this.item = new DetalleCompra();
  //   } else {
  //     this.item = new DetalleCompra();
  //     this.item = item;
  //   }
  // }
  faltante(cantidadCompra: any, cantidadIngreso: any) {
    let valor = '';

    if (cantidadCompra > cantidadIngreso) {
      return cantidadCompra - cantidadIngreso;
    } else {
      return (valor = 'Equipamiento Completo');
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
  // async buscarvehiculo(item: number) {
  //   const crit = 'c.id = ' + item + ' ';
  //   let data = await this.wsdlD
  //     .doCriteria(crit, false, null, 'ORDER BY c.id ASC', 1, 100)
  //     .then();

  //   const result = JSON.parse(JSON.stringify(data));
  //   if (result.status === 200) {
  //     this.v =
  //       ', instalado en el móvil ' +
  //       result.data[0].identificacionPol +
  //       ' Dominio: ' +
  //       result.data[0].dominio;
  //   }
  // }

  fecha(fecha: Date) {
    console.log(fecha);
    var meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    // var horas = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
    var minutos = [
      '00',
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46',
      '47',
      '48',
      '49',
      '50',
      '51',
      '52',
      '53',
      '54',
      '55',
      '56',
      '57',
      '58',
      '59',
    ];

    if (fecha != undefined) {
      var date = new Date(fecha);
      var dia = date.getDate();
      var mes = date.getMonth();
      var yyyy = date.getFullYear();

      var hym = new Date();
      var hora = hym.getHours();
      var minuto = hym.getMinutes();
      var fecha_formateada =
        dia +
        ' días del mes de ' +
        meses[mes] +
        ' del año ' +
        yyyy +
        ' siendo horas ' +
        hora +
        ':' +
        minutos[minuto];
    } else {
      var fecha_formateada =
        +'____' +
        ' días del mes de ' +
        '___________' +
        ' del año ' +
        '________' +
        ' siendo horas ' +
        '___' +
        ':' +
        '___';
    }
    return fecha_formateada;
  }

  instrumento(value: any) {
    let valor = '';
    switch (value) {
      case 'CD':
        valor = ' Contratación Directa';
        break;
      case 'CP':
        valor = ' Concurso de Precios';
        break;
      case 'LPr':
        valor = ' Licitación Privada';
        break;
      case 'LPu':
        valor = ' Licitación Pública';
        break;
      default:
        valor = 'SIN INSTRUMENTO';
        break;
    }
    return valor;
  }
}
