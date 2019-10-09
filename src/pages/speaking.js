import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageHeader from "../components/pageheader"
import PageFooter from "../components/pagefooter"
import talks from "../data/talks.json"

const SpeakingPage = () => {

  const futureTalks = [];
  const pastTalks = [];
  const now = (new Date()).getTime();
  debugger;
  let cnt = 0;
  talks.map((talk) => {
    talk.key = cnt++;
    let d;
    let explodedDate = String(talk.time).split("-");
    if (explodedDate.length > 1) {
      // Reformat date
      let year = explodedDate[2];
      let month = explodedDate[0]-1;
      let day = explodedDate[1];
      d = new Date(year, month, day);
    } else {
      d = new Date(talk.time);
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    talk.niceDate = d.toLocaleDateString("en-CA", options);
    talk.timestamp = d.getTime();
    return talk;
  }).map((talk) => {
    if (talk.timestamp < now) {
      pastTalks.push(talk);
    } else {
      futureTalks.push(talk);
    }
    return talk;
  });

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <PageHeader
        title="If you get, give. If you learn, teach."
        subtitle="-Maya Angelou"
        image={require("../images/header-bg/speaking-bg.jpg")}
      >
      </PageHeader>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            
            <p>I like to talk.  Here is a list of various talks I`ve given in the last few years and where to find me in the upcoming months.  If you are interested, <Link to="/contact">drop me a line</Link>.</p>

            <h2 className="section-heading">Future Events</h2>

            <table className="table table-striped small-table-text">
              <tbody>
              { futureTalks.map(talk => (
              <tr key={talk.key}>
                <td>{ talk.niceDate }</td>
                <td>{ talk.title }</td>
                <td>{ talk.conference }</td>
                <td>{ talk.location }</td>
                <td>

                </td>
                <td>

                </td>
              </tr>
              ))}
              </tbody>
            </table>

            <h2 className="section-heading">Past Events</h2>

            <table className="table table-striped small-table-text">
              <tbody>
              { pastTalks.map(talk => (
              <tr key={talk.key}>
                <td>{ talk.niceDate }</td>
                <td>{ talk.title }</td>
                <td>{ talk.conference }</td>
                <td>{ talk.location }</td>
                <td>
                  { (talk.movie) &&
                    <a href={talk.movie}><i className="fa fa-film"></i></a>
                  }
                </td>
                <td>
                  { (talk.slides) &&
                    <a href={talk.slides}><i className="fa fa-file-powerpoint-o"></i></a>
                  }
                </td>
              </tr>
              ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <PageFooter />
      
    </Layout>
);}

export default SpeakingPage
