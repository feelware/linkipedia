import firstUpper from "./firstUpper"

const attributesOf = (node) => (
  node.children?.map((prop) => ({
    value: prop.id,
    label: firstUpper(prop.name),
    children: prop.children?.map((item) => ({
      value: item.id,
      label: item.name
    }))
  }))
)

export default attributesOf