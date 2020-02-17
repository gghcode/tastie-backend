import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { CategoryTypeList } from '@/entities/category';
import { SituationTypeList } from '@/entities';

export class QueryCategoryRequestDTO {
  @Optional()
  @ApiPropertyOptional({
    type: Date,
    description: 'UTC datetime based Iso8601Literal format',
    example: '2018-11-21T06:20:32.232Z',
    default: 'current datetime',
  })
  readonly now: Date;
}

export class QuerySituationRequestDTO {
  @ApiProperty({ enum: CategoryTypeList })
  readonly category: string;
}

export class QueryPreferencesRequestDTO {
  @ApiProperty({ enum: SituationTypeList })
  readonly situation: string;
}

export class RecommendRestaurantRequestDTO {
  @ApiProperty()
  readonly longitude: number;

  @ApiProperty()
  readonly latitude: number;

  @ApiProperty({ enum: CategoryTypeList })
  readonly category: string;

  @ApiProperty({ enum: SituationTypeList })
  readonly situation: string;
}
