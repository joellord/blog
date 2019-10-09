import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import PageFooter from "../components/pagefooter"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`javascript`, `application`, `react`]} />
    <PageHeader
      title="Random thoughts from a random dev"
      subtitle="Ideas, tech stuff, robots, javascript and much more..."
      image={require("../images/header-bg/home-bg.jpg")}
    >
    </PageHeader>

    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          
          <p>This is my little space on the web.  It is meant to be the main page for my blog but all my other stuff as well.</p>
          <p>
            If you are interested in some of the stuff that I write, take a look a the <Link to="/blog">blogging</Link> section.
          </p>
          <p>
            If you are more interested in my speaker profile, by all means, take a look at my <Link to="/speaking">past and future</Link> presentations.
          </p>
          <p>And if you just want to contact me for any reason, drop me a <a href="mailto:me@joel-lord.com">mail</a>.</p>

        </div>
      </div>
    </div>

    <PageFooter />
    
  </Layout>
)

export default IndexPage
