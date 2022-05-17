import jsx from 'texsaur'

import { NotificationType } from '../../types'
import {
	getButtonElement,
	getHeadlineElement,
	getIconElement,
	getStyleElement,
} from '../../utils'
import css from './modal-notification.scss'

export class ModalNotification extends HTMLElement {
	public shadowRoot: ShadowRoot

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

	/**
	 * Used for transitioning in and out.
	 */
	private isHiding = true

	private hiddenClassName = 'hidden'

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
		return getButtonElement(() => this.dismiss())
	}

	private _confirmTriggeredFinal(): void {
		if (this.condition !== false)
			this.dispatchEvent(
				new Event('confirmTriggered', {
					bubbles: true,
					composed: true,
				}),
			)
		this.dismiss()
	}

	private _declineTriggeredFinal(): void {
		this.dispatchEvent(
			new Event('declineTriggered', { bubbles: true, composed: true }),
		)
		this.dismiss()
	}

	private _getFooter() {
		return (
			<footer>
				{!!this.showConfirm && (
					<button
						class="confirm"
						disabled={this.condition === false}
						data-testid="confirm-button"
						onmousedown={() => this._confirmTriggeredFinal()}
						onkeydown={event => {
							if (event.key.toLowerCase() === 'enter')
								this._confirmTriggeredFinal()
						}}
					>
						{this.labelConfirm}
					</button>
				)}
				{!!this.showDecline && (
					<button
						class="decline"
						data-testid="decline-button"
						onmousedown={() => this._declineTriggeredFinal()}
						onkeydown={event => {
							if (event.key.toLowerCase() === 'enter')
								this._declineTriggeredFinal()
						}}
					>
						{this.labelDecline}
					</button>
				)}
			</footer>
		)
	}

	/** Entirely dismisses the modal from the DOM */
	public dismiss(): void {
		this.isHiding = true
		this.addEventListener('transitionend', () => {
			this.dispatchEvent(
				new Event('modalDismissed', { bubbles: true, composed: true }),
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
	}

	attributeChangedCallback() {
		this._render()
	}

	_render(): void {
		this.className = this._getClassName()

		if (this.hasAttribute('condition'))
			this.condition = this.getAttribute('condition') === 'true'
		if (this.hasAttribute('headline'))
			this.headline = this.getAttribute('headline')!
		if (this.hasAttribute('label-confirm'))
			this.labelConfirm = this.getAttribute('label-confirm')!
		if (this.hasAttribute('label-decline'))
			this.labelDecline = this.getAttribute('label-decline')!
		this.showConfirm = this.getAttribute('show-confirm') === 'true'
		this.showDecline = this.getAttribute('show-decline') === 'true'
		this.type =
			(this.getAttribute('type') as NotificationType | null) ??
			NotificationType.SUCCESS

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
		this.shadowRoot.appendChild(this._getButton())
		if (this.showConfirm || this.showDecline)
			this.shadowRoot.appendChild(this._getFooter())
	}
}

customElements.define('modal-notification', ModalNotification)
