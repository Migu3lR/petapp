import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ComponenteTexto extends Component {
    render() {
        return (
            <View>
                <Text style={styles.texto}>
                    Hola Componente externo
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    texto: {
        color: 'white'
    }
})