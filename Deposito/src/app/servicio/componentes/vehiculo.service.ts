import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UturuncoUtils } from '../../utils/uturuncoUtils';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class VehiculosService {
    other_header: any;
    api;

    constructor(private http: HttpClient) {
     this.api = environment.URL + "vehiculo/";
    }
    /* particularidad de la entidad */

    getList(page: number, limit: number) {
        this.other_header = null;
        return this.http
            .get(this.api + page + "/" + limit, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doUpdate(evento: any, id: number) {
        return this.http
            .put(this.api + id, evento, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doDelete(id: number) {
        this.other_header = null;
        return this.http
            .delete(this.api + id, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doInsert(evento: any) {
        this.other_header = null;
        return this.http
            .post(this.api, evento, { headers: this.other_header })
            .toPromise().catch(err => {

            });
    }

    doCriteria(criteria: string, one: boolean, populate: null, sort: string, page: string | number, limit: string | number) {
        this.other_header = null;

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