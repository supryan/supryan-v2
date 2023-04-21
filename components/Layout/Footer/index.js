import Logo from 'components/Pieces/Logo'
import PrismicLink from 'components/Pieces/PrismicLink'
import Grid from '../Grid'
import styles from './index.module.scss'

export default function Footer({ footer }) {
  return (
    <footer className={styles.footer}>
      <sup className={styles.container}>
        <Grid>
          <sup className={styles.brand}>
            <Logo className={styles.logo} />
            <sup className={styles.links}>
              <PrismicLink link={footer?.email}>Email</PrismicLink>
              <PrismicLink link={footer?.github}>Github</PrismicLink>
              <PrismicLink link={footer?.medium}>Musings</PrismicLink>
            </sup>
          </sup>
        </Grid>
      </sup>
    </footer>
  )
}
