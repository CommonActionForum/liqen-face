import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import LiqenCreatorModal from '../client/components/liqen-creator/liqen-creator-modal'
import CallToAction from '../client/components/liqen-creator/call-to-action'

class InteractiveCTA extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: [
        {
          tag: 'Tag 1',
          required: true,
          annotations: 2
        },
        {
          tag: 'Tag 2',
          required: true,
          annotations: 0
        }
      ]
    }
  }

  change (i, value) {
    this.setState(prevState => {
      return {
        answer: prevState.answer.map((a, j) => ({
          tag: a.tag,
          required: a.required,
          annotations: i === j ? parseInt(value) : a.annotations
        }))
      }
    })
  }

  render () {
    return (
      <div>
        <nav className='navbar navbar-toggleable-md'>
          <a className="navbar-brand" href="#">Hidden brand</a>
          <ul className='navbar-nav mr-auto'>
            <li>Home</li>
          </ul>
          <CallToAction
            answer={this.state.answer}
          />
        </nav>

        <main>
          {
            this.state.answer.map((a, i) => (
              <div>
                <span>{a.tag}</span>
                <input
                  type='number'
                  onChange={(e) => this.change(i, e.target.value)}
                  value={a.annotations}
                />
              </div>
            ))
          }
        </main>
      </div>
    )
  }
}

storiesOf('New design', module)
  .add('Liqen Creator Modal', () => (
    <LiqenCreatorModal answer={[
      {
        tag: 'Tag 1',
        annotations: [
          {
            ref: 'a1',
            fragment: 'Annotation 1'
          }
        ]
      },
      {
        tag: 'Tag 2',
        annotations: [
          {
            ref: 'a2',
            fragment: 'Annotation 2'
          }
        ]
      },
      {
        tag: 'Tag 3',
        annotations: [
          {
            ref: 'a3',
            fragment: 'Annotation 3'
          },
          {
            ref: 'a4',
            fragment: 'Annotation 4'
          }
        ]
      }
    ]}/>
  ))
  .add('Liqen Call to Action', () => (
    <InteractiveCTA />
  ))
