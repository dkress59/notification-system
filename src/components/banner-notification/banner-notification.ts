import { NotificationEvent } from '../../types'
import { getStyleElement } from '../../utils'
import { ToastNotification } from '../toast-notification/toast-notification'
import css from './banner-notification.scss'

export class BannerNotification extends ToastNotification {
	_getStyle() {
		return getStyleElement(css)
	}

	constructor() {
		super()
		this.element = this
	}

	/** Entirely dismisses the banner from the DOM */
	public dismiss(): void {
		this.isHiding = true
		this.addEventListener('transitionend', () => {
			this.dispatchEvent(
				new Event(NotificationEvent.BANNER_DISMISSED, {
					bubbles: true,
					composed: true,
				}),
			)
			this.remove()
		})
		this._render()
	}
}

customElements.define('banner-notification', BannerNotification)
