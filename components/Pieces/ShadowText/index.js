import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { motion, useAnimation } from 'framer-motion'
import React, { useEffect, useMemo } from 'react'
import { Textfit } from 'react-textfit'
import { shadowText } from 'lib/animations'

const ShadowText = ({
  children,
  loop = false,
  animate = true,
  className,
  ...props
}) => {
  const text = [...children]
  const controls = useAnimation()

  useEffect(() => {
    if (animate) {
      controls.start('visible')
    }
  }, [animate, controls])

  return (
    <Textfit
      mode="single"
      max={300}
      className={classNames(styles.text, className)}>
      {text?.map((character, index) => (
        <motion.sup
          key={`shadow-character-${index}`}
          initial="hidden"
          animate={controls}
          variants={shadowText}
          transition={{
            duration: text?.length * 0.25,
            delay: index * 0.2,
            repeat: loop ? Infinity : false,
            repeatType: loop ? 'reverse' : undefined,
            ease: 'backOut',
          }}
          className={styles.character}
          {...props}>
          {character}
        </motion.sup>
      ))}
    </Textfit>
  )
}

export default ShadowText

ShadowText.propTypes = { children: PropTypes.string, className: PropTypes.any }
