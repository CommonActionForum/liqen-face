import { configure } from '@storybook/react'

function loadStories () {
  require('../stories/index.js')
  require('../stories/new-design.js')
}

configure(loadStories, module)
