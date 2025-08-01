import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import content from '@/content.md'
import styles from './Content.module.css'

export function Content() {
  return (
    <Markdown className={styles.content} remarkPlugins={[remarkGfm]}>
      {content}
    </Markdown>
  )
}
