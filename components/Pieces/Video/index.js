import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { Player } from 'react-player'
import Image from 'next/image'

const Video = ({ src, poster, className, ...props }) => {
  return (
    <div className={classNames(styles.video, className)}>
      <video autoPlay src={src} {...props} />
    </div>
  )
}

export default Video

Video.propTypes = { src: PropTypes.string, className: PropTypes.string }
