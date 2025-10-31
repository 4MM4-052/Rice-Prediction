import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

interface DecisionTreeSklearnProps {
  treeText: string;
}

interface TreeNode {
  name: string;
  children: TreeNode[];
}

// Phân tích format `|---` của sklearn
function parseSklearnTree(treeText: string): TreeNode[] {
  const lines = treeText.trim().split("\n");
  const nodes: TreeNode[] = [];
  const stack: { level: number; node: TreeNode }[] = [];

  for (const line of lines) {
    const match = line.match(/^((\| {3})*)(\|--- )(.+)$/);
    if (!match) continue;

    const indent = (match[1]?.match(/\| {3}/g) || []).length;
    const name = match[4].trim();
    const level = indent;

    const newNode: TreeNode = { name, children: [] };

    // Nếu không có cha thì thêm trực tiếp
    if (stack.length === 0 || level === 0) {
      nodes.push(newNode);
      stack.length = 0;
      stack.push({ level, node: newNode });
    } else {
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].node;
      parent.children.push(newNode);
      stack.push({ level, node: newNode });
    }
  }

  // Nếu có nhiều root-level node → bọc lại
  if (nodes.length > 1) {
    return [
      {
        name: "Major_Axis_Length",
        children: nodes,
      },
    ];
  }

  return nodes;
}

// Tạo nodes & edges
function treeToFlowElements(
  tree: TreeNode[],
  level = 0,
  acc: { nodes: Node[]; edges: Edge[]; count: number; xPos: number } = {
    nodes: [],
    edges: [],
    count: 0,
    xPos: 0,
  },
  parentId: string | null = null
): { nodes: Node[]; edges: Edge[] } {
  for (const node of tree) {
    const id = `node-${acc.count++}`;

    let x = 0;
    const y = level * 160;

    // Nếu có children, tính vị trí trung bình của các con
    if (node.children.length > 0) {
      const childPositions: number[] = [];
      for (const child of node.children) {
        const tempAcc = {
          ...acc,
          nodes: [],
          edges: [],
          xPos: acc.xPos,
          count: acc.count,
        };
        const { nodes: childNodes } = treeToFlowElements(
          [child],
          level + 1,
          tempAcc,
          id
        );
        childPositions.push(childNodes[0].position.x);
        acc.nodes.push(...tempAcc.nodes);
        acc.edges.push(...tempAcc.edges);
        acc.count = tempAcc.count;
        acc.xPos = tempAcc.xPos;
      }
      x = childPositions.reduce((a, b) => a + b, 0) / childPositions.length;
    } else {
      x = acc.xPos * 200;
      acc.xPos += 1;
    }

    const displayName = node.name.startsWith("class:")
      ? node.name.includes("1")
        ? "Osmancik"
        : "Cammeo"
      : node.name;

    acc.nodes.push({
      id,
      data: { label: displayName },
      position: { x, y },
      style: {
        padding: 10,
        background: node.name.startsWith("class") ? "#16a34a" : "#3b82f6",
        color: "white",
        borderRadius: 10,
        fontWeight: "bold",
        minWidth: 160,
        textAlign: "center",
      },
    });

    if (parentId) {
      acc.edges.push({
        id: `edge-${parentId}-${id}`,
        source: parentId,
        target: id,
        type: "smoothstep",
        animated: false,
        style: { stroke: "#94a3b8" },
      });
    }
  }

  return { nodes: acc.nodes, edges: acc.edges };
}

const DecisionTreeSklearn: React.FC<DecisionTreeSklearnProps> = ({
  treeText,
}) => {
  const tree = parseSklearnTree(treeText);
  const { nodes, edges } = treeToFlowElements(tree);

  return (
    <div className="max-w-6xl mx-auto mt-5 p-6 space-y-6 bg-gray-200 dark:bg-[#0F1727] text-black dark:text-[#ececf1] transition-colors duration-300 dark:border dark:border-gray-600 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">
        Sơ đồ cây quyết định
      </h3>
      <p className="text-sm italic text-gray-800 dark:text-gray-400">
        Sơ đồ cây quyết định thể hiện cách mô hình phân loại mẫu dựa vào các đặc
        trưng đầu vào. Mỗi nhánh là một điều kiện kiểm tra, và nút lá là kết quả
        phân loại cuối cùng.
      </p>
      <div style={{ width: "100%", height: 500 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          panOnDrag
          nodesDraggable={false}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DecisionTreeSklearn;
