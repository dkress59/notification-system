import { nanoid } from 'nanoid'
import React, { useCallback, useState } from 'react'

import { Toast } from './toast'
import { ToastInCollection, ToastProps } from './types'

export function useToast() {
	const [collection, setCollection] = useState<ToastInCollection[]>([])

	const removeToastFromDom = useCallback(
		(id: string) =>
			setCollection(
				collection.filter(({ collectionId }) => collectionId !== id),
			),
		[collection],
	)

	const createToast = (props: ToastProps): ToastInCollection => {
		const collectionId = nanoid()
		return {
			collectionId,
			props,
		}
	}

	const spawnToast = (props: ToastProps) => {
		const newToast = createToast(props)
		setCollection([...collection, newToast])
	}

	function ToastProvider() {
		return (
			<footer id="toast-wrapper">
				{collection.map(({ props, collectionId }) => (
					<Toast
						{...props}
						key={collectionId}
						removeToastFromDom={() =>
							removeToastFromDom(collectionId)
						}
					/>
				))}
			</footer>
		)
	}

	return { ToastProvider, spawnToast }
}
