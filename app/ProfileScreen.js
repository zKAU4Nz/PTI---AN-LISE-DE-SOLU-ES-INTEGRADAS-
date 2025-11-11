

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { supabase } from './supabaseClient'; 
import { Ionicons } from '@expo/vector-icons'; 

const TrainingScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('Usuário');
    const [loading, setLoading] = useState(true);
    
    const [treinos, setTreinos] = useState([]); 

    
    
    
    const fetchData = async () => {
        setLoading(true);
        
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigation.navigate('Login'); setLoading(false); return; }

        const { data: userData } = await supabase.from('usuarios').select('nome_completo').eq('id', user.id).single(); 
        if (userData) { setUserName(userData.nome_completo.split(' ')[0]); }

        
        const { data: treinosData, error: treinosError } = await supabase
            .from('treinos')
            .select('id, nome_treino'); 

        if (treinosError) {
            console.error("Erro ao carregar treinos:", treinosError.message);
            Alert.alert("Erro", "Não foi possível carregar a lista de treinos.");
        } else {
            
            setTreinos(treinosData.map(t => ({
                id: t.id,
                nome: t.nome_treino,
                completado: false, 
                
                rota: t.nome_treino === 'Flexibilidade e mobilidade' ? 'Detalhe' : undefined 
            })));
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []); 

    const toggleTreino = (id) => {
        setTreinos(treinos.map(treino => 
            treino.id === id ? { ...treino, completado: !treino.completado } : treino
        ));
    };
    
    const renderTreinoItem = (treino) => (
        <TouchableOpacity 
            key={treino.id} 
            style={styles.treinoItem}
            onPress={() => treino.rota ? navigation.navigate(treino.rota) : toggleTreino(treino.id)}
        >
            <TouchableOpacity onPress={() => toggleTreino(treino.id)} style={styles.checkboxArea}>
                <View style={[styles.checkbox, treino.completado && styles.checkboxCompletado]}>
                    {treino.completado && <Ionicons name="checkmark" size={18} color="#FFF" />}
                </View>
            </TouchableOpacity>
            <Text style={[styles.treinoText, treino.completado && styles.treinoTextCompletado]}>{treino.nome}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (<View style={styles.loadingContainer}><ActivityIndicator size="large" color="#4FA9C1" /><Text>Carregando...</Text></View>);
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.profileHeader}>
                    <View style={styles.photoPlaceholder} /> 
                    <Text style={styles.profileName}>{userName}</Text>
                </View>

                <Text style={styles.sectionTitle}>Treinos semanais</Text>
                
                <View style={styles.treinoListContainer}>
                    {treinos.map(renderTreinoItem)}
                    
                    <TouchableOpacity style={styles.addButton}>
                        <Ionicons name="add-circle" size={30} color="#4FA9C1" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F9FA', },
    scrollContent: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 50, },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F9FA', },
    profileHeader: { alignItems: 'center', marginBottom: 30, },
    photoPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#CCC', marginBottom: 10, },
    profileName: { fontSize: 24, fontWeight: 'bold', color: '#333', },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333', },
    treinoListContainer: { backgroundColor: '#FFF', borderRadius: 15, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5, },
    treinoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, },
    checkboxArea: { paddingRight: 15, paddingVertical: 5, },
    checkbox: { width: 25, height: 25, borderRadius: 5, borderWidth: 2, borderColor: '#4FA9C1', justifyContent: 'center', alignItems: 'center', },
    checkboxCompletado: { backgroundColor: '#4FA9C1', },
    treinoText: { fontSize: 16, color: '#333', },
    treinoTextCompletado: { textDecorationLine: 'line-through', color: '#9E9E9E', },
    addButton: { alignSelf: 'flex-end', marginTop: 10, }
});

export default TrainingScreen;