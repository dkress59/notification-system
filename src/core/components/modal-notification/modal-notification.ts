import { NotificationEvent, NotificationType } from '../../types'
import {
	getClosingButtonElement,
	getHeadlineElement,
	getIconElement,
	getStyleElement,
	setAriaRole,
} from '../../utils'
import css from './modal-notification.scss'

export class HTMLModalNotificationElement extends HTMLElement {
	/**
	 * If provided, the modal will be rendered with a headline
	 * which is styled slightly more prominent than the body text.
	 */
	public headline: string
	/**
	 * The notification-type of the modal
	 * (success | info | warning | error).
	 */
	public type: NotificationType
	/**
	 * Whether to show the 'Confirm'-button.
	 */
	public showConfirm: boolean
	/**
	 * Whether to show the 'Decline'-button.
	 */
	public showDecline: boolean
	/**
	 * Label for the 'Confirm'-button
	 */
	public labelConfirm = 'Confirm'
	/**
	 * Label for the 'Decline'-button
	 */
	public labelDecline = 'Decline'
	/**
	 * If set to 'false' the 'Confirm'-button will be disabled.
	 */
	public condition: boolean | undefined = undefined

	private readonly hiddenClassName = 'hidden'
	private isHiding = true

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	static get observedAttributes() {
		return ['condition', 'headline', 'type']
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
		return getClosingButtonElement(() => this.dismiss())
	}

	private _confirmTriggeredFinal(): void {
		if (this.condition !== false)
			this.dispatchEvent(
				new Event(NotificationEvent.MODAL_CONFIRMED, {
					bubbles: true,
					composed: true,
				}),
			)
		this.dismiss()
	}

	private _declineTriggeredFinal(): void {
		this.dispatchEvent(
			new Event(NotificationEvent.MODAL_DECLINED, {
				bubbles: true,
				composed: true,
			}),
		)
		this.dismiss()
	}

	private _getFooter() {
		const footerElement = document.createElement('footer')
		if (this.showConfirm) {
			const confirmButton = document.createElement('button')
			confirmButton.classList.add('confirm')
			if (!this.condition) confirmButton.setAttribute('disabled', '')
			confirmButton.setAttribute('data-testid', 'btn-confirm')
			confirmButton.addEventListener('mousedown', () =>
				this._confirmTriggeredFinal(),
			)
			confirmButton.addEventListener('keydown', event => {
				if (event.key.toLowerCase() === 'enter')
					this._confirmTriggeredFinal()
			})
			confirmButton.innerHTML = this.labelConfirm
			footerElement.appendChild(confirmButton)
		}
		if (this.showDecline) {
			const declineButton = document.createElement('button')
			declineButton.classList.add('decline')
			if (!this.condition) declineButton.setAttribute('disabled', '')
			declineButton.setAttribute('data-testid', 'btn-decline')
			declineButton.addEventListener('mousedown', () =>
				this._declineTriggeredFinal(),
			)
			declineButton.addEventListener('keydown', event => {
				if (event.key.toLowerCase() === 'enter')
					this._declineTriggeredFinal()
			})
			declineButton.innerHTML = this.labelDecline
			footerElement.appendChild(declineButton)
		}
		return footerElement
	}

	/** Entirely dismisses the modal from the DOM */
	public dismiss(): void {
		this.isHiding = true
		this.addEventListener('transitionend', () => {
			this.dispatchEvent(
				new Event(NotificationEvent.MODAL_DISMISSED, {
					bubbles: true,
					composed: true,
				}),
			)
			this.remove()
		})
		this._render()
	}

	connectedCallback(): void {
		setAriaRole(this)

		this.style.transition = 'none'
		this._render()
		setTimeout(() => {
			this.style.transition = ''
			this.isHiding = false
			this._render()
		})
	}

	attributeChangedCallback() {
		this._render()
	}

	_render(): void {
		this.className = this._getClassName()

		this.condition = this.getAttribute('condition') !== 'false'
		if (this.hasAttribute('headline'))
			this.headline = this.getAttribute('headline')!
		if (this.hasAttribute('label-confirm'))
			this.labelConfirm = this.getAttribute('label-confirm')!
		if (this.hasAttribute('label-decline'))
			this.labelDecline = this.getAttribute('label-decline')!
		this.showConfirm =
			this.hasAttribute('show-confirm') &&
			this.getAttribute('show-confirm') !== 'false'
		this.showDecline =
			this.hasAttribute('show-decline') &&
			this.getAttribute('show-decline') !== 'false'
		this.type =
			(this.getAttribute('type') as NotificationType | null) ??
			NotificationType.SUCCESS

		if (this.shadowRoot) this.shadowRoot.innerHTML = ''
		this.shadowRoot?.appendChild(this._getStyle())
		if (this._getHeadline())
			this.shadowRoot?.appendChild(this._getHeadline()!)
		this.shadowRoot?.appendChild(this._getIcon())
		const slotSection = document.createElement('section')
		slotSection.appendChild(document.createElement('slot'))
		this.shadowRoot?.appendChild(slotSection)
		this.shadowRoot?.appendChild(this._getButton())
		if (this.showConfirm || this.showDecline)
			this.shadowRoot?.appendChild(this._getFooter())
	}
}

customElements.define('modal-notification', HTMLModalNotificationElement)
