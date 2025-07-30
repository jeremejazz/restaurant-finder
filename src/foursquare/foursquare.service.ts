/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FoursquareSearchPlace } from './interfaces/foursquare-search-place.interface';
import { FoursquarePlaceAPIResponse } from './interfaces/foursquare-place-api-response.interface';

@Injectable()
export class FoursquareService {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {}

  async searchPlaces(
    params: FoursquareSearchPlace,
  ): Promise<FoursquarePlaceAPIResponse> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-Places-Api-Version': '2025-06-17',
        authorization: `Bearer ${this.configService.get('FOURSQUARE_API_KEY')}`,
      },
    };

    const url = new URL(
      this.configService.getOrThrow('FOURSQUARE_PLACE_API_URL'),
    );

    const {
      query,
      max_price,
      min_price,
      open_now,
      rating,
      near,
      fsq_category_ids,
    } = params;

    if (query) url.searchParams.append('query', query);
    if (near) url.searchParams.append('near', near);
    if (max_price) url.searchParams.append('max_price', max_price);
    if (min_price) url.searchParams.append('min_price', min_price);
    if (open_now) url.searchParams.append('open_now', open_now);
    if (rating) url.searchParams.append('rating', rating);
    if (fsq_category_ids)
      url.searchParams.append('fsq_category_ids', fsq_category_ids);

    Logger.debug(`Foursquare Query: ${url.toString()}`);
    const response = await this.httpService.axiosRef.get(
      url.toString(),
      options,
    );

    return response.data;
  }
}
