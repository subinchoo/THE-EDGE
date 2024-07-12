import { Link } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput ,Linking, Alert} from 'react-native';
import Modal from 'react-native-modal';


const SettingsScreen = ({ navigation }) => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('');
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [language, setLanguage] = useState('');
  const [displayMode, setDisplayMode] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isDeleteConfirmationModalVisible, setDeleteConfirmationModalVisible] = useState(false); 


  const handleSaveSettings = () => {
    
    console.log('Settings saved');
    navigation.navigate('Home');
  };
  const handleDeleteAccount = () => {
    setDeleteConfirmationModalVisible(true);
  };

  const confirmDeleteAccount = () => {
    // actual delete code
    // ...

    setDeleteConfirmationModalVisible(false);
    navigation.navigate('Registration');
  };

  const cancelDeleteAccount = () => {
    setDeleteConfirmationModalVisible(false);
  };




  return (
    <View style={[styles.container,{marginTop:-20}]}>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      <View style={styles.settingItem}>
        <Text>Enable Notifications</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={(value) => setNotificationEnabled(value)}
        />
      </View>

      <Text style={styles.sectionTitle}>Reminder Settings</Text>
      <View style={styles.settingItem}>
        <Text>Reminder Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Set reminder time"
          value={reminderTime}
          onChangeText={(text) => setReminderTime(text)}
        />
      </View>

      <Text style={styles.sectionTitle}>Display Mode</Text>
      <View style={styles.settingItem}>
        
      </View>
      

      <TouchableOpacity onPress={()=> Linking.openURL('https://talentinsightsolutions.com.au/terms-and-conditions/')}>
        <Text style={styles.sectionTitle}>Terms and Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://talentinsightsolutions.com.au/resources/privacy-policy/')}>
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> Linking.openURL('https://talentinsightsolutions.com.au/contact/')}>
        <Text style={styles.sectionTitle}>Contact</Text>
      </TouchableOpacity>
      
      
      

     
      <Text style={[styles.sectionTitle, {marginTop:50}]}>Account</Text>
      <TouchableOpacity onPress={handleDeleteAccount}>
        <Text style={styles.deleteAccount}>Delete Account</Text>
      </TouchableOpacity>
  <Modal
        isVisible={isDeleteConfirmationModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Account</Text>
          <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={cancelDeleteAccount}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={confirmDeleteAccount}>
              <Text style={[styles.modalButtonText, styles.deleteButtonText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  deleteAccount: {
    color: '#D73E3F',
    fontWeight: 'bold',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#023B64',
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color:'black'
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: '#023B64',
    borderWidth: 1,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#023B64',
    textAlign: 'center',
  },
  deleteButton: {
    borderColor: '#D73E3F',
  },
  deleteButtonText: {
    color: '#D73E3F',
  },
});

export default SettingsScreen;
