import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { createId } from "@paralleldrive/cuid2";

export abstract class EntityBase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @BeforeInsert()
  generateId() {
    this.id ??= createId();
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
