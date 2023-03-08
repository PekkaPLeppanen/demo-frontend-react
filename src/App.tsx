import React from 'react'
import { ArticleList } from 'articles/article-list'
import { ArticleProvider } from './articles/article-context'

function App() {
  return (
    <>
      <main>
        <ArticleProvider>
          <ArticleList/>
        </ArticleProvider>
      </main>
    </>
  )
}

export default App
