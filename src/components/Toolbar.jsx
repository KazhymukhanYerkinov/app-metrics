import {
  Button,
  Modal,
  Select,
  useTheme,
} from "@geist-ui/react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";
import { selectDomain, setDate } from "@redux/actions";
import { Calendar as CalendarIcon } from "@geist-ui/react-icons";
import moment from "moment";
import Site from "./Site";
import classes from "./Toolbar.module.css";
import Filter from "@components/Filter";
import { useState } from "react";

const Toolbar = ({
  selectedDomain,
  selectDomain,
  domains,
  date,
  setDate,
}) => {
  const { palette } = useTheme();
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    from: date[0].toDate(),
    to: date[1].toDate(),
  });
  const handleDayClick = (day) => {
    if (moment(day).isAfter(moment())) {
      return;
    }
    const range = DateUtils.addDayToRange(day, state);
    setState(range);
  };
  return (
    <div
      style={{
        boxShadow: `inset 0 -1px ${palette.accents_2}`,
        backgroundColor: palette.background,
      }}
      className={classes.toolbar}
    >
      <div className={classes.container}>
        <Select
          disabled={domains.items.length === 1}
          placeholder="Choose one"
          value={`${selectedDomain}`}
          onChange={(e) => {
            selectDomain(e);
          }}
        >
          {domains.items.map((el, i) => (
            <Select.Option key={i} value={`${i}`}>
              <Site domain={el.name} />
            </Select.Option>
          ))}
        </Select>
        <Button
          style={{
            marginLeft: 8,
          }}
          auto
          size="small"
          onClick={() => setModal(true)}
          icon={<CalendarIcon />}
        />
        <Filter />
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Modal.Title>Дата</Modal.Title>
        <Modal.Subtitle>Выберите период</Modal.Subtitle>
        <Modal.Content
          style={{
            "--primary": palette.success,
            "--lighter": palette.successLight,
          }}
        >
          <DayPicker
            localeUtils={MomentLocaleUtils}
            locale="ru"
            className={`Selectable ${classes.oneMonth}`}
            numberOfMonths={1}
            disabledDays={[{ after: new Date() }]}
            selectedDays={[state.from, state]}
            modifiers={{ start: state.from, end: state.to }}
            onDayClick={handleDayClick}
          />
        </Modal.Content>
        <Modal.Action
          onClick={() => {
            setDate([moment(state.from), moment(state.to)]);
            setModal(false);
          }}
        >
          Выбрать
        </Modal.Action>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  selectDomain: bindActionCreators(selectDomain, dispatch),
  setDate: bindActionCreators(setDate, dispatch),
});

export default connect(
  (state) => state.oldKlik,
  mapDispatchToProps
)(Toolbar);
