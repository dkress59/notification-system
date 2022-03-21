import React from 'react'
import ReactDOM from 'react-dom'

import { DemoApp } from '../src/demo-app'
import { NotificationProvider } from '../src/hooks'

jest.mock('react-dom', () => ({ render: jest.fn() }))

describe('index.tsx', () => {
	it('mounts correctly', () => {
		const div = document.createElement('div')
		div.id = 'app'
		document.body.appendChild(div)
		require('../src/index.tsx')
		expect(ReactDOM.render).toHaveBeenCalledWith(
			<React.StrictMode>
				<NotificationProvider>
					<DemoApp />
				</NotificationProvider>
			</React.StrictMode>,
			div,
		)
	})
})
