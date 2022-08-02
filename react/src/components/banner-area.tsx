import React, { forwardRef } from 'react'

import { BannerAreaProps } from '../types'

export const BannerArea = forwardRef<HTMLBannerAreaElement, BannerAreaProps>(
	({ children }, ref) => {
		return <banner-area ref={ref}>{children}</banner-area>
	},
)
BannerArea.displayName = 'BannerArea'
