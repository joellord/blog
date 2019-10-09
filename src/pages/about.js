import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import PageFooter from "../components/pagefooter"

const AboutPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <PageHeader
      title="About me"
      subtitle="This is who I am"
      image={require("../images/header-bg/about-bg.jpg")}
    >
    </PageHeader>

    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          
        <p>In the mid-1990's, I had to find a "serious" job to provide for my kids.  Because I was told that there was a
          future in computer programming and because it's something that I tinkered with for years, I decided to go for that
          program at the local college.</p>
        <p>In 1999, I graduated and got my first job as a programmer.  I moved to the national capital region and worked
          for the government, just like every responsible adult did. </p>
        <p>I hated it</p>
        <p>A few years later, a series of events gave me to opportunity to change my life.  I decided to go back to
          school and do something that I was interested in.  I went for a bachelor degree in physics.</p>
        <p>As a student, I met this incredible prof who did computational astrophysics.  When I saw his work, I was
          fascinated by it and started working with him.  I did not realized it at that time but I fell in love
          with programming.</p>
        <p>Since then, I've been in the tech industry (and never worked in the astrophysics field) and whenever I
          can, I try to share this passion with people.</p>

        </div>
      </div>
    </div>

    <PageFooter />
    
  </Layout>
)

export default AboutPage
