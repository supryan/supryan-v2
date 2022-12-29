import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const Video = ({
  src,
  poster,
  controls = true,
  progress = false,
  className,
  ...props
}) => {
  const progressRef = useRef()
  const videoRef = useRef()
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [inViewRef, inView] = useInView()

  const handleVideoClick = () => {
    if (videoRef?.current && controls) {
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

  const handleProgress = useCallback(() => {
    if (videoRef?.current) {
      const video = videoRef.current
      const progress = progressRef?.current

      const currentTime = video.currentTime
      const duration = video.duration
      const percentage = currentTime / duration

      if (progress) {
        progress.value = percentage
      }
    }
  }, [])

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
    <sup
      ref={inViewRef}
      role="button"
      aria-label={`${!playing ? 'Play' : 'Pause'} video`}
      onClick={handleVideoClick}
      className={classNames(styles.video, className, {
        [styles.muted]: muted,
        [styles.paused]: !playing,
        [styles.noControls]: !controls,
      })}>
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        playsInline
        loop
        preload="auto"
        src={src}
        onTimeUpdate={handleProgress}
        {...props}
      />
      {progress && !muted && (
        <progress
          className={styles.progress}
          ref={progressRef}
          min={0}
          max={1}
          value={0}
        />
      )}
    </sup>
  )
}

export default Video

Video.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  controls: PropTypes.bool,
}
