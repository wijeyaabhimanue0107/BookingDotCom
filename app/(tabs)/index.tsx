import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const cities = [
  'Colombo', 'Kandy', 'Galle', 'Nuwara Eliya', 'Jaffna', 'Anuradhapura',
  'Ratnapura', 'Negombo', 'Trincomalee', 'Batticaloa', 'Badulla', 'Matara',
  'Hambantota', 'Kurunegala', 'Polonnaruwa', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Dambulla', 'Haputale','Ampara','Gampaha','Kalutara','Kegalle',
  'Matale','Monaragala','Mullaitivu','Puttalam'
];

export default function HomeScreen() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [fromDateTime, setFromDateTime] = useState(new Date());
  const [toDateTime, setToDateTime] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleCitySelect = (city: React.SetStateAction<string>) => {
    if (activeField === 'pickup') {
      setPickup(city);
    } else if (activeField === 'dropoff') {
      setDropoff(city);
    }
    setIsModalVisible(false);
  };

  const UnselectDropoff = () => {
    setDropoff("");
  };

  const UnselectPickup = () => {
    setPickup("");
  };

  const openModal = (field: React.SetStateAction<string>) => {
    setActiveField(field);
    setIsModalVisible(true);
  };

  const handleBookRide = () => {
    console.log(`Pickup: ${pickup}, Dropoff: ${dropoff}, From: ${fromDateTime}, To: ${toDateTime}`);
    if (pickup && dropoff) {
      alert(`Ride booked from ${pickup} to ${dropoff} on ${fromDateTime} to ${toDateTime}`);
    } else if (pickup) {
      alert('Select Dropoff location');
    } else if (dropoff) {
      alert('Select Pickup location');
    } else {
      alert('Select Pickup and Dropoff location');
    }
  };

  const onFromDateTimeChange = () => {
    setShowFromPicker(Platform.OS === 'ios');
    if (fromDateTime) {
      setFromDateTime(fromDateTime);
    }
  };

  const onToDateTimeChange = () => {
    setShowToPicker(Platform.OS === 'ios');
    if (toDateTime) {
      setToDateTime(toDateTime);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/car.png')}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Book a Ride</Text>
      </View>

      {/* Pickup Location Input */}
      <Text style={styles.fieldText}>From</Text>
      <TouchableOpacity onPress={() => openModal('pickup')} style={styles.inputContainer}>
        <Ionicons name="location-outline" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          value={pickup}
          editable={false}
        />
        <Ionicons name="close" size={24} color="gray" onPress={UnselectPickup}/>
      </TouchableOpacity>

      {/* Dropoff Location Input */}
      <Text style={styles.fieldText}>To</Text>
      <TouchableOpacity onPress={() => openModal('dropoff')} style={styles.inputContainer}>
        <Ionicons name="flag-outline" size={24} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Enter dropoff location"
          value={dropoff}
          editable={false}
        />
        <Ionicons name="close" size={24} color="gray" onPress={UnselectDropoff}/>
      </TouchableOpacity>

      {/* From Date and Time Input */}
      <Text style={styles.fieldText}>From Date/Time</Text>
      <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.inputContainer}>
        <Ionicons name="calendar-outline" size={24} color="gray" />
        <Text style={styles.input}>
          {fromDateTime.toLocaleString()}
        </Text>
      </TouchableOpacity>
      {showFromPicker && (
        <DateTimePicker
          value={fromDateTime}
          mode="datetime"
          display="default"
          onChange={onFromDateTimeChange}
        />
      )}

      {/* To Date and Time Input */}
      <Text style={styles.fieldText}>To Date/Time</Text>
      <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.inputContainer}>
        <Ionicons name="calendar-outline" size={24} color="gray" />
        <Text style={styles.input}>
          {toDateTime.toLocaleString()}
        </Text>
      </TouchableOpacity>
      {showToPicker && (
        <DateTimePicker
          value={toDateTime}
          mode="datetime"
          display="default"
          onChange={onToDateTimeChange}
        />
      )}

      {/* Book Ride Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>

      {/* City Selection Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a City</Text>
            <FlatList
              data={cities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCitySelect(item)}>
                  <Text style={styles.cityItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#314ca1',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 150,
    height: 80,
    marginTop: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#bdbec2',
  },
  fieldText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bdbec2',
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cityItem: {
    fontSize: 18,
    paddingVertical: 8,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
