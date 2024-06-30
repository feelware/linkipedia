import {
  SegmentedControl,
  Center,
  rem
} from '@mantine/core'

import {
  IconMoon,
  IconSun,
} from '@tabler/icons-react'

import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'

const SchemeToggle = () => {
  const value = useComputedColorScheme()
  const { setColorScheme } = useMantineColorScheme()

  return (
    <SegmentedControl
      mt={5}
      fullWidth
      value={value}
      data={[
        {
          value: 'light',
          label: (
            <Center h={22}>
              <IconSun style={{ width: rem(16), height: rem(16) }} />
            </Center>
          )
        },
        {
          value: 'dark',
          label: (
            <Center h={22}>
              <IconMoon style={{ width: rem(16), height: rem(16) }} />
            </Center>
          )
        }
      ]}
      onChange={setColorScheme}
    />
  )
}

export default SchemeToggle