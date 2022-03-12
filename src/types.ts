import { PropsWithChildren } from 'react'

export enum ToastType {
	SUCCESS = 'success',
	INFO = 'info',
	ERROR = 'error',
	WARNING = 'warning',
}

export type ToastProps = PropsWithChildren<{
	autoHide?: boolean
	type?: ToastType
	title?: string | JSX.Element
}>

export type SpawnToastProps = PropsWithChildren<{
	type?: ToastType
	title?: string | JSX.Element
}>
