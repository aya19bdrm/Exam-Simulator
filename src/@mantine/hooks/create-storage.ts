'use client'
import { useCallback, useState, useEffect } from 'react'
import { useWindowEvent } from './use-window-event'

function serializeJSON(value, hookName = 'use-local-storage') {
  try {
    return JSON.stringify(value)
  } catch (error) {
    throw new Error(`@mantine/hooks ${hookName}: Failed to serialize the value`)
  }
}
function deserializeJSON(value) {
  try {
    return value && JSON.parse(value)
  } catch {
    return value
  }
}
function createStorageHandler(type) {
  const getItem = (key) => {
    try {
      return window[type].getItem(key)
    } catch (error) {
      console.warn('use-local-storage: Failed to get value from storage, localStorage is blocked')
      return null
    }
  }
  const setItem = (key, value) => {
    try {
      window[type].setItem(key, value)
    } catch (error) {
      console.warn('use-local-storage: Failed to set value to storage, localStorage is blocked')
    }
  }
  const removeItem = (key) => {
    try {
      window[type].removeItem(key)
    } catch (error) {
      console.warn('use-local-storage: Failed to remove value from storage, localStorage is blocked')
    }
  }
  return { getItem, setItem, removeItem }
}

function createStorage<T>(
  type: StorageType,
  hookName: string
): ({
  key,
  defaultValue,
  getInitialValueInEffect,
  deserialize,
  serialize
}: StorageProperties<T>) => [T, (val: T | ((prevState: T) => T)) => void, () => void] {
  const eventName = type === 'localStorage' ? 'mantine-local-storage' : 'mantine-session-storage'
  const { getItem, setItem, removeItem } = createStorageHandler(type)
  return function useStorage({
    key,
    defaultValue,
    getInitialValueInEffect = true,
    deserialize = deserializeJSON,
    serialize = (value) => serializeJSON(value, hookName)
  }) {
    const readStorageValue = useCallback(
      (skipStorage: boolean) => {
        let storageBlockedOrSkipped: boolean
        try {
          storageBlockedOrSkipped =
            typeof window === 'undefined' || !(type in window) || window[type] === null || !!skipStorage
        } catch (_e) {
          storageBlockedOrSkipped = true
        }
        if (storageBlockedOrSkipped) {
          return defaultValue
        }
        const storageValue = getItem(key)
        return storageValue !== null ? deserialize(storageValue) : defaultValue
      },
      [key, defaultValue]
    )
    const [value, setValue] = useState(readStorageValue(getInitialValueInEffect))
    const setStorageValue = useCallback(
      (val: any) => {
        if (val instanceof Function) {
          setValue((current: any) => {
            const result = val(current)
            setItem(key, serialize(result))
            window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val(current) } }))
            return result
          })
        } else {
          setItem(key, serialize(val))
          window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: val } }))
          setValue(val)
        }
      },
      [key]
    )
    const removeStorageValue = useCallback(() => {
      removeItem(key)
      window.dispatchEvent(new CustomEvent(eventName, { detail: { key, value: defaultValue } }))
    }, [])
    useWindowEvent('storage', (event) => {
      if (event.storageArea === window[type] && event.key === key) {
        setValue(deserialize(event.newValue ?? void 0))
      }
    })
    useWindowEvent(eventName, (event) => {
      if (event.detail.key === key) {
        setValue(event.detail.value)
      }
    })
    useEffect(() => {
      if (defaultValue !== void 0 && value === void 0) {
        setStorageValue(defaultValue)
      }
    }, [defaultValue, value, setStorageValue])
    useEffect(() => {
      setStorageValue(readStorageValue())
    }, [])
    return [value === void 0 ? defaultValue : value, setStorageValue, removeStorageValue]
  }
}

function readValue(type: StorageType): <T>({ key, defaultValue, deserialize }: StorageProperties<T>) => T {
  const { getItem } = createStorageHandler(type)
  return function read({ key, defaultValue, deserialize = deserializeJSON }) {
    let storageBlockedOrSkipped: boolean
    try {
      storageBlockedOrSkipped = typeof window === 'undefined' || !(type in window) || window[type] === null
    } catch (_e) {
      storageBlockedOrSkipped = true
    }
    if (storageBlockedOrSkipped) {
      return defaultValue
    }
    const storageValue = getItem(key)
    return storageValue !== null ? deserialize(storageValue) : defaultValue
  }
}

export { createStorage, readValue }

export type StorageType = 'localStorage' | 'sessionStorage'

export interface StorageProperties<T> {
  /** Storage key */
  key: string
  /** Default value that will be set if value is not found in storage */
  defaultValue?: T
  /** If set to true, value will be update is useEffect after mount */
  getInitialValueInEffect?: boolean
  /** Function to serialize value into string to be save in storage */
  serialize?: (value: T) => string
  /** Function to deserialize string value from storage to value */
  deserialize?: (value: string | undefined) => T
}
