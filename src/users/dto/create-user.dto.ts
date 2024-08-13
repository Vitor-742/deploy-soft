import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        example: 'vitor@gmail.com',
        description: `Email de registro do usuário`,
      })
    email: string;

    @ApiProperty({
        example: 'SenhaBemDificil',
        description: `Senha do usuário`,
      })
    password: string;
}
