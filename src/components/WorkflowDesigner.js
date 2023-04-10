import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import Pagination from "@mui/material/Pagination";
import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import "./WorkflowDessigner.css";

const nodeTypes = {
  custom: CustomNode,
};
const initialEdges = [];
function WorkflowDesigner() {
  const [workflow, setWorkflow] = useState({});
  const [currentDragElement, setCurrentDragElement] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);
  const [modules, setModules] = useState([]);
  const [workflowsModules, setWorkflowsModules] = useState([]);
  const [page, setPage] = useState(1);

  const url = "https://64307b10d4518cfb0e50e555.mockapi.io/workflow";
  const modulesUrl = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=${
    page === 20 ? 4 : 5
  }`;
  const params = useParams();
  const canvas = useRef(null);
  const module = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${url}/${params.workflowId}`);
      const data = await response.json();
      setWorkflow(data);

      const width = canvas.current.offsetWidth;
      const nodeWidth = 150;
      const initialElements = [
        {
          id: "1",
          type: "custom",
          data: {
            label: `Input`,
            color: "#f2f7fb",
            text: data.input_type,
          },
          position: {
            x: width / 2 - nodeWidth / 2,
            y: 50,
          },
        },
      ];

      setNodes(initialElements);
    }

    fetchData();
  }, [params.workflowId]);

  useEffect(() => {
    async function fetchModules() {
      const response = await fetch(modulesUrl);
      const data = await response.json();
      setWorkflowsModules(data);
      const moduleNodes = workflowsModules.map((module, index) => ({
        id: `module-${index}`,
        type: "custom",
        data: {
          label: module.name,
          input: module.input_type,
          output: module.output_type,
          color: "#f2f7fb",
          text: module.output_type,
        },
      }));
      setModules(moduleNodes);
    }

    fetchModules();
  }, [workflowsModules, modulesUrl]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <nav>
        <div className="container mx-auto">
          <h3 className="m-0 py-2">Workflow name: {workflow.name}</h3>
        </div>
      </nav>
      <div className="flex">
        <div className="modules w-1/4 flex flex-col">
          <p className="p-3 m-0 flex-0">modules</p>
          <div className="modules-list flex-1">
            {modules.map((node) => (
              <div
                ref={module}
                draggable="true"
                className="module flex justify-center my-4 cursor-move select-none"
                key={node.id}
                onDragStart={() => {
                  setCurrentDragElement(node);
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    height: "40px",
                    width: "30px",
                    border: "1px solid #b3c7e7",
                    borderRadius: "6px 0 0 6px",
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  {node.data.input}
                </div>
                <div
                  style={{
                    backgroundColor: "#f2f7fb",
                    border: "1px solid #b3c7e7",
                    padding: "10px",
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "20px",
                  }}
                >
                  {node.data.label}
                </div>
                <div
                  style={{
                    backgroundColor: "white",
                    height: "40px",
                    width: "30px",
                    border: "1px solid #b3c7e7",
                    borderRadius: " 0 6px  6px 0",
                    borderLeft: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                >
                  {node.data.output}
                </div>
              </div>
            ))}
          </div>
          <div className="pagination flex-0 py-3 flex justify-center   ">
            <Pagination
              size="small"
              count={20}
              page={page}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          ref={canvas}
          className="canvas w-3/4"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();

            const position = { x: e.clientX - 445, y: e.clientY - 70 };
            const newNode = { ...currentDragElement, position };
            setNodes([...nodes, newNode]);
          }}
        >
          <div style={{ height: "100%", width: "100%" }}>
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkflowDesigner;
