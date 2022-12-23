import styles from './index.module.scss'
import { motion } from 'framer-motion'
import { featured } from 'lib/animations'
import Video from 'components/Pieces/Video'
import prismicVideoShape from 'shapes/prismic/video'

const Featured = ({ video }) => {
  return (
    <sup className={styles.featured}>
      <sup className={styles.container}>
        <motion.sup
          initial="hidden"
          animate="visible"
          variants={featured}
          transition={{
            delay: 1.7,
            duration: 0.6,
            ease: [0.455, 0.03, 0.515, 0.955],
          }}
          className={styles.wrapper}>
          <sup className={styles.header}>The Latest</sup>
          <Video src={video?.url} />
        </motion.sup>
      </sup>
    </sup>
  )
}

export default Featured

Featured.propTypes = { video: prismicVideoShape }
