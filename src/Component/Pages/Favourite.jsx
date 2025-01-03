import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        console.log('stored', storedFavorites);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };
    loadFavorites();
  }, []);

  const handleRemoveFavorite = async id => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      Alert.alert('Favorite removed successfully');
    } catch (error) {
      console.error('Failed to remove favorite', error);
      Alert.alert('Failed to remove favorite');
    }
  };

  const handleback = () => {
    navigate.reset({
      index: 0,
      routes: [{name: 'home'}],
    });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <TouchableOpacity style={styles.backButton} onPress={handleback}>
        <Text style={styles.removeButtonText}>back</Text>
      </TouchableOpacity>
      <ScrollView>
        {favorites.map((fav, index) => (
          <View key={index} style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={{uri: fav.owner.avatar_url}}
                style={styles.avatar}
              />
              <Text style={styles.ownerName}>{fav.owner.login}</Text>
            </View>
            <Text style={styles.profileName}>{fav.name}</Text>
            <Text style={styles.profileDescription}>
              {fav.description || 'No description available'}
            </Text>
            <View style={styles.repoStats}>
              <Text style={styles.statItem}>
                <Icon name="star-outline" size={16} color="#FFD700" />{' '}
                {fav.stargazers_count} Stars
              </Text>
              <Text style={styles.statItem}>
                <Icon name="source-fork" size={16} color="#000" />{' '}
                {fav.forks_count} Forks
              </Text>
              <Text style={styles.statItem}>
                <Icon name="code-tags" size={16} color="#000" />{' '}
                {fav.language || 'N/A'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFavorite(fav.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    marginTop: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    alignSelf: 'flex-start',
    width:'30%'
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  backButton: {
    backgroundColor: '#33a5ff',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    marginTop: 10,
    width: '30%',
  },
});

export default Favourite;
