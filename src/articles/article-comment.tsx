import { type IArticleComment } from 'resources/article-provider'
import 'articles/article-comment.scss'

export interface ArticleCommentProps {
  comment: IArticleComment
}

export function ArticleComment({comment}: ArticleCommentProps): JSX.Element {
  return (
    <div className="article-comment">
      <div className="article-comment__email">{comment.email}</div>
      <div className="article-comment__body">{comment.body}</div>
    </div>
  )
}
