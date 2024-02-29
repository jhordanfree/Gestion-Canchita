<?php

namespace App\Http\Controllers\Appointment;

use App\Http\Controllers\Controller;
use App\Http\Resources\Appointment\AppointmentCollection;
use App\Http\Resources\Appointment\AppointmentResource;
use Illuminate\Http\Request;
use App\Models\Appointment\Appointment;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $appointments = Appointment::where("name","like","%".$search."%")
                            ->orWhere("codigo","like","%".$search."%")
                            ->orWhere("mobile","like","%".$search."%")
                            ->orWhere("email","like","%".$search."%")
                            ->orderBy("id","desc")
                            ->get();
        return response()->json([
            "appointments" => AppointmentCollection::make($appointments),
        ]);
    }

    public function config() {
        // $roles = Role::where("name","not like","%DOCTOR%")->get();

        // return response()->json([
        //     "roles" => $roles
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $appointments_is_valid = Appointment::where("email",$request->email)->first();
      
        if($appointments_is_valid){
            return response()->json([
                "message"=> 403,
                "message_text" => "EL USUARIO CON ESTE EMAIL YA SOLICITO UNA RESERVA"
            ]);
        }
        

        // "Fri Oct 08 1993 00:00:00 GMT-0500 (hora estándar de Perú)"
        // Eliminar la parte de la zona horaria (GMT-0500 y entre paréntesis)
        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->date_appointment);

        $request->request->add(["date_appointment" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);


        //solo se va modificar los campos que defini en mi modelo Appointment
        $appointment = Appointment::create($request->all());

        return response()->json([
            "message" => 200,
        ]);

    }


    public function calendar(Request $request) {
        $appointments = Appointment::all();
    
        return response()->json([
            "appointments" => $appointments->map(function($appointment) {
                return [
                    "id" => $appointment->id,
                    "title" => "RESERVA - ".$appointment->name,
                    "start" => Carbon::parse($appointment->date_appointment)->format("Y-m-d")."T".$appointment->hora_Inicio,
                    "end" => Carbon::parse($appointment->date_appointment)->format("Y-m-d")."T".$appointment->hora_Fin,
                ];
            })
        ]);
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        return response()->json([
            "appointment" => AppointmentResource::make($appointment),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $appointments_is_valid = Appointment::where("id","<>",$id)->where("email",$request->email)->first();

        if($appointments_is_valid){
            return response()->json([
                "message" => 403,
                "message_text" => "EL USUARIO CON ESTE EMAIL YA SOLICITO UNA RESERVA"
            ]);
        }

        $appointment = Appointment::findOrFail($id);


        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->date_appointment);

        $request->request->add(["date_appointment" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        // $request->request->add(["date_appointment" => Carbon::parse($request->date_appointment, 'GMT')->format("Y-m-d h:i:s")]);
        $appointment->update($request->all());

        return response()->json([
            "message" => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();
        return response()->json([
            "message" => 200
        ]);
    }
}
