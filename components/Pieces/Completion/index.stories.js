import Component from './index.js'

const ComponentProps = {
  title: 'Components/Completion',
  component: Component,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
}

export default ComponentProps

const Template = (args) => (
  <div style={{ margin: '50px auto 0', textAlign: 'center' }}>
    <Component {...args} />
  </div>
)

export const Completion = Template.bind({})
Completion.args = { active: true, overlay: false }
