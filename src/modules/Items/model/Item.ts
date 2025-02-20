import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() // This decorator makes it a TypeORM entity
export class Item {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
