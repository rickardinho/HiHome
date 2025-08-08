import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function WeatherScreen({ navigation }) {
  // Generate date range: 1 week before today, today, 2 weeks after today
  const generateDateRange = () => {
    const dates = [];
    const today = new Date();
    
    // Start from 1 week before today
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);
    
    // Generate 22 days total (7 before + 1 today + 14 after)
    for (let i = 0; i < 22; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const isToday = currentDate.toDateString() === today.toDateString();
      
      dates.push({
        date: currentDate,
        isToday,
        sun: Math.floor(Math.random() * 12) + 1, // Mock sun hours (1-12)
        wind: Math.floor(Math.random() * 30) + 5, // Mock wind speed (5-34 km/h)
      });
    }
    
    return dates;
  };

  const formatDate = (date) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const weatherData = generateDateRange();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Weather Forecast</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.dateColumn]}>Date</Text>
            <Text style={styles.headerCell}>Sun</Text>
            <Text style={styles.headerCell}>Wind</Text>
          </View>

          {/* Table Rows */}
          {weatherData.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.tableRow,
                item.isToday && styles.todayRow
              ]}
            >
              <Text style={[
                styles.dateCell,
                item.isToday && styles.todayText
              ]}>
                {formatDate(item.date)}
                {item.isToday && <Text style={styles.todayLabel}> (Today)</Text>}
              </Text>
              <Text style={[
                styles.dataCell,
                item.isToday && styles.todayText
              ]}>
                {item.sun}h
              </Text>
              <Text style={[
                styles.dataCell,
                item.isToday && styles.todayText
              ]}>
                {item.wind} km/h
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60, // Same width as back button for centering
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  headerCell: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  dateColumn: {
    flex: 2,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  todayRow: {
    backgroundColor: '#E3F2FD',
  },
  dateCell: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    fontWeight: '500',
  },
  dataCell: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
  },
  todayText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  todayLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'normal',
  },
});