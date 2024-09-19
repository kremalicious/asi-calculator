import content from '@/content.md'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './Content.module.css'

export function Content() {
  return (
    <Markdown className={styles.content} remarkPlugins={[remarkGfm]}>
      {content}
    </Markdown>
  )
}
