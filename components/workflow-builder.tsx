"use client"

import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow"
import "reactflow/dist/style.css"
import { CommandPalette } from "./command-pallete"
import { WorkspaceNode } from "./workspace-node"
import { ScriptEditor } from "./script-editor"
import { koiiCommands } from "../lib/koii-commands"
import { Button } from "@/components/ui/button"
import { Download, Play } from 'lucide-react'

const nodeTypes = {
  koiiCommand: WorkspaceNode,
}

interface WorkflowBuilderProps {
  workspaceId: string
}

function WorkflowBuilderContent({ workspaceId }: WorkflowBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [script, setScript] = useState("")
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { project } = useReactFlow()

  interface NodeData {
    command: {
      label: string
      command: string
    }
  }

  const onConnect = useCallback((params: Edge<NodeData> | Connection) => setEdges((eds: Edge<NodeData>[]) => addEdge(params, eds)), [setEdges])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      if (!reactFlowWrapper.current) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")
      const command = koiiCommands.find((cmd) => cmd.command === type)

      if (typeof type === "undefined" || !type || !command) {
        return
      }

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "koiiCommand",
        position,
        data: { command },
      }

      setNodes((nds: any[]) => nds.concat(newNode))
    },
    [project, setNodes]
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const generateScript = useCallback(() => {
    let generatedScript = "#!/bin/bash\n\n"
    const sortedNodes = [...nodes].sort((a, b) => a.position.y - b.position.y)
    
    sortedNodes.forEach((node) => {
      generatedScript += `# ${node.data.command.label}\n${node.data.command.command}\n\n`
    })

    setScript(generatedScript)
  }, [nodes])

  const downloadScript = useCallback(() => {
    const element = document.createElement("a")
    const file = new Blob([script], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `koii-workflow-${workspaceId}.sh`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }, [script, workspaceId])

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center bg-background">
        <h2 className="text-xl font-bold">Workspace: {workspaceId}</h2>
        <div className="flex gap-2">
          <Button onClick={generateScript} className="gap-2">
            <Play className="w-4 h-4" />
            Generate Script
          </Button>
          <Button onClick={downloadScript} className="gap-2" disabled={!script}>
            <Download className="w-4 h-4" />
            Download Script
          </Button>
        </div>
      </div>
      <div className="flex-1 flex">
        <CommandPalette />
        <div ref={reactFlowWrapper} className="flex-1">
          <ReactFlow
            colormode="system"
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <ScriptEditor script={script} setScript={setScript} />
      </div>
    </div>
  )
}

export default function WorkflowBuilder(props: WorkflowBuilderProps) {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderContent {...props} />
    </ReactFlowProvider>
  )
}

