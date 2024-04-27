import { useState, useRef } from "react"
// import { useDebouncedValue } from '@mantine/hooks'
import { Affix, Combobox, Loader, TextInput, useCombobox } from "@mantine/core"
import useData from "../../store/useData"
import api from "../../services/api"

const SearchBar = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const { mainArticle, setMainArticle } = useData()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [value, setValue] = useState(mainArticle)
  const [empty, setEmpty] = useState(false)
  const abortController = useRef()

  // const [debounced] = useDebouncedValue(value, 500)

  const fetchOptions = async (query) => {
    if (query == '') {
      setData(null)
      return
    }

    abortController.current?.abort()
    abortController.current = new AbortController()
    setLoading(true)
    try {
      const result = await api.searchArticles(query, abortController.current.signal)
      setData(result)
      setLoading(false)
      setEmpty(result.length === 0)
    } catch (error) {
      console.log(error.name)
      return
    }
    abortController.current = undefined
  }

  const options = (data || []).map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ))

  return (
    <Affix position={{ top: 20, left: 20 }}>
      <Combobox
        onOptionSubmit={(optionValue) => {
          setValue(optionValue)
          setMainArticle(optionValue)
          combobox.closeDropdown()
        }}
        withinPortal={false}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            placeholder="Busca un artículo"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value)
              fetchOptions(event.currentTarget.value)
              if (event.currentTarget.value != '') {
                combobox.resetSelectedOption()
                combobox.openDropdown()
              }
              else {
                combobox.closeDropdown()
              }
            }}
            onClick={() => combobox.openDropdown()}
            // onFocus={() => {
            //   combobox.openDropdown()
            //   if (data === null) {
            //     fetchOptions(value)
            //   }
            // }}
            onBlur={() => combobox.closeDropdown()}
            rightSection={loading && <Loader size={18} />}
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={data === null}>
          <Combobox.Options>
            {options}
            {empty && <Combobox.Empty>Sin resultados</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Affix>
  )
}

export default SearchBar