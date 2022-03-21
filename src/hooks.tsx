/* eslint-disable sonarjs/no-identical-functions */
import { nanoid } from 'nanoid'
import React, { ReactNode, useReducer } from 'react'

import { NotificationContext } from './context'
import { Modal } from './modal'
import { Toast } from './toast'
import {
	NotificationInCollection,
	NotificationProps,
	ToastAction,
} from './types'

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const { toasts, spawnToast } = useToast()
	const { modals, spawnModal } = useModal()
	return (
		<NotificationContext.Provider
			value={{ toasts, spawnToast, modals, spawnModal }}
		>
			{children}
			<footer
				id="notification-wrapper"
				data-testid="notification-wrapper"
			>
				{toasts.map(({ props, id }: NotificationInCollection) => (
					<Toast {...props} key={id} />
				))}
				{modals.map(({ props, id }: NotificationInCollection) => (
					<Modal {...props} key={id} />
				))}
			</footer>
		</NotificationContext.Provider>
	)
}

function notificationReducer(
	state: NotificationInCollection[],
	action: { type: ToastAction; payload: NotificationInCollection },
): NotificationInCollection[] {
	switch (action.type) {
		case ToastAction.PUSH:
			return [...state, action.payload]
		case ToastAction.POP:
			return state.filter(toast => toast.id !== action.payload.id)
	}
}

function useToast() {
	const [toasts, dispatch] = useReducer(
		notificationReducer,
		[] as NotificationInCollection[],
	)

	const spawnToast = (props: NotificationProps) => {
		const collectionId = nanoid()
		const newToast: NotificationInCollection = {
			id: collectionId,
			props: {
				...props,
				removeToastFromDom: () =>
					dispatch({
						type: ToastAction.POP,
						payload: {
							id: collectionId,
						} as NotificationInCollection,
					}),
			},
		}
		dispatch({ type: ToastAction.PUSH, payload: newToast })
	}

	return {
		spawnToast,
		toasts,
	}
}

function useModal() {
	const [modals, dispatch] = useReducer(
		notificationReducer,
		[] as NotificationInCollection[],
	)

	const spawnModal = (props: NotificationProps) => {
		const collectionId = nanoid()
		const newToast: NotificationInCollection = {
			id: collectionId,
			props: {
				...props,
				removeToastFromDom: () =>
					dispatch({
						type: ToastAction.POP,
						payload: {
							id: collectionId,
						} as NotificationInCollection,
					}),
			},
		}
		dispatch({ type: ToastAction.PUSH, payload: newToast })
	}

	return {
		spawnModal,
		modals,
	}
}
