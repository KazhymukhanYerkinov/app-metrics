import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import axios from "axios";

import "./test-iframe-page.less";

export const TestIframe = (props) => {
  return (
    <div className="test-iframe-page">
      <h2 className="test-iframe-page__page-title">
        Test iframe Page
      </h2>

      <section className="test-iframe-page__iframes"></section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestIframe);
