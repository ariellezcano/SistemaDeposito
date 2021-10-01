import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UturuncoUtils } from '../../utils/uturuncoUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipamientoService {
  other_header:any;
    api;

    constructor(private http: HttpClient) {
        this.api =  environment.URL  + "tipoEquipamiento/";
    }


    /* particularidad de la entidad */

    getList(page:any, limit:any) {
        this.other_header = UturuncoUtils.getHeader();
        return this.http
            .get(this.api + page + "/" + limit, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doUpdate(evento:any, id:any) {
        this.other_header = UturuncoUtils.getHeader();
        return this.http
            .put(this.api + id, evento, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doDelete(id:any) {
        this.other_header = UturuncoUtils.getHeader();
        return this.http
            .delete(this.api + id, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doInsert(evento:any) {
        this.other_header = UturuncoUtils.getHeader();
        return this.http
            .post(this.api, evento, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doCriteria(criteria:any, one:any, populate:any, sort:any, page:any, limit:any) {
        this.other_header = UturuncoUtils.getHeader();

        const cr = {
            criteria: criteria,
            one: one,
            populate: populate,
            sort: sort
        };

        return this.http
            .post(this.api + "criteria/" + page + "/" + limit, cr, {
                headers: this.other_header
            })
            .toPromise().catch(err => {

            });
    }
}
