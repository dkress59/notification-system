import { NotificationType } from '../../types'
import { getStyleElement } from '../../utils'
import css from './notification-area.scss'

export class NotificationArea extends HTMLElement {
	public shadowRoot: ShadowRoot

	private modal?: HTMLModalNotificationElement
	private toasts: HTMLToastNotificationElement[] = []

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	private _getStyle() {
		return getStyleElement(css)
	}

	/**
	 * Takes the `<toast-notification />`-component's props in camelCase as an argument
	 */
	public spawnToast({
		autoHide,
		autoHideAfterMs,
		content = '',
		headline,
		type,
	}: {
		autoHide?: boolean | string
		autoHideAfterMs?: number | string
		content: string
		headline?: string
		type?: NotificationType
	}): void {
		const newToast = document.createElement('toast-notification')
		if (autoHide !== undefined)
			newToast.setAttribute(
				'auto-hide',
				String(!!autoHide && autoHide !== 'false'),
			)
		if (autoHideAfterMs)
			newToast.setAttribute('auto-hide-after-ms', String(autoHideAfterMs))
		if (headline) newToast.setAttribute('headline', headline)
		if (type) newToast.setAttribute('type', type)
		newToast.innerHTML = content
		this.toasts = [newToast, ...this.toasts]
		this._render()
	}

	/**
	 * Takes the `<toast-notification />`-component's props in camelCase as an argument
	 */
	public spawnModal({
		condition,
		content = '',
		headline,
		showConfirm,
		showDecline,
		type,
		labelConfirm,
		labelDecline,
	}: {
		condition?: boolean
		content: string
		headline?: string
		showConfirm?: boolean
		showDecline?: boolean
		type?: NotificationType
		labelConfirm?: string
		labelDecline?: string
	}): void {
		const newModal = document.createElement('modal-notification')
		if (condition) newModal.setAttribute('condition', String(condition))
		if (headline) newModal.setAttribute('headline', headline)
		if (type) newModal.setAttribute('type', type)
		if (labelConfirm) newModal.setAttribute('label-confirm', labelConfirm)
		if (labelDecline) newModal.setAttribute('label-decline', labelDecline)
		if (showConfirm)
			newModal.setAttribute('show-confirm', String(showConfirm))
		if (showDecline)
			newModal.setAttribute('show-decline', String(showDecline))
		newModal.innerHTML = content
		this.modal = newModal
		this._render()
	}

	connectedCallback() {
		this._render()
	}

	_render(): void {
		this.shadowRoot.innerHTML = ''

		this.shadowRoot.appendChild(this._getStyle())
		this.shadowRoot.appendChild(document.createElement('slot'))
		this.toasts.forEach(toast => this.shadowRoot.appendChild(toast))
		if (this.modal) this.shadowRoot.appendChild(this.modal)
	}
}

customElements.define('notification-area', NotificationArea)
