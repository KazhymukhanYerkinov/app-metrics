import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { Select } from "antd";
import { Popups } from "@components";

import axios from "axios";

import googleLogo from "@assets/google-logo.jpg";

import "./index.less";

const { Option } = Select;

export default function GoogleAds() {
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
      method: "get",
      url: "http://192.168.1.83:1234/google/campaign/",
      params: {
        // user_type: "manager",
        access_id: "4783232548",
        client_id: "2066190552",
      },
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0MjUzODgzLCJqdGkiOiI1MTc5MTU2MzAyZWQ0ZWRjOGNjNmRmMjg4NjY5YjUzNCIsInVzZXJfaWQiOjJ9.5Wholp2H9ZHRCPjOb9yIXZ6ny31JEUv3-ajgV8nVXxo",
      },
    })
      .then((res) => {
        // console.log(res.data);
        setCompanys([...res.data.campaigns]);
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
    axios({
      url: "http://192.168.1.83:1234/google/campaign/13446395457/card",
      params: {
        access_id: "4783232548",
        client_id: "2066190552",
      },

      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0MjUzODgzLCJqdGkiOiI1MTc5MTU2MzAyZWQ0ZWRjOGNjNmRmMjg4NjY5YjUzNCIsInVzZXJfaWQiOjJ9.5Wholp2H9ZHRCPjOb9yIXZ6ny31JEUv3-ajgV8nVXxo",
      },
    })
      .then((res) => {
        // console.log(res.data);
        let responseData = {
          crc: res.data.response.cpc,
          ctr: res.data.response.ctr,
          impressions: res.data.response.impressions,
          views: res.data.response.views,
          conversions: res.data.response.all_conversions,
          cost: res.data.response.average_cost,
        };

        // console.log(responseData);
        setGoogleCardInfo(
          Object.assign({}, setGoogleCardInfo, responseData)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [videoLink, setVideoLink] = useState("...");
  // Google Video
  useEffect(() => {
    axios({
      url: "http://192.168.1.83:1234/google/campaign/13446395457/video-link",
      method: "get",
      params: {
        access_id: "4783232548",
        client_id: "2066190552",
      },
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0MjUzODgzLCJqdGkiOiI1MTc5MTU2MzAyZWQ0ZWRjOGNjNmRmMjg4NjY5YjUzNCIsInVzZXJfaWQiOjJ9.5Wholp2H9ZHRCPjOb9yIXZ6ny31JEUv3-ajgV8nVXxo",
      },
    })
      .then((res) => {
        // console.log(res.data);
        setVideoLink(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Change Google company
  const changeCompany = (value) => {
    console.log(value);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
                  {/* <video
                    src={testVideo}
                    className="about__video"
                    autoPlay
                    loop
                  ></video> */}
                  <iframe
                    // width="1536"
                    // height="763"
                    className="about__video"
                    width="inherit"
                    height="inherit"
                    src={videoLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; loop;"
                  ></iframe>
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

                    <div
                      className="actions__statistic-btn"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
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
                        {/* <Col span={4}>
                          <div className="head__text">
                            Cost
                          </div>
                        </Col> */}
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
                        {/* <Col span={4}>
                          <div className="body__text">
                            {googleCardInfo.cost !== null
                              ? googleCardInfo.cost
                              : "..."}
                          </div>
                        </Col> */}
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </div>
      <Popups isOpen={isOpen} setIsOpen={setIsOpen}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "4rem",
          }}
        >
          <div
            className=""
            style={{
              backgroundColor: "black",
              height: "30%",
              marginBottom: "2rem",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              height: "30%",
            }}
          >
            <div
              className=""
              style={{ flexGrow: 2, height: "100%" }}
            >
              <div
                className=""
                style={{
                  backgroundColor: "pink",
                  height: "100%",
                }}
              ></div>
            </div>
            <div
              className=""
              style={{ width: "10px" }}
            ></div>
            <div
              className=""
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                className=""
                style={{
                  backgroundColor: "skyblue",
                  height: "calc(calc(100% - 10px) / 2)",
                }}
              ></div>
              <div
                className=""
                style={{ height: "10px" }}
              ></div>
              <div
                className=""
                style={{
                  backgroundColor: "blue",
                  height: "calc(calc(100% - 10px) / 2)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </Popups>
    </>
  );
}
