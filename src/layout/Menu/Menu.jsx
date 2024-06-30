import {
  Menu,
  Affix,
  ActionIcon,
} from '@mantine/core'

import {
  IconMenu2
} from '@tabler/icons-react'

import Dropdown from './Dropdown'

const OptionsMenu = ({ position }) => {
  return (
    <Menu 
      position='bottom-start'
      offset={10}
    >
      <Menu.Target>
        <Affix position={position}>
          <ActionIcon 
            size={40} 
            variant='default'
          >
            <IconMenu2 size={17} />
          </ActionIcon>
        </Affix>
      </Menu.Target>
      <Menu.Dropdown>
        <Dropdown />
      </Menu.Dropdown>
    </Menu>
  )
}

export default OptionsMenu

import PropTypes from 'prop-types'

OptionsMenu.propTypes = {
  position: PropTypes.object
}