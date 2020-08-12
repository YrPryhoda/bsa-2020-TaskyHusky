import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { UserProfile } from './UserProfile';
import { IssueType } from './IssueType';
import { Priority } from './Priority';
import { BoardColumn } from './BoardColumn';
import { Sprint } from './Sprint';
import { Projects } from './Projects';

@Entity()
export class Issue {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => IssueType, (issueType) => issueType.issues)
	type?: IssueType;

	@Column()
	@IsNotEmpty()
	@IsString()
	summary?: string;

	@ManyToOne((type) => BoardColumn, (boardColumn) => boardColumn.issues)
	boardColumn?: BoardColumn;

	@Column({ array: true })
	labels?: string;

	@Column({ array: true })
	@IsArray()
	attachments?: string;

	@Column({ array: true })
	@IsArray()
	links?: string;

	@ManyToOne((type) => Priority, (priority) => priority.issues)
	priority?: Priority;

	@Column()
	@IsString()
	description?: string;

	@ManyToOne((type) => Sprint, (sprint) => sprint.issues)
	sprint?: Sprint;

	@ManyToOne((type) => Projects, (projects) => projects.issues)
	project?: Projects;

	@Column()
	@IsNotEmpty()
	@IsString()
	issueKey?: string;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.assignedIssues)
	assignee?: UserProfile;

	@OneToOne((type) => UserProfile)
	@JoinColumn()
	creator?: UserProfile;
}
