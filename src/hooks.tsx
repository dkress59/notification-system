import { nanoid } from 'nanoid'
import { useReducer } from 'react'

import { ToastAction, ToastInCollection, ToastProps } from './types'

export function useToast() {
	function toastReducer(
		state: ToastInCollection[],
		action: { type: ToastAction; payload: ToastInCollection },
	): ToastInCollection[] {
		switch (action.type) {
			case ToastAction.PUSH:
				return [...state, action.payload]
			case ToastAction.POP:
				return state.filter(toast => toast.id !== action.payload.id)
		}
	}

	const [collection, dispatch] = useReducer(
		toastReducer,
		[] as ToastInCollection[],
	)

	const spawnToast = (props: ToastProps) => {
		const collectionId = nanoid()
		const newToast: ToastInCollection = {
			id: collectionId,
			props: {
				...props,
				removeToastFromDom: () =>
					dispatch({
						type: ToastAction.POP,
						payload: { id: collectionId } as ToastInCollection,
					}),
			},
		}
		dispatch({ type: ToastAction.PUSH, payload: newToast })
	}

	return {
		collection,
		spawnToast,
	}
}
