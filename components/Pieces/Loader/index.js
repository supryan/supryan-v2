import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import ShadowText from '../ShadowText'
import Logo from '../Logo'

const Loader = ({ loading, timeout = 0, overlay = true }) => {
  const [active, setActive] = useState(loading ?? true)
  const loaderRef = useRef()

  useEffect(() => {
    if (!loading && loaderRef?.current) {
      if (loaderRef.current?.timeout) {
        clearTimeout(loaderRef.current.timeout)
      }

      loaderRef.current.timeout = setTimeout(() => {
        setActive(!active)
      }, timeout)
    } else {
      setActive(loading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, timeout])

  return (
    <sup
      ref={loaderRef}
      className={classNames(styles.loader, { [styles.active]: active })}>
      {overlay && <sup className={styles.overlay} />}
      <sup className={styles.loaderContainer}>
        <Logo animate={true} />
      </sup>
    </sup>
  )
}

export default Loader

Loader.propTypes = { overlay: PropTypes.bool }
