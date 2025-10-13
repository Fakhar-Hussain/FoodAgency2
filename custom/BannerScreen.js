import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.9; 
const SPACING = (width - CARD_WIDTH) / 2; 
const ITEM_SIZE = CARD_WIDTH + SPACING * 2; 

const BANNER_DATA = [
  { id: '3', imageUrl: 'https://www.shutterstock.com/image-photo/burger-special-discount-banner-blank-600nw-2408928973.jpg' },
  { id: '1', imageUrl: 'https://img.freepik.com/free-vector/flat-food-sale-background_23-2149175437.jpg' },
  { id: '2', imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-pizza-horizontal-banner_23-2150266608.jpg?semt=ais_hybrid&w=740&q=80' },
];

// ---------------------------------------------------

const BannerScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null); 

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (activeIndex + 1) % BANNER_DATA.length;
      
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      
      setActiveIndex(nextIndex);

    }, 5333);

    return () => clearInterval(interval); 
  }, [activeIndex]);


  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_SIZE); 
    setActiveIndex(index);
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.bannerCardWrapper}> 
      <View style={styles.bannerCard}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.bannerImage}
          resizeMode="cover" 
        />
      </View>
    </View>
  );

  const Indicator = () => (
    <View style={styles.indicatorContainer}>
      {BANNER_DATA.map((_, index) => (
        <View
          key={index.toString()}
          style={[
            styles.dot,
            { 
              backgroundColor: index === activeIndex ? '#333' : '#d1d1d1',
              width: index === activeIndex ? 20 : 8,
            },
          ]}
        />
      ))}
    </View>
  );


  return (
    <View style={styles.safeArea}>
      <FlatList
        ref={flatListRef}
        data={BANNER_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled 
        snapToInterval={ITEM_SIZE} 
        decelerationRate="fast" 
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
        getItemLayout={(data, index) => ({ 
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
        })}
      />
      <Indicator />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5f5f5',
  },

  flatListContent: {
    paddingHorizontal: SPACING, 
  },

  bannerCardWrapper: {
    width: ITEM_SIZE, 
  },

  bannerCard: {
    width: CARD_WIDTH, 
    height: width * 0.45,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%', 
    height: '100%',
  },

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dot: {
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

export default BannerScreen;