import { IsArray, IsEnum, ArrayMinSize } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

export class AssignRolesDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  roles: Role[];
}
