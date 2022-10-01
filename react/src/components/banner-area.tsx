import React, { forwardRef } from 'react'

import { Elements } from '../../../core/src/components'
import { BannerAreaProps } from '../types'

export const BannerArea = forwardRef<
	Elements.HTMLBannerAreaElement,
	BannerAreaProps
>(({ children }, ref) => {
	return <banner-area ref={ref}>{children}</banner-area>
})
BannerArea.displayName = 'BannerArea'
