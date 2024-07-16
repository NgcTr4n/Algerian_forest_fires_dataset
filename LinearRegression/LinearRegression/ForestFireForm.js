import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const ForestFireForm = () => {
  const [inputs, setInputs] = useState({
    temperature: '',
    relativeHumidity: '',
    windSpeed: '',
    rain: '',
    ffmc: '',
    dmc: '',
    dc: '',
    isi: '',
    bui: '',
    fwi: '',
  });

  const [result, setResult] = useState('');

  const score = (input) => {
    return (
      -1.771609618174206 +
      input[0] * -0.004738196930059392 +
      input[1] * 0.011673828220831812 +
      input[2] * -0.016868194580971385 +
      input[3] * 0.02012731181611614 +
      input[4] * 0.022426648946744218 +
      input[5] * 0.04016012853892055 +
      input[6] * 0.008568174315369492 +
      input[7] * 0.03608660690639111 +
      input[8] * -0.062161035881359794 +
      input[9] * 0.019397019872143446
    );
  };

  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const btnSubmitClick = () => {
    const inputValues = Object.values(inputs).map(parseFloat);

    if (inputValues.some(isNaN)) {
      // Handle invalid input
      setResult('Invalid input');
      return;
    }

    const result = score(inputValues);
    const resultText = result < 0.5 ? 'Not Fire' : 'Fire';

    setResult(resultText);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Algerian Forest Fires Dataset</Text>

        {/* Render input fields */}
        {Object.keys(inputs).map((key) => (
          <View key={key} style={styles.formGroup}>
            <Text style={styles.inputLabel}>{`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}</Text>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                value={inputs[key]}
                onChangeText={(text) => handleInputChange(key, text)}
                keyboardType="numeric"
              />
              <Text>{/* Add unit if needed */}</Text>
            </View>
          </View>
        ))}

        {result === 'Invalid input' && <Text style={styles.errorText}>{result}</Text>}

        {/* Submit button */}
        <Button title="SUBMIT" onPress={btnSubmitClick} style={styles.submitButton} />

        {/* Display result */}
        <View style={styles.result}>
          <Text style={styles.resultText}>{`Predict classes: ${result}`}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    color: '#007bff',
    fontSize: 20,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
});

export default ForestFireForm;
