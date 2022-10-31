import * as components from '../src/core/components/index'

describe('index', () => {
	it('exports components', () => {
		expect(components.HTMLBannerAreaElement).toBeDefined()
		expect(components.HTMLBannerNotificationElement).toBeDefined()
		expect(components.HTMLModalNotificationElement).toBeDefined()
		expect(components.HTMLNotificationAreaElement).toBeDefined()
		expect(components.HTMLNotificationAreaElement).toBeDefined()
	})
})
