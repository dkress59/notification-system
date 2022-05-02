import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import { DemoApp } from './demo-app'
import { NotificationProvider } from './hooks'

ReactDOM.render(
	<React.StrictMode>
		<NotificationProvider>
			<DemoApp />
		</NotificationProvider>
	</React.StrictMode>,
	document.getElementById('app'),
)
