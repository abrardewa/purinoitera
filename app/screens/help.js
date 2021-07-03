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
  Dimensions,
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

const headerImage = require('./../../assets/stethoscope.png');

import { advices, symptoms } from './../../config/data';

const axios = require('axios').default;
export default function HelpScreen({ navigation }) {
  const [global, setGlobal] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    InitializePage();
  }, []);

  function refreshPage() {
    setIsRefreshing(true);
    InitializePage();
  }

  function InitializePage() {
    axios.get(statisticsApi).then((res) => {
      setIsRefreshing(false);
      setGlobal(res.data);
    });
  }
 
    return (
      <View style={styles.container}>
        {/* <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={refreshPage} refreshing={isRefreshing} />
        }
      >
  
      </ScrollView> */}
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
                fontSize: H1,
                maxWidth: width * 0.5,
                marginBottom: SPACING * 0.5,
                marginLeft: SPACING * 3.5,
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
            {global.map((item, index) => (
            <AnalyticsChart
            item={item}
            key={'country' + index}
            // gas={openHead}
              
            />
          ))}
            <View/>
              
          </View>
        </ScrollView>
      </View>
    );
            
   
}

function AnalyticsChart({ item }) {
  const data={
    labels: ["Terkonfirmasi", "Sembuh", "Meninggal"],
    datasets: [
      {
        data: [item.confirmed , item.recovered, item.deaths]
      }
    ]
  };
  return(
    <View>
    <BarChart
      style={{
        marginVertical: 20,
        borderRadius: 16
        }}
      data={data}
      width={Dimensions.get("window").width - 50}
      height={310}
      yAxisLabel=""
      chartConfig={{
        backgroundColor: "white",
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `black`,
        labelColor: (opacity = 1) => `black`,
        barPercentage:1,
        style: {
            borderRadius: 16
        }
        }}
      verticalLabelRotation={0}
    />
    <View style={styles.Card}>

    
        <View >
          <Text style={{ color: Colors.darkGrey, fontWeight: 'bold', fontSize: H2 }}>Keterangan: </Text>
          
        </View>
        <View style={styles.analyticsCardItems}>
          <Text style={{ color: Colors.darkGrey }}>Terkonfirmasi</Text>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>
            {item.confirmed}   
            {/* cari sumbernya */}
          </Text>
        </View>
        <View style={styles.analyticsCardItems}>
          <Text style={{ color: Colors.darkGrey }}>Meninggal</Text>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            {item.deaths}
          </Text>
        </View>
        <View style={styles.analyticsCardItems}>
          <Text style={{ color: Colors.darkGrey }}>Sembuh</Text>
          <Text>{item.recovered}</Text>
        </View>
      </View>
    
     

  </View>

//   <PieChart
//   data={
//       [
//       {
//           name: "Total Terkonfirmasi",
//           population:  item.confirmed ,
//           color: "yellow",
//           legendFontColor: "rgba(0, 0,0, 1)",
//           legendFontSize: 11
//       },
//       {
//         name: "Total Sembuh",
//         population: item.recovered,
//         color: "green",
//         legendFontColor: "rgba(0, 0,0, 1)",
//         legendFontSize: 11
//       },
//       {
//           name: "Total Meninggal",
//           population: item.deaths,
//           color: "red",
//           legendFontColor: "rgba(0, 0,0, 1)",
//           legendFontSize: 11
//       },
//       ]
//   }
//   width={Dimensions.get("window").width - 50} // from react-native
//   height={220}
//   chartConfig={{
//       color: (opacity = 1) => `white`,
//       labelColor: (opacity = 1) => `white`,
//       style: {
//           borderRadius: 16
//       }
//   }}
//   backgroundColor='rgb(0 , 255 ,100)'
//   accessor="population"
//   paddingLeft="15"
//   absolute
//   style={{
//       marginVertical: 8,
//       borderRadius: 16
//   }}
// />
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
