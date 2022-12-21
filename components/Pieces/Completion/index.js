import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { motion } from 'framer-motion'

const Completion = ({ active, status, className, ...props }) => {
  return (
    <motion.sup
      role="button"
      className={classNames(styles.complete, className, {
        [styles.active]: active,
      })}
      {...props}>
      <motion.sup className={styles.box}>
        <sup className={classNames(styles.cube, styles.cube1)} />
        <sup className={classNames(styles.cube, styles.cube2)} />
        <sup className={classNames(styles.cube, styles.cube4)} />
        <sup className={classNames(styles.cube, styles.cube3)} />
      </motion.sup>
      <motion.svg
        className={styles.checkmark}
        fill="none"
        width="13px"
        height="13px"
        viewBox="0 0 512 512">
        {status ? (
          <motion.path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={36}
            strokeDasharray={512}
            strokeDashoffset={-512}
            initial={{ strokeDashoffset: -512 }}
            animate={{ strokeDashoffset: active ? 0 : -512 }}
            transition={{
              duration: 0.3,
              delay: 2,
              ease: [0.455, 0.03, 0.515, 0.955],
            }}
            d="M416 128L192 384l-96-96"
          />
        ) : (
          <g className={styles.cross} transform="scale(0.7) translate(100 100)">
            <line x2="512" y2="512" stroke="currentColor" strokeWidth={36} />
            <line x1="512" y2="512" stroke="currentColor" strokeWidth={36} />
          </g>
        )}
      </motion.svg>
    </motion.sup>
  )
}

export default Completion

Completion.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  status: PropTypes.bool,
}
