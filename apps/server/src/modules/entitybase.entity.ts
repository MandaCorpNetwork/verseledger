import { createId } from "@paralleldrive/cuid2";
import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class EntityBase {
  @PrimaryColumn()
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
