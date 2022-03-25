import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Item from '../Item'
import Grid from 'components/Layout/Grid'
import { useCallback, useEffect, useRef, useContext } from 'react'
import { ScrollSpyContext } from 'lib/contexts/scroll-spy-context'

const Projects = ({ items }) => {
  const { activeItem } = useContext(ScrollSpyContext)
  const ref = useRef()
  const flagRef = useRef()

  const handleScroll = useCallback(() => {
    if (ref?.current) {
      const newPos = window.pageYOffset
      const diff = newPos - (ref.current?.scrollPosition ?? window.pageYOffset)
      const speed = diff * 0.05

      if (flagRef?.current) {
        flagRef.current.style.transform = `skewY(${speed}deg) translateY(5px)`
      }

      ref.current.scrollPosition = newPos
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: false })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <sup ref={ref} className={styles.projectList}>
      <sup className={styles.container}>
        <Grid className={styles.grid}>
          <sup className={styles.marker}>
            <sup ref={flagRef} className={styles.flag}>
              {activeItem?.date
                ? new Date(activeItem.date).getFullYear()
                : new Date().getFullYear()}
            </sup>
          </sup>
          <sup className={styles.projects}>
            {items?.map((item, index) => (
              <Item key={`project-item-${index}`} {...item?.data} />
            ))}
          </sup>
        </Grid>
      </sup>
    </sup>
  )
}

export default Projects

Projects.propTypes = { items: PropTypes.array }
