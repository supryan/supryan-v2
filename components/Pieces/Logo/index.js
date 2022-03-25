import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import ShadowText from '../ShadowText'

const Logo = ({ animate, ...props }) => {
  return (
    <sup className={styles.logo} {...props}>
      <ShadowText animate={animate} loop={animate}>
        RG
      </ShadowText>
    </sup>
  )
}

export default Logo

Logo.propTypes = { animate: PropTypes.bool }
