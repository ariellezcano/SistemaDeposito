import { HttpHeaders } from '@angular/common/http';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export class UturuncoUtils {
  
  /* servidor de produccion */
  // static URL = "http://policiadigital.chaco.gob.ar:7654/";
  // static URLPOLD = "http://policiadigital.chaco.gob.ar:3000/";

  /* servidor local */
  // static URL = "http://10.125.31.150:3001/";
  // static URLPOLD = "http://10.125.31.150:3000/";

  /* servidor de testing (PRUEBA) */
  static URL = 'http://10.125.31.241:3001/';
  static URLPOLD = 'http://10.125.31.150:3000/';
  
  
  // static loc = window.sessionStorage;

  public static setSession(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  public static getSession(key: string | any) {
    return localStorage.getItem(key);
  }

  public static getToken() {
    return localStorage.getItem('loginAuth');
  }

  public static setToken(token: any) {
    localStorage.setItem('loginAuth', token);
  }

  public static clearSession() {
    localStorage.clear();
    /*
        for (let i = 0; i < localStorage.length; i++) {
          let key = this.loc.key(i);
          let value = this.loc.getItem(key);
          console.log(key, value);
        }
        */
  }

  public static getHeader() {
    let uid = '';
    try {
      uid = JSON.parse('' + localStorage.getItem('user')).uid;
    } catch (error) {}
    const header = new HttpHeaders({
      'X-Auth-Token': '' + localStorage.getItem('loginAuth'),
      uid: uid,
    });

    return header;
  }

    public static showToas(msg: String, type: SweetAlertIcon) {
      const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
      });

      Toast.fire({
          icon: type,
          title: msg

      });
  }
}
