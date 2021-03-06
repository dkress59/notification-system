import { PropsWithChildren } from 'react'

export enum NotificationType {
	SUCCESS = 'success',
	INFO = 'info',
	ERROR = 'error',
	WARNING = 'warning',
}

type FinalProps<T> = T & { removeThisFromDom: () => void }

export type ToastProps = PropsWithChildren<{
	autoHide?: boolean
	type?: NotificationType
	title?: string | JSX.Element
}>

export type FinalToastProps = FinalProps<ToastProps>

export type ModalProps = PropsWithChildren<{
	condition?: boolean
	labelConfirm?: string | JSX.Element
	labelDecline?: string | JSX.Element
	onConfirm?: () => void
	onDecline?: () => void
	type?: NotificationType
	title?: string | JSX.Element
}>

export type FinalModalProps = FinalProps<ModalProps>

export type BannerProps = ToastProps
export type FinalBannerProps = FinalToastProps

export enum NotificationReducerAction {
	PUSH = 'push',
	POP = 'pop',
}

export interface NotificationInCollection {
	id: string
	props: FinalToastProps
}

export interface NotificationContextType {
	toasts: NotificationInCollection[]
	spawnToast: (props: ToastProps) => void
	modals: NotificationInCollection[]
	spawnModal: (props: ModalProps) => void
	banners: NotificationInCollection[]
	spawnBanner: (props: BannerProps) => void
}
