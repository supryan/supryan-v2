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

export const shadowText = {
  hidden: {
    textShadow: `0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 rgba(0, 0, 0, 0),
        0 0 0 rgba(0, 0, 0, 0)`,
    x: 0,
    y: 0,
    color: '#ffe883',
  },
  visible: {
    textShadow: `3px 3px 0 rgba(0, 0, 0, 1), 6px 6px 0 rgba(0, 0, 0, 1), 9px 9px rgba(0, 0, 0, 1),
        12px 12px 0 rgba(0, 0, 0, 1)`,
    x: '-12px',
    y: '-12px',
    scale: 1,
    color: '#ffffff',
  },
}
