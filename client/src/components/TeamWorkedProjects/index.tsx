import React, { JSXElementConstructor, ReactComponentElement } from 'react';
import { Header, Image } from 'semantic-ui-react';
import worksImg from 'assets/images/team-page-works.svg';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = {
	projects?: WebApi.Entities.Projects[];
};

const TeamWorkedProjects = ({ projects }: Props) => {
	const { t } = useTranslation();

	return (
		<>
			<Header as="h3">{t('worked_on')}</Header>
			<div className={styles.worked_block_wrapper}>
				<div className={styles.flex_row}>
					{projects?.length ? (
						projects.map((project): JSX.Element | null => (
							<Link
								target="_blank"
								className={styles.team_project}
								key={project.id}
								to={`/project/${project.id}/issues`}
							>
								<Header as="h5" className={styles.project_title}>
									{project.name}
								</Header>
								<p>
									Project key:
									<span className={styles.team_key}> {project.key}</span>
								</p>
								<p>
									Project category:
									<span className={styles.team_category}>{project.category}</span>
								</p>
							</Link>
						))
					) : (
						<>
							<Image src={worksImg} size="small" />
							<div className={styles.worked_block}>
								<Header as="h4">{t('no_works')}</Header>
								<p className={styles.p_descr}>
									There are no projects which have been started yet. When it&apos;ll happen you can
									get quick access to one you need
								</p>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default TeamWorkedProjects;
