import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import axios from "axios";
import { message, Select } from "antd";

import "./test-api-page.less";

const { Option } = Select;

export const TestApiPage = () => {
  // connect-google-ads-account-api
  const [accountType, setAccountType] = useState("client");
  const [customerId, setCustomerId] = useState(
    "0".repeat(10)
  );

  const [subAccountCustomerId, setSubAccountCustomerId] =
    useState("0".repeat(10));

  // connect-google-ads-account-api
  useEffect(() => {
    //   axios.
  }, []);

  const handleConnectGoogleAdsAccountApiSubmit = () => {
    axios
      .post(
        "http://192.168.1.94:8000/google/account-type/",
        {
          type: accountType,
          customer_id: customerId,
          subclient1: subAccountCustomerId,
          count: 1,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzMjM4OTYzLCJqdGkiOiJlOWMyYzMyYzk0OTg0NDQzYjQwYzc0YTA5YzMwYWUwMSIsInVzZXJfaWQiOjN9.S8u0LWURWfhgG03mznxW9kgiQA02miMkWXm4L78HWQ8",
          },
        }
      )
      .then((res) => {
        message.success("Успешно!");
      })
      .catch((err) => {
        message.error(err.response.data.detail);
      });
  };

  return (
    <div className="test-api-page">
      <h2 className="test-api-page__page-title">
        Test Api Page
      </h2>

      <section className="test-api-page__apis">
        <div className="connect-google-ads-account-api">
          <div>
            Manager or Client:{" "}
            <Select
              defaultValue="client"
              className="account-type-select"
              onChange={(value) => setAccountType(value)}
            >
              <Option value="client">Client</Option>
              <Option value="manager">Manager</Option>
            </Select>
          </div>

          <div>
            Customer ID:{" "}
            <input
              type="number"
              className="account-customer-id"
              value={customerId}
              onChange={(e) =>
                setCustomerId(e.target.value)
              }
              minLength={10}
              maxLength={10}
            />
          </div>

          <div
            style={{
              display:
                accountType === "manager" ? "" : "none",
            }}
          >
            <div>
              Sub account1 customer ID:{" "}
              <input
                type="number"
                className="account-customer-id"
                value={subAccountCustomerId}
                onChange={(e) =>
                  setSubAccountCustomerId(e.target.value)
                }
                minLength={10}
                maxLength={10}
              />
            </div>
            <div>
              Add sub account
              <button>+</button>
            </div>
          </div>

          <button
            onClick={handleConnectGoogleAdsAccountApiSubmit}
          >
            Submit
          </button>
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
)(TestApiPage);
