import {
  Menu,
  Affix,
  ActionIcon,
} from '@mantine/core'

import {
  IconMenu2
} from '@tabler/icons-react'

import Dropdown from './Dropdown'
import SchemeToggle from './Dropdown/SchemeToggle'

import PropTypes from 'prop-types'

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
        <SchemeToggle />
      </Menu.Dropdown>
    </Menu>
  )
}

export default OptionsMenu

OptionsMenu.propTypes = {
  position: PropTypes.object
}