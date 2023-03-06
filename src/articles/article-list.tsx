import { getAllArticles, IArticle } from 'resources/article-provider'
import 'articles/article-list.scss'
import React, { useEffect, useState } from 'react'
import { Article } from './article'

export function ArticleList(): JSX.Element {

  const [articles, setArticles] = useState<IArticle[]>([])
  const [selectedArticle, setSelectedArticle] = useState<IArticle>();

  useEffect(() => {
    getAllArticles()
      .then(articles => {
        setArticles(articles)
      })
  }, [])

  return (
    <>
      <h1>Latest topics</h1>
      {selectedArticle && <Article article={selectedArticle}/>}
      {articles.length === 0
        ? <p>Loading...</p>
        : <ul className="article-list">
          {articles.map((article) =>
            (
              <li className="article-list__item" key={article.id} onClick={() => setSelectedArticle(article)}>
                {article.title}
              </li>
            ))}
        </ul>
      }
    </>
  )
}
