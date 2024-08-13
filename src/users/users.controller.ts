import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/constants';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth() 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'O email do usuário que você deseja obter',
    schema: { type: 'string' },
  })
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'O ID do usuário que você deseja atualizar',
    schema: { type: 'integer' },
  })
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {  
    this.usersService.updateOne(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'O ID do usuário que você deseja deletar',
    schema: { type: 'integer' },
  })
  deleteOne(@Param('id') id: string) {  
    this.usersService.deleteOne(+id);
  }

}
