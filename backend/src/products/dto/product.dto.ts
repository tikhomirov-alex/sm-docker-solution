import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class ProductDto {
	@IsNotEmpty({ message: 'Поле "Артикул" не может быть пустым' })
	@IsString({ message: 'Поле "Артикул" должно быть строкой' })
	article: string;

	@IsNotEmpty({ message: 'Поле "Название" не может быть пустым' })
	@IsString({ message: 'Поле "Название" должно быть строкой' })
	name: string;

	@Transform(({ value }) => {
		const replaced = value.toString().replace(/,/g, '.');
		return parseFloat(replaced);
	})
	@IsNumber(
		{ maxDecimalPlaces: 2 },
		{ message: 'Поле "Цена" должно содержать не более 2 знаков после запятой' },
	)
	@IsPositive({ message: 'Поле "Цена" должно быть положительным числом' })
	price: number;

	@Transform(({ value }) => {
		const replaced = value.toString().replace(/,/g, '.');
		return parseFloat(replaced);
	})
	@IsNumber(
		{ maxDecimalPlaces: 2 },
		{
			message:
				'Поле "Количество" должно содержать не более 2 знаков после запятой',
		},
	)
	@IsPositive({ message: 'Поле "Количество" должно быть положительным числом' })
	quantity: number;
}
