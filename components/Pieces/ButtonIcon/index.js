import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useClickOutside } from 'lib/hooks'

const ButtonIcon = ({
  active,
  type = 'checkmark',
  delay,
  rotation = 90,
  className,
  tooltip,
  onClick,
  ...props
}) => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useClickOutside(ref, () => {
    setShowTooltip(false)
  })

  useEffect(() => {
    setTimeout(() => {
      setVisible(active)
    }, delay ?? 0)
  }, [delay, active])

  useEffect(() => {
    if (!visible) {
      setShowTooltip(false)
    }
  }, [visible])

  const renderSvgType = useMemo(() => {
    switch (type) {
      case 'checkmark':
        return (
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={512}
            strokeDashoffset={-512}
            initial={{ strokeDashoffset: -512 }}
            animate={{ strokeDashoffset: visible ? 0 : -512 }}
            transition={{
              duration: 0.3,
              delay: 2,
              ease: [0.455, 0.03, 0.515, 0.955],
            }}
            d="M416 128L192 384l-96-96"
          />
        )
      case 'cross':
        return (
          <g className={styles.cross} transform="scale(0.7) translate(100 100)">
            <line x2="512" y2="512" />
            <line x1="512" y2="512" />
          </g>
        )
      case 'lines':
        return (
          <g className={styles.lines} transform="scale(0.7) translate(100 100)">
            {Array.from({ length: 3 }, (_, i) => {
              const size = 512
              const yValue = i === 0 ? 0 : i === 1 ? size / 2 : size

              return (
                <motion.line
                  key={`key-line-${i}`}
                  x1={0}
                  x2={size}
                  y1={yValue}
                  y2={yValue}
                  strokeDasharray={512}
                  strokeDashoffset={512}
                  initial={{ strokeDashoffset: 512 }}
                  animate={{ strokeDashoffset: visible ? 0 : 512 }}
                  transition={{
                    duration: 0.3,
                    delay: 2 + i * 0.25,
                    ease: 'easeInOut',
                  }}
                />
              )
            })}
          </g>
        )
      default:
        break
    }
  }, [visible, type])

  const handleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (tooltip && tooltip !== '') {
      setShowTooltip(!showTooltip)
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    visible && (
      <motion.sup
        ref={ref}
        role="button"
        className={classNames(styles.buttonIcon, className, {
          [styles.active]: visible,
        })}
        onClick={handleClick}
        {...props}>
        <motion.sup
          className={styles.box}
          style={{ transform: `rotate(${rotation}deg)` }}>
          <sup className={classNames(styles.cube, styles.cube1)} />
          <sup className={classNames(styles.cube, styles.cube2)} />
          <sup className={classNames(styles.cube, styles.cube4)} />
          <sup className={classNames(styles.cube, styles.cube3)} />
        </motion.sup>
        <motion.svg
          className={styles.checkmark}
          fill="none"
          width="13px"
          height="13px"
          strokeWidth={36}
          stroke="currentColor"
          viewBox="0 0 512 512">
          {renderSvgType}
        </motion.svg>
        {tooltip && tooltip !== '' && (
          <sup
            className={classNames(styles.tooltip, {
              [styles.active]: showTooltip,
            })}>
            {tooltip}
          </sup>
        )}
      </motion.sup>
    )
  )
}

export default ButtonIcon

ButtonIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['checkmark', 'cross', 'lines']),
  delay: PropTypes.number,
  rotation: PropTypes.number,
  tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}
