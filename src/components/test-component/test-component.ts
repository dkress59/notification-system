import {
	getButtonElement,
	getHeadlineElement,
	getStyleElement,
} from '../../utils'
import css from './test-component.scss'

export class TestComponent extends HTMLElement {
	public shadowRoot: ShadowRoot

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	private getStyle() {
		return getStyleElement(css)
	}

	private getHeadline(headline: string) {
		return getHeadlineElement(headline)
	}

	private getButton() {
		return getButtonElement(() => alert('dismissed!'))
	}

	connectedCallback(): void {
		this.shadowRoot.appendChild(this.getStyle())
		this.shadowRoot.appendChild(this.getHeadline('Hello World')!)
		this.shadowRoot.appendChild(document.createElement('slot'))
		this.shadowRoot.appendChild(this.getButton())
	}
}

customElements.define('test-component', TestComponent)
