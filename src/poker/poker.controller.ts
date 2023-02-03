import { Body, Controller, Post } from '@nestjs/common';
import { pokerHandsDTO } from 'src/dto/pokerHandsDTO.dto';
import { ValidationPipe } from 'src/pipe/validation/validation.pipe';
import { PokerService } from './poker.service';

@Controller('poker')
export class PokerController {
  constructor(private readonly pokerService: PokerService) {}

  @Post()
  createCards(@Body(new ValidationPipe()) params: pokerHandsDTO[]) {
    return this.pokerService.start(params);
  }
}
