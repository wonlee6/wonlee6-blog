import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {a11yDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export default function MarkdownView({
  contentHtml
}: {
  contentHtml: string
}): JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return inline ? (
            // 강조
            <code
              style={{
                background: 'var(--highlight-color)',
                padding: '2px'
              }}
              {...props}>
              {children}
            </code>
          ) : match ? (
            // 코드
            // 언어가 선택됨
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={a11yDark as any}
              language={match[1]}
              PreTag='div'
              {...props}
            />
          ) : (
            // 언어가 선택되지 않음
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={a11yDark as any}
              language='textile'
              PreTag='div'
              {...props}
            />
          )
        },
        // 인용문 (>)
        blockquote({children, ...props}) {
          return (
            <blockquote
              style={{
                background: '#f0f0f0',
                padding: '1px 15px',
                borderRadius: '10px'
              }}
              {...props}>
              {children}
            </blockquote>
          )
        },
        em({children, ...props}) {
          return (
            <span style={{fontStyle: 'italic'}} {...props}>
              {children}
            </span>
          )
        }
      }}>
      {contentHtml
        .replace(/\n\s\n\s/gi, '\n\n&nbsp;\n\n')
        .replace(/\*\*/gi, '@$_%!^')
        .replace(/@\$_%!\^/gi, '**')
        .replace(/<\/?u>/gi, '*')}
    </ReactMarkdown>
  )
}
