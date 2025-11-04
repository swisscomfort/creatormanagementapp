import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const CreatorEditScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Creator</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
export default CreatorEditScreen;
