import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import User from "./users.entity";

@Entity("vehicles")
class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  kilometers: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  typeOfVehicle: string;

  @Column()
  img: string;

  @Column()
  fristImg?: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn()
  seller: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export default Vehicle;
