import PropTypes from 'prop-types'
import styles from './index.module.scss'
import classNames from 'classnames'
import RichTextComponent from 'components/Slices/RichText'

const Item = ({ title, description }) => {
  return (
    <sup className={styles.item}>
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
