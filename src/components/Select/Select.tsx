import React, { FC, SelectHTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import { StyledError, StyledInput } from '../Input/Input'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SelectItem from '../SelectItem/SelectItem'

export type SelectItem = {
  text: string
  value: string | number
}

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  error?: string
  handleSelect: Function
  isOpen?: boolean
  items: SelectItem[]
  name: string
}

interface SelectStyleProps {
  isOpen?: boolean
  hasError?: boolean
}

interface SelectStyleListProps {
  visible: boolean
}

const Select: FC<SelectProps> = ({ error, handleSelect, items, name, value, ...props }) => {
  const selectRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const setSelectedItem = useCallback(
    (item: SelectItem) => () => {
      handleSelect(name, item.value)
      setIsOpen(false)
    },
    [handleSelect, name]
  )
  const toggleList = useCallback(() => setIsOpen(!isOpen), [isOpen])

  const selectItems = useMemo(
    () =>
      items.map((i) => (
        <SelectItem key={i.value} onClick={setSelectedItem(i)}>
          {i.text}
        </SelectItem>
      )),
    [items, setSelectedItem]
  )

  const clickOutside = useCallback((e: globalThis.MouseEvent) => {
    if (!(selectRef.current! as any).contains(e.target)) {
      setIsOpen(false)
    }
  }, [])

  const openBySpace = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.charCode === 32) {
        toggleList()
      }
    },
    [toggleList]
  )
  useEffect(() => {
    document.addEventListener('click', clickOutside)
    return () => document.removeEventListener('click', clickOutside)
  }, [clickOutside])

  return (
    <StyledSelectWrapper ref={selectRef}>
      <StyledSelect
        hasError={!!error}
        isOpen={isOpen}
        onClick={toggleList}
        onKeyPress={openBySpace}
        tabIndex={props.tabIndex}
      >
        <input {...props} name={name} placeholder={props.defaultValue as string} type={'text'} value={value} defaultValue={undefined} readOnly/>
        <FontAwesomeIcon className="absolute-right" icon={faAngleDown} />
      </StyledSelect>
      <StyledSelectList visible={isOpen}>{selectItems}</StyledSelectList>
      {error && <StyledError>{error}</StyledError>}
    </StyledSelectWrapper>
  )
}

const StyledSelectWrapper = styled.div`
  position: relative;
  min-height: 66px;
`

const StyledSelect = styled(StyledInput)<SelectStyleProps>`
  position: relative;
  & > input {
    caret-color: transparent;
  }
  .absolute-right {
    position: absolute;
    right: 21px;
    transform: ${(p) => (p.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
  }
`

const StyledSelectList = styled.div<SelectStyleListProps>`
  background: ${(p) => p.theme.palette.background.default};
  border-radius: ${(p) => p.theme.shape.borderRadius};
  box-shadow: 0px 3px 8px #00000026;
  display: ${(p) => (p.visible ? 'block' : 'none')};
  padding: 6px 0;
  position: absolute;
  top: 61px;
  width: 100%;
  z-index: ${(p) => p.theme.zIndex.dropDown};
`

export default Select
