/**
 * Rich Text Editor
 * 
 * Tiptap редактор для создания и редактирования контента
 */

'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  BoldIcon, 
  ItalicIcon, 
  StrikethroughIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  UndoIcon,
  RedoIcon,
  LinkIcon,
  ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: placeholder || 'Начните писать...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt('Введите URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt('Введите URL изображения:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-slate-200 bg-slate-50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-slate-200 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            icon={<BoldIcon className="w-4 h-4" />}
            title="Жирный"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            icon={<ItalicIcon className="w-4 h-4" />}
            title="Курсив"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            icon={<StrikethroughIcon className="w-4 h-4" />}
            title="Зачёркнутый"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            icon={<CodeIcon className="w-4 h-4" />}
            title="Код"
          />
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-slate-200 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            icon={<Heading1Icon className="w-4 h-4" />}
            title="Заголовок 1"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            icon={<Heading2Icon className="w-4 h-4" />}
            title="Заголовок 2"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            icon={<Heading3Icon className="w-4 h-4" />}
            title="Заголовок 3"
          />
        </div>

        {/* Lists & Quotes */}
        <div className="flex gap-1 border-r border-slate-200 pr-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            icon={<ListIcon className="w-4 h-4" />}
            title="Маркированный список"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            icon={<ListOrderedIcon className="w-4 h-4" />}
            title="Нумерованный список"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            icon={<QuoteIcon className="w-4 h-4" />}
            title="Цитата"
          />
        </div>

        {/* Links & Images */}
        <div className="flex gap-1 border-r border-slate-200 pr-2">
          <ToolbarButton
            onClick={addLink}
            active={editor.isActive('link')}
            icon={<LinkIcon className="w-4 h-4" />}
            title="Ссылка"
          />
          <ToolbarButton
            onClick={addImage}
            icon={<ImageIcon className="w-4 h-4" />}
            title="Изображение"
          />
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={<UndoIcon className="w-4 h-4" />}
            title="Отменить"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={<RedoIcon className="w-4 h-4" />}
            title="Повторить"
          />
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}

interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  icon: React.ReactNode
  title: string
}

function ToolbarButton({ onClick, active, disabled, icon, title }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-slate-200 transition-colors ${
        active ? 'bg-slate-200 text-black' : 'text-slate-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon}
    </button>
  )
}

