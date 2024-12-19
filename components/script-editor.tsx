import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface ScriptEditorProps {
  script: string
  setScript: (script: string) => void
}

export function ScriptEditor({ script, setScript }: ScriptEditorProps) {
  return (
    <Card className="w-96 overflow-auto border-l rounded-none">
      <CardHeader>
        <CardTitle>Bash Script</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="font-mono h-full min-h-[300px]"
          placeholder="Your generated bash script will appear here..."
        />
      </CardContent>
    </Card>
  )
}

