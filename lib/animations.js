export const intro = [
  {
    animation: {
      hidden: {
        skewY: 0,
        height: '100vh',
      },
      visible: {
        skewY: -5,
        height: '55vh',
      },
    },
  },
  {
    animation: {
      hidden: {
        skewY: 0,
        y: '100vh',
      },
      visible: {
        skewY: -5,
        y: '-100vh',
      },
    },
  },
  {
    animation: {
      hidden: {
        skewY: 0,
        y: '100vh',
      },
      visible: {
        skewY: -5,
        y: '-100vh',
      },
    },
  },
]

export const featured = {
  hidden: {
    clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
  },
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  },
}

export const shadowText = ({
  startColor = '#ffe883',
  endColor = '#ffffff',
}) => ({
  hidden: {
    textShadow: `0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0),
        0 0 0 rgba(0, 0, 0, 0)`,
    x: 0,
    y: 0,
    opacity: 0,
    color: startColor,
  },
  visible: {
    textShadow: `3px 3px 0 rgba(0, 0, 0, 1), 6px 6px 0 rgba(0, 0, 0, 1), 9px 9px rgba(0, 0, 0, 1),
        12px 12px 0 rgba(0, 0, 0, 1)`,
    x: '-12px',
    y: '-12px',
    scale: 1,
    opacity: 1,
    color: endColor,
  },
})
