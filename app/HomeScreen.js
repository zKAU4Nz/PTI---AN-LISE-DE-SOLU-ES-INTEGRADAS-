

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { supabase } from './supabaseClient'; 
import { useNavigation } from 'expo-router'; // Importa o hook de navegação do Expo Router

const { height } = Dimensions.get('window');


const YogaImage = require('../assets/images/yoga.png'); 

const HomeScreen = () => {
    const navigation = useNavigation(); // Hook de navegação
    
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    
    
    
    const fetchUserName = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) { 
            navigation.navigate('Login'); // Redireciona para o Login (index.js)
            setLoading(false); 
            return; 
        }

        const { data } = await supabase.from('usuarios').select('nome_completo').eq('id', user.id).single(); 

        setLoading(false);
        if (data) { 
            // Pega apenas o primeiro nome 
            setUserName(data.nome_completo.split(' ')[0]); 
        } else { 
            setUserName('Usuário'); 
        }
    };

    useEffect(() => { 
        fetchUserName(); 
    }, []); 

    
    
    
    const handleLogout = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
        if (!error) { 
            navigation.navigate('index'); // Navega para o Login (index.js)
        } else { 
            Alert.alert("Erro", "Falha ao sair."); 
        }
    };
    
    
    
    
    if (loading) {
        return (<View style={styles.loadingContainer}><ActivityIndicator size="large" color="#4FA9C1" /><Text>Carregando perfil...</Text></View>);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topShape} />
            <View style={styles.content}>
                
                {/* Cabeçalho: Olá, [Nome] */}
                <View style={styles.header}>
                    <Ionicons name="home" size={24} color="#333" style={styles.homeIcon} />
                    <Text style={styles.welcomeText}>
                        Olá, <Text style={styles.userNameText}>{userName}</Text>
                    </Text>
                </View>

                {/* Imagem Central */}
                <View style={styles.imageContainer}>
                    <Image source={YogaImage} style={styles.yogaImage} resizeMode="contain" />
                </View>

                {/* Botões */}
                <TouchableOpacity 
        style={styles.navButton} 
        
        onPress={() => navigation.navigate('ProfileScreen')}><Text style={styles.buttonText}>Perfil</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('TrainingScreen')}><Text style={styles.buttonText}>Treinos</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.navButton, styles.logoutButton]} onPress={handleLogout}><Text style={styles.buttonText}>Sair</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F9FA', },
    topShape: { position: 'absolute', top: 0, left: 0, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(173, 216, 230, 0.4)', },
    content: { flex: 1, alignItems: 'center', paddingHorizontal: 30, paddingTop: height * 0.05, },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F9FA', },
    header: { flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginBottom: height * 0.05, paddingLeft: 10, },
    homeIcon: { marginRight: 10, },
    welcomeText: { fontSize: 22, color: '#333', },
    userNameText: { fontWeight: 'bold', color: '#000', },
    imageContainer: { width: '100%', height: height * 0.3, justifyContent: 'center', alignItems: 'center', marginBottom: height * 0.05, },
    yogaImage: { width: '80%', height: '100%', },
    navButton: { width: '100%', height: 60, backgroundColor: '#4FA9C1', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5, },
    logoutButton: { backgroundColor: '#9E9E9E', marginTop: 10, },
    buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', },
});

export default HomeScreen;