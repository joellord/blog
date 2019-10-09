import PropTypes from "prop-types"
import React from "react"

const PageHeader = ({ image, title, subtitle, isSmall }) => (
  <header className="intro-header" style={{ backgroundImage: `url('${image}')` }}>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <div className={isSmall ? "site-heading smaller-heading" : "site-heading"}>
            <h1>{ title }</h1>
            <hr className="small" />
            <span className="subheading">{ subtitle }</span>
          </div>
        </div>
      </div>
    </div>
  </header>
)

PageHeader.propTypes = {
  siteTitle: PropTypes.string,
}

PageHeader.defaultProps = {
  siteTitle: ``,
}

export default PageHeader
