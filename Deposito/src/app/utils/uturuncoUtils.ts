import { HttpHeaders } from "@angular/common/http";
export class UturuncoUtils{

    static URL = "http://10.125.31.241:3001/" /*ip de Gonzalo */

  //  static URL = "http://10.125.31.150:3001/" /*ip servidor interno */

  //  static URL = "http://policiadigital.chaco.gov.ar:3001/" /*ip internet */

    static logueado: boolean=false;
    
    public static setSession(key: string, data: string) {
        localStorage.setItem("estaLogueado", "1")
        localStorage.setItem(key, data);
        sessionStorage.setItem(key, data)

    }

    public static autenticacion() {
        try {
            return parseInt(localStorage.getItem("estaLogueado")!) == 1;
        } catch (error) {
            return false
        }

    }


    public static getSession(key: string) {
        return localStorage.getItem(key);
    }

    public static getToken() {
        return localStorage.getItem("loginAuth");
    }

    public static setToken(token: any) {
        localStorage.setItem("loginAuth", token);
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
        let uid = "";
        try {
            uid = JSON.parse(localStorage.getItem("user")!).uid
        } catch (error) {

        }
        const header = new HttpHeaders(
            {
                "X-Auth-Token": "" + localStorage.getItem("loginAuth"),
                //"uid": uid
            }
        );

        return header;
    }
}