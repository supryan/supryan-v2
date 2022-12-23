import PropTypes from 'prop-types'
import Featured from 'components/Slices/Featured'
import Intro from 'components/Layout/Intro'
import Projects from 'components/Slices/Projects/_Projects'

const Slices = ({ slices, projects, globals }) => {
  return (
    <>
      {slices?.map((slice, i) => {
        let Component
        const { slice_type: type, primary } = slice
        switch (type) {
          case 'intro': {
            Component = <Intro {...primary} />
            break
          }
          case 'featured': {
            const primary = {}
            primary.video = globals?.video_reel
            Component = <Featured {...primary} />
            break
          }
          case 'projects': {
            Component = <Projects {...primary} items={projects} />
            break
          }
          default:
            Component = <sup>No slice found for {type}</sup>
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
