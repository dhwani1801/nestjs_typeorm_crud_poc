import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
   
  /**
   * api for creating user
   * @param createUserDto 
   * @returns 
   */
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    {
      try {
        return this.userService.createUser(createUserDto);
      }
      catch (error) {
        console.error('UserController.create', error);
        throw error;
      }
    }
  }

  /**
   * api for finding all users
   * @returns 
   */
  @Get()
  findAllUsers(): Promise<User[]> {
    try {
      return this.userService.findAllUser();
    }
    catch (error) {
      console.error('UserController.findAll', error);
      throw error;
    }
  }

  /**
   * api for finding user by id
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOneUser(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.findOneUser(+id);
    }
    catch (error) {
      console.error('UserController.findOne', error);
      throw error;
    }
  }

  /**
   * api for updating user
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return this.userService.updateUser(+id, updateUserDto);
    }
    catch (error) {
      console.error('UserController.update', error);
      throw error;
    }
  }

  /**
   * api for deleting user
   * @param id 
   * @returns 
   */
  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<String> {
    try {
      return this.userService.removeUser(+id);
    }
    catch (error) {
      console.error('UserController.remove', error);
      throw error;
    }
  }
}
