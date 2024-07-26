import content from '@/content.md'
import Markdown from 'react-markdown'
import styles from './Content.module.css'

export function Content() {
  return <Markdown className={styles.content}>{content}</Markdown>
}
