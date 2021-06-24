import React from "react";
import { connect } from "react-redux";

import { PageTemplate } from "@components";

import "./index.less";

export const MainPage = () => {
  return (
    <PageTemplate>
      <>
        <div className="">Main Page</div>
        <button>Open Popup</button>
      </>
    </PageTemplate>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
