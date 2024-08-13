import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        example: 'rony@gmail.com',
        description: `Email de registro do usuário`,
      })
    email?: string;

    @ApiProperty({
        example: 'SenhaMaisDificil',
        description: `Senha do usuário`,
      })
    password?: string;
}
