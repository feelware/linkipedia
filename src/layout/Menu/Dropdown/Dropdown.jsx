import {
  IconTrash
} from '@tabler/icons-react'

import Dropdown from '../../../components/Dropdown'
import SchemeToggle from './SchemeToggle'

import useData from '../../../store/useData'

const MenuDropdown = () => {
  const { resetGraph } = useData()

  const options = [
    {
      label: 'Reset canvas',
      Icon: IconTrash,
      onClick: resetGraph
    }
  ]

  return (
    <>
      <Dropdown options={options} />
      <SchemeToggle />
    </>
  )
}

export default MenuDropdown