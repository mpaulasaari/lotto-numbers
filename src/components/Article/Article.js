import React from 'react'
import PropTypes from 'prop-types'
import './Article.scss'

const Article = ({
  body,
  children,
  className,
  title
}) => {
  return (
    <article className={`${className} Article`}>
      {title ?
        <h2>{title}</h2>
        : null
      }
      {body
        ? <p className='Article-body'>{body}</p>
        : null
      }
      {children}
    </article>
  )
}

Article.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  body: PropTypes.node,
  title: PropTypes.string
}

Article.defaultProps = {
  body: '',
  className: '',
  title: ''
}

export default Article
