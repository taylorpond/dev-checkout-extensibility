import React from 'react'

import{
    Banner
} from '@shopify/checkout-ui-extensions-react'

const CustomBanner = ({title, description}) => {


  return (
    <Banner title={title}>
    {title}
  </Banner>
  )
}

export default CustomBanner