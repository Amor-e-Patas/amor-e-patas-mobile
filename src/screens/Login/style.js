import React from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {RectButton} from 'react-native-gesture-handler';
import {colors, fontFamily} from '../../constants/theme';

export default function Consultation({item, onPress}){
  return(
    <RectButton
      onPress={onPress}
      style={styles.solicitationContainer}
    >
      <Image
        
        resizeMode="cover"
        style={styles.psychologistImage}
      />

      <View style={{alignItems:'center'}}>
        <Text style={styles.psychologistName}>{item.Psychologist.name}</Text>
        <Text style={styles.psychologistSpecialty}>{item.Psychologist.Specialty.name}</Text>
        <Text style={styles.date}>{dateFormat(new Date(item.consultationDate))}</Text>
      </View>

      <FontAwesome name="chevron-right" size={30} color={colors.lightBlue} />

    </RectButton>
  );
}

const styles = StyleSheet.create({
  solicitationContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#F5F5F9',
    padding:12,
    borderRadius:8,
    marginBottom:14
  },

  psychologistName:{
    fontFamily: fontFamily.Nunito_700Bold,
    color:colors.titles,
    fontSize:18,
  },

  psychologistSpecialty:{
    fontFamily: fontFamily.Nunito_600SemiBold,
    color:colors.texts,
    fontSize:14,
    marginTop:12,
  },

  psychologistImage:{
    width:70,
    height:70,
    borderRadius: 8
  },

  date:{
    fontFamily: fontFamily.Nunito_700Bold,
    color:colors.texts,
    fontSize:14,
    marginTop:12,
    letterSpacing:2.5,
  },
});