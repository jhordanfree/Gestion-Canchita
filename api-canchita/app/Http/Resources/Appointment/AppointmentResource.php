<?php

namespace App\Http\Resources\Appointment;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->resource->id,
            "name" => $this->resource->name,
            "codigo" => $this->resource->codigo,
            "email" => $this->resource->email,
            "mobile" => $this->resource->mobile,
            "date_appointment" => $this->resource->date_appointment ? Carbon::parse($this->resource->date_appointment)->format("Y/m/d") : NULL,
            "hora_Inicio" => $this->resource->hora_Inicio,
            "hora_Fin" => $this->resource->hora_Fin,
            "motivo" => $this->resource->motivo,
        ];
    }
}
