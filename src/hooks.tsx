import { nanoid } from 'nanoid'
import React, { ReactNode, useReducer } from 'react'

import { NotificationContext } from './context'
import { Toast } from './toast'
import { ToastAction, ToastInCollection, ToastProps } from './types'

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const { collection, spawnToast } = useToast()
	return (
		<NotificationContext.Provider
			value={{ toasts: collection, spawnToast }}
		>
			{children}
			<footer id="toast-wrapper">
				{collection.map(({ props, id }: ToastInCollection) => (
					<Toast {...props} key={id} />
				))}
			</footer>
		</NotificationContext.Provider>
	)
}

function useToast() {
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
		spawnToast,
		collection,
	}
}
