import {
  Affix,
  Card,
  Tabs,
  Transition
} from '@mantine/core'

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
              <Card
                style={styles}
                h='calc(100vh - 40px)'
                w={350}
                withBorder
              >
                {activeNode?.name}
              </Card>
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