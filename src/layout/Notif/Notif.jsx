import useData from "../../store/useData"
import { Affix, Notification, Transition } from "@mantine/core"
import { FaCheck } from "react-icons/fa6"

const Notif = ({ position }) => {
  const { fetchState } = useData()
  const checkIcon = <FaCheck />
  
  return (
    <Affix position={position}>
      <Transition 
        mounted={fetchState}
        transition="fade-left"
      >
        {transitionStyles => (
          <Notification
            loading={fetchState === 'loading'}
            icon={fetchState === 'success' && checkIcon}
            style={{ width: '5cm', ...transitionStyles }}
          >
            {fetchState}
          </Notification>
        )}
      </Transition>
    </Affix>
  )
}

export default Notif

import PropTypes from 'prop-types'

Notif.propTypes = {
  position: PropTypes.object
}