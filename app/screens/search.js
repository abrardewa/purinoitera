import React, {useState, useEffect} from 'react';
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
  Dimensions,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spacer from '../components/spacer';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {
  Colors,
  H1,
  H2,
  H3,
  SPACING,
  SPAN,
  width,
} from './../../config/ui-config';
import { statisticsApi } from '../../config/api';
import { Feather } from '@expo/vector-icons';

const headerImage = require('./../../assets/stethoscope.png');

import { advices, symptoms } from './../../config/data';

const axios = require('axios').default;
export default function SearchScreen({ navigation }) {
  const [global, setGlobal] = React.useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://sheet.best/api/sheets/5a589c33-6d1a-46ff-a75f-5476b369ea5f')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.location
            ? item.location.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.location.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) =>
    Alert.alert(
        "Hasil Pencarian",
         'Kelurahan                          : '+ item.location+ '\nTerkonfirmasi                   : ' + item.confirmed + '\nMeninggal                         : ' +item.deaths+ '\nSembuh                             : '+item.recovered+'\nVaksin Tahap Pertama  : ' +item.vpertama+'\nVaksin Tahap Kedua      : '+item.vkedua +'\nZona                                  : '+((item.active==0)?"Merah":"")+((item.active==1)?"Oranye":"")+((item.active==2)?"Kuning":"")+((item.active==3)?"Hijau":""),
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

//   const getItem = (item) => {
//     // Function for click on an item
//     Alert.alert(
//         "Hasil Pencarian",
//         ` Kelurahan : ${item.location}`,  
//         ` Terkonfirmasi: ${item.confirmed}`,  
//         ` Sembuh : ${item.recovered}`,  
//         ` Meninggal : ${item.deaths}`,  
//         ` Zona : ${item.active}`,  
//         [
//           {
//             text: "Cancel",
//             onPress: () => console.log("Cancel Pressed"),
//             style: "cancel"
//           },
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ],
//         { cancelable: false }
//       );
//     // alert('Lokasi : ' + item.location + ' Terkonfirmasi : ' + item.confirmed + 'Meninggal :' +item.deaths+ 'Sembuh : '+item.recovered+ 'Zona: '+item.active);
//   };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};


// });
// function SearchInput({item}) {
//     return (
//       <View style={styles.searchContainer}>
//         <TextInput style={styles.searchInput} placeholder="search..." />

//       </View>
//     );
//   }

const styles = StyleSheet.create({
    container: {
        marginTop:SPACING*2,
        backgroundColor: 'white',
      },
      itemStyle: {
        padding: 10,
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#ddd',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
      },
  searchInput: {
    width: width - SPACING * 2,
    paddingHorizontal: SPACING*1,

    backgroundColor: 'white',
    height: 60,
    borderRadius: 30,
    borderColor: '#ddd',
  },
  headerCard: {
    backgroundColor: Colors.primary,
    elevation: 7,
    borderRadius: SPACING,
    marginHorizontal: SPACING,
    padding: SPACING,
  },
  Card: {
    backgroundColor: "white",
    elevation: 7,
    borderRadius: SPACING,
    marginHorizontal: 10,
    marginVertical: 7,
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
  logo: {
    width: 330,
    height: 330,
  },
  analyticsCardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING,
  },
});
