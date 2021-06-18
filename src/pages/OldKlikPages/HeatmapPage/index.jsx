import {
  AutoComplete,
  // Button,
  // ButtonGroup,
  // Fieldset,
  // Page,
  Spacer,
  useTheme,
  useToasts,
} from "@geist-ui/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  // useMemo,
} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setDomains, setChecked } from "@redux/actions";
import axios from "axios";
import h337 from "heatmap.js";
import // Monitor as MonitorIcon,
// Smartphone as SmartphoneIcon,
"@geist-ui/react-icons";

import { oldKlikServer as server } from "@api/api";

import { Toolbar } from "@components";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import shortid from "shortid";

import classes from "./Heatmap.module.css";
import "./index.less";

am4core.useTheme(am4themes_animated);

const createAttention = (e, height, items, settings) => {
  const getPoints = (start, height, items) => {
    const validItems = items.filter(
      (el) => el.y >= start && el.y < start + height
    );
    let score = 0;
    for (let i in validItems) {
      score += validItems[i].value;
    }
    return score;
  };
  const o = document.createElement("div");
  o.className = "attention scroll";
  o.width = e.scrollWidth;
  o.height = e.scrollHeight;
  o.style.overflow = "hidden";
  const count = Math.ceil(e.scrollHeight / height);
  const blocks = [];

  let max = 0;
  for (let i = 0; i < count; i++) {
    const score = getPoints(i * height, height, items);
    if (score > max) {
      max = score;
    }
    blocks.push(score);
  }

  const block = document.createElement("div");
  block.className = "attention-block";
  block.style.height = o.height + "px";

  let temp_style = "linear-gradient(";

  blocks.forEach((el) => {
    // const block = document.createElement("div");
    // block.className = "attention-block";
    // block.style.height = height + "px";
    temp_style +=
      colors[Math.floor((el / max) * (colors.length - 1))] +
      ", ";
    /*block.innerHTML = `<span>${Math.round(el / max * 100)}%</span>`;*/
  });
  temp_style = temp_style.slice(0, -2) + ")";
  block.style.backgroundImage = temp_style;
  o.appendChild(block);

  e.appendChild(o);
};

const uncompressHeatmapData = (e) => {
  return e
    .join("~")
    .split("~")
    .map((e) => {
      const t = e.split("^");
      return {
        x: +t[0],
        y: +t[1],
        value: +t[2],
      };
    });
};

const createScroll = (e, t, r, n, a) => {
  r.sort((a, b) => (a.y > b.y ? 1 : b.y > a.y ? -1 : 0));
  const o = document.createElement("canvas");
  o.className = "heatmap-canvas scroll";
  o.width = e.scrollWidth;
  o.height = e.scrollHeight;
  const i = o.getContext("2d");

  if (!i)
    return alert(
      "Could not get context2D of scroll canvas."
    );
  if (!r.length) return;
  const l = [];
  l.push(0);
  let s = 0;
  for (const e of r) s += e.value;

  const c = ((e) =>
      e <= 5
        ? 10
        : e <= 20
        ? 5
        : e <= 40
        ? 4
        : e <= 60
        ? 3
        : 2)(t),
    u = Math.floor(s / c);
  let d = 0;

  for (const e of r) {
    d += e.value;
    if (d >= u) {
      d = 0;
      l.push(e.y);
    }
  }
  // console.log(s, c, u, l);
  const f = 255 / l.length;
  let p = 0;
  for (let e = 1; e < l.length; ++e) {
    i.fillStyle = `rgba(${
      255 - Math.floor(0.9 * p)
    }, ${Math.floor(0.6 * p)}, ${Math.floor(
      0.8 * p
    )}, 0.9)`;
    i.fillRect(0, l[e - 1], n.width, l[e] - l[e - 1]);
    p += f;
  }
  const b = l[l.length - 1];
  i.fillStyle = "rgba(150,150,150,0.8)";
  i.fillRect(0, b, n.width, e.scrollHeight - b);
  i.fillStyle = "#FFFFFF";
  i.font = "15px Verdana";
  i.textBaseline = "bottom";
  for (let e = 1; e < l.length; e++) {
    const t = l[e];
    i.fillRect(0, t, n.width, 2);
    i.fillText(Math.floor((100 / c) * e) + "%", 10, t - 2);
  }
  i.font = "12px Verdana";
  i.textBaseline = "top";
  i.textAlign = "center";
  e.appendChild(o);
};

const colors = [
  "#2f0bff",
  "#2a7aff",
  "#03fefe",
  "#02ff90",
  "#a2ff01",
  "#fcfc00",
  "#fe8d03",
  "#ff0c00",
];

const tabs = [
  {
    value: "clicks",
    label: "Клики",
  },
  {
    value: "movements",
    label: "Движение",
  },
  {
    value: "scroll",
    label: "Скролл",
  },
  {
    value: "attention",
    label: "Внимание",
  },
  {
    value: "geo",
    label: "Гео",
  },
  {
    value: "clickOut",
    label: "Клик аут",
  },
];

const Heatmap = ({
  domains,
  selectedDomain,
  filter,
  date,
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
          console.log("get doamins (heatmap): ", res.data);
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

  getDomains();
  //

  console.log(domains);
  console.log(domains.items);
  console.log(domains.items[selectedDomain]);

  const [tab, setTab] = useState(tabs[0].value);
  const domain = domains.items[selectedDomain]
    ? domains.items[selectedDomain].name
    : "";

  // GEO Chart
  useEffect(() => {
    window.onload = function () {
      let geoChart = am4core.create(
        "geoChartDiv",
        am4maps.MapChart
      );
      geoChart.geodata = am4geodata_worldLow;
      geoChart.projection =
        new am4maps.projections.Miller();
      let polygonSeries = geoChart.series.push(
        new am4maps.MapPolygonSeries()
      );
      polygonSeries.exclude = ["AQ"];
      polygonSeries.useGeodata = true;
      let polygonTemplate =
        polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.polygon.fillOpacity = 0.6;
      let hs = polygonTemplate.states.create("hover");
      hs.properties.fill = geoChart.colors.getIndex(0);
      let imageSeries = geoChart.series.push(
        new am4maps.MapImageSeries()
      );
      imageSeries.mapImages.template.propertyFields.longitude =
        "longitude";
      imageSeries.mapImages.template.propertyFields.latitude =
        "latitude";
      imageSeries.mapImages.template.tooltipText =
        "{title}";
      imageSeries.mapImages.template.propertyFields.url =
        "url";
      let circle =
        imageSeries.mapImages.template.createChild(
          am4core.Circle
        );
      circle.radius = 3;
      circle.propertyFields.fill = "color";
      circle.nonScaling = true;

      let circle2 =
        imageSeries.mapImages.template.createChild(
          am4core.Circle
        );
      circle2.radius = 3;
      circle2.propertyFields.fill = "color";
      circle2.events.on("inited", function (event) {
        animateBullet(event.target);
      });

      function animateBullet(circle) {
        let animation = circle.animate(
          [
            {
              property: "scale",
              from: 1 / geoChart.zoomLevel,
              to: 5 / geoChart.zoomLevel,
            },
            { property: "opacity", from: 1, to: 0 },
          ],
          1000,
          am4core.ease.circleOut
        );
        animation.events.on(
          "animationended",
          function (event) {
            animateBullet(event.target.object);
          }
        );
      }

      let colorSet = new am4core.ColorSet();
      imageSeries.data = [
        {
          "title": "Brussels",
          "latitude": 50.8371,
          "longitude": 4.3676,
          "color": colorSet.next(),
        },
        {
          "title": "Copenhagen",
          "latitude": 55.6763,
          "longitude": 12.5681,
          "color": colorSet.next(),
        },
        {
          "title": "Paris",
          "latitude": 48.8567,
          "longitude": 2.351,
          "color": colorSet.next(),
        },
        {
          "title": "Reykjavik",
          "latitude": 64.1353,
          "longitude": -21.8952,
          "color": colorSet.next(),
        },
        {
          "title": "Moscow",
          "latitude": 55.7558,
          "longitude": 37.6176,
          "color": colorSet.next(),
        },
        {
          "title": "Madrid",
          "latitude": 40.4167,
          "longitude": -3.7033,
          "color": colorSet.next(),
        },
        {
          "title": "London",
          "latitude": 51.5002,
          "longitude": -0.1262,
          "url": "http://www.google.co.uk",
          "color": colorSet.next(),
        },
        {
          "title": "Peking",
          "latitude": 39.9056,
          "longitude": 116.3958,
          "color": colorSet.next(),
        },
        {
          "title": "New Delhi",
          "latitude": 28.6353,
          "longitude": 77.225,
          "color": colorSet.next(),
        },
        {
          "title": "Tokyo",
          "latitude": 35.6785,
          "longitude": 139.6823,
          "url": "http://www.google.co.jp",
          "color": colorSet.next(),
        },
        {
          "title": "Ankara",
          "latitude": 39.9439,
          "longitude": 32.856,
          "color": colorSet.next(),
        },
        {
          "title": "Buenos Aires",
          "latitude": -34.6118,
          "longitude": -58.4173,
          "color": colorSet.next(),
        },
        {
          "title": "Brasilia",
          "latitude": -15.7801,
          "longitude": -47.9292,
          "color": colorSet.next(),
        },
        {
          "title": "Ottawa",
          "latitude": 45.4235,
          "longitude": -75.6979,
          "color": colorSet.next(),
        },
        {
          "title": "Washington",
          "latitude": 38.8921,
          "longitude": -77.0241,
          "color": colorSet.next(),
        },
        {
          "title": "Kinshasa",
          "latitude": -4.3369,
          "longitude": 15.3271,
          "color": colorSet.next(),
        },
        {
          "title": "Cairo",
          "latitude": 30.0571,
          "longitude": 31.2272,
          "color": colorSet.next(),
        },
        {
          "title": "Pretoria",
          "latitude": -25.7463,
          "longitude": 28.1876,
          "color": colorSet.next(),
        },
      ];
    };
  }, [
    domains,
    selectedDomain,
    filter,
    date,
    setDomains,
    setChecked,
  ]);

  return (
    <>
      <Toolbar />
      <div className="heatmap-content-wrap">
        <div className="tabs-wrap">
          {tabs.map((el) => (
            <div
              key={shortid.generate()}
              className={`tab ${
                el.value === tab ? "tab--active" : ""
              }`}
              onClick={() => {
                setTab(el.value);
              }}
            >
              {el.label}
            </div>
          ))}
        </div>
        <div className="content">
          {/* <Toolbar /> */}

          {tabs.map((t) => {
            if (tab === t.value) {
              if (t.value === "geo") {
                console.log("show geo");
                return (
                  <div
                    key={shortid.generate()}
                    id="geoChartDiv"
                    style={{
                      width: "100%",
                      height: "500px",
                    }}
                  ></div>
                );
              } else {
                return (
                  <Display
                    key={shortid.generate()}
                    type={t.value}
                    domain={domain}
                    date={date}
                    filter={filter}
                  />
                );
              }
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

const Display = ({ type, domain, date, filter }) => {
  const [dateStart, dateEnd] = date;
  const [page, ,] = useState("/");
  // const [prePage, ,] = useState("/");
  const [loaded, setLoaded] = useState(false);
  const [, setData] = useState({
    isFetching: true,
    items: [],
  });
  // const [scroll, setScroll] = useState(0);
  const [done, setDone] = useState(false);
  const [height, setHeight] = useState(768);
  const [size, ,] = useState({
    width: 1360,
    height: 768,
    scale: 1,
  });
  const [scale, setScale] = useState(1);
  const container = useRef();
  const heatmap = useRef();
  const heatmapWrap = useRef();
  const iframe = useRef();

  const makeScroll = (items) => {
    if (heatmap.current) {
      createScroll(heatmap.current, 1, items, {
        width: size.width,
        height,
      });
    }
  };

  const makeAttention = (items) => {
    if (heatmap.current) {
      createAttention(heatmap.current, 62, items, {
        width: size.width,
        height,
      });
    }
  };

  const makeHeatmap = (items) => {
    if (heatmap.current) {
      const hm = h337.create({
        container: heatmap.current,
        blur: 0.75,
      });
      setData({
        isFetching: false,
        items,
      });
      hm.setData({
        max: 2,
        data: items,
      });
    }
  };

  const getData = useCallback(() => {
    const fd = new FormData();
    setDone(true);
    fd.append("active", true);
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
    fd.append("page", page);
    fd.append(
      "what",
      type === "attention" ? "scroll" : type
    );
    fd.append(
      "widthFilter",
      size.width > 768 ? "768 1920" : "320 420"
    );
    axios({
      url: server + "server/helpers/getHeatmapData.php",
      method: "POST",
      data: fd,
      withCredentials: true,
    }).then((res) => {
      // 返回一些看不懂的数据
      console.log("res1");
      console.log(res.data);
      if (typeof res.data === "object") {
        const items = uncompressHeatmapData(res.data);
        if (type === "scroll") {
          makeScroll(items);
        } else if (type === "attention") {
          makeAttention(items);
        } else {
          makeHeatmap(items);
        }
      }
    });
  }, [
    page,
    domain,
    date,
    filter.countries,
    filter.ip,
    filter.pages,
    filter.referrers,
    filter.sessionMax,
    filter.sessionMin,
    filter.tags,
    makeAttention,
    makeScroll,
    size.width,
    type,
  ]);

  const scrollHeatmap = (x, y) => {
    heatmapWrap.current.scrollTo(x, y);
  };

  useEffect(() => {
    if (done) {
      if (heatmap.current) {
        heatmap.current.innerHTML = "";
      }
      getData();
    }
    const action = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.task === "SZ") {
          console.log("from event");
          setHeight(data.h);
          getData();
          setDone(true);
        } else if (data.task === "SCROLL") {
          scrollHeatmap(data.left, data.top);
        }
      } catch (err) {
        console.log(err);
      }
    };
    window.addEventListener("message", action, false);
    return () => {
      window.removeEventListener("message", action);
      if (heatmap.current) {
        heatmap.current.innerHTML = "";
      }
    };
  }, [
    domain,
    size.width,
    type,
    dateStart,
    dateEnd,
    filter,
  ]);

  const setSizeOfContainer = () => {
    const s =
      size.width > 768
        ? container.current.getBoundingClientRect().width /
          size.width
        : (container.current.getBoundingClientRect().width /
            size.width) *
          0.5;
    setScale(s);
  };

  const onLoad = useCallback(() => {
    iframe.current.contentWindow.postMessage(
      JSON.stringify({ task: "SZ" }),
      "*"
    );
    if (heatmap.current) {
      heatmap.current.innerHTML = "";
    }
    setLoaded(true);
    setSizeOfContainer();
  }, [setSizeOfContainer, setLoaded]);

  useEffect(() => {
    window.addEventListener("resize", setSizeOfContainer);

    return () =>
      window.removeEventListener(
        "resize",
        setSizeOfContainer
      );
  }, [setSizeOfContainer]);

  useLayoutEffect(() => {
    if (loaded) {
      setSizeOfContainer();
    }
  }, [size.width]);

  const { palette, expressiveness } = useTheme();
  return (
    <div className={classes.Display}>
      <div className={classes.toolbar}></div>
      <Spacer y={1} />
      <div
        style={{
          height: size.height * scale,
        }}
        ref={container}
        className={classes.data}
      >
        <iframe
          onLoad={onLoad}
          ref={iframe}
          style={{
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            backgroundColor: palette.accents_1,
            boxShadow: expressiveness.shadowSmall,
          }}
          className={classes.iframe}
          title={domain}
          src={"//" + domain + page}
          width={size.width}
          height={size.height}
        />
        <div
          style={{
            width: size.width,
            height: size.height,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
          ref={heatmapWrap}
          className={classes.heatmapWrap}
        >
          <div
            style={{
              width: size.width,
              height: height,
            }}
            ref={heatmap}
            className={classes.heatmap}
          ></div>
        </div>
      </div>
    </div>
  );
};

const PageSelector = ({ setPage, page, domain }) => {
  const [pages, setPages] = useState([]);
  const [options, setOptions] = useState([]);
  const getPages = () => {
    const fd = new FormData();
    fd.append("domain", domain);
    axios({
      url: server + `server/helpers/getPages.php`,
      method: "POST",
      data: fd,
      withCredentials: true,
    }).then((res) => {
      // 返回所有页面, 放置在输入框下面, 用于选择
      // console.log("res2")
      // console.log(res.data)
      setPages(res.data);
    });
  };
  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    const relatedOptions = pages.filter((item) =>
      item.includes(currentValue)
    );
    setOptions(relatedOptions);
  };
  useEffect(getPages, [domain]);
  return (
    <AutoComplete
      label="Страница"
      disableFreeSolo
      onSelect={(v) => {
        setPage(v);
      }}
      options={options.map((el) => ({
        value: el,
        label: el,
      }))}
      value={page}
      placeholder="Страница"
      onSearch={searchHandler}
    >
      <AutoComplete.Empty>
        <span>Нет страниц</span>
      </AutoComplete.Empty>
    </AutoComplete>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setDomains: bindActionCreators(setDomains, dispatch),
  setChecked: bindActionCreators(setChecked, dispatch),
});

export default connect(
  (state) => state.oldKlik,
  mapDispatchToProps
)(Heatmap);
