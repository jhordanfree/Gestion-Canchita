  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { URL_SERVICIOS } from 'src/app/config/config';
  import { AuthService } from 'src/app/shared/auth/auth.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AppointmentService {

    constructor(
      public http: HttpClient,
      public authService: AuthService
    ) { }
    
    listReserva(){
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/appointmet";
      return this.http.get(URL,{headers: headers});
    }

    // listConfig(data:any){
    //   let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    //   let URL = URL_SERVICIOS+"/appointmet/config";
    //   return this.http.get(URL,{headers: headers});
    // }

    registerAppointment(data:any){
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/appointmet";
      return this.http.post(URL,data,{headers: headers});
    }

    showAppointment(appointment_id:string){
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/appointmet/"+appointment_id;
      return this.http.get(URL,{headers: headers});
    }

    updateAppointment(appointment_id:string,data:any){
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/appointmet/"+appointment_id;
      return this.http.put(URL,data,{headers: headers});
    }
    
    deleteAppointment(appointment_id:string){
      let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
      let URL = URL_SERVICIOS+"/appointmet/"+appointment_id;
      return this.http.delete(URL,{headers: headers});
    }
  }
