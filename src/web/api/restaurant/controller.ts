import { Controller, Get, Post, Inject, Body, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RestaurantUsecase, RestaurantUsecaseToken } from '@/domain/restaurant';
import {
  CategoryResponseDTO,
  SituationResponseDTO,
  RestaurantResponseDTO,
} from './response';
import {
  QueryCategoryRequestDTO,
  RecommendRestaurantRequestDTO,
  QuerySituationRequestDTO,
} from './request';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantUsecaseToken)
    private readonly restaurantService: RestaurantUsecase,
  ) {}

  @Get('categories')
  @ApiResponse({ status: 200, type: CategoryResponseDTO, isArray: true })
  async getCategories(
    @Query() req: QueryCategoryRequestDTO,
  ): Promise<CategoryResponseDTO[]> {
    const categories = await this.restaurantService.getCategories({
      utcNow: new Date(req.now || Date.now()),
    });

    return categories.map(category => ({
      name: category.name,
    }));
  }

  @Get('situations')
  @ApiResponse({ status: 200, type: SituationResponseDTO, isArray: true })
  async getSituations(
    @Query() req: QuerySituationRequestDTO,
  ): Promise<SituationResponseDTO[]> {
    const situations = await this.restaurantService.getSituations({
      utcNow: new Date(req.now || Date.now()),
    });

    return situations.map(situation => ({
      name: situation.name,
    }));
  }

  @Get('')
  @ApiResponse({ status: 200, type: RestaurantResponseDTO })
  async getRecommendRestaurant(
    @Query() req: RecommendRestaurantRequestDTO,
  ): Promise<RestaurantResponseDTO> {
    const restaurant = await this.restaurantService.getRecommendRestaurant({
      location: {
        latitude: req.latitude,
        longitude: req.longitude,
      },
      category: req.category,
      situation: req.situation,
    });

    return {
      id: restaurant.id,
      name: restaurant.name,
      location: restaurant.location,
      rating: restaurant.rating,
    };
  }
}
