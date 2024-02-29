import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
  styleUrls: ['./edit-appointments.component.scss']
})
export class EditAppointmentsComponent {

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

  public appointment_id:any;
  public appointment_selected:any;
  constructor(
    public appointmentService: AppointmentService,
    public activedRoute: ActivatedRoute
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
    this.activedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.appointment_id = resp.id;
    })

    this.appointmentService.showAppointment(this.appointment_id).subscribe((resp:any) =>{
      console.log(resp);
      this.appointment_selected = resp.appointment;

      this.name = this.appointment_selected.name;
      this.codigo = this.appointment_selected.codigo;
      this.mobile = this.appointment_selected.mobile;
      this.email = this.appointment_selected.email;
      this.date_appointment = new Date(this.appointment_selected.date_appointment).toISOString();
      this.hora_Inicio = this.appointment_selected.hora_Inicio;
      this.hora_Fin = this.appointment_selected.hora_Fin;
      this.motivo = this.appointment_selected.motivo;
    })
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

    this.appointmentService.updateAppointment(this.appointment_id,formData).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = "Se ha editado la solicitud de manera correcta";
      }
    })
  }
}
