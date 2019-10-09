import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const BlogHeader = ({ bgImage, title, subtitle, author, formattedDate }) => (
  <header className="intro-header" style={{ backgroundImage: `url('${bgImage}')` }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <div className="post-heading smaller-heading">
            <h1>{ title }</h1>
            <h2 className="subheading">{ subtitle }</h2>
            <span className="meta">
              Posted by <Link to="/about">{ author }</Link> on <span>{ formattedDate }</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
)

BlogHeader.propTypes = {
  siteTitle: PropTypes.string,
}

BlogHeader.defaultProps = {
  siteTitle: ``,
}

export default BlogHeader
