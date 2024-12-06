import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'twrnc';

const contacts = [
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
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactCard}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Contact ${item.name}`}
      accessibilityHint="Tap to view or edit details for this contact"
      onPress={() => console.log(`Selected ${item.name}`)}
    >
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactDetails}>Phone: {item.phone}</Text>
      {item.email && <Text style={styles.contactDetails}>Email: {item.email}</Text>}
      <Text style={styles.contactDetails}>Relationship: {item.relationship}</Text>
      {item.nickname && (
        <Text style={styles.contactDetails}>Nickname: {item.nickname}</Text>
      )}
    </TouchableOpacity>
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
    marginBottom: 4,
    color: '#222222',
  },
  contactDetails: {
    fontSize: 16,
    color: '#444444',
  },
});
