import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantSearchDto } from './dto/restaurant-search.dto';
import { AuthCodeGuard } from '../common/guards/authcode.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantResultDto } from './dto/restaurant-result.dto';

@Controller('execute')
@ApiTags('Execute')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @UseGuards(AuthCodeGuard)
  @ApiResponse({
    status: 201,
    description: 'Returns a list of recommended places based on search',
    type: RestaurantResultDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid API Key',
  })
  async search(@Query() query: RestaurantSearchDto) {
    const { message } = query;
    const data = await this.restaurantService.search(message);
    return {
      ...data,
      success: true,
    };
  }
}
