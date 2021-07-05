import React from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import TouchableScale from 'react-native-touchable-scale';


import {
  Colors,
  H1,
  H2,
  SPACING,
  width,
  H3,
  SPAN,
  height,
} from '../../config/ui-config';
import { casesApi, statisticsApi } from '../../config/api';
import Spacer from '../components/spacer';

const axios = require('axios').default;
export default function HomeScreen({ navigation }) {
  const [cases, setCases] = React.useState([]);
  const [global, setGlobal] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  // const [setData, setDatas] = React.useState(null);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [modalVisibility, setModelVisibility] = React.useState(false);

  React.useEffect(() => {
    InitializePage();
  }, []);

  function openModel(country) {
    setModelVisibility(true);
    setSelectedCountry(country);
  }
  // function openHead(country) {
  //   setDatas(country);
  // }
  function closeModel() {
    setModelVisibility(false);
  }

  function refreshPage() {
    setIsRefreshing(true);
    setCases([]);
    InitializePage();
  }

  function InitializePage() {
    axios.get(casesApi).then((res) => {
      setCases(
        res.data.sort((a, b) => -a.confirmed + b.confirmed).slice(0, 126)
      );
    });
    axios.get(statisticsApi).then((res) => {
      setIsRefreshing(false);
      setGlobal(res.data);
    });
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisibility}
        transparent
        animated={false}
        animationType="none"
        children={
          <CountryDetailsModal
            country={selectedCountry}
            closeModel={closeModel}
          />
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={refreshPage} refreshing={isRefreshing} />
        }
      >
        <View style={styles.header}>
          <Text
            style={{
              fontSize: H1,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: SPACING,
            }}
          >
            Selamat Datang Di Aplikasi Lindungi Itera
          </Text>
        </View>
        {global.map((item, index) => (
            <AnalyticsCard
            item={item}
            key={'country' + index}
            // gas={openHead}
              
            />
          ))}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Kasus Terkonfirmasi</Text>
          <Text style={styles.subTitle}>{new Date().toDateString()}</Text>
        </View>
        <View style={styles.confirmedCasesContainer}>
          {cases.length == 0
            ? new Array(2)
                .fill(null)
                .map((_, index) => <LoadingCard key={'loadingCard' + index} />)
            : null}
          {cases.map((item, index) => (
            <CountryCard
              item={item}
              key={'country' + index}
              onPress={openModel}
            />
          ))}
        </View>
        <Spacer />
      </ScrollView>
    </View>
  );
}

function LoadingCard() {
  return (
    <View style={styles.caseContainer}>
      <SkeletonPlaceholder
        highlightColor="whitesmoke"
        backgroundColor={Colors.lightGrey}
      >
        <SkeletonPlaceholder.Item width={40} height={16} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={30}
          width={width * 0.3}
          height={20}
          borderRadius={4}
        />
      </SkeletonPlaceholder>
    </View>
  );
}
function CountryDetailsModal({ country, closeModel }) {
  const anim = React.useRef(new Animated.Value(0)).current;
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });
  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, []);

  function handleCloseModel() {
    Animated.timing(anim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
    setTimeout(() => {
      closeModel();
    }, 50);
  }

  return (
    <Animated.View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleCloseModel}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            styles.modelContainer,
            { opacity: anim, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.indicator}></View>
          <Text style={styles.title}>{country.location}</Text>

          <View style={styles.analyticsCardItems}>
            <Text>Terkonfirmasi</Text>
            <Text style={styles.subTitle}>{country.confirmed}</Text>
          </View>
          <View style={styles.analyticsCardItems}>
            <Text>Sembuh</Text>
            <Text style={styles.subTitle}>{country.recovered}</Text>
          </View>
          <View style={styles.analyticsCardItems}>
            <Text>Meninggal</Text>
            <Text style={styles.subTitle}>{country.deaths}</Text>
          </View>
          <View style={styles.analyticsCardItems}>
            <Text>Vaksin Tahap 1</Text>
            <Text style={styles.subTitle}>{country.vpertama}</Text>
          </View>
          <View style={styles.analyticsCardItems}>
            <Text>Vaksin Tahap 2</Text>
            <Text style={styles.subTitle}>{country.vkedua}</Text>
          </View>
          <View style={styles.analyticsCardItems}>
            <Text>Zona</Text>
            {/* <Text style={styles.subTitle}>{country.active}</Text> */}
            {country.active == 0 ? <Text  style={{ color: 'red', fontWeight: 'bold' }}>Merah</Text>: null }
            {country.active == 1 ? <Text  style={{ color:Colors.orange, fontWeight: 'bold' }}>Oranye</Text>: null }
            {country.active == 2 ? <Text  style={{ color: 'yellow', fontWeight: 'bold' }}>Kuning</Text>: null }
            {country.active == 3 ? <Text  style={{ color: 'green', fontWeight: 'bold' }}>Hijau</Text>: null }
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function SearchInput() {
  return (
    <View style={styles.searchContainer}>
      <TextInput style={styles.searchInput} placeholder="search..." />
      <Feather
        style={styles.icon}
        name="search"
        size={24}
        color={Colors.darkGrey}
      />
    </View>
  );
}

function CountryCard({ item, onPress }) {
  const anim = React.useRef(new Animated.Value(0)).current;

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });
  React.useEffect(() => {
    Animated.timing(anim, {
      duration: 400,
      useNativeDriver: true,
      toValue: 1,
    }).start();
  }, []);

  return (
    <TouchableScale onPress={() => onPress(item)} activeScale={0.95}>
      <Animated.View
        style={[
          styles.caseContainer,
          { opacity: anim, transform: [{ translateY }] },
        ]}
      >
        <Text
          style={{
            fontSize: 12,
            marginBottom: SPACING * 0.5,
            color: Colors.darkGrey,
          }}
        >
          {item.location}
        </Text>
        <Text style={styles.title}>{item.confirmed}</Text>
      </Animated.View>
    </TouchableScale>
  );
}

function AnalyticsCard({ item }) {
  return (
    <View style={styles.analyticsCard}>
      <Text
        style={[
          styles.title,
          { fontSize: H2, color: Colors.dark, fontWeight: 'bold' },
        ]}
      >
        Bandar Lampung
      </Text>
      <View style={styles.analyticsCardItems}>
        <Text style={{ color: Colors.darkGrey }}>Total Konfirmasi</Text>
        <Text style={{ color: 'green', fontWeight: 'bold' }}>
          {item.confirmed}   
          {/* cari sumbernya */}
        </Text>
      </View>
      <View style={styles.analyticsCardItems}>
        <Text style={{ color: Colors.darkGrey }}>Total Meninggal</Text>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>
          {item.deaths}
        </Text>
      </View>
      <View style={styles.analyticsCardItems}>
        <Text style={{ color: Colors.darkGrey }}>Total Sembuh</Text>
        <Text>{item.recovered}</Text>
      </View>
      <View style={styles.analyticsCardItems}>
        <Text style={{ color: Colors.darkGrey }}>Status Zona</Text>
        <Text style={{ color: 'green', fontWeight: 'bold' }}>
          {item.active == 0 ? <Text  style={{ color: 'red', fontWeight: 'bold' }}>Merah</Text>: null }
          {item.active == 1 ? <Text  style={{ color:Colors.orange, fontWeight: 'bold' }}>Oranye</Text>: null }
          {item.active == 2 ? <Text  style={{ color: 'yellow', fontWeight: 'bold' }}>Kuning</Text>: null }
          {item.active == 3 ? <Text  style={{ color: 'green', fontWeight: 'bold' }}>Hijau</Text>: null }
          
        </Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    position: 'absolute',
    height: 200,
    justifyContent: 'center',
    padding: SPACING,
    backgroundColor: Colors.primary,
    borderBottomRightRadius: SPACING * 2,
    borderBottomLeftRadius: SPACING * 2,
  },
  analyticsCard: {
    backgroundColor: 'white',
    marginTop: 150,
    padding: SPACING,
    margin: SPACING,
    borderRadius: SPACING,
  },
  analyticsCardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING,
  },
  titleContainer: {
    marginHorizontal: SPACING,
  },
  title: {
    fontSize: H2,
    color: Colors.dark,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: SPAN,

    color: Colors.darkGrey,
  },
  confirmedCasesContainer: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING * 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  caseContainer: {
    padding: SPACING,
    // elevation: 5,
    width: (width - SPACING * 2 - SPACING) * 0.5,
    backgroundColor: 'white',
    borderRadius: SPACING,
    marginVertical: SPACING * 0.5,
  },

  searchContainer: {
    marginVertical: SPACING,
    width,
    paddingHorizontal: SPACING*1,
  },
  searchInput: {
    width: width - SPACING * 2,
    paddingHorizontal: SPACING*1,

    backgroundColor: 'white',
    height: 60,
    borderRadius: 30,
    borderColor: '#ddd',
  },
  icon: {
    position: 'absolute',
    right: SPACING * 3,
    top: 18,
  },
  modelContainer: {
    backgroundColor: 'white',
    // height: height * 0.5,
    position: 'absolute',
    bottom: 0,
    width,
    elevation: 7,
    borderTopRightRadius: SPACING,
    borderTopLeftRadius: SPACING,
    padding: SPACING,
  },
  indicator: {
    width: 1.5 * SPACING,
    height: 4,
    position: 'absolute',
    top: 10,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: Colors.lightGrey,
  },
});
