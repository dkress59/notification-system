import { Component, h, Host, JSX, Method, State } from '@stencil/core'

import { NotificationType } from '../../types'

@Component({
	tag: 'banner-area',
	styleUrl: 'banner-area.scss',
	shadow: true,
})
export class BannerArea {
	@State() banners: string[] = []

	// eslint-disable-next-line @stencil/required-jsdoc
	@Method()
	async spawnBanner({
		autoHide,
		autoHideAfterMs,
		content,
		headline,
		type,
	}: {
		autoHide?: boolean
		autoHideAfterMs?: number
		content: string
		headline?: string
		type?: NotificationType
	}): Promise<void> {
		const attributes: string[] = []
		if (autoHide) attributes.push(`auto-hide="${autoHide}"`)
		if (autoHideAfterMs)
			attributes.push(`auto-hide-after-ms="${autoHideAfterMs}"`)
		if (headline) attributes.push(`headline="${headline}"`)
		if (type) attributes.push(`type="${type}"`)
		const newBanner = `<notify-banner ${attributes.join(
			' ',
		)}>${content}</notify-banner>`
		this.banners = [newBanner, ...this.banners]
		return Promise.resolve()
	}

	private getBanners(): JSX.Element {
		return (<span innerHTML={this.banners.join('\n')} />) as JSX.Element
	}

	render(): JSX.Element {
		return (
			<Host>
				<slot />
				{this.getBanners()}
			</Host>
		) as JSX.Element
	}
}
