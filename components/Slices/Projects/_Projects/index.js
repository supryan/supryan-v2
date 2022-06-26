import PropTypes from 'prop-types'
import styles from './index.module.scss'
import Item from '../Item'
import Grid from 'components/Layout/Grid'
import { useRef } from 'react'
import Flag from '../Flag'

const Projects = ({ items }) => {
  const ref = useRef()

  return (
    <sup ref={ref} className={styles.projectList}>
      <sup className={styles.container}>
        <Grid className={styles.grid}>
          <sup className={styles.marker}>
            <Flag scrollRef={ref} />
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
