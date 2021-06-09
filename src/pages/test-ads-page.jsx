import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Row, Col } from "antd";
import { Select } from "antd";

import axios from "axios";

import googleLogo from "@assets/google-logo.jpg";
import testVideo from "@assets/testvideo.mp4";

import "./test-ads-page.less";

const { Option } = Select;

export const TestAds = (props) => {
  return (
    <div className="test-ads-page">
      <h2 className="test-ads-page__page-title">
        Test Ads Page
      </h2>

      <section className="test-ads-page__adss">
        <div className="google-ads">
          <Row>
            <Col span={8}>
              <div className="google-ads__about">
                <img
                  src={googleLogo}
                  alt="google-logo"
                  className="about__brand"
                />
                <video
                  src={testVideo}
                  className="about__video"
                  autoPlay
                  loop
                ></video>
              </div>
            </Col>
            <Col span={16} style={{ height: "auto" }}>
              <div className="google-ads__info">
                <div className="info__actions">
                  <Select
                    defaultValue="comp1"
                    onChange={(value) => {
                      console.log(value);
                    }}
                    className="actions__select-btn"
                  >
                    <Option value="comp1">
                      Кампания 1
                    </Option>
                    <Option value="comp2">
                      Кампания 2
                    </Option>
                    <Option value="comp3">
                      Кампания 3
                    </Option>
                  </Select>

                  <div className="actions__statistic-btn">
                    Статистика рекламы
                  </div>
                </div>

                <div className="info__table">
                  <div className="table__head">
                    <Row>
                      <Col span={4}>
                        <div className="head__text">
                          CPC
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="head__text">
                          CTR
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="head__text">
                          Impressions
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="head__text">
                          Views
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="head__text">
                          Conversions
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="head__text">
                          Sum
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="table__body">
                    <Row>
                      <Col span={4}>
                        <div className="body__text">
                          $0.12
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          3.74%
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          84 221
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          5 337
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          421
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">97</div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestAds);
