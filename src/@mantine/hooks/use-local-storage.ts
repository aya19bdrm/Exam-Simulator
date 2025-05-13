'use client'
import type { StorageProperties } from './create-storage'
import { createStorage, readValue } from './create-storage'

function useLocalStorage<T = string>(
  props: StorageProperties<T>
): [T, (val: T | ((prevState: T) => T)) => void, () => void] {
  return createStorage('localStorage', 'use-local-storage')(props)
}
const readLocalStorageValue: readLocalStorageValue = readValue('localStorage')

export { readLocalStorageValue, useLocalStorage }

// export declare function useLocalStorage<T = string>(props: StorageProperties<T>): [T, (val: T | ((prevState: T) => T)) => void, () => void];

export declare type readLocalStorageValue = <T>({ key, defaultValue, deserialize }: StorageProperties<T>) => T
