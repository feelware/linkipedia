import firstUpper from "./firstUpper"

const attributesOf = (node) => {
  const attributes = []
  node.children?.forEach((prop) => {
    const items = []
    const itemSet = new Set()
    prop.children?.forEach((item) => {
      const unique_id = `${prop.id}:${item.id}`
      if (!itemSet.has(unique_id)) {
        items.push({
          value: unique_id,
          label: item.name
        })
        itemSet.add(unique_id)
      }
    })
    attributes.push({
      value: prop.id,
      label: firstUpper(prop.name),
      children: items
    })
  })
  return attributes
}

export default attributesOf