import { RelationId, Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserProfile } from './UserProfile';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToMany(() => UserProfile, (user: UserProfile) => user.teams)
  @JoinTable()
  users?: UserProfile[];

  @ManyToOne(() => UserProfile, (user: UserProfile) => user.teamsOwner)
  createdBy?: UserProfile;

  @Column()
  name?: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  description?: string;

  @Column('text', { array: true })
  links?: string[];


}