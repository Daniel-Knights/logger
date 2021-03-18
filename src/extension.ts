import { commands, Range, Position } from 'vscode'

export function activate(): void {
  commands.registerTextEditorCommand('logger.log', (textEditor) => {
    textEditor.edit((editBuilder) => {
      const { selection, document } = textEditor

      if (selection.isEmpty) return

      const value = document.getText(new Range(selection.start, selection.end))

      editBuilder.insert(
        new Position(selection.anchor.line + 1, 0),
        `console.log(${value})\n`,
      )
    })
  })
}
