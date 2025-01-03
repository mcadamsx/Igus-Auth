import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserData {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({ unique: true })
   email: string;

   @Column()
   password: string;

   @Column({ default: false })
   isVerified: boolean;

   @Column({ default: "user" }) 
   role: string;

   @CreateDateColumn()
   createdAt: Date;
   @Column({ nullable: true })
   resetPasswordToken: string;

   @Column({ nullable: true, type: "timestamp" })
   resetPasswordExpires: Date | null;

}