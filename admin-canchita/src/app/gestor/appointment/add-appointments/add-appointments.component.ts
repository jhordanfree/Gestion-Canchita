import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent {
  
  public name:string = '';
  public codigo:string = '';
  public mobile:string = '';
  public email:string = '';
  public date_appointment:string = '';
  public hora_Inicio: string = '';
  public hora_Fin: string = '';
  public motivo: string = '';
  public horasDisponibles: string[] = [];
  public text_success:string = '';
  public text_validation:string = '';
  constructor(
    public appointmentService: AppointmentService,
  ){
    this.generateAvailableHours();
  }

  generateAvailableHours(): void {
    const startTime = 8; 
    const endTime = 17; 

    for (let hour = startTime; hour < endTime; hour++) {
        this.horasDisponibles.push(`${hour}:00`);
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.appointmentService.listConfig().subscribe((resp:any) => {
    //   console.log(resp);
    //   this.roles = resp.roles;
    // })
  }

  save(){


    this.text_validation = '';
    if(!this.name || !this.email || !this.codigo){
      this.text_validation = "LOS CAMPOS SON NECESARIOS (name,codigo,email)";
      return;
    }

    let formData = new FormData();
    formData.append("name",this.name);
    formData.append("codigo",this.codigo);
    formData.append("email",this.email);
    formData.append("mobile",this.mobile);
    formData.append("date_appointment",this.date_appointment);
    formData.append("hora_Inicio",this.hora_Inicio);
    formData.append("hora_Fin",this.hora_Fin);
    formData.append("motivo",this.motivo);

    this.appointmentService.registerAppointment(formData).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = "Se ha registrado la solicitud de manera correcta";

        this.name = '';
        this.codigo = '';
        this.email = '';
        this.mobile = '';
        this.date_appointment = '';
        this.hora_Inicio = '';
        this.hora_Fin = '';
        this.motivo = '';
      }
    })
  }

}
