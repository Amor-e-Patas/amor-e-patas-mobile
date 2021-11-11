import React, { useState, useEffect } from "react";
import { View, Platform, Button, Text } from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
interface DatePickerProps {
  startDate?: string;
  onChange: (value: string) => void;
  label: string;
  buttonText: string;
}
import { RectButton } from "react-native-gesture-handler";

function DatePicker({ startDate, onChange, label, buttonText }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateNasc, setDataNasc] = useState("");

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === "ios");
    setDate(currentDate);
    const dateNasc = moment(currentDate).format("YYYY-MM-DD");
    onChange(dateNasc);
    const displayDate = moment(currentDate).format("DD/MM/YYYY");
    setDataNasc(displayDate);
  };

  useEffect(() => {
    console.log('std', startDate);
    if (startDate) {
      const displayDate = moment(startDate, 'YYYY-MM-DD').format("DD/MM/YYYY");
      setDataNasc(displayDate);
    }
  }, [startDate]);

  return (
    <View>
      <View>
        <Text>{label}</Text>
        <Text>{dateNasc}</Text>
      </View>
      <View style={{ backgroundColor: "#f8f8f8", width: 310, marginTop: 10 }}>
        <RectButton
          onPress={() => setOpen(true)}
        >
          <Text>{buttonText}</Text>
        </RectButton>
      </View>
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}
export default DatePicker;
