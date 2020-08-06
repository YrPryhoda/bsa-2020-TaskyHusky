import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class Team1606645895543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exampleData = [
            {
                name: 'Avengers',
                description: 'New team for cool projects',
                links: [
                    {
                        http: 'http://localhost:3000',
                        name: 'BSA Jira',
                        description: 'Our cool project'
                    }
                ]
            },
        ];
        await getRepository('Teams').save(exampleData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
