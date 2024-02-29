<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this ->resource->id,
            "name" => $this->resource->name,
            "surname" => $this->resource->surname,
            "email" => $this->resource->email,
            "gender" => $this->resource->gender,
            "mobile" => $this->resource->mobile,
            "created_at" => $this->resource->created_at->format("Y/m/d"),
            "role" => $this->resource->roles->first(),
            "avatar" => env("APP_URL")."storage/".$this->resource->avatar,
        ];
    }
}
