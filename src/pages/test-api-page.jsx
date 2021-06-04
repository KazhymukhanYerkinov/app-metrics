import React from "react";
import { connect } from "react-redux";

import "./test-api-page.less";

export const TestApiPage = (props) => {
  return (
    <div className="test-api-page">
      <h2 className="test-api-page__page-title">
        Test Page
      </h2>

      <section className="test-api-page__charts">
        <figure id="visitors-chart"></figure>
        <figure id="ad-conversion-chart"></figure>
        <figure id="traffic-overview-chart"></figure>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestApiPage);
