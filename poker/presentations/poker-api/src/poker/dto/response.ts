import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class allowedHandsResultDTO {
  @IsString()
  @IsNotEmpty()
  hand: string;

  @IsNotEmpty()
  @IsString()
  yaku: string;

  @IsBoolean()
  @IsNotEmpty()
  isStrongest: boolean;
}

export class errorHandsResultDTO {
  @IsNotEmpty()
  @IsString()
  hand: string;

  @IsNotEmpty()
  errorMessage: string[];
}

export class PokerControllerResultDTO {
  result?: allowedHandsResultDTO[];
  error?: errorHandsResultDTO[];
}
