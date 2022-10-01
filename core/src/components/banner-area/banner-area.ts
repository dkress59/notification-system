import { SpawnBannerArgs } from '../../types'
import { getStyleElement } from '../../utils'
import { BannerNotification } from '../banner-notification/banner-notification'
import css from './banner-area.scss'

export class BannerArea extends HTMLElement {
	public shadowRoot: ShadowRoot

	private banners: BannerNotification[] = []

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	private _getStyle() {
		return getStyleElement(css)
	}

	/**
	 * Takes the `<banner-notification />`-component's props in camelCase as an argument
	 */
	public spawnBanner({
		autoHide,
		autoHideAfterMs,
		content,
		headline,
		type,
	}: SpawnBannerArgs): void {
		const newBanner = document.createElement('banner-notification')
		if (autoHide !== undefined)
			newBanner.setAttribute(
				'auto-hide',
				String(!!autoHide && autoHide !== 'false'),
			)
		if (autoHideAfterMs)
			newBanner.setAttribute(
				'auto-hide-after-ms',
				String(autoHideAfterMs),
			)
		if (headline) newBanner.setAttribute('headline', headline)
		if (type) newBanner.setAttribute('type', type)
		newBanner.innerHTML = content
		this.banners = [newBanner, ...this.banners]
		this._render()
	}

	connectedCallback() {
		this._render()
	}

	_render(): void {
		this.shadowRoot.innerHTML = ''

		this.shadowRoot.appendChild(this._getStyle())
		this.shadowRoot.appendChild(document.createElement('slot'))
		this.banners.forEach(banner => this.shadowRoot.appendChild(banner))
	}
}

customElements.define('banner-area', BannerArea)
