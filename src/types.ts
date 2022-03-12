export enum ToastType {
	SUCCESS = 'success',
	INFO = 'info',
	ERROR = 'error',
	WARNING = 'warning',
}

export interface ToastProps {
	type?: ToastType
}
