import React, { useRef } from "react";
import { Handle } from "reactflow";
import { MdOutlineInput } from "react-icons/md";
import "./CustomNode.css";

const CustomNode = ({ data }) => {
  const node = useRef(null);

  return (
    <div className="flex" ref={node}>
      <div
        style={{
          backgroundColor: "white",
          height: "40px",
          width: "30px",
          border:
            data.label === "Input" ? "1px solid #b3c7e7" : "1px solid red",
          borderRadius: "6px 0 0 6px",
          borderRight: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        {data.input ? data.input : <MdOutlineInput />}
      </div>
      <div
        style={{
          backgroundColor: data.color,
          border:
            data.label === "Input" ? "1px solid #b3c7e7" : "1px solid red",
          padding: "10px",
          width: "220px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "20px",
        }}
      >
        {data.label}
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "40px",
          width: "30px",
          border:
            data.label === "Input" ? "1px solid #b3c7e7" : "1px solid red",
          borderRadius: " 0 6px  6px 0",
          borderLeft: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        {data.text}
      </div>
      {data.input ? (
        <Handle
          type="target"
          position="top"
          onConnect={() => {
            node.current.classList.add("connected");
            console.log("connected");
          }}
        />
      ) : null}
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
