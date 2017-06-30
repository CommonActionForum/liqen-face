import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import LiqenCreatorModal from '../client/components/liqen-creator/liqen-creator-modal'
import CallToAction from '../client/components/liqen-creator/call-to-action'

storiesOf('New design', module)
  .add('Liqen Creator Modal', () => (
    <LiqenCreatorModal />
  ))
  .add('Liqen Call to Action', () => (
    <nav className='navbar navbar-toggleable-md'>
      <a className="navbar-brand" href="#">Hidden brand</a>
      <ul className='navbar-nav mr-auto'>
        <li>Home</li>
      </ul>
      <CallToAction />
    </nav>
  ))
