import { HTMLAttributes, MutableRefObject, PropsWithChildren } from 'react'

import {
	BannerArea,
	BannerNotification,
	ModalNotification,
	NotificationArea,
	ToastNotification,
} from ':core/components'
import {
	BannerAttributes,
	ModalAttributes,
	SpawnBannerArgs,
	SpawnModalArgs,
	SpawnToastArgs,
	ToastAttributes,
} from ':core/types'

type HtmlElementToReactNode<T = unknown> = HTMLAttributes<T> &
	PropsWithChildren<T> & {
		ref?: MutableRefObject<null | T>
	}

export type BannerAreaProps = PropsWithChildren & {
	ref?: MutableRefObject<null | BannerArea>
}

export type NotificationAreaProps = PropsWithChildren & {
	ref?: MutableRefObject<null | NotificationArea>
}

export interface BannerNotificationProps
	extends PropsWithChildren,
		Omit<SpawnBannerArgs, 'content'> {
	onDismiss?: () => void
	ref?: MutableRefObject<null | BannerNotification>
}

export type ToastNotificationProps = PropsWithChildren<
	Omit<SpawnToastArgs, 'content'> & {
		onDismiss?: () => void
		ref?: MutableRefObject<null | ToastNotification>
	}
>

export interface ModalNotificationProps
	extends PropsWithChildren,
		Omit<SpawnModalArgs, 'content'> {
	onConfirm?: () => void
	onDecline?: () => void
	onDismiss?: () => void
	ref?: MutableRefObject<null | ModalNotification>
}

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			['banner-area']: HtmlElementToReactNode
			['notification-area']: HtmlElementToReactNode
			['banner-notification']: HtmlElementToReactNode<BannerAttributes>
			['modal-notification']: HtmlElementToReactNode<ModalAttributes>

			['toast-notification']: HtmlElementToReactNode<ToastAttributes>
		}
	}
}
