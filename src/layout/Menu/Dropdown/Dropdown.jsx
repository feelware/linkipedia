import {
  IconTrash
} from '@tabler/icons-react'

import Dropdown from '../../../components/Dropdown'
import SchemeToggle from './SchemeToggle'

import useData from '../../../store/useData'
import useActiveNode from '../../../store/useActiveNode'

const MenuDropdown = () => {
  const { resetGraph } = useData()
  const { clearActiveNode } = useActiveNode()

  const options = [
    {
      label: 'Reset canvas',
      Icon: IconTrash,
      onClick: () => {
        resetGraph()
        clearActiveNode()
      }
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