import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { koiiCommands, CommandCategory } from "../lib/koii-commands"

export function CommandPalette() {
  const [search, setSearch] = useState("")

  const filteredCommands = koiiCommands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  const categories = Object.values(CommandCategory)

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, command: string) => {
    event.dataTransfer.setData("application/reactflow", command)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <Card className="w-64 overflow-auto border-r rounded-none">
      <CardHeader>
        <CardTitle>Command Palette</CardTitle>
        <Input
          type="search"
          placeholder="Search commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {categories.map((category) => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                {filteredCommands
                  .filter((cmd) => cmd.category === category)
                  .map((cmd) => (
                    <div
                      key={cmd.command}
                      className="p-2 my-1 bg-secondary rounded cursor-move"
                      draggable
                      onDragStart={(event) => onDragStart(event, cmd.command)}
                    >
                      {cmd.label}
                    </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

