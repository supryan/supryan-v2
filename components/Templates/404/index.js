import PropTypes from 'prop-types'
import styles from './index.module.scss'
import ShadowText from 'components/Pieces/ShadowText'
import { motion } from 'framer-motion'
import PrismicLink from 'components/Pieces/PrismicLink'

const FourOhFour = () => {
  return (
    <motion.sup
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.fourOhFour}>
      <sup className={styles.errorContainer}>
        <sup className={styles.errorText}>My bad, that&apos;s a</sup>
        <ShadowText animate delay={1}>
          404
        </ShadowText>
        <sup className={styles.errorText}>
          Please{' '}
          <PrismicLink link={{ url: '/', link_type: 'Web', target: '_self' }}>
            go back
          </PrismicLink>{' '}
          or try again.
        </sup>
      </sup>
    </motion.sup>
  )
}

export default FourOhFour

FourOhFour.propTypes = { prop: PropTypes.string }
