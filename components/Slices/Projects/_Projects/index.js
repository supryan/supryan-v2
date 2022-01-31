import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import Item from '../Item'

const Projects = ({ items }) => {
  console.log(items)

  return (
    <sup className={styles.projectList}>
      <sup className={styles.container}>
        {items?.map((item, index) => (
          <Item key={`project-item-${index}`} {...item?.data} />
        ))}
      </sup>
    </sup>
  )
}

export default Projects

Projects.propTypes = { items: PropTypes.array }
