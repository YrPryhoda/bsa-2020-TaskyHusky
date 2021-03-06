import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import DefaultPageWrapper from 'containers/DefaultPageWrapper';
import ProjectSettings from 'containers/ProjectSettings';
import ProjectDetails from 'containers/ProjectDetails';
import { SETTINGS_SECTION } from 'components/ProjectSidebar/config/sidebarItems';
import ProjectPeople from 'containers/ProjectPeople';
import ProjectLabels from 'containers/ProjectLabels';

const ProjectSettingsPage: React.FC = () => {
	const { section } = useParams();
	let renderComponent;

	switch (section) {
		case SETTINGS_SECTION.details:
			renderComponent = <ProjectDetails />;
			break;
		case SETTINGS_SECTION.people:
			renderComponent = <ProjectPeople />;
			break;
		case SETTINGS_SECTION.labels:
			renderComponent = <ProjectLabels />;
			break;
		default:
			renderComponent = <Redirect to={'/404'} />;
	}

	return (
		<DefaultPageWrapper isOverflowHidden>
			<ProjectSettings>{renderComponent}</ProjectSettings>
		</DefaultPageWrapper>
	);
};

export default ProjectSettingsPage;
