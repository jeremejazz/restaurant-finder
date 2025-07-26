import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantSearchDto } from './dto/restaurant-search.dto';
import { AuthCodeGuard } from '../common/guards/authcode.guard';

@Controller('execute')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @UseGuards(AuthCodeGuard)
  search(@Query() query: RestaurantSearchDto) {
    const { message } = query;
    return this.restaurantService.search(message);
  }
}
