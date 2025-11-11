

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions, Linking, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const { height } = Dimensions.get('window');


const TrainingResource = require('../assets/images/alongamento.jpg'); 

const TrainingScreen = ({ navigation }) => {
    
    
    const openMusicApp = async () => {
        const spotifyUrl = 'spotify:playlist:37i9dQZF1DXcKqP3rhrdJc'; // Playlist relaxante de exemplo
        const youtubeUrl = 'https://www.youtube.com/results?search_query=música+relaxante+para+alongamento';

        try {
            const supported = await Linking.canOpenURL(spotifyUrl);
            
            if (supported) {
                await Linking.openURL(spotifyUrl);
            } else {
                Alert.alert(
                    "Música para Treino", 
                    "O Spotify não está instalado. Abrindo busca de música relaxante no YouTube.",
                    [{ text: "OK", onPress: () => Linking.openURL(youtubeUrl) }]
                );
            }
        } catch (e) {
            Alert.alert("Erro de Música", "Não foi possível abrir o aplicativo externo.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            
                {/* Bloco da Imagem */}
                <View style={styles.resourceBox}>
                    <Image 
                        source={TrainingResource} 
                        style={styles.resourceStyle} 
                        resizeMode="cover" 
                    />
                </View>

                <View style={styles.content}>
                    
                    <Text style={styles.exerciseTitle}>Exercício de alongamento</Text>

                    <Text style={styles.descriptionText}>
                        aumentar a flexibilidade dos músculos e articulações, melhorando a circulação 
                        sanguínea e preparando o corpo para atividades
                    </Text>

                    <Text style={styles.benefitsTitle}>Benefícios desse alongamento:</Text>
                    
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bulletItem}>• Relaxa a musculatura do ombro e parte superior das costas.</Text>
                        <Text style={styles.bulletItem}>• Ajuda a prevenir lesões em atividades.</Text>
                        <Text style={styles.bulletItem}>• Melhora a mobilidade articular da região.</Text>
                    </View>

                    {/* Botão Spotify/Música */}
                    <TouchableOpacity style={styles.musicButton} onPress={openMusicApp}>
                        <Ionicons name="musical-notes" size={24} color="#FFF" />
                        <Text style={styles.musicButtonText}>Música para Alongamento</Text>
                    </TouchableOpacity>
                </View>

                {/* Este TouchableOpacity está fixado na tela pelo CSS, mas o padding no ScrollView garante que o conteúdo não seja cortado */}

            </ScrollView>

        

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F9FA', },
    scrollContent: { paddingBottom: 100 }, 
    resourceBox: {
        width: '100%',
        height: height * 0.35,
        backgroundColor: '#E0E0E0',
        marginBottom: 20,
    },
    resourceStyle: { width: '100%', height: '100%', },
    content: { paddingHorizontal: 20, paddingBottom: 20 },
    exerciseTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333', },
    descriptionText: { fontSize: 16, lineHeight: 24, marginBottom: 25, color: '#555', },
    benefitsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333', },
    bulletContainer: { marginLeft: 10, marginBottom: 30 },
    bulletItem: { fontSize: 16, lineHeight: 28, color: '#555', },
    musicButton: {
        flexDirection: 'row',
        backgroundColor: '#1DB954', 
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    musicButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#FFF',
        borderRadius: 30,
        zIndex: 10, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    }
});

export default TrainingScreen;