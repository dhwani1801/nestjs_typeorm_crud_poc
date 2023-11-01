import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ERRORS, SUCCESS_MESSAGES } from '../common/messages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * This method creates users
   * @param createUserDto 
   * @returns 
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException(USER_ERRORS.EMAIL_IS_ALREADY_IN_USE, HttpStatus.CONFLICT);
    }
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  /**
   * This method finds all users
   * @returns 
   */
  async findAllUser(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      throw new HttpException(USER_ERRORS.NO_USERS_FOUND, HttpStatus.NOT_FOUND);
    }
    return users;
  }

  /**
   * This method find user by id
   * @param id 
   * @returns 
   */
  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(USER_ERRORS.USER_NOT_EXISTS, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * This method updates user
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneUser(id);
    if (user) {
      await this.userRepository.update(id, updateUserDto);
      return await this.findOneUser(id);
    }
    return undefined;
  }

  /**
   * This method delets users
   * @param id 
   * @returns 
   */
  async removeUser(id: number): Promise<string> {
    const user = await this.findOneUser(id);
    if (user) {
      await this.userRepository.delete(id);
      return SUCCESS_MESSAGES.USER_DELETED_SUCCESSFULY;
    }
    return undefined;
  }
}
