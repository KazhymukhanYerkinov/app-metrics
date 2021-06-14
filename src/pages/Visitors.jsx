import classes from "./Visitors.module.css";
import {
  Badge,
  Button,
  Card,
  Code,
  Page,
  Pagination,
  Spacer,
  Table,
  Tag,
  Text,
  useToasts,
} from "@geist-ui/react";
import Toolbar from "@components/Toolbar";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { setDomains, setChecked } from "@redux/actions";
import axios from "axios";
import { oldKlikServer as server } from "@api/api";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "@geist-ui/react-icons";
import moment from "moment";
import "moment/locale/ru";

import { Smartphone } from "@geist-ui/react-icons";
import chrome from "@assets/icons/chrome.svg";
import safari from "@assets/icons/safari.svg";
import mozilla from "@assets/icons/mozilla.svg";
import opera from "@assets/icons/opera.svg";
import msie from "@assets/icons/msie.svg";
import { connect } from "react-redux";

import "./Visitors.less";
import shortid from "shortid";

moment.locale("ru");

const browsers = {
  chrome: <img alt="Chrome" src={chrome} />,
  mozilla: <img alt="Firefox" src={mozilla} />,
  firefox: <img alt="Firefox" src={mozilla} />,
  safari: <img alt="Safari" src={safari} />,
  opera: <img alt="Opera" src={opera} />,
  msie: <img alt="Internet Explorer" src={msie} />,
  mobile: <Smartphone />,
};

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const pad2 = (n) => (n > 9 ? n : `0${n}`);

const getTime = (sec) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = sec % 60;
  return `${hours ? pad2(hours) + ":" : ""}${
    hours && !minutes ? "00:" : `${pad2(minutes)}:`
  }${pad2(seconds)}`;
};

const getDomain = (str) => {
  const regex =
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim;
  console.log("domain visitors:", str);
  const result = str.match(regex)[0];
  return result.indexOf("://")
    ? result.split("://")[1]
    : result;
};

const Visitors = ({
  domains,
  selectedDomain,
  filter,
  date,
  history,
  setDomains,
  setChecked,
}) => {
  // 成功登录后获取的数据
  const [, setToast] = useToasts();

  const getDomains = () => {
    axios({
      url: server + "server/helpers/getDomains.php",
      withCredentials: true,
    })
      .then((res) => {
        if (typeof res.data === "object") {
          setDomains(res.data);
          setChecked();
        } else {
          setToast({
            text: "Неверные данные",
            type: "error",
          });
        }
      })
      .catch(() => {
        setToast({
          text: "Ошибка сети",
          type: "error",
        });
      });
  };

  useEffect(() => {
    getDomains();
  }, []);

  console.log("domains visitors: ", domains);

  const [visitors, setVisitors] = useState({
    isFetching: true,
    page: 0,
    perPage: 10,
    totalCount: 0,
    items: [],
  });
  const domain = domains.items[selectedDomain]
    ? domains.items[selectedDomain].name
    : "";
  const getVisitors = () => {
    const fd = new FormData();
    fd.append("active", "true");
    fd.append("color", "#35a8d4");
    fd.append("domain", domain);
    fd.append("endDate", date[1].format("YYYY-MM-DD"));
    fd.append("startDate", date[0].format("YYYY-MM-DD"));
    fd.append("id", "0");
    fd.append("name", "All");
    if (filter.sessionMax) {
      fd.append(
        "sessionLengthFilterMax",
        filter.sessionMax
      );
    }
    if (filter.sessionMin) {
      fd.append(
        "sessionLengthFilterMin",
        filter.sessionMin
      );
    }
    filter.countries.forEach((el) => {
      fd.append("countries[]", el);
    });
    filter.tags.forEach((el) => {
      fd.append("tagFilters[]", el);
    });
    filter.pages.forEach((el) => {
      fd.append("pagesFilter[]", el);
    });
    filter.referrers.forEach((el) => {
      fd.append("referrers[]", el === "DIRECT" ? "" : el);
    });
    if (filter.ip) {
      fd.append("ipFilter", filter.ip);
    }
    fd.append("take", visitors.perPage);
    fd.append("from", visitors.perPage * visitors.page);
    axios({
      url: server + `server/helpers/getClients.php`,
      method: "POST",
      data: fd,
    }).then((res) => {
      // console.log(res.data);
      if (res.data && typeof res.data === "object") {
        setVisitors({
          ...visitors,
          isFetching: false,
          totalCount: res.data.totalCount,
          items: res.data.clients,
        });
      }
    });
  };
  useEffect(getVisitors, [
    visitors.page,
    date,
    visitors.perPage,
    filter,
  ]);
  useEffect(() => {
    if (visitors.page === 0) {
      getVisitors();
    } else {
      setVisitors({ ...visitors, page: 0 });
    }
  }, [domain]);
  return (
    <div className={classes.main}>
      <Toolbar />
      <div className="video-list">
        <div className="video-list__title">
          Список видеозаписей
        </div>
        <div className="video-list__head">
          <div className="head__text">Месторасполоение</div>
          <div className="head__text">
            Реферальная ссылка
          </div>
          <div className="head__text">Входная страница</div>
          <div className="head__text">
            Поседнее посещение
          </div>
          {/* <div className="head__text">Страницы</div> */}
          <div className="head__text">Длительность</div>
          <div className="head__text">Устройство</div>
        </div>
        <div className="video-list__body">
          {visitors.items.map((el) => {
            return (
              <div
                key={shortid.generate()}
                className="body__item"
              >
                <div className="item__text">
                  <div className="video-icon">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="25"
                        height="25"
                        rx="3"
                        fill="#F4F7F9"
                      />
                      <path
                        d="M10.6306 7.24254C9.73007 6.67368 9 7.1397 9 8.28259V16.7166C9 17.8606 9.73007 18.326 10.6306 17.7577L17.3244 13.5301C18.2252 12.961 18.2252 12.039 17.3244 11.4701L10.6306 7.24254Z"
                        fill="#1B83F4"
                      />
                    </svg>
                  </div>
                  <div className="addr">Oral, KZ</div>
                </div>
                <div className="item__text">
                  youtube.com
                </div>
                <div className="item__text">/</div>
                <div className="item__text">
                  4/16, 10:12 PM
                </div>
                {/* <div className="item__text">1</div> */}
                <div className="item__text">8m 20s</div>
                <div className="item__text">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M19.267 6.25055H10.0007C7.92978 6.24852 6.24927 7.92571 6.2472 9.99667C6.24657 10.6399 6.41141 11.2725 6.72588 11.8336L2.09277 3.88397C5.46735 -0.483609 11.7436 -1.28857 16.1112 2.08601C17.5138 3.16975 18.603 4.60707 19.267 6.25055Z"
                        fill="#F44336"
                      />
                      <path
                        d="M19.9995 10.0008C19.9949 15.5215 15.5207 19.9958 9.99995 20.0004C9.58184 20.0019 9.16416 19.9741 8.75 19.917L13.2498 11.8757C14.2811 10.0803 13.6664 7.789 11.8749 6.75096C11.3077 6.42257 10.6637 6.25004 10.0083 6.25098H19.2662C19.7528 7.44116 20.0019 8.71501 19.9995 10.0008Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M13.2502 11.8751L8.7504 19.9164H8.74208C3.26623 19.2246 -0.611952 14.2247 0.0798914 8.74881C0.303827 6.97642 0.998757 5.29646 2.09238 3.88379L6.72549 11.8334L6.75049 11.8751C7.78369 13.67 10.0762 14.2874 11.8711 13.2542C12.4444 12.9242 12.9202 12.4484 13.2502 11.8751Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M13.2502 11.8758C12.217 13.6706 9.92442 14.288 8.12957 13.2549C7.55627 12.9249 7.08047 12.4491 6.75045 11.8758L6.72545 11.8341C5.71296 10.0275 6.35676 7.74216 8.16336 6.72967C8.72451 6.41519 9.3571 6.25036 10.0003 6.25098H10.0086C10.664 6.25004 11.308 6.42257 11.8752 6.75096C13.6668 7.78904 14.2815 10.0804 13.2502 11.8758Z"
                        fill="#F44336"
                      />
                      <path
                        d="M13.2502 11.8758C12.217 13.6706 9.92442 14.288 8.12957 13.2549C7.55627 12.9249 7.08047 12.4491 6.75045 11.8758L6.72545 11.8341C5.71296 10.0275 6.35676 7.74216 8.16336 6.72967C8.72451 6.41519 9.3571 6.25036 10.0003 6.25098H10.0086C10.664 6.25004 11.308 6.42257 11.8752 6.75096C13.6668 7.78904 14.2815 10.0804 13.2502 11.8758Z"
                        fill="#2196F3"
                      />
                      <path
                        d="M9.98647 14.1669C9.26001 14.1669 8.54637 13.9754 7.91738 13.612C7.28315 13.2452 6.75642 12.7181 6.38995 12.0837C5.23941 10.0909 5.9222 7.54274 7.915 6.3922C8.54907 6.02613 9.26845 5.8336 10.0006 5.83399C12.3017 5.83219 14.1686 7.69617 14.1703 9.99724C14.1709 10.7297 13.9784 11.4494 13.6121 12.0837C12.8612 13.3747 11.4799 14.1684 9.98647 14.1669ZM10.0081 6.66727C8.81234 6.6609 7.70528 7.29732 7.10906 8.33388C6.18863 9.9299 6.7363 11.9699 8.33232 12.8904C9.92834 13.8108 11.9684 13.2631 12.8888 11.6671C13.8092 10.0729 13.263 8.03432 11.6688 7.11385C11.164 6.82246 10.5917 6.66848 10.0089 6.66731H10.0081V6.66727Z"
                        fill="#FAFAFA"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setDomains: bindActionCreators(setDomains, dispatch),
  setChecked: bindActionCreators(setChecked, dispatch),
});

export default connect(
  (state) => state.oldKlik,
  mapDispatchToProps
)(Visitors);
