import {
  Affix,
  Card,
  Tabs,
  Transition
} from '@mantine/core'

import Attribs from './Attribs'

import useActiveNode from '../../store/useActiveNode'

const Info = ({ position }) => {
  const { activeNode } = useActiveNode()

  return (
    <>
      <Affix position={position}>
        <Transition
          mounted={activeNode}
          transition='fade-left'
          duration={500}
        >
          {
            (styles) => (
              <Tabs
                defaultValue="attribs"
              >
                <Card
                  style={styles}
                  h='calc(100vh - 40px)'
                  w={350}
                  withBorder
                >
                  <Card.Section>
                    <Tabs.List>
                      <Tabs.Tab value="attribs">
                        Atributos
                      </Tabs.Tab>
                    </Tabs.List>
                  </Card.Section>

                  <Tabs.Panel value="attribs">
                    <Attribs />
                  </Tabs.Panel>
                </Card>
              </Tabs>
            )
          }
        </Transition>
      </Affix>
    </>
  )
}

export default Info

import PropTypes from 'prop-types'

Info.propTypes = {
  position: PropTypes.object
}