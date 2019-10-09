import PropTypes from "prop-types"
import React from "react"

const PageFooter = () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <ul className="list-inline text-center">
            <li>
              <a href="http://www.twitter.com/joel__lord">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
              </a>
            </li>
            <li>
              <a href="https://ca.linkedin.com/in/joel-lord-9099b232">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-linkedin fa-stack-1x fa-inverse"></i>
                                </span>
              </a>
            </li>
            <li>
              <a href="http://www.github.com/joellord">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                                </span>
              </a>
            </li>
            <li>
              <a href="mailto:me@joel-lord.com">
                            <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-envelope fa-stack-1x fa-inverse"></i>
                            </span>
              </a>
            </li>
          </ul>
          <p className="copyright text-muted">Copyright &copy; Joel Lord <span>{(new Date()).getFullYear()}</span></p>
          <p className="copyright text-muted">Built on top of <a href="http://startbootstrap.com/template-overviews/clean-blog/">Clean Blog</a></p>
          <p className="copyright text-muted">Using <a href="https://gatsbyjs.org">Gatsby.js</a></p>
        </div>
      </div>
    </div>
  </footer>
)

PageFooter.propTypes = {
  siteTitle: PropTypes.string,
}

PageFooter.defaultProps = {
  siteTitle: ``,
}

export default PageFooter
