import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { useCallback, useEffect, useRef, useContext } from 'react'
import { ScrollSpyContext } from 'lib/contexts/scroll-spy-context'

const Flag = ({ scrollRef }) => {
  const { activeItem } = useContext(ScrollSpyContext)
  const flagRef = useRef()

  const handleScroll = useCallback(() => {
    if (scrollRef?.current) {
      const newPos = window.pageYOffset
      const diff =
        newPos - (scrollRef.current?.scrollPosition ?? window.pageYOffset)
      const speed = diff * 0.15

      if (flagRef?.current) {
        flagRef.current.style.transform = `skewY(${speed}deg) translateY(5px)`
      }

      scrollRef.current.scrollPosition = newPos
    }
  }, [scrollRef])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: false })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <sup ref={flagRef} className={styles.flag}>
      {activeItem?.date
        ? new Date(activeItem.date).getFullYear()
        : new Date().getFullYear()}
    </sup>
  )
}

export default Flag

Flag.propTypes = { scrollRef: PropTypes.node }
