import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CustomerDetails = ({ onDetailsChange, onDetailsAdded }) => {
  const [expanded, setExpanded] = useState(false);
  const [detailsAdded, setDetailsAdded] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const updateDetails = (key, value) => {
    const updatedDetails = { ...details, [key]: value };
    setDetails(updatedDetails);
    onDetailsChange(updatedDetails);
  };
  
  const validateDetails = () => {
    if (!details.name || !details.email || !details.phone || !details.address) {
      Alert.alert('Incomplete Information', 'Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleAddDetails = () => {
    if (validateDetails()) {
      // Call onDetailsChange with the final details
      onDetailsChange(details);
      // Update status
      setDetailsAdded(true);
      // Notify parent component that details were added
      if (onDetailsAdded) onDetailsAdded(details);
      // Show confirmation
      Alert.alert('Success', 'Customer details saved successfully!');
      // Collapse the form after saving
      setExpanded(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Customer Details</Text>
          {detailsAdded && (
            <View style={styles.detailsAddedIndicator}>
              <Icon name="checkmark-circle" size={16} color={colors.primary} />
              <Text style={styles.detailsAddedText}>Details Added</Text>
            </View>
          )}
        </View>
        <Icon 
          name={expanded ? 'remove-outline' : 'add-outline'} 
          size={24} 
          color={colors.black}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.contentContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={details.name}
              onChangeText={(text) => updateDetails('name', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={details.email}
              onChangeText={(text) => updateDetails('email', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={details.phone}
              onChangeText={(text) => updateDetails('phone', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={details.address}
              onChangeText={(text) => updateDetails('address', text)}
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                value={details.city}
                onChangeText={(text) => updateDetails('city', text)}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Zip Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Zip Code"
                keyboardType="number-pad"
                value={details.zipCode}
                onChangeText={(text) => updateDetails('zipCode', text)}
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddDetails}
          >
            <Text style={styles.addButtonText}>ADD DETAILS</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  headerContent: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  detailsAddedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailsAddedText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 4,
  },
  contentContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.gray,
  },
  required: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomerDetails;