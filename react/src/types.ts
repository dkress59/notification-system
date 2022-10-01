import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

import { Elements } from '../../core/src/components'
import {
	SpawnBannerProps,
	SpawnModalProps,
	SpawnToastProps,
} from '../../core/src/types'

type CustomHTMLAttributes<
	T,
	K = void | Record<string, unknown>,
> = DetailedHTMLProps<HTMLAttributes<T> & K, T>

export type BannerAreaAttributes =
	CustomHTMLAttributes<Elements.HTMLBannerAreaElement>

export type NotificationAreaAttributes =
	CustomHTMLAttributes<Elements.HTMLNotificationAreaElement>

export type BannerNotificationAttributes =
	CustomHTMLAttributes<Elements.HTMLBannerNotificationElement>

export type ModalNotificationAttributes =
	CustomHTMLAttributes<Elements.HTMLModalNotificationElement>

export type ToastNotificationAttributes =
	CustomHTMLAttributes<Elements.HTMLToastNotificationElement>

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			['banner-area']: BannerAreaAttributes
			['notification-area']: NotificationAreaAttributes
			['banner-notification']: BannerNotificationAttributes
			['modal-notification']: ModalNotificationAttributes
			['toast-notification']: ToastNotificationAttributes
		}
	}
}

export type BannerAreaProps = PropsWithChildren

export type NotificationAreaProps = PropsWithChildren

export interface BannerNotificationProps
	extends PropsWithChildren,
		Omit<SpawnBannerProps, 'content'> {
	onDismiss?: () => void
}

export interface ToastNotificationProps
	extends PropsWithChildren,
		Omit<SpawnToastProps, 'content'> {
	onDismiss?: () => void
}

export interface ModalNotificationProps
	extends PropsWithChildren,
		Omit<SpawnModalProps, 'content'> {
	onConfirm?: () => void
	onDecline?: () => void
	onDismiss?: () => void
}
