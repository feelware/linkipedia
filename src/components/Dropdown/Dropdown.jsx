import {
  Menu,
  Text,
  rem,
  Group
} from '@mantine/core'

const iconProps = { size: 16 }

const Dropdown = ({ options }) => {

  return (
    <>
      {
        options.map((option, i) => (
          <Menu.Item 
            key={i} 
            pl={15}
            pr={20}
            h={40}
            onClick={option.onClick}
          >
            <Group gap={10} align='flex-end'>
              <option.Icon {...iconProps} />
              <Text size={rem(14)} >
                {option.label}
              </Text>
            </Group>
          </Menu.Item>
        ))
      }
    </>
  )
}

export default Dropdown

import PropTypes from 'prop-types'

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    Icon: PropTypes.elementType
  }))
}