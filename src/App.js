import "./App.css";
import { Routes, Route } from "react-router-dom";
import WorkflowList from "./components/WorkflowList";
import WorkflowDesigner from "./components/WorkflowDesigner";
function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<WorkflowList />} />
        <Route path="workflow/:workflowId" element={<WorkflowDesigner />} />
      </Routes>
    </div>
  );
}

export default App;
