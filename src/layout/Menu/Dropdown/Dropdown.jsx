import {
  Menu,
  Text,
  rem,
  Group
} from '@mantine/core'

import {
  IconTrash
} from '@tabler/icons-react'

const iconProps = { size: rem(16) }

const Dropdown = () => {
  const options = [
    {
      label: 'Clear canvas',
      Icon: IconTrash,
    }
  ]

  return (
    <>
      {
        options.map((option, i) => (
          <Menu.Item 
            key={i} 
            pr={15}
            h={40}
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