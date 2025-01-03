import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {toggleTheme} from '../../Common/themeSlice';
import {lightTheme, darkTheme} from '../../Common/themeStyles';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Home = ({profilerequest, profileDetails}) => {
  const [searchquery, setsearchquery] = useState('');
  const [profiledetail, setprofiledetails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favAdd, setfavAdd] = useState(false);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const theme = isDarkMode ? darkTheme : lightTheme;

  // console.log('profile' ,profiledetail)

  const navigation = useNavigation();

  useEffect(() => {
    if (profileDetails !== undefined) {
      setprofiledetails(profileDetails.items);
    }
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };
    loadFavorites();
  }, [profileDetails]);

  // console.log('profile====>', profiledetail.items)

  const handleAddToFavorites = async profile => {
    const isAlreadyFavorite = favorites.some(item => item.id === profile.id);

    if (isAlreadyFavorite) {
      Alert.alert('This profile is already in your favorites.');
      return;
    }
    const updatedFavorites = [...favorites, profile];
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      console.log('fav added');
      setfavAdd(true);
    } catch (error) {
      console.error('Failed to save', error);
      Alert.alert('Failed to add to favorites');
    }
  };

  const handleSearch = () => {
    if (searchquery === '') {
      Alert.alert('Please enter a search term to find repositories', [
        {text: 'OK'},
      ]);
      return;
    }
    profilerequest({
      query: searchquery,
    });
  };

  const onclickbutton = () => {
    dispatch(toggleTheme())
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Button  title={isDarkMode ? "Light Mode" : "Dark Mode"} onPress={onclickbutton} />
      <View style={styles.headerContainer}>
        <Icon name="github" size={30} color="black" />
        <Text style={styles.headerText}>GitHub Explorer</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{padding: 10, alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('favourite');
            }}>
            {favAdd ? (
              <Icon name="star-outline" size={30} color="red" />
            ) : (
              <Icon name="star-outline" size={30} color="black" />
            )}
            <Text style={{marginLeft: 5}}>Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search repositories..."
          placeholderTextColor="#888"
          onChangeText={text => setsearchquery(text)}
          value={searchquery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop: '5%'}}>
        {profiledetail &&
          profiledetail.map((data, index) => (
            <View key={index} style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{uri: data.owner.avatar_url}}
                  style={styles.avatar}
                />
                <Text style={styles.ownerName}>{data.owner.login}</Text>
              </View>
              <Text style={styles.profileName}>{data.name}</Text>
              <Text style={styles.profileDescription}>
                {data.description || 'No description available'}
              </Text>
              <View style={styles.repoStats}>
                <Text style={styles.statItem}>
                  <Icon name="star-outline" size={16} color="#FFD700" />{' '}
                  {data.stargazers_count} Stars
                </Text>
                <Text style={styles.statItem}>
                  <Icon name="source-fork" size={16} color="#000" />{' '}
                  {data.forks_count} Forks
                </Text>
                <Text style={styles.statItem}>
                  <Icon name="code-tags" size={16} color="#000" />{' '}
                  {data.language || 'N/A'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleAddToFavorites(data)}>
                <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: width * 0.05,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    maxWidth: 400,
    marginBottom: height * 0.03,
    justifyContent: 'space-between',
    marginTop:'3%'
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginLeft: width * 0.03,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
  },
  searchIcon: {
    marginRight: width * 0.02,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.04,
    color: '#333',
    paddingVertical: height * 0.01,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: width * 0.05,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: height * 0.03,
  },
  profileName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  profileDescription: {
    fontSize: width * 0.04,
    color: '#555',
    marginVertical: height * 0.02,
  },
  favoriteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    width: '50%',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
 avatar: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    marginRight: 10,
  },
  ownerName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333',
  },
  repoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  statItem: {
    fontSize: width * 0.035,
    color: '#555',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  infoText: {
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: height * 0.01,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Home;
