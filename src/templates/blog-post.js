import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import BlogHeader from "../components/blogheader"
import PageFooter from "../components/pagefooter"

import "../components/layout.css"

import "../components/css/bootstrap.css"
import "../components/css/clean-blog.css"
import "../components/css/site.css"

// import '../components/css/blog-post.css'; // make it pretty!

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { markdownRemark: post } = data // data.markdownRemark holds our post data
  return (
    <div className="blog-post-container">
      <p>{console.log(data)}</p>
      <BlogHeader 
        title={ post.frontmatter.title }
        bgImage={ require(`../images/post-bg/${post.frontmatter.banner}.jpg`) }
        author="Joel Lord"
        subtitle={ post.frontmatter.summary }
        formattedDate = { post.frontmatter.formattedDate }
      />
      <Helmet>
        <title>{`Javascript Everything - ${post.frontmatter.title}`}</title>
        <link rel="canonical" href={ post.frontmatter.originalUrl } />
      </Helmet>
      <article>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1" data-bind="html: postContent, syntaxhighlight: postContent">
            <span dangerouslySetInnerHTML={{ __html: post.html }}></span>
          </div>
        { (post.frontmatter.originalUrl) && 
          <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1" data-bind="html: postContent, syntaxhighlight: postContent">
            <h4>Original Post</h4>
            <span>
              Originally published on &nbsp;
              <a href={post.frontmatter.originalUrl}>{ post.frontmatter.originalSource }</a>
            </span>
          </div>
        }
        </div>
      </div>
    </article>

    <PageFooter />

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href='//fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css' />
    <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css' />

    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        summary
        abstract
        keywords
        author
        formattedDate
        banner
        originalSource
        originalUrl
      }
    }
  }
`