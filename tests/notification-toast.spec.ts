class CustomElement extends window.HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot!.innerHTML = '<template><slot /></template>'
	}
}

describe('jest', () => {
	it('is working', () => {
		window.customElements.define('custom-element', CustomElement)

		const defaultElement = document.createElement('custom-element')
		expect(
			defaultElement.shadowRoot!.querySelector('template'),
		).toContainHTML('<slot>')
	})
})
describe('<toast-notification />', () => {
	it('matches snapshot', () => {
		const notification = document.createElement('toast-notification')
		document.body.appendChild(notification)
		expect(document.body.innerHTML).toMatchSnapshot()
		const element = document.body.querySelector('toast-notification')!
		expect(element.shadowRoot?.innerHTML).toMatchSnapshot()
	})
})
