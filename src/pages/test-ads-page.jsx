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
  const [googleCardInfo, setGoogleCardInfo] = useState({
    crc: null,
    ctr: null,
    impressions: null,
    views: null,
    conversions: null,
    cost: null,
  });

  const [companys, setCompanys] = useState([]);

  // google cart company info
  useEffect(() => {
    axios({
      method: "post",
      url: "http://192.168.1.94:8000/google/campaign/",
      data: {
        user_type: "manager",
        access_id: "4783232548",
        client_id: "2066190552",
      },
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzNjY3NTc1LCJqdGkiOiJhNjlmOTUyZGMzMzk0ZGIzYTI0NWEyZjI3YWNiZTcwMyIsInVzZXJfaWQiOjN9.3MAUUJZf-wg1f7YuJ9axQKULhx16OuuEK9xWRHlkmFg",
      },
    })
      .then((res) => {
        setCompanys([...companys, ...res.data.campaigns]);
      })
      .catch((err) => {
        Object.keys(err).forEach((el) => {
          console.log(err[el]);
        });
      });

    return () => {};
  }, []);

  // google cart info
  useEffect(() => {
    axios
      .get(
        "http://192.168.1.94:8000/google/get-ad-details/",
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzNzMyMTAzLCJqdGkiOiIxMzVjMGZlMWIyMDU0MjI2YWVhNjdkNjEwNDAwNWNhZCIsInVzZXJfaWQiOjJ9.ZsfidNJipObYbM8tLtGVUWNcwIab37ZeD5xyBG9UJZ8",
          },
        }
      )
      .then((res) => {
        let responseData = {
          crc: res.data.response[0].cpc,
          ctr: res.data.response[0].ctr,
          impressions: res.data.response[0].impressions,
          views: res.data.response[0].views,
          conversions: res.data.response[0].all_conversions,
          cost: res.data.response[0].average_cost,
        };

        setGoogleCardInfo(
          Object.assign({}, setGoogleCardInfo, responseData)
        );
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  // Change Google company
  const changeCompany = (value) => {
    console.log(value);
  };

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
                    defaultValue={
                      companys.length !== 0
                        ? companys[0].name
                        : "..."
                    }
                    onChange={(value) => {
                      changeCompany(value);
                    }}
                    className="actions__select-btn"
                  >
                    {companys.map((el) => {
                      return (
                        <Option key={el.id} value={el.id}>
                          {el.name}
                        </Option>
                      );
                    })}
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
                          Cost
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="table__body">
                    <Row>
                      <Col span={4}>
                        <div className="body__text">
                          {googleCardInfo.crc !== null
                            ? "$ " + googleCardInfo.crc
                            : "..."}
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          {googleCardInfo.ctr !== null
                            ? googleCardInfo.ctr + "%"
                            : "..."}
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          {googleCardInfo.impressions !==
                          null
                            ? googleCardInfo.impressions
                            : "..."}
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          {googleCardInfo.views !== null
                            ? googleCardInfo.views
                            : "..."}
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          {googleCardInfo.conversions !==
                          null
                            ? googleCardInfo.conversions
                            : "..."}
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="body__text">
                          {googleCardInfo.cost !== null
                            ? googleCardInfo.cost
                            : "..."}
                        </div>
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
