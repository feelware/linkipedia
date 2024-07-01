import {
  Tree,
  useTree,
  TextInput,
  Stack,
  Group,
  Box,
  ScrollArea,
  Button,
  Text,
  useComputedColorScheme,
} from '@mantine/core'

import {
  IconSearch,
  IconChevronDown,
  IconPointFilled
} from '@tabler/icons-react'

import { useState } from 'react'

const Attribs = ({ 
  attributes,
  hue,
}) => {
  const tree = useTree()
  const isThemeDark = useComputedColorScheme('dark') === 'dark'
  const [filter, setFilter] = useState('')
  
  if (!attributes) return null

  const data = attributes
  
  const renderNode = ({ 
    node, 
    expanded, 
    hasChildren, 
    elementProps,
  }) => {
    if (hasChildren) {
      return (
        <Group 
          mt={15}
          gap={8} 
          {...elementProps}
        >
          <Box>
            <IconChevronDown
              size={10}
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </Box>
          <Text
            size='xs'
            c='dimmed'
          >
            {node.label}
          </Text>
        </Group>
      )
    }
    return (
      <>
        <Text
          size='sm'          
        >
          {node.label}
        </Text>
      </>
    )
  }

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
          styles={{
            input: {
              borderColor: isThemeDark
              ? 'var(--mantine-color-dark-5)'
              : 'var(--mantine-color-gray-3)'
            }
          }}
          value={filter}
          onChange={(event) => setFilter(event.currentTarget.value)}
        />
        <ScrollArea 
          h='100vh'
          bg={isThemeDark ? 'dark.7' : 'gray.2'}
          style={{ borderRadius: 'var(--mantine-radius-sm)' }}
        >
          <Tree 
            data={data}
            tree={tree}
            m={20}
            renderNode={renderNode}
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
  attributes: propTypes.array,
  hue: propTypes.number
}