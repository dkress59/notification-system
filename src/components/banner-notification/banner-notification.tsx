import jsx from 'texsaur'

import { NotificationType } from '../../types'
import {
	getButtonElement,
	getHeadlineElement,
	getIconElement,
	getStyleElement,
} from '../../utils'
import css from './banner-notification.scss'

export class BannerNotification extends HTMLElement {
	public shadowRoot: ShadowRoot

	/**
	 * Whether to automatically hide the banner, or not.
	 * If false (or undefined), a dismiss-button will be rendered.
	 */
	public autoHide: boolean
	/**
	 * The time in milliseconds after which the banner shall be hidden
	 * (requires the auto-hide attribute to be set to "true").
	 */
	public autoHideAfterMs: number
	/**
	 * If provided, the banner will be rendered with a headline
	 * which is styled slightly more prominent than the body text.
	 */
	public headline: string // REFLECT
	/**
	 * The notification-type of the banner
	 * (success | info | warning | error).
	 */
	public type: NotificationType = NotificationType.SUCCESS

	/**
	 * Used for transitioning in and out.
	 */
	private isHiding = true

	private hiddenClassName = 'hidden'
	private autoHideTimeout: NodeJS.Timeout | null = null

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	static get observedAttributes() {
		return ['headline', 'type']
	}

	private _getClassName(): string {
		const classNames = Array.from(this.classList).filter(
			className => className !== this.hiddenClassName,
		)
		if (this.isHiding) classNames.push(this.hiddenClassName)
		return classNames.join(' ')
	}

	private _getStyle() {
		return getStyleElement(css)
	}

	private _getHeadline() {
		return getHeadlineElement(this.headline)
	}

	private _getIcon() {
		return getIconElement(this.type)
	}

	private _getButton() {
		if (!this.autoHide) return getButtonElement(() => this.dismiss())
		return undefined
	}

	/** Entirely dismisses the banner entirely from the DOM */
	public dismiss(): void {
		this.isHiding = true
		this.addEventListener('transitionend', () => {
			this.dispatchEvent(
				new Event('bannerDismissed', { bubbles: true, composed: true }),
			)
			this.remove()
		})
		this._render()
	}

	connectedCallback(): void {
		this.style.transition = 'none'
		this._render()
		setTimeout(() => {
			this.style.transition = ''
			this.isHiding = false
			this._render()
		})

		if (this.autoHide) {
			this.autoHideTimeout = setTimeout(() => {
				this.dismiss()
			}, this.autoHideAfterMs)
		}
	}

	attributeChangedCallback() {
		this._render()
	}

	disconnectedCallback(): void {
		if (this.autoHideTimeout) clearTimeout(this.autoHideTimeout)
	}

	_render(): void {
		this.className = this._getClassName()

		this.autoHide =
			this.hasAttribute('auto-hide') &&
			this.getAttribute('auto-hide') !== 'false'
		this.autoHideAfterMs =
			Number(this.getAttribute('auto-hide-after-ms')) || 3000
		this.type =
			(this.getAttribute('type') as NotificationType | null) ??
			NotificationType.SUCCESS
		const headline = this.getAttribute('headline')
		if (headline) this.headline = headline

		this.shadowRoot.innerHTML = ''
		this.shadowRoot.appendChild(this._getStyle())
		if (this._getHeadline())
			this.shadowRoot.appendChild(this._getHeadline()!)
		this.shadowRoot.appendChild(this._getIcon())
		this.shadowRoot.appendChild(
			<section>
				<slot />
			</section>,
		)
		if (this._getButton()) this.shadowRoot.appendChild(this._getButton()!)
	}
}

customElements.define('banner-notification', BannerNotification)
