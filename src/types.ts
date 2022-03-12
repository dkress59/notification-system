import { PropsWithChildren } from 'react'

export enum ToastType {
	SUCCESS = 'success',
	INFO = 'info',
	ERROR = 'error',
	WARNING = 'warning',
}

export type FinalToastProps = PropsWithChildren<{
	autoHide?: boolean
	type?: ToastType
	title?: string | JSX.Element
	removeToastFromDom: () => void
}>
export type ToastProps = Omit<FinalToastProps, 'removeToastFromDom'>

export enum ToastAction {
	PUSH = 'push',
	POP = 'pop',
}

export interface ToastInCollection {
	id: string
	props: ToastProps
}
