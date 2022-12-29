import PropTypes from 'prop-types'
import styles from './index.module.scss'
import { motion } from 'framer-motion'
import Grid from '../Grid'
import { intro } from 'lib/animations'
import useScrollLock from 'use-scroll-lock'
import { useEffect, useState } from 'react'
import Loader from 'components/Pieces/Loader'
import ShadowText from 'components/Pieces/ShadowText'
import RichTextComponent from 'components/Slices/RichText'
import PrismicLink from 'components/Pieces/PrismicLink'
import prismicRichTextShape from 'shapes/prismic/richtext'
import CameraIcon from 'public/images/icon-camera.svg'
import DocumentIcon from 'public/images/icon-document.svg'
import ArrowIcon from 'public/images/icon-arrow.svg'
import classNames from 'classnames'
import config from 'constants/config'
import Line from 'public/images/line-horizontal.svg'

const Intro = ({ title, description, links }) => {
  const [scrollLock, setScrollLock] = useState(true)
  const [complete, setComplete] = useState(false)
  const [hideLayer, setHideLayer] = useState(false)

  useScrollLock(scrollLock)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      <Loader timeout={config.loaderTimeout} />
      <sup className={styles.intro}>
        {intro?.map(({ animation }, index) => (
          <motion.sup
            key={`intro-animation-${index}`}
            initial="hidden"
            animate="visible"
            variants={animation}
            transition={{
              duration: 1 + index * 0.3,
              delay: config.loaderTimeout + 0.5,
            }}
            className={classNames(styles.background, {
              [styles.hide]: index === 1 && hideLayer,
              [styles.dotted]: index === 0,
            })}
            onAnimationComplete={() => {
              if (index === 1) {
                setHideLayer(true)
              }
            }}>
            {index === 0 && <Line className={styles.line} />}
          </motion.sup>
        ))}
        <motion.sup
          initial={{ visibility: 'hidden' }}
          animate={{ visibility: 'visible' }}
          transition={{ delay: config.loaderTimeout + 1.25 }}
          onAnimationComplete={() => {
            setScrollLock(false)
            setComplete(true)
          }}
          className={styles.container}>
          <Grid className={styles.grid}>
            <sup className={styles.sup}>
              <ShadowText animate={complete} className={styles.supText}>
                SUP!
              </ShadowText>
            </sup>
            <sup className={styles.hero}>
              {title && (
                <h1 className={styles.heroTitle}>
                  {title}
                  <sup className={styles.cursor} />
                </h1>
              )}
              <sup className={styles.heroBody}>
                <RichTextComponent richtext={description} />
              </sup>
              <nav className={styles.nav}>
                {links?.map(({ link, link_text }, i) => {
                  return (
                    <sup key={i} className={styles.linkWrapper}>
                      {link_text === 'Video Reel' ? (
                        <CameraIcon />
                      ) : (
                        <DocumentIcon />
                      )}
                      <PrismicLink link={link} className={styles.link}>
                        {link_text}
                      </PrismicLink>
                      <ArrowIcon />
                    </sup>
                  )
                })}
              </nav>
            </sup>
          </Grid>
        </motion.sup>
      </sup>
    </>
  )
}

export default Intro

Intro.propTypes = {
  title: PropTypes.string,
  description: prismicRichTextShape,
  links: PropTypes.array,
}
