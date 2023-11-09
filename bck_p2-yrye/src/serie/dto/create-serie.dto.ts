import { IsNotEmpty, IsString, MaxLength  } from "class-validator";
import { IntegerType } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSerieDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo titulo no debe ser vacío' })
  @IsString({ message: 'El campo titulo debe ser de tipo cadena' })
  @MaxLength(250, { message: 'El campo titulo no debe ser mayor a 250 caracteres' })
  titulo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sinopsis no debe ser vacío' })
  @IsString({ message: 'El campo sinopsis debe ser de tipo cadena' })
  @MaxLength(5000, { message: 'El campo sinopsis no debe ser mayor a 5000 caracteres' })
  sinopsis: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo director no debe ser vacío' })
  @IsString({ message: 'El campo director debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo director no debe ser mayor a 100 caracteres' })
  director: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracion no debe ser vacío' })
  duracion: number;

  @ApiProperty({ example: '2023-11-09' })
  @IsNotEmpty({ message: 'El campo fecha_estreno no debe ser vacío' })
  fecha_estreno: Date;
}
