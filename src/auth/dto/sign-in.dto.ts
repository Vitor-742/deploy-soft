import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {

    @ApiProperty({
        example: 'vitor@gmail.com',
        description: `Email registrado do usuário`,
      })
    email: string;

    @ApiProperty({
        example: 'SenhaBemDificil',
        description: `Senha do usuário`,
      })
    password: string;
}
