import { repoUrl } from '@/constants'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <span>
          Send ❤️ and memecoins to{' '}
          <a href="https://app.ens.domains/krema.eth">krema.eth</a>
        </span>

        <p className={styles.social}>
          <a
            className={styles.commitHash}
            href={`${repoUrl}/commit/${process.env.GIT_COMMIT_SHA}`}
          >
            {process.env.GIT_COMMIT_SHA?.substring(0, 7)}
          </a>
          <a href={repoUrl}>
            <GitHubLogoIcon />
          </a>
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p />
      </div>
    </footer>
  )
}
