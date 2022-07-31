import { DetailedHTMLProps, HTMLAttributes } from 'react'

type CustomHTMLAttributes<
	T,
	K = void | Record<string, unknown>,
> = DetailedHTMLProps<HTMLAttributes<T> & K, T>

export type BannerAreaAttributes = CustomHTMLAttributes<HTMLBannerAreaElement>

export type NotificationAreaAttributes =
	CustomHTMLAttributes<HTMLNotificationAreaElement>

export type BannerNotificationAttributes =
	CustomHTMLAttributes<HTMLBannerNotificationElement>

export type ModalNotificationAttributes =
	CustomHTMLAttributes<HTMLModalNotificationElement>

export type ToastNotificationAttributes =
	CustomHTMLAttributes<HTMLToastNotificationElement>

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
