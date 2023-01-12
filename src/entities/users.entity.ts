import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import Address from "./address.entity";
import Vehicle from "./vehicles.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  cellphone: string;

  @Column({ type: "date" })
  birthdate: string;

  @Column()
  bio: string;

  @Column()
  user_picture: string;

  @Column()
  is_seller: boolean;

  @Column()
  is_client: boolean;

  @Column({ nullable: true, default: true })
  is_active: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Address, { eager: true, nullable: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Vehicle, {
    nullable: true,
  })
  @JoinTable()
  vehicles: Vehicle[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
