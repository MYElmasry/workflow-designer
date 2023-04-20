# Classforma Workflow Designer
The Workflow Designer is a web application built with React that allows users to create and edit workflows using a drag-and-drop interface. The application loads workflow data from an external API and supports a variety of modules that can be added to the canvas.

## Live Demo
https://myelmasry.github.io/workflow-designer/

## Code Requirements
The project is built with React and uses the React Flow library for rendering the workflow canvas. It also makes use of an external API for loading workflow and module data.

## Functionalities
### Workflow list page
The Workflow list page allows users to load a list of workflows from the external API. The list is loaded from the following endpoint: https://64307b10d4518cfb0e50e555.mockapi.io/workflow.

### Workflow designer page
The Workflow designer page is where users can edit workflows using the drag-and-drop interface. Users can access this page by clicking on a workflow from the list page. The workflow is loaded from the following endpoint: https://64307b10d4518cfb0e50e555.mockapi.io/workflow/<workflow_id>, where <workflow_id> is the ID of the workflow to load.

When the workflow is loaded, an 'Input' node is created in the canvas with the correct input type for the workflow. Users can drag and drop modules onto the canvas and connect them to other nodes using input and output edges. Nodes can be deleted by pressing the delete or backspace keys.

Module data is loaded from the following endpoint: https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5. Only 5 modules are loaded per page, and there are a total of 99 modules available. Each module has an input type, output type, and name.

### Module states
Nodes on the canvas can be in either a valid or invalid state, depending on whether they have input edges. Nodes with no input edges are considered invalid and are marked with a red border color. Nodes with input edges are considered valid and are marked with a blue border color. The 'Input' node is always considered valid.

## Installation
To install and run the project locally, follow these steps:

<ol>
<li>Clone the repository to your local machine.</li>
<li>Install the project dependencies using npm install.</li>
<li>Run the development server using npm start.</li>
<li>Access the application at http://localhost:3000.</li>
</ol>

## How to Contribute
If you would like to contribute to the project, please submit a pull request with your changes. Make sure to follow the existing coding conventions and include any necessary tests with your changes.
