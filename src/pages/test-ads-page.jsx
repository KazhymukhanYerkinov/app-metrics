import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import "./test-ads-page.less";

export const TestAds = (props) => {
  return (
    <div className="test-ads-page">
      <h2 className="test-ads-page__page-title">
        Test Ads Page
      </h2>

      <section className="test-ads-page__adss"></section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestAds);
