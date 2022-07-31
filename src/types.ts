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

export interface SpawnBannerProps {
	autoHide?: boolean | string
	autoHideAfterMs?: number | string
	content: string
	headline?: string
	type?: NotificationType
}

export interface SpawnModalProps {
	condition?: boolean
	content: string
	headline?: string
	showConfirm?: boolean
	showDecline?: boolean
	type?: NotificationType
	labelConfirm?: string
	labelDecline?: string
}

export interface SpawnToastProps {
	autoHide?: boolean | string
	autoHideAfterMs?: number | string
	content: string
	headline?: string
	type?: NotificationType
}
