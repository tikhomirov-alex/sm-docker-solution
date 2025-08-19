import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		unique: true,
		nullable: false,
	})
	article: string;

	@Column({
		type: 'varchar',
		nullable: false,
	})
	name: string;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
	})
	price: number;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
	})
	quantity: number;

	@CreateDateColumn({
		type: 'timestamp',
		name: 'created_at',
		precision: 0,
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;
}
