import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';

const initialContacts = [
  {
    id: '1',
    name: 'Billy Bob',
    phone: '123-456-7890',
    email: 'I.am.goated@example.com',
    relationship: 'Friend',
    nickname: 'Bobby',
  },
  {
    id: '2',
    name: 'Dina Saur',
    phone: '987-654-3210',
    email: 'chicken_nuggets@example.com',
    relationship: 'Sister',
    nickname: 'Nuggie',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    phone: '555-123-4567',
    relationship: 'Coworker',
    email: null,
    nickname: null,
  },
];

const TrustedContacts = () => {
  const [contacts, setContacts] = useState(initialContacts); // State for managing contacts

  // Handler to add a new contact (for demo purposes, we just add a static one)
  const handleAddContact = () => {
    const newContact = {
      id: (contacts.length + 1).toString(), // New ID based on current number of contacts
      name: 'New Amigo',
      phone: '314-159-2653',
      relationship: 'Friend',
      email: null,
      nickname: null,
    };
    setContacts([...contacts, newContact]); // Update contacts array with new contact
  };

  // Handler to delete a contact
  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId)); // Remove contact by ID
  };

  // Handler to edit a contact (for demo, just logs the contact)
  const handleEditContact = (contact) => {
    console.log(`Edit contact: ${contact.name}`); // Placeholder action for editing
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactCard}>
      <Text style={styles.contactName}>{item.name}</Text>
      
      {/* Contact details with better formatting */}
      <View style={styles.contactDetailsContainer}>
        <Text style={styles.contactDetailsLabel}>Phone:</Text>
        <Text style={styles.contactDetails}>{item.phone}</Text>
      </View>

      {item.email && (
        <View style={styles.contactDetailsContainer}>
          <Text style={styles.contactDetailsLabel}>Email:</Text>
          <Text style={styles.contactDetails}>{item.email}</Text>
        </View>
      )}
      
      <View style={styles.contactDetailsContainer}>
        <Text style={styles.contactDetailsLabel}>Relationship:</Text>
        <Text style={styles.contactDetails}>{item.relationship}</Text>
      </View>

      {item.nickname && (
        <View style={styles.contactDetailsContainer}>
          <Text style={styles.contactDetailsLabel}>Nickname:</Text>
          <Text style={styles.contactDetails}>{item.nickname}</Text>
        </View>
      )}

      {/* Edit and Delete buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditContact(item)} />
        <Button title="Delete" onPress={() => handleDeleteContact(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text
          style={styles.header}
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel="Trusted Contacts"
        >
          Trusted Contacts
        </Text>
        
        {/* Add Contact Button styled for better visibility */}
        <TouchableOpacity
          style={styles.addButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Add a new contact"
          onPress={handleAddContact}
        >
          <Text style={styles.addButtonText}>+ Add Contact</Text>
        </TouchableOpacity>
        
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default TrustedContacts;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24, // Minimum 18 is already satisfied for header
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  contactCard: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  contactName: {
    fontSize: 20, // Minimum 18 is already satisfied for contact name
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222222',
  },
  contactDetailsContainer: {
    flexDirection: 'row', 
    marginBottom: 8, // Space between details
    alignItems: 'flex-start',
  },
  contactDetailsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8, // Space between label and detail
    flexShrink: 0, // Prevent shrinking of labels
  },
  contactDetails: {
    fontSize: 18, // Adjusted to ensure minimum font size of 18
    color: '#444444',
    flexShrink: 0, // Prevent shrinking of text below the minimum size
    width: '85%', // Limit width of text to avoid awkward line breaks
    overflow: 'hidden', // Prevent overflow
    flexWrap: 'wrap', // Allow text to wrap properly
    textAlign: 'left', // Ensure proper alignment
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#007BFF', // Blue color for a prominent button
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18, // Adjusted to ensure minimum font size of 18
    fontWeight: 'bold',
  },
});
