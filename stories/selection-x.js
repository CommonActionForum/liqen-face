import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SelectionHandler from '../client/components/annotators/text-annotator/selection-handler'
import SelectionMultiMarker from '../client/components/annotators/text-annotator/selection-multi-marker'

storiesOf('SelectionHandler', module)
  .add('Normal behaviour', () => (
    <SelectionHandler onSelect={action('select')}>
      This is a text that can be selected
    </SelectionHandler>
  ))

storiesOf('SelectionMultimarker', module)
  .add('plain text with 1 fragment', () => {
    const frg = [
      {
        fragment: {
          prefix: 'Hola ',
          exact: 'multi',
          suffix: 'mundo'
        },
        nodeRef: action('ref 1.1')
      }
    ]
    return (
      <SelectionMultiMarker annotations={frg}>
        Hola multimundo
      </SelectionMultiMarker>
    )
  })
  .add('plain text with 1+ fragments', () => {
    const frg = [
      {
        fragment: {
          prefix: 'Hola ',
          exact: 'multi',
          suffix: 'mundo'
        },
        nodeRef: action('ref 2.1')
      },
      {
        fragment: {
          prefix: '',
          exact: 'Hola',
          suffix: ' multimundo'
        },
        nodeRef: action('ref 2.2')
      },
      {
        fragment: {
          prefix: 'Hola multi',
          exact: 'mundo',
          suffix: ''
        },
        nodeRef: action('ref 2.3')
      }
    ]
    return (
      <SelectionMultiMarker annotations={frg}>
        Hola multimundo
      </SelectionMultiMarker>
    )
  })
  .add('node with 1 fragment', () => {
    const frg = [
      {
        fragment: {
          prefix: 'Hola ',
          exact: 'multi',
          suffix: 'mundo'
        },
        nodeRef: action('ref 3.1')
      }
    ]
    return (
      <SelectionMultiMarker annotations={frg}>
        <p>Hola multimundo</p>
      </SelectionMultiMarker>
    )
  })
  .add('array with 1 fragment', () => {
    const frg = [
      {
        fragment: {
          prefix: 'Hola ',
          exact: 'multi',
          suffix: 'mundo'
        },
        nodeRef: action('ref 4.1')
      }
    ]
    return (
      <SelectionMultiMarker annotations={frg}>
        <p>Hola <strong>mul</strong>timundo</p>
      </SelectionMultiMarker>
    )
  })
  .add('array with 1+ fragment', () => {
    const frg = [
      {
        fragment: {
          prefix: 'Hola ',
          exact: 'multi',
          suffix: 'mundo'
        },
        nodeRef: console.log
      },
      {
        fragment: {
          prefix: '',
          exact: 'Hola',
          suffix: ' multimundo'
        },
        nodeRef: console.log
      },
      {
        fragment: {
          prefix: 'Hola multi',
          exact: 'mundo',
          suffix: ''
        },
        nodeRef: console.log
      },
      {
        fragment: {
          prefix: 'inexistent',
          exact: 'inexistent',
          suffix: 'inexistent'
        },
        nodeRef: console.log
      }
    ]

    return (
      <SelectionMultiMarker annotations={frg}>
        <p>Hola <strong>mul</strong>timundo</p>
      </SelectionMultiMarker>
    )
  })
