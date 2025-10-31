import React from "react";
import ReactFlow, {
  Background,
  Controls,
} from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

interface NeuralFlowDiagramProps {
  layers: number[]; // ví dụ [6, 50, 30, 2]
  activations?: string[]; // ví dụ ["relu", "relu", "softmax"]
  inputFeatures?: string[]; // ví dụ ["Length", "Width", ...]
  outputLabels?: string[];  // ví dụ ["Cammeo", "Osmancik"]
}

const NeuralFlowDiagram: React.FC<NeuralFlowDiagramProps> = ({
  layers,
  activations = [],
  inputFeatures = [],
  outputLabels = [],
}) => {
  const getLabel = (idx: number) => {
    if (idx === 0) return "Input";
    if (idx === layers.length - 1) return "Output";
    return `Hidden ${idx}`;
  };

  const nodes: Node[] = layers.map((count, idx) => {
    const label = getLabel(idx);
    const isInput = idx === 0;
    const isOutput = idx === layers.length - 1;
    const activation = activations[idx] || (label === "Output" ? "softmax" : "relu");

    // Build tooltip
    let tooltipText = `Layer: ${label}\nNeurons: ${count}`;
    if (!isInput && !isOutput) {
      tooltipText += `\nActivation: ${activation}`;
    }
    if (isInput && inputFeatures.length > 0) {
      tooltipText += `\nFeatures: ${inputFeatures.join(", ")}`;
    }
    if (isOutput && outputLabels.length > 0) {
      tooltipText += `\nClasses: ${outputLabels.join(", ")}`;
    }

    return {
      id: `layer-${idx}`,
      data: {
        label: (
          <div title={tooltipText}>
            {label} ({count})
          </div>
        ),
      },
      position: { x: idx * 220, y: 150 },
      style: {
        padding: 12,
        borderRadius: 12,
        background: "#0ea5e9",
        color: "white",
        fontWeight: "bold",
        width: 140,
        textAlign: "center",
      },
    };
  });

  const edges: Edge[] = layers.slice(0, -1).map((_, idx) => ({
    id: `edge-${idx}`,
    source: `layer-${idx}`,
    target: `layer-${idx + 1}`,
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa" },
  }));

  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h3 className="text-lg font-semibold mb-2">Thông tin mô hình</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable={true}
          zoomOnScroll={false}
          panOnDrag={true}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default NeuralFlowDiagram;
