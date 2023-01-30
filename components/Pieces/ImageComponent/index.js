import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  layout = 'fill',
  objectFit = 'cover',
  className,
  unoptimized,
}) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      className={classNames(styles.image, className, {
        [styles.loaded]: loaded,
      })}
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
      objectFit={objectFit}
      onLoadingComplete={() => setLoaded(true)}
      unoptimized={unoptimized}
    />
  )
}

export default ImageComponent

ImageComponent.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  layout: PropTypes.string,
  objectFit: PropTypes.string,
  className: PropTypes.string,
}
