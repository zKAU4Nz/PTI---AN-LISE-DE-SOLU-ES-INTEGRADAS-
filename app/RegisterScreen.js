

import React, { useState } from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router'; // Hook de navegação
import { supabase } from './supabaseClient'; 

const { height } = Dimensions.get('window');

const RegisterScreen = (props) => { 
    
    const navigation = useNavigation(); 

    // formulário
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleCadastro = async () => {
        setLoading(true);

        // [LÓGICA DE VALIDAÇÃO E CADASTRO COM SUPABASE]
        if (!nomeCompleto || !email || !senha || !confirmaSenha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            setLoading(false); return;
        }
        if (senha !== confirmaSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            setLoading(false); return;
        }

        
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password: senha });
        if (authError) { Alert.alert('Erro no Cadastro', authError.message); setLoading(false); return; }

        const userId = authData.user.id;
        
        
        const { error: dbError } = await supabase
            .from('usuarios')
            .insert([{ id: userId, nome_completo: nomeCompleto }]);

        setLoading(false);
        if (dbError) { Alert.alert('Erro', 'Falha ao finalizar o cadastro. Tente novamente.'); return; }

        Alert.alert('Sucesso!', 'Cadastro realizado. Faça login para continuar.');
        
       
        navigation.navigate('index'); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topShape} /> 
            <View style={styles.content}>
                
                <Text style={styles.title}>Seja bem-vindo ao vitasync</Text>
                <Text style={styles.subtitle}>Será um prazer te ajudar com sua rotina de exercícios</Text>

                {/* Inputs do Formulário */}
                <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor="#666" value={nomeCompleto} onChangeText={setNomeCompleto} />
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#666" secureTextEntry value={senha} onChangeText={setSenha} />
                <TextInput style={styles.input} placeholder="Confirme sua senha" placeholderTextColor="#666" secureTextEntry value={confirmaSenha} onChangeText={setConfirmaSenha} />

                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={handleCadastro}
                    disabled={loading}
                >
                    {loading ? (<ActivityIndicator color="#FFF" />) : (<Text style={styles.buttonText}>Registrar</Text>)}
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Já tem uma conta?</Text>
                    {/* Navega para a rota 'index' (Login) */}
                    <TouchableOpacity onPress={() => navigation.navigate('index')}>
                        <Text style={styles.loginLinkText}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F9FA', 
    },
    topShape: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(173, 216, 230, 0.4)', 
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: height * 0.1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
    },
    input: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 30, 
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    registerButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#4FA9C1', 
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
    },
    loginText: {
        fontSize: 16,
        color: '#555',
    },
    loginLinkText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4FA9C1',
    },
});

export default RegisterScreen;