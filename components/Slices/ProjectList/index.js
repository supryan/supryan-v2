import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { motion } from 'framer-motion'

const ProjectList = ({ prop }) => {
  return (
    <sup className={styles.projectList}>
      <sup className={styles.container}>Project 1</sup>
    </sup>
  )
}

export default ProjectList

ProjectList.propTypes = { prop: PropTypes.string }
