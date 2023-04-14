import SyntaxHighlighter from 'react-syntax-highlighter'
import {rainbow} from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const CopyButton = ({target}: {target: any}) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target)
        alert('copid')
      } catch (error) {
        alert(`copy failed ${error}`)
      }
    }
  }

  return (
    <button
      onClick={handleCopy}
      className='absolute right-0.5 top-0.5 rounded-sm px-2 bg-white dark:text-gray-800'>
      Copy
    </button>
  )
}

export default function CodeBlock({children}: {children: any}) {
  return (
    <div className='relative'>
      <CopyButton target={children} />
      <SyntaxHighlighter showLineNumbers style={rainbow}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}