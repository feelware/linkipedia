export default (props) => (
  Object.fromEntries(props.map((prop) => [prop.value, true]))
)