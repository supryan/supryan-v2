import classNames from 'classnames'
import PropTypes from 'prop-types'
import PrismicLink from 'components/Pieces/PrismicLink'
import styles from './index.module.scss'
import prismicLinkShape from 'shapes/prismic/link'
import { hasLink } from 'lib/links'

const Button = ({ className, link, children }) => {
  return hasLink(link) ? (
    <PrismicLink link={link} className={classNames(styles.button, className)}>
      <sup>{children}</sup>
    </PrismicLink>
  ) : (
    <div className={classNames(className, styles.button)}>
      <sup>{children}</sup>
    </div>
  )
}
Button.propTypes = {
  className: PropTypes.string,
  link: prismicLinkShape,
  children: PropTypes.node,
}
export default Button
