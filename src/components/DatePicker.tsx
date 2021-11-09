import React, { useState, useEffect } from "react";
import { View, Platform, Button, Text } from "react-native";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
interface DatePickerProps {
  onChange: (value: string) => void;
  label: string;
  buttonText: string;
}

function DatePicker({ onChange, label, buttonText }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateNasc, setDataNasc] = useState('');

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setOpen(Platform.OS === 'ios');
    setDate(currentDate);
    const dateNasc = moment(date).format('YYYY-MM-DD');
    onChange(dateNasc);
    const displayDate =  moment(date).format('DD/MM/YYYY');
    setDataNasc(displayDate);
  };

  return (
    <View>
      <View>
        <Text>{label}</Text>
        <Text>{dateNasc}</Text>
      </View>
      <View>
        <Button onPress={() => setOpen(true)} title={buttonText} />
      </View>
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}
export default DatePicker;