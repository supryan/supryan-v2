import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Item from '../Item'
import Grid from 'components/Layout/Grid'
import { useCallback, useEffect, useRef, useState } from 'react'
import Flag from '../Flag'
import ShadowText from 'components/Pieces/ShadowText'
import MarkerLine from 'public/images/line.svg'
import classNames from 'classnames'

const Projects = ({ items }) => {
  const ref = useRef()
  const listRef = useRef()
  const [showBranding, setShowBranding] = useState(false)

  const getScrollPercentage = useCallback(() => {
    const scrollPercentage =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    const visibleRange = scrollPercentage >= 20 && scrollPercentage <= 90

    setShowBranding(visibleRange)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', getScrollPercentage, { passive: false })

    return () => {
      window.removeEventListener('scroll', getScrollPercentage)
    }
  }, [getScrollPercentage])

  return (
    <sup id="projects" ref={ref} className={styles.projectList}>
      <sup
        role="button"
        aria-label="Scroll back top top"
        className={classNames(styles.branding, {
          [styles.active]: showBranding,
        })}
        onClick={() => window.scrollTo(0, 0)}>
        <ShadowText startColor="#ffffff" animate={showBranding} reverse>
          RG
        </ShadowText>
      </sup>
      <sup ref={listRef} className={styles.container}>
        <Grid className={styles.grid}>
          <sup className={styles.marker}>
            <Flag scrollRef={ref} />
            <MarkerLine />
          </sup>
          <sup className={styles.projects}>
            {items?.map((item, index) => (
              <Item
                key={`project-item-${index}`}
                tags={item?.tags}
                {...item?.data}
              />
            ))}
          </sup>
        </Grid>
      </sup>
    </sup>
  )
}

export default Projects

Projects.propTypes = { items: PropTypes.array }
