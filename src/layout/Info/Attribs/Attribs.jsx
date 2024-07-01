import {
  Tree,
  useTree,
  TextInput,
  Stack,
  Group,
  Box,
  ScrollArea,
  Button,
  Center,
  Text,
  useComputedColorScheme,
} from '@mantine/core'

import {
  IconSearch,
  IconChevronDown,
} from '@tabler/icons-react'

import { useState } from 'react'

import useData from '../../../store/useData'
import useActiveNode from '../../../store/useActiveNode'
import useGraphInteraction from '../../../store/useGraphInteraction'

const Attribs = ({
  activeNode,
  attributes,
  setActiveTab,
}) => {
  const tree = useTree()
  const isThemeDark = useComputedColorScheme('dark') === 'dark'
  const { 
    expandItem,
    nodeMap 
  } = useData()
  const { setHoveredNode } = useGraphInteraction()
  const { setActiveNode } = useActiveNode()
  const [filter, setFilter] = useState('')
  
  if (!attributes.length) {
    return (
      <Center h='100%'>
        <Stack gap={5}>
          <Text size='sm'>
            No attributes yet
          </Text>
          <Button
            variant='default'
            onClick={() => {
              expandItem(activeNode)
            }}
          >
            Expand
          </Button>
        </Stack>
      </Center>
    )
  }

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
          onMouseEnter={() => setHoveredNode(node.original_id)}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => {
            setActiveNode(nodeMap.get(node.original_id))
            setActiveTab('summary')
          }}
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
  activeNode: propTypes.object,
  attributes: propTypes.array,
}