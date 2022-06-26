import classNames from 'classnames'
import PropTypes from 'prop-types'
import PrismicLink from 'components/Pieces/PrismicLink'
import styles from './index.module.scss'
import prismicLinkShape from 'shapes/prismic/link'
import { hasLink } from 'lib/links'

const Button = ({ className, link, children }) => {
  return hasLink(link) ? (
    <PrismicLink link={link} className={classNames(styles.button, className)}>
      <span>{children}</span>
    </PrismicLink>
  ) : (
    <div className={classNames(className, styles.button)}>
      <span>{children}</span>
    </div>
  )
}
Button.propTypes = {
  className: PropTypes.string,
  link: prismicLinkShape,
  children: PropTypes.node,
}
export default Button
