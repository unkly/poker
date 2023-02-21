import { IsNotEmpty } from 'class-validator';

export class pokerHandsDTO {
  @IsNotEmpty()
  hands: string[];
}
