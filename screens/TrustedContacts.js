import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
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
  const [contacts, setContacts] = useState(initialContacts);

  const handleAddContact = () => {
    const newContact = {
      id: (contacts.length + 1).toString(),
      name: 'New Amigo',
      phone: '314-159-2653',
      relationship: 'Friend',
      email: null,
      nickname: null,
    };
    setContacts([...contacts, newContact]);
  };

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleEditContact = (contact) => {
    console.log(`Edit contact: ${contact.name}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactCard}>
      <Text style={styles.contactName}>{item.name}</Text>
      
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditContact(item)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Edit contact ${item.name}`}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteContact(item.id)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Delete contact ${item.name}`}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
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
    fontSize: 24,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222222',
  },
  contactDetailsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  contactDetailsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 8,
  },
  contactDetails: {
    fontSize: 18,
    color: '#444444',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
  backgroundColor: '#3B82F6',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  marginRight: 8,
},
deleteButton: {
  backgroundColor: '#DC2626',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  marginLeft: 8,
},
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
