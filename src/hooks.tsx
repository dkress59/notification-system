import { nanoid } from 'nanoid'
import React, { ReactNode, useContext, useReducer } from 'react'

import { Banner } from './banner'
import { NotificationContext } from './context'
import { Modal } from './modal'
import { Toast } from './toast'
import {
	NotificationInCollection,
	NotificationReducerAction,
	ToastProps,
} from './types'

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const { banners, spawnBanner } = useBanner()
	const { modals, spawnModal } = useModal()
	const { toasts, spawnToast } = useToast()
	return (
		<NotificationContext.Provider
			value={{
				banners,
				modals,
				toasts,
				spawnBanner,
				spawnModal,
				spawnToast,
			}}
		>
			{children}
			<footer
				id="notification-container"
				data-testid="notification-container"
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

export const BannerArea = () => {
	const { banners } = useContext(NotificationContext)
	return (
		<header id="banner-container" data-testid="banner-container">
			{banners.map(({ props, id }) => (
				<Banner {...props} key={id} />
			))}
		</header>
	)
}

function notificationReducer(
	state: NotificationInCollection[],
	action: {
		type: NotificationReducerAction
		payload: NotificationInCollection
	},
): NotificationInCollection[] {
	switch (action.type) {
		case NotificationReducerAction.PUSH:
			return [...state, action.payload]
		case NotificationReducerAction.POP:
			return state.filter(toast => toast.id !== action.payload.id)
	}
}

function getSpawnAction(
	dispatch: (value: {
		type: NotificationReducerAction
		payload: NotificationInCollection
	}) => void,
) {
	return (props: ToastProps) => {
		const collectionId = nanoid()
		const newToast: NotificationInCollection = {
			id: collectionId,
			props: {
				...props,
				removeThisFromDom: () =>
					dispatch({
						type: NotificationReducerAction.POP,
						payload: {
							id: collectionId,
						} as NotificationInCollection,
					}),
			},
		}
		dispatch({ type: NotificationReducerAction.PUSH, payload: newToast })
	}
}

function useToast() {
	const [toasts, dispatch] = useReducer(
		notificationReducer,
		[] as NotificationInCollection[],
	)
	const spawnToast = getSpawnAction(dispatch)

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

	const spawnModal = getSpawnAction(dispatch)

	return {
		spawnModal,
		modals,
	}
}

function useBanner() {
	const [banners, dispatch] = useReducer(
		notificationReducer,
		[] as NotificationInCollection[],
	)

	const spawnBanner = getSpawnAction(dispatch)

	return {
		spawnBanner,
		banners,
	}
}
