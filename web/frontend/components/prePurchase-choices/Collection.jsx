
import { useState, useEffect, useCallback } from 'react'
import {
    AlphaCard,
    Text,
    Banner,
    VerticalStack,
    Divider,
    Select

} from '@shopify/polaris'


const Collection = () => {
    useEffect(() => {
        fetch('/api/collections')
            .then((response) => response.json())
            .then((data) => console.log(data.products));
    }, []);

    const [collection, setCollection] = useState('')
    const handleSelectChange = useCallback(
        (value) => setCollection(value),
        [],
    );

  return (
    <AlphaCard>
        <VerticalStack gap="3">
            <Text variant='headingLg'>Choose Collection</Text>
            <Divider/>
            </VerticalStack>
    </AlphaCard>
  )
}

export default Collection