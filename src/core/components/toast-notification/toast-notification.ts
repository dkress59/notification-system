import { NotificationEvent, NotificationType } from '../../types'
import {
	getClosingButtonElement,
	getHeadlineElement,
	getIconElement,
	getStyleElement,
	setAriaRole,
} from '../../utils'
import css from './toast-notification.scss'

export class HTMLToastNotificationElement extends HTMLElement {
	public element: this

	/**
	 * Whether to automatically hide the toast, or not.
	 * If false (or undefined), a dismiss-button will be rendered.
	 */
	public autoHide = false
	/**
	 * The time in milliseconds after which the toast shall be hidden
	 * (requires the auto-hide attribute to be set to "true").
	 */
	public autoHideAfterMs = 3000
	/**
	 * If provided, the toast will be rendered with a headline
	 * which is styled slightly more prominent than the body text.
	 */
	public headline?: string
	/**
	 * The notification-type of the toast
	 * (success | info | warning | error).
	 */
	public type?: NotificationType = NotificationType.SUCCESS

	readonly hiddenClassName = 'hidden'
	autoHideTimeout: NodeJS.Timeout | null = null
	isHiding = true

	constructor() {
		super()
		this.element = this
		this.element.attachShadow({ mode: 'open' })
	}

	static get observedAttributes() {
		return ['headline', 'type']
	}

	_getClassName(): string {
		const classNames = Array.from(this.element.classList).filter(
			className => className !== this.element.hiddenClassName,
		)
		if (this.element.isHiding) classNames.push(this.element.hiddenClassName)
		return classNames.join(' ')
	}

	_getStyle() {
		return getStyleElement(css)
	}

	_getHeadline() {
		return getHeadlineElement(this.element.headline)
	}

	_getIcon() {
		return getIconElement(this.element.type!)
	}

	_getButton() {
		if (!this.element.autoHide)
			return getClosingButtonElement(() => this.element.dismiss())
		return undefined
	}

	/** Entirely dismisses the toast from the DOM */
	public dismiss(): void {
		this.element.isHiding = true
		this.element.addEventListener('transitionend', () => {
			this.element.dispatchEvent(
				new Event(NotificationEvent.TOAST_DISMISSED, {
					bubbles: true,
					composed: true,
				}),
			)
			this.element.remove()
		})
		this.element._render()
	}

	connectedCallback(): void {
		setAriaRole(this.element)

		this.element.style.transition = 'none'
		this.element._render()
		setTimeout(() => {
			this.element.style.transition = ''
			this.element.isHiding = false
			this.element._render()
		})

		if (this.element.autoHide) {
			this.element.autoHideTimeout = setTimeout(() => {
				this.element.dismiss()
			}, this.element.autoHideAfterMs)
		}
	}

	attributeChangedCallback(): void {
		this.element._render()
	}

	disconnectedCallback(): void {
		if (this.element.autoHideTimeout)
			clearTimeout(this.element.autoHideTimeout)
	}

	_render(): void {
		this.element.className = this.element._getClassName()

		this.element.autoHide =
			this.element.hasAttribute('auto-hide') &&
			this.element.getAttribute('auto-hide') !== 'false'
		this.element.autoHideAfterMs =
			Number(this.element.getAttribute('auto-hide-after-ms')) || 3000
		this.element.type =
			(this.element.getAttribute('type') as NotificationType | null) ??
			NotificationType.SUCCESS
		const headline = this.element.getAttribute('headline')
		if (headline) this.element.headline = headline

		if (this.element.shadowRoot) this.element.shadowRoot.innerHTML = ''
		this.element.shadowRoot?.appendChild(this.element._getStyle())
		if (this.element._getHeadline())
			this.element.shadowRoot?.appendChild(this.element._getHeadline()!)
		this.element.shadowRoot?.appendChild(this.element._getIcon())
		const slotSection = document.createElement('section')
		slotSection.appendChild(document.createElement('slot'))
		this.element.shadowRoot?.appendChild(slotSection)
		if (this.element._getButton())
			this.element.shadowRoot?.appendChild(this.element._getButton()!)
	}
}

customElements.define('toast-notification', HTMLToastNotificationElement)
