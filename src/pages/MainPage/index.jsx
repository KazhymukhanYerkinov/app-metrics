import React from "react";
import { connect } from "react-redux";

import { PageTemplate } from "@components";

import "./index.less";

export const MainPage = () => {
  return <PageTemplate></PageTemplate>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
