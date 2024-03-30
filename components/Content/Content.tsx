import Markdown from 'react-markdown'
import styles from './Content.module.css'
import content from '@/content.md'

export function Content() {
  return <Markdown className={styles.content}>{content}</Markdown>
}
