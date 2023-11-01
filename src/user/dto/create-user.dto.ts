import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { VALIDATION_ERRORS } from 'src/common/messages';

export class CreateUserDto {
  @IsString({ message: VALIDATION_ERRORS.INVALID_NAME })
  @IsNotEmpty({ message: VALIDATION_ERRORS.NAME_IS_REQUIRED }) 
  name: string;

  @IsEmail(undefined, { message: VALIDATION_ERRORS.EMAIL_IS_REQUIRED })
  @IsNotEmpty({ message: VALIDATION_ERRORS.EMAIL_IS_REQUIRED }) 
  email: string;
}
