import {
  AutoComplete,
  Button,
  ButtonGroup,
  Fieldset,
  Page,
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
} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setDomains, setChecked } from "@redux/actions";
import axios from "axios";
import h337 from "heatmap.js";
import {
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
} from "@geist-ui/react-icons";

import { oldKlikServer as server } from "@api/api";
import classes from "./Heatmap.module.css";
import Toolbar from "@components/Toolbar";

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

  // console.log(domains);
  // console.log(domains.items);
  // console.log(domains.items[selectedDomain]);

  const [tab, setTab] = useState(tabs[0].value);
  const domain = domains.items[selectedDomain]
    ? domains.items[selectedDomain].name
    : "";
  return (
    <>
      <Toolbar />
      <Page>
        <Page.Content>
          <Fieldset.Group
            value={tab}
            onChange={(v) => setTab(v)}
          >
            {tabs.map((t) => (
              <Fieldset
                label={t.label}
                value={t.value}
                key={t.value}
              >
                {tab === t.value ? (
                  <Display
                    type={t.value}
                    domain={domain}
                    date={date}
                    filter={filter}
                  />
                ) : null}
              </Fieldset>
            ))}
          </Fieldset.Group>
        </Page.Content>
      </Page>
    </>
  );
};

const Display = ({ type, domain, date, filter }) => {
  const [dateStart, dateEnd] = date;
  const [page, setPage] = useState("/");
  const [prePage, setPrePage] = useState("/");
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    isFetching: true,
    items: [],
  });
  const [scroll, setScroll] = useState(0);
  const [done, setDone] = useState(false);
  const [height, setHeight] = useState(768);
  const [size, setSize] = useState({
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
  }, [page]);

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
  }, [page]);

  useEffect(() => {
    window.addEventListener("resize", setSizeOfContainer);
    return () =>
      window.removeEventListener(
        "resize",
        setSizeOfContainer
      );
  }, []);

  useLayoutEffect(() => {
    if (loaded) {
      setSizeOfContainer();
    }
  }, [size.width]);
  const { palette, expressiveness } = useTheme();
  return (
    <div className={classes.Display}>
      <div className={classes.toolbar}>
        <PageSelector
          page={page}
          setPage={setPage}
          domain={domain}
        />
        <ButtonGroup size="small">
          <Button
            disabled={size.width === 380}
            onClick={() =>
              setSize({
                width: 380,
                height: 600,
                scale: 1,
              })
            }
            icon={<SmartphoneIcon />}
          />
          <Button
            disabled={size.width === 1360}
            onClick={() =>
              setSize({
                width: 1360,
                height: 768,
                scale: 1,
              })
            }
            icon={<MonitorIcon />}
          />
        </ButtonGroup>
      </div>
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
