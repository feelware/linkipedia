import {
  Box,
  Title,
  Loader,
  Center,
  Image,
  Text,
  ScrollArea,
} from '@mantine/core'

const Article = ({ 
  hue,
  summary,
  isFetchingSummary, 
}) => {

  if (isFetchingSummary) {
    return (
      <>
        <Center h='100%'>
          <Loader
            color={`hsl(${hue}, 50%, 50%)`} 
            size={40} 
          />
        </Center>
      </>
    )
  }

  if (!summary.pageid) {
    return (
      <>
        <Center h='100%'>
          <Text size='sm' c='dimmed'>
            This WikiData item has no associated Wikipedia article
          </Text>
        </Center>
      </>
    )
  }
  
  return (
    <>
      <ScrollArea h='100%'>
        <Box 
          my={30}
          mx={20}
        >
          <Title>
            {summary.title}
          </Title>

          <Text
            size='sm'
            c='dimmed'
            pt={12}
          >
            {summary.description}
          </Text>

          <div 
            dangerouslySetInnerHTML={{ 
              __html: summary.extract_html 
            }} 
          />

          {
            summary.originalimage &&
            <Image  
              src={summary.originalimage.source}
            />
          }
        </Box>
      </ScrollArea>
    </>
  )
}

export default Article

import propTypes from 'prop-types'

Article.propTypes = {
  hue: propTypes.number,
  summary: propTypes.object,
  images: propTypes.array,
  isFetchingSummary: propTypes.bool
}