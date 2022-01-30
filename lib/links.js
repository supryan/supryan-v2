// Check to see if the link isn't blank
export const hasLink = (link) => {
  const isValidLinkShape = link && Object.keys(link).length > 1

  if (link && link.link_type !== 'Any' && isValidLinkShape) {
    return true
  }
  return false
}
