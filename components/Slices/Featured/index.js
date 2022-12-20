import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { featured } from 'lib/animations'

const Featured = ({ prop }) => {
  return (
    <sup className={styles.featured}>
      <sup className={styles.container}>
        <motion.sup
          initial="hidden"
          animate="visible"
          variants={featured}
          transition={{
            delay: 1.7,
            duration: 0.6,
            ease: [0.455, 0.03, 0.515, 0.955],
          }}
          className={styles.wrapper}>
          <sup className={styles.header}>The Latest</sup>
          <video
            src="https://supryan.cdn.prismic.io/supryan%2F0b14276a-eb2f-4432-bda1-9443962f25d0_ryan%27s+reel+%282015%29+%281%29.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.sup>
      </sup>
    </sup>
  )
}

export default Featured

Featured.propTypes = { prop: PropTypes.string }
