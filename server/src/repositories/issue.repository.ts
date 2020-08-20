import { EntityRepository, Repository, FindOperator, Any, Raw } from 'typeorm';
import { Issue } from '../entity/Issue';
import { getConditions } from '../helpers/issue.helper';

const RELS = ['priority', 'type', 'creator', 'assigned', 'status'];
const SKIP = 0;
export type Filter = {
	issueType?: string[];
	priority?: string[];
	sprint?: string[];
	projects?: string[];
	issueStatus?: string[];
	assigned?: string[];
	creator?: string[];
	summary?: string;
	description?: string;
	comment?: string;
};

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
	findAll(skip = SKIP, take = 25) {
		return this.find({ relations: RELS, take, skip });
	}

	getFilteredIssues(filter: Filter | undefined, skip = SKIP, take = 25) {
		const where = filter ? getConditions(filter) : {};
		return this.findAndCount({ relations: RELS, where, take, skip });
	}

	findAllByColumnId(id: string) {
		return this.find({ relations: RELS, where: { boardColumn: { id } } });
	}

	findAllByProjectId(id: string) {
		return this.find({ relations: RELS, where: { project: { id } } });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	findOneByKey(key: string) {
		return this.findOneOrFail({ where: { issueKey: key }, relations: RELS });
	}

	createOne(data: Issue) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOneById(id: string, data: Issue) {
		return this.update(id, data);
	}

	updateOneByKey(key: string, data: Issue) {
		return this.update({ issueKey: key }, data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
