import { getAllArticles, IArticle } from 'resources/article-provider'
import 'articles/article-list.scss'
import React, { useEffect, useState } from 'react'
import { Article } from 'articles/article'
import { useArticle } from 'articles/article-context'

export function ArticleList(): JSX.Element {

  const [articles, setArticles] = useState<IArticle[]>([])
  const {selectedArticle, selectArticle} = useArticle()

  useEffect(() => {
    getAllArticles()
      .then(articles => {
        setArticles(articles)
      })
  }, [])

  return (
    <>
      <h1>Latest topics</h1>
      {selectedArticle && <Article />}
      {articles.length === 0
        ? <p>Loading...</p>
        : <ul className="article-list">
          {articles.map((article) =>
            (
              <li className="article-list__item" key={article.id} onClick={() => selectArticle(article)}>
                {article.title}
              </li>
            ))}
        </ul>
      }
    </>
  )
}
