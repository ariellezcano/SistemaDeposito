import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadoEquipoService {
  other_header: any;
    api;

    constructor(private http: HttpClient) {
        this.api = environment.URL + 'estadoEquipo';
    }

    getList(page: any, limit: any) {
        this.other_header = UturuncoUtils.getHeader();

        return this.http
            .get(this.api + '?page=' + page + '&limit=' + limit, {
                headers: this.other_header,
            })
            .toPromise()
            .catch((err) => {
                return { code: 500, msg: err.message }
            });
    }

    getCriteria(criteria: any, page: any, limit: any) {
        this.other_header = UturuncoUtils.getHeader();
        return this.http
            .get(
                this.api + '/find/' + criteria + '?page=' + page + '&limit=' + limit,
                { headers: this.other_header }
            )
            .toPromise()
            .catch((err) => {
                return { code: 500, msg: err.message }
            });
    }

    doFind(id: any) {
        this.other_header = UturuncoUtils.getHeader();

        return this.http
            .get(this.api + '/' + id, { headers: this.other_header })
            .toPromise()
            .catch((err) => {
                return { code: 500, msg: err.message }
            });
    }

    doInsert(evento: any) {
        this.other_header = UturuncoUtils.getHeader();

        return this.http
            .post(this.api + '/', evento, { headers: this.other_header })
            .toPromise()
            .catch((err) => {
                return { code: 500, msg: err.message }
            });
    }

    doUpdate(evento: any, id: any) {
        this.other_header = UturuncoUtils.getHeader();

        return this.http
            .put(this.api + '/' + id, evento, { headers: this.other_header })
            .toPromise()
            .catch((err) => {
                return { code: 500, msg: "" + err }
            });
    }

    doDelete(id: any) {
        this.other_header = UturuncoUtils.getHeader();

        return this.http
            .delete(this.api + '/' + id, { headers: this.other_header })
            .toPromise()
            .catch((err) => {
                return { code: 500, msg: err.message }
            });
    }

}
