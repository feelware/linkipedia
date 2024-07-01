import {
  Tree,
  useTree,
  TextInput,
  Stack,
  Group,
  ScrollArea,
  Button,
} from '@mantine/core'

import {
  IconSearch,
  IconChevronDown
} from '@tabler/icons-react'

import { useState } from 'react'

const Attribs = ({ attributes }) => {
  const [filter, setFilter] = useState('');
  const tree = useTree()
  
  if (!attributes) return null

  const data = attributes

  return (
    <>
      <Stack 
        gap={15} 
        h='100%'
        p={20}
        pb={30}
      >
        <TextInput 
          leftSection={<IconSearch size={15} />}
          placeholder='Search attributes...'
        />
        <ScrollArea 
          h='100vh'
          bg='dark.7'
          style={{ borderRadius: 'var(--mantine-radius-sm)' }}
        >
          <Tree 
            data={data}
            tree={tree}
            m={15}
          />
        </ScrollArea>
        <Group grow>
          <Button 
            variant='default'
            onClick={tree.expandAllNodes}
          >
            Expand all
          </Button>
          <Button 
            variant='default'
            onClick={tree.collapseAllNodes}
          >
            Collapse all
          </Button>
        </Group>
      </Stack>
    </>
  )
}

export default Attribs

import propTypes from 'prop-types'

Attribs.propTypes = {
  attributes: propTypes.array
}