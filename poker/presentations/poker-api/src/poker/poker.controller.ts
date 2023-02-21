import { Body, Controller, Post } from '@nestjs/common';
import { pokerHandsDTO } from './dto/request';
import { ValidationPipe } from '../pipe/validation/validation.pipe';
import { PokerService } from './poker.service';
import { PokerControllerResultDTO } from './dto/response';

interface IPokerController {
  createCards(params: pokerHandsDTO): PokerControllerResultDTO;
}

@Controller('poker')
export class PokerController implements IPokerController {
  constructor(private pokerService: PokerService) {}

  @Post()
  createCards(@Body(new ValidationPipe()) params: pokerHandsDTO) {
    return this.pokerService.execute(params);
  }
}
