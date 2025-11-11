

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router'; // CHAVE: Hook de navegação
import { supabase } from './supabaseClient'; 

const { height } = Dimensions.get('window');

// Caminho paraa a estrutura de pastas assets/images/
const RunnerImage = require('../assets/images/atleta.png'); 

const LoginScreen = (props) => { 
    // CHAVE: Chamada do hook para definir o objeto de navegação
    const navigation = useNavigation(); 

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleLogin = async () => {
        if (!email || !senha) { Alert.alert("Erro", "Por favor, preencha E-mail e Senha."); return; }
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        setLoading(false);

        if (error) { Alert.alert("Erro de Login", "Verifique seu e-mail e senha. Credenciais inválidas."); return; }
        
        // Navegação para a Home 
        navigation.navigate('HomeScreen'); 
    };
    
    const handleRegister = () => {
        // Navegação para o nome do arquivo: RegisterScreen
        navigation.navigate('RegisterScreen'); 
    };
    const handleForgotPassword = () => {
        Alert.alert("Esqueceu a Senha", "Funcionalidade a ser implementada.");
    };

    // O RETURN DEVE COMEÇAR AQUI 
    return ( 
        <SafeAreaView style={styles.container}>
            <View style={styles.topShape} />
            <View style={styles.content}>
                
                <Text style={styles.welcomeText}>Welcome</Text>

                <View style={styles.imageContainer}>
                    <Image 
                        source={RunnerImage} 
                        style={styles.runnerImage} 
                        resizeMode="contain" 
                    />
                </View>

                {/* Inputs */}
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#666" secureTextEntry value={senha} onChangeText={setSenha} />
                
                <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.loginButtonText}>{loading ? 'Entrando...' : 'Login'} </Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Não tem uma conta?</Text>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.registerLinkText}> Cadastre-se</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    ); 
}; 


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F9FA', },
    topShape: { position: 'absolute', top: -50, left: -50, width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(173, 216, 230, 0.4)', },
    content: { flex: 1, alignItems: 'center', paddingHorizontal: 30, paddingTop: height * 0.08, },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 30, },
    imageContainer: { width: 150, height: 150, marginBottom: 40, justifyContent: 'center', alignItems: 'center', },
    runnerImage: { width: 150, height: 150, },
    input: { width: '100%', height: 55, backgroundColor: '#FFF', borderRadius: 30, paddingHorizontal: 20, marginBottom: 20, fontSize: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5, },
    forgotPasswordContainer: { width: '100%', alignItems: 'flex-end', marginBottom: 30, },
    forgotPasswordText: { color: '#4FA9C1', fontSize: 14, fontWeight: '600', },
    loginButton: { width: '100%', height: 55, backgroundColor: '#4FA9C1', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 30, },
    loginButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', },
    registerContainer: { flexDirection: 'row', marginTop: 10, },
    registerText: { fontSize: 16, color: '#555', },
    registerLinkText: { fontSize: 16, fontWeight: 'bold', color: '#4FA9C1', },
});

export default LoginScreen;