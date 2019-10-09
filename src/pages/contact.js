import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import PageFooter from "../components/pagefooter"

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" keywords={[`javascript`, `application`, `joel lord`]} />
    <PageHeader
      title="Contact Me"
      subtitle="Got questions? I have answers (maybe)."
      image={require("../images/header-bg/contact-bg.jpg")}
    >
    </PageHeader>

    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          
          <p>Want to get in touch with me? I could certainly put up a form here but... meh, I'd get too much spam. If you want to get in touch, youo should try to <a href="https://twitter.com/joel__lord">tweet me</a> using the links at the bottom of this page.</p>

          Quite frankly, it might be easier by <a href="mailto:me@joel-lord.com">email</a>.



        </div>
      </div>
    </div>

    <PageFooter />
    
  </Layout>
)

export default ContactPage
