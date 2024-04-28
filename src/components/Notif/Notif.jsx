import useData from "../../store/useData"
import { Affix, Notification, Transition } from "@mantine/core"
import { FaCheck } from "react-icons/fa6"

const Notif = () => {
  const { fetch } = useData()
  const checkIcon = <FaCheck />
  
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition 
        mounted={fetch !== 'idle'}
        transition="fade-left"
      >
        {transitionStyles => (
          <Notification
            loading={fetch === 'loading'}
            icon={fetch === 'success' && checkIcon}
            style={{ width: '5cm', ...transitionStyles }}
          >
            {fetch !== 'idle' && fetch}
          </Notification>
        )}
      </Transition>
    </Affix>
  )
}

export default Notif