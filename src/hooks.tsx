import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'

import { ToastInCollection, ToastProps } from './types'

export function useToast() {
	const [collection, setCollection] = useState<ToastInCollection[]>([])

	const removeToastFromDom = useCallback(
		(collectionId: string) =>
			setCollection(collection.filter(({ id }) => id !== collectionId)),
		[collection],
	)

	const spawnToast = (props: ToastProps) => {
		const id = nanoid()
		const newToast = {
			id,
			props,
		}
		setCollection([...collection, newToast])
	}

	return { spawnToast, removeToastFromDom, collection }
}
