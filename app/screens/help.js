import React from 'react';
import { useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Button,
  Linking,
  AppRegistry, 
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spacer from '../components/spacer';
import {
  Colors,
  H1,
  H2,
  H3,
  SPACING,
  SPAN,
  width,
} from './../../config/ui-config';
const headerImage = require('./../../assets/stethoscope.png');

import { advices, symptoms } from './../../config/data';

export default function HelpScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerCard}>
          {/* <Image
            source={headerImage}
            style={[styles.headerImage]}
            resizeMode="contain"
          /> */}
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: H2,
              maxWidth: width * 0.5,
              marginBottom: SPACING * 0.5,
              marginLeft: SPACING * 4,
            }}
          >
            Statistik Covid-19 
            
          </Text>
          <Text style={{ color: 'white', maxWidth: width * 0.5 }}>
          Kota Bandar Lampung dan Lampung selatan
          </Text>
        </View>

        <View style={{ padding: SPACING, paddingBottom: 0 }}>
          <Text style={{ fontWeight: 'bold', fontSize: H2 }}>
            Grafik 
          </Text>
          {/* <Text>
            Jika mengalami gejala paparan Covid-19 hubungi satgas Covid Kota Bandar Lampung dengan menekan tombol di bawah.
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:0721252741`)}>
            <View style={styles.btn}>
              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
              >
                Hubungi Sekarang
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>


        
        
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  headerCard: {
    backgroundColor: Colors.primary,
    elevation: 7,
    borderRadius: SPACING,
    marginHorizontal: SPACING,
    padding: SPACING,
  },
  headerImage: {
    position: 'absolute',
    width: width * 0.3,
    right: 20,
    top: 20,
    height: 110,
  },

  adviceContainer: {
    width: 110,
    marginRight: SPACING,
  },
  adviceImage: {
    width: 110,
    height: 110,
    marginBottom: SPACING * 0.5,
  },
  symContainer: {
    width: width - SPACING * 2,
    marginHorizontal: SPACING,
    backgroundColor: 'white',
    borderRadius: SPACING,
    padding: SPACING,
    marginBottom: SPACING,
    flexDirection: 'row',
  },
  btn: {
    width: width * 0.4,
    height: 50,
    borderRadius: 8,
    marginTop: SPACING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0 , 255 ,100)',
  },
});
