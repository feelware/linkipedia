import { useState, useRef, useEffect } from "react"
import { useDebouncedValue } from '@mantine/hooks'
import { Affix, Combobox, Loader, TextInput, useCombobox } from "@mantine/core"
import useData from "../../store/useData"
import wikidata from "../../services/wikidata"

import PropTypes from 'prop-types'

const SearchBar = ({ position }) => {
  const { expandItem } = useData()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [value, setValue] = useState('')
  const [empty, setEmpty] = useState(false)
  const abortController = useRef()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const [debounced] = useDebouncedValue(value, 500)

  const fetchStateOptions = async (query) => {
    if (query == '') {
      setData(null)
      return
    }
    abortController.current?.abort()
    abortController.current = new AbortController()
    setLoading(true)
    try {
      const result = await wikidata.searchArticles(query, abortController.current.signal)
      // console.log(result)
      setData(result)
      setLoading(false)
      setEmpty(result.length === 0)
    } catch (error) {
      if (error.name != 'CanceledError') {
        console.error(error)
      }
      return
    }
    abortController.current = undefined
  }

  useEffect(() => {
    fetchStateOptions(debounced)
  }, [debounced])

  const options = (data || [])
    .filter((item) => item.display.description)
    .map((item) => (
      <Combobox.Option 
        key={item.id}
        value={{
          id: item.id,
          name: item.label
        }}
      >
        <div style={{ margin: 5 }}>
          <h4 style={{ margin: 0 }}>
            {item.label}
          </h4>
          <p style={{ margin: 0 }}>
            {item.display.description.value}
          </p>
        </div>
      </Combobox.Option>
    ))

  return (
    <Combobox
      onOptionSubmit={(newRoot) => {
        setValue(newRoot.name)
        expandItem(newRoot)
        combobox.closeDropdown()
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <Affix position={position}>
          <TextInput
            w={300}
            placeholder="Search an article"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value)
              if (event.currentTarget.value != '') {
                combobox.resetSelectedOption()
                combobox.openDropdown()
              }
              else {
                combobox.closeDropdown()
              }
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            rightSection={loading && <Loader size={18} /> }
            styles={{
              input: { 
                height: 40, 
                paddingLeft: 15,
                paddingRight: 15,
              }
            }}
          />
        </Affix>
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options mah={450} style={{ overflowY: 'auto' }}>
          {options}
          {empty && <Combobox.Empty>No results</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default SearchBar

SearchBar.propTypes = {
  position: PropTypes.object
}
