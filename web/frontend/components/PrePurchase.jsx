import {useState, useCallback} from 'react'
import {
    AlphaCard,
    Text,
    Banner,
    VerticalStack,
    Divider,
    Select

} from '@shopify/polaris'
import Collection from './prePurchase-choices/Collection'

const PrePurchase = () => {

    const [choice, setChoice] = useState('')
    const handleSelectChange = useCallback(
      (value) => setChoice(value),
      [],
    );
    const options = [
        {label: 'Choose Your Pre-Purchase Method', value: 'default'},
        {label: 'By Collection', value: 'Collection'},
        {label: 'By Product Tags', value: 'Tags'}, 
        {label: 'Select Individual Collection', value: 'Custom'},
      ]
      

    return (
      <VerticalStack gap="3">
        <AlphaCard>
            <Text variant='heading2xl'>Pre-Purchase</Text>
        </AlphaCard>
        <AlphaCard>
          <VerticalStack gap="3">

            <Text variant='headingLg'>Choose Products To Show in Pre-Purchase Section</Text>
            <Divider/>
            <Select
              options={options}
              onChange={handleSelectChange}
              value={choice}
            />
          </VerticalStack>
        </AlphaCard>
        {
          choice === 'Collection' ? 
          <Collection/>
          : null
        }
        {
          choice === 'Tags' ?
          <AlphaCard>
            <VerticalStack gap="3">
              <Text variant='headingLg'>Choose Tags</Text>
              <Divider/>
              <Select
                label="Choose Your Tags"
                options={options}
                onChange={handleSelectChange}
                value={choice}
              />
              </VerticalStack>
          </AlphaCard>
          : null
        }
      </VerticalStack>
      );
}

export default PrePurchase