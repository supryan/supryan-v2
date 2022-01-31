import PropTypes from 'prop-types'
import RichText from 'components/Slices/RichText'

const Slices = ({ slices }) => {
  return (
    <>
      {slices.map((slice, i) => {
        let Component
        const { slice_type: type } = slice
        switch (type) {
          case 'richtext': {
            Component = <RichText richtext={slice.primary.richtext} />
            break
          }
          default:
            Component = <div>No slice found for {type}</div>
            break
        }
        return <sup key={i}>{Component}</sup>
      })}
    </>
  )
}

Slices.propTypes = {
  slices: PropTypes.array.isRequired,
}

export default Slices
