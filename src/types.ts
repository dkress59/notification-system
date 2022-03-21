import { PropsWithChildren } from 'react'

export enum NotificationType {
	SUCCESS = 'success',
	INFO = 'info',
	ERROR = 'error',
	WARNING = 'warning',
}

export type FinalNotificationProps = PropsWithChildren<{
	autoHide?: boolean
	type?: NotificationType
	title?: string | JSX.Element
	removeToastFromDom: () => void
}>
export type NotificationProps = Omit<
	FinalNotificationProps,
	'removeToastFromDom'
>

export enum ToastAction {
	PUSH = 'push',
	POP = 'pop',
}

export interface NotificationInCollection {
	id: string
	props: FinalNotificationProps
}

export interface NotificationContextType {
	toasts: NotificationInCollection[]
	spawnToast: (props: NotificationProps) => void
	modals: NotificationInCollection[]
	spawnModal: (props: NotificationProps) => void
}
