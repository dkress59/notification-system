import {
	HTMLBannerAreaElement,
	HTMLBannerNotificationElement,
	HTMLModalNotificationElement,
	HTMLNotificationAreaElement,
	HTMLToastNotificationElement,
} from './components'

type SnakeToCamelCaseProp<S extends string> = S extends
	| `${infer T} ${infer U}`
	| `${infer T}-${infer U}`
	? `${Uncapitalize<T>}${Capitalize<SnakeToCamelCaseProp<U>>}`
	: Uncapitalize<S>
type SnakeToCamelCase<T> = {
	[K in keyof T as SnakeToCamelCaseProp<K & string>]: T[K]
}

export enum NotificationType {
	SUCCESS = 'success',
	INFO = 'info',
	ERROR = 'error',
	WARNING = 'warning',
}

export enum NotificationEvent {
	BANNER_DISMISSED = 'bannerDismissed',
	MODAL_CONFIRMED = 'modalConfirmed',
	MODAL_DECLINED = 'modalDeclined',
	MODAL_DISMISSED = 'modalDismissed',
	TOAST_DISMISSED = 'toastDismissed',
}

type SpawnArgs<T> = T & {
	content: string
}

export interface BannerAttributes {
	'auto-hide'?: boolean | string
	'auto-hide-after-ms'?: number | string
	'headline'?: string
	'type'?: NotificationType
}
export type SpawnBannerArgs = SpawnArgs<SnakeToCamelCase<BannerAttributes>>

export interface ModalAttributes {
	'condition'?: boolean
	'headline'?: string
	'show-confirm'?: boolean
	'show-decline'?: boolean
	'type'?: NotificationType
	'label-confirm'?: string
	'label-decline'?: string
}
export type SpawnModalArgs = SpawnArgs<SnakeToCamelCase<ModalAttributes>>

export interface ToastAttributes {
	'auto-hide'?: boolean | string
	'auto-hide-after-ms'?: number | string
	'headline'?: string
	'type'?: NotificationType
}
export type SpawnToastArgs = SpawnArgs<SnakeToCamelCase<ToastAttributes>>

declare global {
	interface HTMLElementTagNameMap {
		'banner-area': HTMLBannerAreaElement
		'banner-notification': HTMLBannerNotificationElement
		'modal-notification': HTMLModalNotificationElement
		'notification-area': HTMLNotificationAreaElement
		'toast-notification': HTMLToastNotificationElement
	}
}
