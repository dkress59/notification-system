import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'
import { NotificationProvider } from './hooks'

ReactDOM.render(
	<React.StrictMode>
		<NotificationProvider>
			<App />
		</NotificationProvider>
	</React.StrictMode>,
	document.getElementById('app'),
)
