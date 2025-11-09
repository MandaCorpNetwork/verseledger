import { createId } from "@paralleldrive/cuid2";
import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
