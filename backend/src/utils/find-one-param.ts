import { IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class FindOneParamsByName {
  @IsString()
  name: string;
}
