import { HTMLAttributes, MutableRefObject, PropsWithChildren } from 'react'

import {
	HTMLBannerAreaElement,
	HTMLBannerNotificationElement,
	HTMLModalNotificationElement,
	HTMLNotificationAreaElement,
	HTMLToastNotificationElement,
} from '../core/components'
import {
	BannerAttributes,
	ModalAttributes,
	SpawnBannerArgs,
	SpawnModalArgs,
	SpawnToastArgs,
	ToastAttributes,
} from '../core/types'

export type BannerAreaProps = PropsWithChildren & {
	ref?: MutableRefObject<null | HTMLBannerAreaElement>
}

export type NotificationAreaProps = PropsWithChildren & {
	ref?: MutableRefObject<null | HTMLNotificationAreaElement>
}

export interface BannerNotificationProps
	extends PropsWithChildren,
		Omit<SpawnBannerArgs, 'content'> {
	onDismiss?: () => void
	ref?: MutableRefObject<null | HTMLBannerNotificationElement>
}

export type ToastNotificationProps = PropsWithChildren<
	Omit<SpawnToastArgs, 'content'> & {
		onDismiss?: () => void
		ref?: MutableRefObject<null | HTMLToastNotificationElement>
	}
>

export interface ModalNotificationProps
	extends PropsWithChildren,
		Omit<SpawnModalArgs, 'content'> {
	onConfirm?: () => void
	onDecline?: () => void
	onDismiss?: () => void
	ref?: MutableRefObject<null | HTMLModalNotificationElement>
}

type HtmlElementToReactNode<T = unknown> = HTMLAttributes<T> &
	PropsWithChildren<T> & {
		ref?: MutableRefObject<null | T>
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
