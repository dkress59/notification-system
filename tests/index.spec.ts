import * as components from '../src/components/index'

describe('index', () => {
	it('exports components', () => {
		expect(components.BannerArea).toBeDefined()
		expect(components.BannerNotification).toBeDefined()
		expect(components.ModalNotification).toBeDefined()
		expect(components.NotificationArea).toBeDefined()
		expect(components.NotificationArea).toBeDefined()
	})
})
