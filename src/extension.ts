import { commands, Range, Position } from 'vscode'

export function activate(): void {
  commands.registerTextEditorCommand('logger.log', (textEditor) => {
    textEditor.edit((editBuilder) => {
      const { selection, document } = textEditor

      if (selection.isEmpty) return

      const { start, end } = selection
      const value = document.getText(new Range(start, end))
      const line = document.lineAt(start.line)
      const whitespace = line.text.match(/\s*/)

      editBuilder.insert(
        new Position(start.line + end.line - start.line + 1, 0),
        `${whitespace && whitespace[0]}console.log(${value})\n`,
      )
    })
  })
}
