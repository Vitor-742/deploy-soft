import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly producerService: ProducerService,


  ) {}
  
  async create(createUserDto: CreateUserDto) {

    this.producerService.produce({
      topic: 'nestjs',
      messages: [{
        value: "Kafka log: creating new User"
      }]
    })

    const new_user = new User(createUserDto);

    await this.entityManager.save(new_user);
  }

  findAll() {
    return this.usersRepository.find();
  }
  
  updateOne(id: number, updateUserDto: UpdateUserDto) {

    this.producerService.produce({
      topic: 'nestjs',
      messages: [{
        value: "Kafka log: Updating already created user"
      }]
    })

    return this.usersRepository.update(id, updateUserDto);
  }

  deleteOne(id: number) {
    return this.usersRepository.delete(id);
  }

  async findOne(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
