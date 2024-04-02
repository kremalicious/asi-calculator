import { GitHubLogoIcon } from '@radix-ui/react-icons'
import styles from './Footer.module.css'
import { repoUrl } from '@/constants'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <span>
          Send ❤️ and memecoins to{' '}
          <a href="https://app.ens.domains/krema.eth">krema.eth</a>
        </span>

        <p className={styles.social}>
          <a href={repoUrl}>
            <GitHubLogoIcon />
          </a>
        </p>
      </div>
      {/* <div>
        <p>
          <a href={`${repoUrl}/commit/${process.env.VERCEL_GIT_COMMIT_SHA}`}>
            {process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7)}
          </a>
        </p>
      </div> */}
    </footer>
  )
}
