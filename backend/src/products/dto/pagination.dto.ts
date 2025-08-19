import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@IsOptional()
	page = 1;

	@Type(() => Number)
	@IsInt()
	@Min(5)
	@Max(50)
	@IsOptional()
	limit = 20;
}
