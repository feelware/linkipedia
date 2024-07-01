const filterTree = (props, query) => {
  const result = []
  props.forEach((prop) => {
    const _prop = { ...prop, children: [] }
    let included = false
    prop.children.forEach((item) => {
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        _prop.children.push(item)
        included = true
      }
    })
    if (included) {
      result.push(_prop)
    }
  })
  return result
}

export default filterTree