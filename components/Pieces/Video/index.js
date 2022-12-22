import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Video = ({ src, poster, className, ...props }) => {
  const videoRef = useRef()
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [inViewRef, inView] = useInView()

  const handleVideoClick = () => {
    if (videoRef?.current) {
      if (muted) {
        setMuted(false)
        videoRef.current.currentTime = 0
      } else {
        if (videoRef.current.paused) {
          videoRef.current.play()
        } else {
          videoRef.current.pause()
        }

        setPlaying(!playing)
      }
    }
  }

  // Intersection observer controls
  useEffect(() => {
    if (videoRef?.current) {
      if (!inView) {
        videoRef.current.pause()
      } else if (playing) {
        videoRef.current.play()
      }
    }
  }, [inView, playing])

  return (
    <div
      ref={inViewRef}
      role="button"
      aria-label="Play video from the beginning"
      onClick={handleVideoClick}
      className={classNames(styles.video, className, {
        [styles.muted]: muted,
        [styles.paused]: !playing,
      })}>
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        playsInline
        loop
        src={src}
        {...props}
      />
    </div>
  )
}

export default Video

Video.propTypes = { src: PropTypes.string, className: PropTypes.string }
