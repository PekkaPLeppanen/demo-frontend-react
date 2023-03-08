import { ArticleProvider, useArticle } from './article-context'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { articleResponseMock } from 'resources/test-data/articles'

const ArticleContextChild = (): JSX.Element => {
  const {selectedArticle, selectArticle} = useArticle()

  return (
    <>
      {
        (selectedArticle)
          ? <>
            <span data-testid="title">{selectedArticle.title}</span>
            <span data-testid="body">{selectedArticle.body}</span>
          </>
          : <span data-testid="empty">No article</span>
      }
      <button onClick={() => selectArticle(articleResponseMock[0])}>Select</button>
    </>
  )
}

describe('ArticleContextProvider', () => {
  test('context model', async () => {
    const TestComponent = (): JSX.Element => (
      <ArticleProvider>
        <ArticleContextChild/>
      </ArticleProvider>
    )
    render(<TestComponent/>)
    expect(screen.getByTestId('empty')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByTestId('empty')).not.toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('body')).toBeInTheDocument()
  })
})
