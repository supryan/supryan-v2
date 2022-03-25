import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import RichTextComponent from 'components/Slices/RichText'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import Grid from 'components/Layout/Grid'

const Item = ({ title, description, categories, ...props }) => {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    rootMargin: '-50% 0px',
    threshold: 0,
  })

  const variants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  }

  const variantItem = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <sup
      ref={ref}
      className={classNames(styles.item, { [styles.active]: inView })}
      onMouseOver={() => controls.start('animate')}
      onMouseOut={() => controls.start('initial')}>
      <sup className={styles.overlay} />
      <sup className={styles.title}>
        <RichTextComponent richtext={title} />
      </sup>
      <sup className={styles.description}>
        <RichTextComponent richtext={description} />
      </sup>
    </sup>
  )
}

export default Item

Item.propTypes = { prop: PropTypes.string }
