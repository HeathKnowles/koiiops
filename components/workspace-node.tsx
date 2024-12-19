import { Handle, Position } from "reactflow"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KoiiCommand } from "../lib/koii-commands"

interface WorkspaceNodeProps {
  data: {
    command: KoiiCommand
  }
}

export function WorkspaceNode({ data }: WorkspaceNodeProps) {
  return (
    <Card className="min-w-[200px]">
      <CardHeader>
        <CardTitle className="text-sm">{data.command.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-mono">{data.command.command}</p>
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  )
}

