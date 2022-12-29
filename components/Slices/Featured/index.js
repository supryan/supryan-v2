import styles from './index.module.scss'
import { motion } from 'framer-motion'
import { featured } from 'lib/animations'
import Video from 'components/Pieces/Video'
import prismicVideoShape from 'shapes/prismic/video'
import PrismicLink from 'components/Pieces/PrismicLink'
import ArrowIcon from 'public/images/icon-arrow.svg'
import prismicLinkShape from 'shapes/prismic/link'

const Featured = ({ video, cta }) => {
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
          <sup className={styles.header}>
            <sup>The Latest</sup>
            <sup>
              <PrismicLink className={styles.cta} link={cta}>
                Mo&apos; Video <ArrowIcon />
              </PrismicLink>
            </sup>
          </sup>
          <Video progress src={video?.url} />
        </motion.sup>
      </sup>
    </sup>
  )
}

export default Featured

Featured.propTypes = { video: prismicVideoShape, cta: prismicLinkShape }
