import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import PageFooter from "../components/pagefooter"

export default function Blog({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  const shortList = [posts[0], posts[1]];
  return (
    <Layout>
      <SEO title="Blog" keywords={[`blog`, `javascript`, `react`]} />
      <PageHeader
        title="Blogging Area"
        subtitle="If you're not on the interwebs, you don't exist"
        image={require("../images/header-bg/blog-bg.jpg")}
        isSmall={true}
      >
      </PageHeader>

      <div className="container">
        <div className="row">
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-8 col-md-8">
            { shortList.map(({ node: post }) => {
              return (
                <div className="post-preview">
                  <Link to={post.frontmatter.path}>
                    <h2 className="post-title">{ post.frontmatter.title }</h2>
                    <h3 className="post-subtitle">{ post.frontmatter.abstract }</h3>
                  </Link>
                  <p className="post-meta">
                    Posted by <Link to="/about">{ post.frontmatter.author }</Link> on <span>{ post.frontmatter.formattedDate }</span>
                  </p>
                </div>
              )
            })}
            
            <hr />

            <ul className="pager" v-show="!showAll" click="toggleAll()">
              <li className="next">
                <Link to="/blog/all">Older Posts &rarr;</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-2 col-md-2">
            <div className="row text-center">
              <img src={require("../images/me.jpg")} alt="Joel Lord" width="90%" />
            </div>
            <div className="row">
              <div className="bio">
                {"{"}<br/>
                &nbsp;&nbsp;  name: "Joel Lord",<br/>
                &nbsp;&nbsp;  job: "Developer Advocate",<br/>
                &nbsp;&nbsp;  employer: "Red Hat OpenShift",<br/>
                &nbsp;&nbsp;  tabsOrSpaces: "spaces",<br/>
                &nbsp;&nbsp;  keywords: [<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;    "javascript junkie",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;    "technology enthusiast",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;    "tinkerer"<br/>
                &nbsp;&nbsp;  ]<br/>
                {"}"}<br/>
              </div>
            </div>
          </div>
          <div className="col-lg-1 col-md-1"></div>
        </div>
      </div>

      <PageFooter />
      
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            formattedDate
            path
            abstract
            author
          }
        }
      }
    }
  }
`
