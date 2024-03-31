import { GitHubLogoIcon } from '@radix-ui/react-icons'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        Send ❤️ and memecoins to <a href="">krema.eth</a>
      </span>

      <div className={styles.social}>
        <a href="https://github.com/kremalicious/asi-calculator">
          <GitHubLogoIcon />
        </a>
      </div>
    </footer>
  )
}
