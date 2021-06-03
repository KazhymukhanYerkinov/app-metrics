import React, { useEffect } from "react";
import Axios from "axios";
import { oldKlikServer as server } from "@api/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addFilter,
  removeFilter,
  removeIP,
  setIP,
  setSessionLength,
} from "@redux/actions";
import { Filter as FilterIcon } from "@geist-ui/react-icons";
import {
  AutoComplete,
  Button,
  Modal,
  Popover,
  Tag as Chip,
  useTheme,
} from "@geist-ui/react";
import { Share2 } from "@geist-ui/react-icons";
import { Map } from "@geist-ui/react-icons";
import { FileText } from "@geist-ui/react-icons";
import { Percent } from "@geist-ui/react-icons";
import { Tag as TagIcon } from "@geist-ui/react-icons";

import classes from "./Filter.module.css";

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const convertLength = {
  1: "1s",
  2: "2s",
  3: "3s",
  4: "4s",
  5: "5s",
  10: "10s",
  15: "15s",
  30: "30s",
  60: "1m",
  300: "5m",
  600: "10m",
};

const countries = [
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AO",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CW",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "FI",
  "FJ",
  "FK",
  "FM",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "SS",
  "ST",
  "SV",
  "SX",
  "SY",
  "SZ",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "XK",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
];

const Filter = ({
  domains,
  selectedDomain,
  addFilter,
  removeFilter,
  filter,
  setSessionLength,
  setIP,
  removeIP,
}) => {
  const { palette } = useTheme();
  const [modal, setModal] = React.useState("");

  const handleClose = (m) => {
    if (m) {
      setModal(m);
    }
  };

  const menu = () => (
    <>
      <Popover.Item
        className={classes.menuItem}
        onClick={() => handleClose("referrers")}
      >
        <Share2 />
        <span>Реферер</span>
      </Popover.Item>
      <Popover.Item
        className={classes.menuItem}
        onClick={() => handleClose("countries")}
      >
        <Map />
        <span>Страна</span>
      </Popover.Item>
      <Popover.Item
        className={classes.menuItem}
        onClick={() => handleClose("pages")}
      >
        <FileText />
        <span>Страница</span>
      </Popover.Item>
      <Popover.Item
        className={classes.menuItem}
        onClick={() => handleClose("ips")}
      >
        <Percent />
        <span>IP</span>
      </Popover.Item>
      <Popover.Item
        className={classes.menuItem}
        onClick={() => handleClose("tags")}
      >
        <TagIcon />
        <span>Тэг</span>
      </Popover.Item>
    </>
  );

  return (
    <div className={classes.filter}>
      <Popover
        portalClassName={classes.popover}
        content={menu}
      >
        <Button
          style={{
            margin: `0 8px`,
          }}
          iconRight={<FilterIcon />}
          auto
          size="small"
        />
      </Popover>
      <div
        style={{
          "--error": palette.error,
        }}
        className={classes.chips}
      >
        {["tags", "countries", "pages", "referrers"].map(
          (key) =>
            filter[key].map((el, i) => (
              <Chip
                type="lite"
                className={classes.chip}
                style={{
                  marginRight: 4,
                }}
                key={i}
                onClick={() => removeFilter(key, i)}
              >
                {el}
              </Chip>
            ))
        )}
        {filter.ip ? (
          <Chip
            type="lite"
            className={classes.chip}
            style={{
              marginRight: 4,
            }}
            onClick={removeIP}
          >
            {filter.ip}
          </Chip>
        ) : null}
        {filter.sessionMax || filter.sessionMin ? (
          <Chip
            type="lite"
            className={classes.chip}
            style={{
              marginRight: 4,
            }}
            onClick={() => setSessionLength(null, null)}
          >{`${convertLength[filter.sessionMin] || "<="}${
            filter.sessionMax && filter.sessionMin
              ? "-"
              : ""
          }${
            convertLength[filter.sessionMax] || "+"
          }`}</Chip>
        ) : null}
      </div>

      <Tag
        addFilter={addFilter}
        domain={
          domains.items.length !== 0
            ? domains.items[selectedDomain].name
            : "None"
        }
        open={modal === "tags"}
        handleClose={() => setModal("")}
      />
      <Referrer
        addFilter={addFilter}
        domain={
          domains.items.length !== 0
            ? domains.items[selectedDomain].name
            : "None"
        }
        open={modal === "referrers"}
        handleClose={() => setModal("")}
      />
      <Country
        addFilter={addFilter}
        open={modal === "countries"}
        handleClose={() => setModal("")}
      />
      <Page
        addFilter={addFilter}
        domain={
          domains.items.length !== 0
            ? domains.items[selectedDomain].name
            : "None"
        }
        open={modal === "pages"}
        handleClose={() => setModal("")}
      />
      <IP
        domain={
          domains.items.length !== 0
            ? domains.items[selectedDomain].name
            : "None"
        }
        open={modal === "ips"}
        setIP={setIP}
        handleClose={() => setModal("")}
      />
    </div>
  );
};

const Tag = ({ open, handleClose, addFilter, domain }) => {
  const [tags, setTags] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    const relatedOptions = tags.filter((item) =>
      item.includes(currentValue)
    );
    setOptions(relatedOptions);
  };
  const getTags = () => {
    const fd = new FormData();
    fd.append("domain", domain);
    Axios({
      url:
        server +
        `server/helpers/autocomplete/getAllTags.php`,
      method: "POST",
      data: fd,
      withCredentials: true,
    }).then((res) => {
      setTags(res.data);
    });
  };
  useEffect(getTags, [domain]);
  return (
    <Modal fullWidth onClose={handleClose} open={open}>
      <Modal.Title>Добавить тэг</Modal.Title>
      <Modal.Content>
        <AutoComplete
          width="100%"
          onSelect={(v) => {
            addFilter("tags", v);
            handleClose();
          }}
          disableFreeSolo
          options={options.map((el) => ({
            value: el,
            label: el,
          }))}
          placeholder="Начните вводить"
          onSearch={searchHandler}
        >
          <AutoComplete.Empty>
            <span>Нет тегов</span>
          </AutoComplete.Empty>
        </AutoComplete>
      </Modal.Content>
      <Modal.Action onClick={handleClose} passive>
        Ок
      </Modal.Action>
    </Modal>
  );
};

const Referrer = ({
  open,
  handleClose,
  addFilter,
  domain,
}) => {
  const [referrers, setReferrers] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    const relatedOptions = referrers.filter((item) =>
      item.includes(currentValue)
    );
    setOptions(relatedOptions);
  };
  const getAllReferrers = () => {
    const fd = new FormData();
    fd.append("domain", domain);
    Axios({
      url:
        server +
        `server/helpers/autocomplete/getAllReferrers.php`,
      method: "POST",
      data: fd,
      withCredentials: true,
    }).then((res) => {
      setReferrers(res.data);
    });
  };
  useEffect(getAllReferrers, [domain]);
  return (
    <Modal fullWidth onClose={handleClose} open={open}>
      <Modal.Title>Добавить реферер</Modal.Title>
      <Modal.Content>
        <AutoComplete
          width="100%"
          disableFreeSolo
          onSelect={(v) => {
            addFilter("referrers", v);
            handleClose();
          }}
          options={options.map((el) => ({
            value: el,
            label: el,
          }))}
          placeholder="Начните вводить"
          onSearch={searchHandler}
        >
          <AutoComplete.Empty>
            <span>Нет рефереров</span>
          </AutoComplete.Empty>
        </AutoComplete>
      </Modal.Content>
      <Modal.Action onClick={handleClose} passive>
        Ок
      </Modal.Action>
    </Modal>
  );
};

const Country = ({ open, handleClose, addFilter }) => {
  const [options, setOptions] = React.useState([]);
  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    const relatedOptions = countries.filter((item) =>
      item
        .toLowerCase()
        .includes(currentValue.toLowerCase())
    );
    setOptions(relatedOptions);
  };
  return (
    <Modal fullWidth onClose={handleClose} open={open}>
      <Modal.Title>Добавить страну</Modal.Title>
      <Modal.Content>
        <AutoComplete
          width="100%"
          disableFreeSolo
          onSelect={(v) => {
            addFilter("countries", v);
            handleClose();
          }}
          options={options.map((el) => ({
            value: el,
            label: `${countryToFlag(el)} ${el}`,
          }))}
          placeholder="Начните вводить (прим. RU)"
          onSearch={searchHandler}
        >
          <AutoComplete.Empty>
            <span>Нет стран</span>
          </AutoComplete.Empty>
        </AutoComplete>
      </Modal.Content>
      <Modal.Action onClick={handleClose} passive>
        Ок
      </Modal.Action>
    </Modal>
  );
};

const Page = ({ open, handleClose, addFilter, domain }) => {
  const [pages, setPages] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([]);
    const relatedOptions = pages.filter((item) =>
      item.includes(currentValue)
    );
    setOptions(relatedOptions);
  };
  const getPages = () => {
    const fd = new FormData();
    fd.append("domain", domain);
    Axios({
      url: server + `server/helpers/getPages.php`,
      method: "POST",
      data: fd,
      withCredentials: true,
    }).then((res) => {
      setPages(res.data);
    });
  };
  useEffect(getPages, [domain]);
  return (
    <Modal fullWidth onClose={handleClose} open={open}>
      <Modal.Title>Добавить страницу</Modal.Title>
      <Modal.Content>
        <AutoComplete
          width="100%"
          disableFreeSolo
          onSelect={(v) => {
            addFilter("pages", v);
            handleClose();
          }}
          options={options.map((el) => ({
            value: el,
            label: el,
          }))}
          placeholder="Начните вводить"
          onSearch={searchHandler}
        >
          <AutoComplete.Empty>
            <span>Нет страниц</span>
          </AutoComplete.Empty>
        </AutoComplete>
      </Modal.Content>
      <Modal.Action onClick={handleClose} passive>
        Ок
      </Modal.Action>
    </Modal>
  );
};

const IP = ({ open, handleClose, setIP, domain }) => {
  const [ip, setIp] = React.useState("");
  const [ips, setIps] = React.useState([]);
  const getPages = () => {
    const fd = new FormData();
    fd.append("domain", domain);
    fd.append("partialIP", ip);
    Axios({
      url:
        server +
        `server/helpers/autocomplete/getIPsFromNeedle.php`,
      method: "POST",
      data: fd,
      withCredentials: true,
    }).then((res) => {
      setIps(res.data);
    });
  };
  useEffect(getPages, [domain, ip]);
  return (
    <Modal fullWidth onClose={handleClose} open={open}>
      <Modal.Title>Добавить IP-адрес</Modal.Title>
      <Modal.Content>
        <AutoComplete
          width="100%"
          disableFreeSolo
          onSelect={(v) => {
            setIP(v);
            setIp("");
            handleClose();
          }}
          options={ips.map((el) => ({
            value: el,
            label: el,
          }))}
          placeholder="Выберите IP-адрес"
          onSearch={(v) => setIp(v)}
        >
          <AutoComplete.Empty>
            <span>Нет IP-адресов</span>
          </AutoComplete.Empty>
        </AutoComplete>
      </Modal.Content>
      <Modal.Action onClick={handleClose} passive>
        Ок
      </Modal.Action>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addFilter: bindActionCreators(addFilter, dispatch),
  removeFilter: bindActionCreators(removeFilter, dispatch),
  setSessionLength: bindActionCreators(
    setSessionLength,
    dispatch
  ),
  removeIP: bindActionCreators(removeIP, dispatch),
  setIP: bindActionCreators(setIP, dispatch),
});

export default connect(
  (state) => state.oldKlik,
  mapDispatchToProps
)(Filter);
