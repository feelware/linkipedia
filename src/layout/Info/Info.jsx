import {
  Affix,
  Card,
  Tabs,
} from '@mantine/core'

import Article from './Article'
import Attribs from './Attribs'

import useActiveNode from '../../store/useActiveNode'

import {
  IconBinaryTree2,
  IconBrandWikipedia
} from '@tabler/icons-react'

const Info = ({ position }) => {
  const { 
    activeNode,
    articleSummary,
    isFetchingSummary 
  } = useActiveNode()

  return (
    <Affix position={position}>
      <Tabs
        defaultValue='summary'
        color={`hsl(${activeNode.__hue}, 50%, 50%)`}
      >
        <Card
          h='calc(100vh - 40px)'
          w={350}
          withBorder
        >
          <Card.Section>
            <Tabs.List
              pt={4}
            >
              <Tabs.Tab
                value='summary'
                leftSection={<IconBrandWikipedia size={15} />}
              >
                Summary
              </Tabs.Tab>
              <Tabs.Tab 
                value='attribs'
                leftSection={<IconBinaryTree2 size={15} />}
              >
                Attributes
              </Tabs.Tab>
            </Tabs.List>
          </Card.Section>

          <Card.Section h='100%'>
            <Tabs.Panel h='100%' value='summary'>
              <Article 
                hue={activeNode.__hue}
                summary={articleSummary}
                isFetchingSummary={isFetchingSummary}
              />
            </Tabs.Panel>

            <Tabs.Panel value='attribs'>
              <Attribs />
            </Tabs.Panel>
          </Card.Section>
        </Card>
      </Tabs>
    </Affix>
  )
}

export default Info

import PropTypes from 'prop-types'

Info.propTypes = {
  position: PropTypes.object
}