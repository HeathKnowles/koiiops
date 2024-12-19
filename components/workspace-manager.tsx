"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import WorkflowBuilder from './workflow-builder'

export default function WorkspaceManager() {
  const [workspaces, setWorkspaces] = useState([{ id: 'default', name: 'Default Workspace' }])
  const [activeWorkspace, setActiveWorkspace] = useState('default')

  const addWorkspace = () => {
    const newId = `workspace-${Date.now()}`
    setWorkspaces([...workspaces, { id: newId, name: `Workspace ${workspaces.length + 1}` }])
    setActiveWorkspace(newId)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Koii Multi-Workspace Workflow Builder</h1>
        <Button onClick={addWorkspace} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Workspace
        </Button>
      </div>
      <div className="flex-1 flex">
        <div className="w-64 border-r p-4">
          <h2 className="text-lg font-semibold mb-4">Workspaces</h2>
          {workspaces.map((workspace) => (
            <Button
              key={workspace.id}
              variant={workspace.id === activeWorkspace ? "default" : "ghost"}
              className="w-full justify-start mb-2"
              onClick={() => setActiveWorkspace(workspace.id)}
            >
              {workspace.name}
            </Button>
          ))}
        </div>
        <div className="flex-1">
          <WorkflowBuilder key={activeWorkspace} workspaceId={activeWorkspace} />
        </div>
      </div>
    </div>
  )
}

